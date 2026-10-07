import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import EmptyState from '@/Components/ui/EmptyState';
import {
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    FunnelIcon,
    ArrowPathIcon,
    AcademicCapIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, attendances, standards, filters }) {
    const [date, setDate] = useState(
        filters?.date || new Date().toISOString().split('T')[0]
    );
    const [standardId, setStandardId] = useState(filters?.standard_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleFilter = () => {
        router.get(
            route('attendance.index'),
            {
                date,
                standard_id: standardId,
                status,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setDate(new Date().toISOString().split('T')[0]);
        setStandardId('');
        setStatus('');
        router.get(route('attendance.index'));
    };

    const getStatusVariant = (status) => {
        const map = {
            present: 'success',
            absent: 'danger',
            late: 'warning',
            leave: 'info',
            half_day: 'primary',
        };

        return map[status] || 'default';
    };

    const formatStatus = (value) => {
        return value?.replace('_', ' ');
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Student Attendance" />

            <div className="space-y-6">
                <PageHeader
                    title="Student Attendance"
                    subtitle="View and manage daily attendance records"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Attendance' },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                href={route('attendance.report')}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Report
                            </Button>

                            <Button href={route('attendance.mark')}>
                                <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                Mark Attendance
                            </Button>
                        </div>
                    }
                />

                <Card className="overflow-hidden">
                    {/* Filter Header */}
                    <div className="border-b border-slate-200/80 bg-slate-50/70 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <FunnelIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Attendance Filters
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Narrow the attendance records by date, class, or status.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                            <div className="md:col-span-3">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="md:col-span-4">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Standard
                                </label>

                                <select
                                    value={standardId}
                                    onChange={(e) => setStandardId(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Standards</option>

                                    {standards.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-3">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                    <option value="leave">Leave</option>
                                    <option value="half_day">Half Day</option>
                                </select>
                            </div>

                            <div className="flex items-end gap-2 md:col-span-2">
                                <button
                                    onClick={handleFilter}
                                    className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <FunnelIcon className="mr-2 h-4 w-4" />
                                    Filter
                                </button>

                                {(standardId || status) && (
                                    <button
                                        onClick={handleClear}
                                        aria-label="Clear attendance filters"
                                        title="Clear filters"
                                        className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-slate-600 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <ArrowPathIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {attendances.data.length === 0 ? (
                        <EmptyState
                            icon={<CalendarIcon />}
                            title="No attendance records found"
                            description="Start by marking attendance for a class."
                            action={
                                <Button href={route('attendance.mark')}>
                                    <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                    Mark Attendance
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50/90">
                                        <tr>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Student
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Class
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Date
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Marked By
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Remark
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {attendances.data.map((att) => (
                                            <tr
                                                key={att.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                            <UserIcon className="h-4 w-4" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {att.student?.first_name}{' '}
                                                                {att.student?.last_name}
                                                            </div>

                                                            <div className="mt-0.5 text-xs text-slate-500">
                                                                {att.student?.admission_number}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <AcademicCapIcon className="h-4 w-4 text-slate-400" />

                                                        <span className="text-sm font-medium text-slate-700">
                                                            {att.standard?.name}
                                                            {att.section?.name &&
                                                                ` - ${att.section.name}`}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                                    {att.date?.split('T')[0]}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(att.status)}>
                                                        {formatStatus(att.status)}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {att.marked_by_user?.name || '—'}
                                                </td>

                                                <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                                                    <span className="line-clamp-2">
                                                        {att.remark || '—'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={attendances.links}
                                from={attendances.from}
                                to={attendances.to}
                                total={attendances.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}