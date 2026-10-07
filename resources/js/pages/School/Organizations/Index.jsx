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
    BuildingOfficeIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    AcademicCapIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, organizations, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(
            route('school.organizations.index'),
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
        router.get(route('school.organizations.index'));
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Delete this organization? This action cannot be undone.'
            )
        ) {
            router.delete(
                route('school.organizations.destroy', id)
            );
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Organizations" />

            <div className="space-y-6">
                <PageHeader
                    title="Organizations"
                    subtitle="Manage institutional organizations across the system"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Organizations' },
                    ]}
                    action={
                        <Button
                            href={route(
                                'school.organizations.create'
                            )}
                        >
                            + Add Organization
                        </Button>
                    }
                />

                <Card>
                    {/* Filters */}
                    <div className="border-b border-slate-200 bg-slate-50/60 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                <FunnelIcon className="h-4 w-4 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Organization Directory
                                </p>
                                <p className="text-xs text-slate-500">
                                    Search and filter registered organizations
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or code..."
                        >
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                aria-label="Filter by status"
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {organizations.data.length === 0 ? (
                        <EmptyState
                            icon={<BuildingOfficeIcon />}
                            title="No organizations found"
                            description="No organizations match your current filters."
                            action={
                                <Button
                                    href={route(
                                        'school.organizations.create'
                                    )}
                                >
                                    + Add Organization
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
                                                Organization
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Contact
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Schools
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
                                        {organizations.data.map((org) => (
                                            <tr
                                                key={org.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {org.logo ? (
                                                            <img
                                                                src={`/storage/${org.logo}`}
                                                                alt={org.name}
                                                                className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
                                                            />
                                                        ) : (
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                                                <BuildingOfficeIcon className="h-5 w-5 text-indigo-600" />
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <Link
                                                                href={route(
                                                                    'school.organizations.show',
                                                                    org.id
                                                                )}
                                                                className="block truncate text-sm font-semibold text-slate-900 hover:text-indigo-600"
                                                            >
                                                                {org.name}
                                                            </Link>

                                                            {org.website && (
                                                                <a
                                                                    href={org.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mt-0.5 block max-w-[220px] truncate text-xs text-indigo-600 hover:underline"
                                                                >
                                                                    {org.website}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                        {org.code}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="space-y-0.5 text-sm text-slate-600">
                                                        {org.email && (
                                                            <div className="truncate">
                                                                {org.email}
                                                            </div>
                                                        )}

                                                        {org.phone && (
                                                            <div className="text-xs text-slate-500">
                                                                {org.phone}
                                                            </div>
                                                        )}

                                                        {!org.email &&
                                                            !org.phone && (
                                                                <span>—</span>
                                                            )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5">
                                                        <AcademicCapIcon className="h-4 w-4 text-blue-600" />

                                                        <span className="text-xs font-bold text-blue-700">
                                                            {org.schools_count}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            org.status ===
                                                            'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {org.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'school.organizations.show',
                                                                org.id
                                                            )}
                                                            aria-label={`View ${org.name}`}
                                                            title="View"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'school.organizations.edit',
                                                                org.id
                                                            )}
                                                            aria-label={`Edit ${org.name}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    org.id
                                                                )
                                                            }
                                                            aria-label={`Delete ${org.name}`}
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
                                links={organizations.links}
                                from={organizations.from}
                                to={organizations.to}
                                total={organizations.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}