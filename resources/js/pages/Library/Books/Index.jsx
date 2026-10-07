import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import SearchBar from '@/Components/ui/SearchBar';
import EmptyState from '@/Components/ui/EmptyState';
import {
    BookOpenIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, books, categories, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [categoryId, setCategoryId] = useState(filters?.category_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(
            route('books.index'),
            {
                search,
                category_id: categoryId,
                status,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setCategoryId('');
        setStatus('');

        router.get(route('books.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this book?')) {
            router.delete(route('books.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            available: 'success',
            issued: 'warning',
            reserved: 'info',
        };

        return map[status] || 'default';
    };

    const getAvailabilityPercentage = (book) => {
        if (!book.total_copies) return 0;

        return Math.min(
            100,
            Math.round((book.available_copies / book.total_copies) * 100)
        );
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Books" />

            <div className="space-y-6">

                {/* Header */}
                <PageHeader
                    title="Library Catalog"
                    subtitle="Manage books, inventory and academic resources"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Books' },
                    ]}
                    action={
                        <Button href={route('books.create')}>
                            + Add Book
                        </Button>
                    }
                />

                {/* Catalog Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Catalog Records
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {books.total}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Categories
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {(categories || []).length}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <ArchiveBoxIcon className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Current View
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {books.data.length}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <MagnifyingGlassIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Main Catalog */}
                <Card className="overflow-hidden">

                    {/* Search / Filters */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">

                        <div className="flex items-center gap-2 mb-4">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Catalog Search
                                </p>
                                <p className="text-xs text-slate-500">
                                    Search and filter library resources
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by title, author or ISBN..."
                        >
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Categories</option>

                                {(categories || []).map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="available">Available</option>
                                <option value="issued">Issued</option>
                                <option value="reserved">Reserved</option>
                            </select>
                        </SearchBar>
                    </div>

                    {/* Empty State */}
                    {books.data.length === 0 ? (
                        <EmptyState
                            icon={<BookOpenIcon />}
                            title="No books found"
                            description="No catalog records match your current search or filters."
                            action={
                                <Button href={route('books.create')}>
                                    + Add Book
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">

                                <table className="min-w-full divide-y divide-slate-200">

                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Book
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Author
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Category
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                ISBN
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Availability
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">

                                        {books.data.map((book) => {

                                            const availability =
                                                getAvailabilityPercentage(book);

                                            return (
                                                <tr
                                                    key={book.id}
                                                    className="group transition-colors hover:bg-slate-50/80"
                                                >

                                                    {/* Book */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">

                                                            <div className="h-11 w-11 flex-shrink-0 rounded-xl border border-amber-100 bg-amber-50 flex items-center justify-center">
                                                                <BookOpenIcon className="h-5 w-5 text-amber-600" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="truncate max-w-[240px] text-sm font-semibold text-slate-900">
                                                                    {book.title}
                                                                </div>

                                                                {book.publisher && (
                                                                    <div className="mt-0.5 text-xs text-slate-500">
                                                                        {book.publisher}
                                                                        {book.year && (
                                                                            <span> • {book.year}</span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </td>

                                                    {/* Author */}
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {book.author}
                                                    </td>

                                                    {/* Category */}
                                                    <td className="px-6 py-4">
                                                        {book.category ? (
                                                            <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                                                                {book.category.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-slate-400">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* ISBN */}
                                                    <td className="px-6 py-4">
                                                        <code className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
                                                            {book.isbn}
                                                        </code>
                                                    </td>

                                                    {/* Availability */}
                                                    <td className="px-6 py-4 min-w-[150px]">

                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-sm font-semibold text-slate-800">
                                                                {book.available_copies}
                                                            </span>

                                                            <span className="text-xs text-slate-400">
                                                                / {book.total_copies}
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                            <div
                                                                className="h-full rounded-full bg-emerald-500 transition-all"
                                                                style={{
                                                                    width: `${availability}%`,
                                                                }}
                                                            />
                                                        </div>

                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4">
                                                        <Badge
                                                            variant={getStatusVariant(book.status)}
                                                        >
                                                            {book.status}
                                                        </Badge>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-4">

                                                        <div className="flex justify-end gap-1">

                                                            <Link
                                                                href={route(
                                                                    'books.show',
                                                                    book.id
                                                                )}
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                                title="View"
                                                            >
                                                                <EyeIcon className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    'books.edit',
                                                                    book.id
                                                                )}
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                                title="Edit"
                                                            >
                                                                <PencilIcon className="h-4 w-4" />
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(book.id)
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                                title="Delete"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </table>

                            </div>

                            <Pagination
                                links={books.links}
                                from={books.from}
                                to={books.to}
                                total={books.total}
                            />
                        </>
                    )}

                </Card>
            </div>
        </AuthenticatedLayout>
    );
}