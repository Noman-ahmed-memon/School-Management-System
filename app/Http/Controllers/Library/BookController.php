<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('library.view');

        // ===== SCOPE =====
        $query = Book::query();
        $this->scopeQuery($query);
        // =================

        $books = $query
            ->with('category:id,name')
            ->when($request->search, fn($q, $s) =>
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('author', 'like', "%{$s}%")
                  ->orWhere('isbn', 'like', "%{$s}%"))
            ->when($request->category_id, fn($q, $id) => $q->where('category_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Library/Books/Index', [
            'books' => $books,
            'categories' => BookCategory::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'category_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('library.manage');

        return Inertia::render('Library/Books/Create', [
            'categories' => BookCategory::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('library.manage');

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'isbn' => ['required', 'string', 'max:50', 'unique:books,isbn'],
            'author' => ['required', 'string', 'max:150'],
            'publisher' => ['nullable', 'string', 'max:150'],
            'edition' => ['nullable', 'string', 'max:50'],
            'year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
            'category_id' => ['required', 'exists:book_categories,id'],
            'total_copies' => ['required', 'integer', 'min:1'],
            'shelf_location' => ['nullable', 'string', 'max:50'],
            'rack_number' => ['nullable', 'string', 'max:50'],
        ]);

        $validated['campus_id'] = $this->getCampusId();
        $validated['available_copies'] = $validated['total_copies'];
        $validated['status'] = 'available';

        Book::create($validated);

        return $this->successRedirect('books.index', 'Book added.');
    }

    public function show(Book $book)
    {
        $this->authorizePermission('library.view');
        $book->load('category:id,name');

        return Inertia::render('Library/Books/Show', ['book' => $book]);
    }

    public function edit(Book $book)
    {
        $this->authorizePermission('library.manage');

        return Inertia::render('Library/Books/Edit', [
            'book' => $book,
            'categories' => BookCategory::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $this->authorizePermission('library.manage');

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'isbn' => ['required', 'string', 'max:50', 'unique:books,isbn,' . $book->id],
            'author' => ['required', 'string', 'max:150'],
            'publisher' => ['nullable', 'string', 'max:150'],
            'edition' => ['nullable', 'string', 'max:50'],
            'year' => ['nullable', 'integer'],
            'category_id' => ['required', 'exists:book_categories,id'],
            'total_copies' => ['required', 'integer', 'min:1'],
            'shelf_location' => ['nullable', 'string', 'max:50'],
            'rack_number' => ['nullable', 'string', 'max:50'],
        ]);

        $diff = $validated['total_copies'] - $book->total_copies;
        $validated['available_copies'] = max(0, $book->available_copies + $diff);

        $book->update($validated);

        return $this->successRedirect('books.index', 'Book updated.');
    }

    public function destroy(Book $book)
    {
        $this->authorizePermission('library.manage');

        if ($book->libraryTransactions()->where('status', 'issued')->exists()) {
            return back()->withErrors(['error' => 'Cannot delete book with active issues.']);
        }

        $book->delete();

        return $this->successRedirect('books.index', 'Book deleted.');
    }
}