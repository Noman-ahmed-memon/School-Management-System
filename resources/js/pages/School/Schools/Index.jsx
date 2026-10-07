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
    BuildingOffice2Icon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, schools, organizations, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [organizationId, setOrganizationId] = useState(filters?.organization_id || '');

    const handleSearch = () => {
        router.get(
            route('school.schools.index'),
            {
                search,
                status,
                organization_id: organizationId,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setOrganizationId('');
        router.get(route('school.schools.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this school? This cannot be undone.')) {
            router.delete(route('school.schools.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Schools" />

            <div className="space-y-6">
                <PageHeader
                    title="Schools"
                    subtitle="Manage schools under organizations"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Schools' },
                    ]}
                    action={
                        <Button href={route('school.schools.create')}>
                            + Add School
                        </Button>
                    }
                />

                <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                    {/* Filters */}
                    <div className="border-b border-slate-200 bg-slate-50/80 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or code..."
                        >
                            <select
                                value={organizationId}
                                onChange={(e) => setOrganizationId(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Organizations</option>
                                {organizations.map((o) => (
                                    <option key={o.id} value={o.id}>
                                        {o.name}
                                    </option>
                                ))}
                            </select>

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

                    {schools.data.length === 0 ? (
                        <div className="py-6">
                            <EmptyState
                                icon={<BuildingOffice2Icon />}
                                title="No schools found"
                                description="Get started by creating your first school."
                                action={
                                    <Button href={route('school.schools.create')}>
                                        + Add School
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50/90">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Organization
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Campuses
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {schools.data.map((school) => (
                                            <tr
                                                key={school.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {school.logo ? (
                                                            <img
                                                                src={`/storage/${school.logo}`}
                                                                alt={school.name}
                                                                className="h-11 w-11 rounded-xl border border-slate-200 object-cover shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                                                <BuildingOffice2Icon className="h-5 w-5" />
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {school.name}
                                                            </div>

                                                            {school.principal_name && (
                                                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                                                    <AcademicCapIcon className="h-3.5 w-3.5" />
                                                                    Principal: {school.principal_name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700">
                                                        {school.code}
                                                    </code>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {school.organization?.name || '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {school.campuses_count}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            school.status === 'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {school.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route('school.schools.show', school.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                            aria-label={`View ${school.name}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route('school.schools.edit', school.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${school.name}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(school.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${school.name}`}
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
                                links={schools.links}
                                from={schools.from}
                                to={schools.to}
                                total={schools.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}