import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import EmptyState from '@/Components/ui/EmptyState';
import {
    CalendarDaysIcon,
    PlusIcon,
    CheckCircleIcon,
    XCircleIcon,
    TrashIcon,
    ClockIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, requests, filters }) {
    const [status, setStatus] = useState(filters?.status || '');
    const [type, setType] = useState(filters?.type || '');

    const handleFilter = () => {
        router.get(
            route('leave-requests.index'),
            { status, type },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setStatus('');
        setType('');
        router.get(route('leave-requests.index'));
    };

    const handleApprove = (id) => {
        if (confirm('Approve this leave request?')) {
            router.post(route('leave-requests.approve', id));
        }
    };

    const handleReject = (id) => {
        if (confirm('Reject this leave request?')) {
            router.post(route('leave-requests.reject', id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this request?')) {
            router.delete(route('leave-requests.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            pending: 'warning',
            approved: 'success',
            rejected: 'danger',
        };
        return map[status] || 'default';
    };

    const getStatusIcon = (status) => {
        const map = {
            pending: ClockIcon,
            approved: CheckCircleIcon,
            rejected: XCircleIcon,
        };
        return map[status] || ClockIcon;
    };

    // Metrics
    const pendingCount = requests.data.filter(
        (r) => r.status === 'pending'
    ).length;
    const approvedCount = requests.data.filter(
        (r) => r.status === 'approved'
    ).length;
    const rejectedCount = requests.data.filter(
        (r) => r.status === 'rejected'
    ).length;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Leave Requests" />

            <div className="space-y-6">
                <PageHeader
                    title="Leave Requests"
                    subtitle="Review, approve and manage staff leave applications"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Leave Requests' },
                    ]}
                    action={
                        <Button href={route('leave-requests.create')}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            New Request
                        </Button>
                    }
                />

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Pending
                                </p>
                                <p className="mt-1 text-2xl font-bold text-amber-600">
                                    {pendingCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                <ClockIcon className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Approved
                                </p>
                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {approvedCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Rejected
                                </p>
                                <p className="mt-1 text-2xl font-bold text-red-600">
                                    {rejectedCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <XCircleIcon className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">
                        <div className="flex items-center gap-2 mb-4">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Filter Requests
                                </p>
                                <p className="text-xs text-slate-500">
                                    Narrow by status or employee type
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-end">
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Employee Type
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) =>
                                        setType(e.target.value)
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Types</option>
                                    <option value="teacher">
                                        Teachers
                                    </option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>

                            <Button onClick={handleFilter}>
                                Filter
                            </Button>

                            {(status || type) && (
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {requests.data.length === 0 ? (
                        <EmptyState
                            icon={<CalendarDaysIcon />}
                            title="No leave requests"
                            description="Staff leave requests will appear here."
                            action={
                                <Button
                                    href={route(
                                        'leave-requests.create'
                                    )}
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Create Request
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
                                                Employee
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Leave Type
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Dates
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Days
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Reason
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
                                        {requests.data.map((req) => {
                                            const StatusIcon =
                                                getStatusIcon(req.status);
                                            return (
                                                <tr
                                                    key={req.id}
                                                    className="hover:bg-slate-50/80 transition"
                                                >
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {req.teacher
                                                                ?.user
                                                                ?.name ||
                                                                req.staff
                                                                    ?.user
                                                                    ?.name ||
                                                                'Unknown'}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {req.teacher
                                                                ?.employee_id ||
                                                                req.staff
                                                                    ?.employee_id}
                                                            {' • '}
                                                            <span className="capitalize font-medium">
                                                                {req.teacher_id
                                                                    ? 'Teacher'
                                                                    : 'Staff'}
                                                            </span>
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">
                                                        {req.leave_type?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-slate-600">
                                                        {req.start_date?.split(
                                                            'T'
                                                        )[0]}
                                                        <br />
                                                        <span className="text-slate-400">
                                                            to{' '}
                                                            {req.end_date?.split(
                                                                'T'
                                                            )[0]}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant="info">
                                                            {req.days} days
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                                                        {req.reason || '—'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge
                                                            variant={getStatusVariant(
                                                                req.status
                                                            )}
                                                        >
                                                            <StatusIcon className="h-3 w-3 inline mr-1" />
                                                            {req.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-1">
                                                            {req.status ===
                                                                'pending' && (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleApprove(
                                                                                req.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition"
                                                                        title="Approve"
                                                                    >
                                                                        <CheckCircleIcon className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleReject(
                                                                                req.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                                                        title="Reject"
                                                                    >
                                                                        <XCircleIcon className="h-4 w-4" />
                                                                    </button>
                                                                </>
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        req.id
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
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={requests.links}
                                from={requests.from}
                                to={requests.to}
                                total={requests.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}