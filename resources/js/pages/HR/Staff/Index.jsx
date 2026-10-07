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
    EnvelopeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, staff, departments, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [departmentId, setDepartmentId] = useState(
        filters?.department_id || ''
    );

    const handleSearch = () => {
        router.get(
            route('staff.index'),
            { search, status, department_id: departmentId },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setDepartmentId('');
        router.get(route('staff.index'));
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Delete this staff member? This will also delete their user account.'
            )
        ) {
            router.delete(route('staff.destroy', id));
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const getEmploymentVariant = (type) => {
        const map = {
            full_time: 'success',
            part_time: 'info',
            contract: 'warning',
            intern: 'default',
        };
        return map[type] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Staff" />

            <div className="space-y-6">
                <PageHeader
                    title="Staff"
                    subtitle="Manage non-teaching staff members across your campus"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Staff' },
                    ]}
                    action={
                        <Button href={route('staff.create')}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Staff
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">
                        <div className="flex items-center gap-2 mb-4">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Search Staff
                                </p>
                                <p className="text-xs text-slate-500">
                                    Search by name or employee ID
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or employee ID..."
                        >
                            <select
                                value={departmentId}
                                onChange={(e) =>
                                    setDepartmentId(e.target.value)
                                }
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">
                                    All Departments
                                </option>
                                {departments.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">
                                    Inactive
                                </option>
                                <option value="terminated">
                                    Terminated
                                </option>
                            </select>
                        </SearchBar>
                    </div>

                    {staff.data.length === 0 ? (
                        <EmptyState
                            icon={<BriefcaseIcon />}
                            title="No staff found"
                            description="Get started by adding your first staff member."
                            action={
                                <Button
                                    href={route('staff.create')}
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Staff
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
                                                Staff Member
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Employee ID
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Department
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Designation
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Type
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
                                        {staff.data.map((member) => (
                                            <tr
                                                key={member.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm shrink-0">
                                                            {getInitials(
                                                                member
                                                                    .user
                                                                    ?.name
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-slate-800 truncate">
                                                                {
                                                                    member
                                                                        .user
                                                                        ?.name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                                <EnvelopeIcon className="h-3 w-3" />
                                                                {
                                                                    member
                                                                        .user
                                                                        ?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                        {
                                                            member.employee_id
                                                        }
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {member.department
                                                        ?.name || '—'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {member.designation ||
                                                        '—'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={getEmploymentVariant(
                                                            member.employment_type
                                                        )}
                                                    >
                                                        {member.employment_type?.replace(
                                                            '_',
                                                            ' '
                                                        )}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            member.status ===
                                                            'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {member.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'staff.show',
                                                                member.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                'staff.edit',
                                                                member.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    member.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
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

                            <Pagination
                                links={staff.links}
                                from={staff.from}
                                to={staff.to}
                                total={staff.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}