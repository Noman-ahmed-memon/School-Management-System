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
    AcademicCapIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, standards, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [selectedIds, setSelectedIds] = useState([]);

    const handleSearch = () => {
        router.get(
            route('school.standards.index'),
            { search, status },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        router.get(route('school.standards.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this standard?')) {
            router.delete(route('school.standards.destroy', id));
        }
    };

    const handleToggleStatus = (id) => {
        router.patch(route('school.standards.toggle-status', id));
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        if (confirm(`Delete ${selectedIds.length} standards?`)) {
            router.post(
                route('school.standards.bulk-destroy'),
                { ids: selectedIds },
                {
                    onSuccess: () => setSelectedIds([]),
                }
            );
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === standards.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(standards.data.map((s) => s.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Standards" />

            <div className="space-y-6">
                <PageHeader
                    title="Standards (Classes)"
                    subtitle="Manage all classes in your campus"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Standards' },
                    ]}
                    action={
                        <Button href={route('school.standards.create')}>
                            + Add Standard
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    {/* Filters */}
                    <div className="border-b border-slate-200 bg-slate-50/70 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or code..."
                        >
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {/* Bulk Selection */}
                    {selectedIds.length > 0 && (
                        <div className="flex items-center justify-between border-b border-red-100 bg-red-50/80 px-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                                    <Squares2X2Icon className="h-4 w-4 text-red-600" />
                                </div>
                                <span className="text-sm font-medium text-red-800">
                                    {selectedIds.length} selected
                                </span>
                            </div>

                            <button
                                onClick={handleBulkDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Delete Selected
                            </button>
                        </div>
                    )}

                    {standards.data.length === 0 ? (
                        <EmptyState
                            icon={<AcademicCapIcon />}
                            title="No standards found"
                            description="Get started by creating your first standard."
                            action={
                                <Button href={route('school.standards.create')}>
                                    + Add Standard
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        selectedIds.length === standards.data.length &&
                                                        standards.data.length > 0
                                                    }
                                                    onChange={toggleSelectAll}
                                                    aria-label="Select all standards"
                                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Order
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Name
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {standards.data.map((standard) => (
                                            <tr
                                                key={standard.id}
                                                className="group transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(standard.id)}
                                                        onChange={() => toggleSelect(standard.id)}
                                                        aria-label={`Select ${standard.name}`}
                                                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                                                        {standard.order}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                                            <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {standard.name}
                                                            </div>

                                                            {standard.description && (
                                                                <div className="mt-0.5 max-w-xs truncate text-xs text-slate-500">
                                                                    {standard.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {standard.code}
                                                    </code>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleToggleStatus(standard.id)}
                                                        className="rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        title="Toggle status"
                                                        aria-label={`Toggle status for ${standard.name}`}
                                                    >
                                                        <Badge
                                                            variant={
                                                                standard.status === 'active'
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }
                                                        >
                                                            {standard.status}
                                                        </Badge>
                                                    </button>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Link
                                                            href={route('school.standards.show', standard.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                            aria-label={`View ${standard.name}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route('school.standards.edit', standard.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${standard.name}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(standard.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${standard.name}`}
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

                            <Pagination
                                links={standards.links}
                                from={standards.from}
                                to={standards.to}
                                total={standards.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}