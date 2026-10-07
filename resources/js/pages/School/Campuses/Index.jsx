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
    BuildingStorefrontIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    UsersIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, campuses, schools, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [schoolId, setSchoolId] = useState(filters?.school_id || '');

    const handleSearch = () => {
        router.get(
            route('school.campuses.index'),
            {
                search,
                status,
                school_id: schoolId,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setSchoolId('');
        router.get(route('school.campuses.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this campus? This cannot be undone.')) {
            router.delete(route('school.campuses.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Campuses" />

            <div className="space-y-6">
                <PageHeader
                    title="Campuses"
                    subtitle="Manage campuses and their academic operations"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Campuses' },
                    ]}
                    action={
                        <Button href={route('school.campuses.create')}>
                            + Add Campus
                        </Button>
                    }
                />

                <Card>
                    {/* Filter Header */}
                    <div className="border-b border-slate-200 bg-slate-50/60 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                <FunnelIcon className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Campus Directory
                                </p>
                                <p className="text-xs text-slate-500">
                                    Search and filter registered campuses
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by campus name or code..."
                        >
                            <select
                                value={schoolId}
                                onChange={(e) => setSchoolId(e.target.value)}
                                aria-label="Filter by school"
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Schools</option>

                                {schools.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                aria-label="Filter by status"
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {campuses.data.length === 0 ? (
                        <EmptyState
                            icon={<BuildingStorefrontIcon />}
                            title="No campuses found"
                            description="No campus records match your current filters."
                            action={
                                <Button href={route('school.campuses.create')}>
                                    + Add Campus
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-white">
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Campus
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                School
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Students
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {campuses.data.map((campus) => (
                                            <tr
                                                key={campus.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100 transition group-hover:bg-indigo-100">
                                                            <BuildingStorefrontIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <Link
                                                                href={route(
                                                                    'school.campuses.show',
                                                                    campus.id
                                                                )}
                                                                className="block truncate text-sm font-semibold text-slate-900 transition hover:text-indigo-600"
                                                            >
                                                                {campus.name}
                                                            </Link>

                                                            {campus.phone && (
                                                                <div className="mt-0.5 text-xs text-slate-500">
                                                                    {campus.phone}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                        {campus.code}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {campus.school?.name || '—'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5">
                                                        <UsersIcon className="h-4 w-4 text-blue-600" />
                                                        <span className="text-xs font-bold text-blue-700">
                                                            {campus.students_count ?? 0}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            campus.status === 'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {campus.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'school.campuses.show',
                                                                campus.id
                                                            )}
                                                            aria-label={`View ${campus.name}`}
                                                            title="View"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'school.campuses.edit',
                                                                campus.id
                                                            )}
                                                            aria-label={`Edit ${campus.name}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(campus.id)
                                                            }
                                                            aria-label={`Delete ${campus.name}`}
                                                            title="Delete"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
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
                                links={campuses.links}
                                from={campuses.from}
                                to={campuses.to}
                                total={campuses.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}