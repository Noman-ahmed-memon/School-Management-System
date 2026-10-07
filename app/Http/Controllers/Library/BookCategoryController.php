<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Models\BookCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookCategoryController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('library.view');

        // ===== SCOPE =====
        $query = BookCategory::query();
        $this->scopeQuery($query);
        // =================

        $categories = $query
            ->withCount('books')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Library/BookCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('library.manage');
        return Inertia::render('Library/BookCategories/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('library.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:book_categories,code'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        BookCategory::create($validated);

        return $this->successRedirect('book-categories.index', 'Category created.');
    }

    public function edit(BookCategory $bookCategory)
    {
        $this->authorizePermission('library.manage');
        return Inertia::render('Library/BookCategories/Edit', [
            'category' => $bookCategory,
        ]);
    }

    public function update(Request $request, BookCategory $bookCategory)
    {
        $this->authorizePermission('library.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:book_categories,code,' . $bookCategory->id],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $bookCategory->update($validated);

        return $this->successRedirect('book-categories.index', 'Category updated.');
    }

    public function destroy(BookCategory $bookCategory)
    {
        $this->authorizePermission('library.manage');

        if ($bookCategory->books()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category with existing books.']);
        }

        $bookCategory->delete();

        return $this->successRedirect('book-categories.index', 'Category deleted.');
    }
}