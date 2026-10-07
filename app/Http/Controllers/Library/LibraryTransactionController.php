<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\LibraryTransaction;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LibraryTransactionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('library.view');

        $transactions = LibraryTransaction::query()
            ->with([
                'book:id,title,author,isbn',
                'student:id,first_name,last_name,admission_number',
                'issuedBy:id,name',
            ])
            ->when($request->search, fn($q, $s) =>
                $q->whereHas('book', fn($sub) =>
                    $sub->where('title', 'like', "%{$s}%")
                        ->orWhere('author', 'like', "%{$s}%"))
                  ->orWhereHas('student', fn($sub) =>
                      $sub->where('first_name', 'like', "%{$s}%")
                          ->orWhere('last_name', 'like', "%{$s}%")))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Library/LibraryTransactions/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorizePermission('library.issue');

        return Inertia::render('Library/LibraryTransactions/Create', [
            'books' => Book::query()
                ->where('available_copies', '>', 0)
                ->select('id', 'title', 'isbn', 'author', 'available_copies', 'total_copies')
                ->orderBy('title')
                ->limit(500)
                ->get(),
            'students' => Student::query()
                ->whereIn('status', ['active', 'enrolled', 'admitted'])
                ->select('id', 'first_name', 'last_name', 'admission_number')
                ->orderBy('first_name')
                ->limit(500)
                ->get(),
            'preselectedBookId' => $request->book_id,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('library.issue');

        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
            'student_id' => ['required', 'exists:students,id'],
            'issue_date' => ['required', 'date'],
            'due_date' => ['required', 'date', 'after:issue_date'],
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $book = Book::lockForUpdate()->findOrFail($validated['book_id']);

                if ($book->available_copies <= 0) {
                    throw new \Exception('This book is no longer available.');
                }

                LibraryTransaction::create([
                    'book_id' => $book->id,
                    'student_id' => $validated['student_id'],
                    'issued_by' => auth()->id(),
                    'issue_date' => $validated['issue_date'],
                    'due_date' => $validated['due_date'],
                    'status' => 'issued',
                ]);

                $book->issueBook();
            });

            return $this->successRedirect('library-transactions.index', 'Book issued successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function returnBook(LibraryTransaction $libraryTransaction)
    {
        $this->authorizePermission('library.return');

        if ($libraryTransaction->status === 'returned') {
            return back()->withErrors(['error' => 'This book has already been returned.']);
        }

        DB::transaction(function () use ($libraryTransaction) {
            $libraryTransaction->update([
                'return_date' => now(),
                'status' => 'returned',
            ]);

            $libraryTransaction->calculateFine();
            $libraryTransaction->book->returnBook();
        });

        return back()->with('success', 'Book returned successfully.');
    }

    public function renew(Request $request, LibraryTransaction $libraryTransaction)
    {
        $this->authorizePermission('library.manage');

        $validated = $request->validate([
            'new_due_date' => ['required', 'date', 'after:today'],
        ]);

        $libraryTransaction->update([
            'due_date' => $validated['new_due_date'],
            'status' => 'renewed',
        ]);

        return back()->with('success', 'Book renewed successfully.');
    }

    public function destroy(LibraryTransaction $libraryTransaction)
    {
        $this->authorizePermission('library.manage');

        // Return the book to inventory if it's currently issued
        if (in_array($libraryTransaction->status, ['issued', 'renewed'])) {
            $libraryTransaction->book->returnBook();
        }

        $libraryTransaction->delete();

        return $this->successRedirect('library-transactions.index', 'Transaction deleted.');
    }
}