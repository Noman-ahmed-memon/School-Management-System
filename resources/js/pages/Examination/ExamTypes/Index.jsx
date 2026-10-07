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
    ClipboardDocumentListIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    AcademicCapIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, types, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = () => {
        router.get(
            route('exam-types.index'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        router.get(route('exam-types.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this exam type?')) {
            router.delete(route('exam-types.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Exam Types" />

            <div className="space-y-6">

                <PageHeader
                    title="Exam Types"
                    subtitle="Manage and organize examination categories across your academic system."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exam Types' },
                    ]}
                    action={
                        <Button href={route('exam-types.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Exam Type
                        </Button>
                    }
                />

                {/* Overview Strip */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 transition-colors group-hover:bg-indigo-100">
                                <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Total Types
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {types.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                                <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Categories
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    Academic
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
                                    Organization
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    Centralized
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <Card className="overflow-hidden border border-slate-200 shadow-sm">

                    {/* Search Header */}
                    <div className="border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or code..."
                        />
                    </div>

                    {types.data.length === 0 ? (
                        <div className="p-6">
                            <EmptyState
                                icon={<ClipboardDocumentListIcon />}
                                title="No exam types found"
                                description="Create your first exam type to start organizing examinations."
                                action={
                                    <Button
                                        href={route('exam-types.create')}
                                    >
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Exam Type
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
                                                Exam Type
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Exams
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

                                        {types.data.map((type) => (
                                            <tr
                                                key={type.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 ring-1 ring-indigo-100">
                                                            <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900">
                                                                {type.name}
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-slate-400">
                                                                Examination category
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-slate-700">
                                                        {type.code}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {type.exams_count ?? 0}
                                                    </Badge>
                                                </td>

                                                <td className="max-w-md px-6 py-4">
                                                    <p className="truncate text-sm text-slate-500">
                                                        {type.description || 'No description provided'}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">

                                                        <Link
                                                            href={route(
                                                                'exam-types.edit',
                                                                type.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(type.id)
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
                                    links={types.links}
                                    from={types.from}
                                    to={types.to}
                                    total={types.total}
                                />
                            </div>
                        </>
                    )}

                </Card>
            </div>
        </AuthenticatedLayout>
    );
}