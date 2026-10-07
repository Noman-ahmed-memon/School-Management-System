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
    BriefcaseIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    UsersIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, departments, campuses, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [campusId, setCampusId] = useState(filters?.campus_id || '');

    const handleSearch = () => {
        router.get(
            route('school.departments.index'),
            {
                search,
                status,
                campus_id: campusId,
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
        setCampusId('');
        router.get(route('school.departments.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this department?')) {
            router.delete(route('school.departments.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Departments" />

            <div className="space-y-6">
                <PageHeader
                    title="Departments"
                    subtitle="Manage academic departments across campuses"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Departments' },
                    ]}
                    action={
                        <Button
                            href={route('school.departments.create')}
                        >
                            + Add Department
                        </Button>
                    }
                />

                <Card>
                    {/* Filters */}
                    <div className="border-b border-slate-200 bg-slate-50/60 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
                                <FunnelIcon className="h-4 w-4 text-teal-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Department Directory
                                </p>
                                <p className="text-xs text-slate-500">
                                    Search and filter academic departments
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
                                value={campusId}
                                onChange={(e) =>
                                    setCampusId(e.target.value)
                                }
                                aria-label="Filter by campus"
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                <option value="">All Campuses</option>

                                {campuses.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                aria-label="Filter by status"
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {departments.data.length === 0 ? (
                        <EmptyState
                            icon={<BriefcaseIcon />}
                            title="No departments found"
                            description="No departments match your current filters."
                            action={
                                <Button
                                    href={route(
                                        'school.departments.create'
                                    )}
                                >
                                    + Add Department
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
                                                Department
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Campus
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Head
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Staff
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
                                        {departments.data.map((dept) => (
                                            <tr
                                                key={dept.id}
                                                className="group transition-colors hover:bg-teal-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-100 transition group-hover:bg-teal-100">
                                                            <BriefcaseIcon className="h-5 w-5 text-teal-600" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <Link
                                                                href={route(
                                                                    'school.departments.show',
                                                                    dept.id
                                                                )}
                                                                className="block truncate text-sm font-semibold text-slate-900 hover:text-teal-600"
                                                            >
                                                                {dept.name}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                        {dept.code}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                    {dept.campus?.name || '—'}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {dept.head_name || '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5">
                                                        <UsersIcon className="h-4 w-4 text-blue-600" />
                                                        <span className="text-xs font-bold text-blue-700">
                                                            {dept.staff_count ?? 0}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            dept.status ===
                                                            'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {dept.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'school.departments.show',
                                                                dept.id
                                                            )}
                                                            aria-label={`View ${dept.name}`}
                                                            title="View"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'school.departments.edit',
                                                                dept.id
                                                            )}
                                                            aria-label={`Edit ${dept.name}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    dept.id
                                                                )
                                                            }
                                                            aria-label={`Delete ${dept.name}`}
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
                                links={departments.links}
                                from={departments.from}
                                to={departments.to}
                                total={departments.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}