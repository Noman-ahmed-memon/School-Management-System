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
    FolderIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    BookOpenIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, categories, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = () => {
        router.get(
            route('book-categories.index'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        router.get(route('book-categories.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this category?')) {
            router.delete(route('book-categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Book Categories" />

            <div className="space-y-6">

                <PageHeader
                    title="Book Categories"
                    subtitle="Organize and manage the library catalog into clear academic categories."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Book Categories' },
                    ]}
                    action={
                        <Button href={route('book-categories.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    }
                />

                {/* Overview Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                                <FolderIcon className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Total Categories
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {categories.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                                <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Library
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    Organized
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                                <Squares2X2Icon className="h-5 w-5 text-violet-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Catalog
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    Centralized
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <Card className="overflow-hidden border border-slate-200 shadow-sm">

                    <div className="border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search categories..."
                        />
                    </div>

                    {categories.data.length === 0 ? (
                        <div className="p-6">
                            <EmptyState
                                icon={<FolderIcon />}
                                title="No categories found"
                                description="Create your first book category to organize your library."
                                action={
                                    <Button
                                        href={route(
                                            'book-categories.create'
                                        )}
                                    >
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Category
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">

                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Category
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Books
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Description
                                            </th>

                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">

                                        {categories.data.map((cat) => (
                                            <tr
                                                key={cat.id}
                                                className="group transition-colors hover:bg-blue-50/30"
                                            >

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 ring-1 ring-blue-100">
                                                            <FolderIcon className="h-5 w-5 text-blue-600" />
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900">
                                                                {cat.name}
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-slate-400">
                                                                Library category
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-slate-700">
                                                        {cat.code}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {cat.books_count ?? 0}
                                                    </Badge>
                                                </td>

                                                <td className="max-w-md px-6 py-4">
                                                    <p className="truncate text-sm text-slate-500">
                                                        {cat.description ||
                                                            'No description provided'}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">

                                                        <Link
                                                            href={route(
                                                                'book-categories.edit',
                                                                cat.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    cat.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            <div className="border-t border-slate-100 bg-slate-50/40">
                                <Pagination
                                    links={categories.links}
                                    from={categories.from}
                                    to={categories.to}
                                    total={categories.total}
                                />
                            </div>
                        </>
                    )}

                </Card>
            </div>
        </AuthenticatedLayout>
    );
}