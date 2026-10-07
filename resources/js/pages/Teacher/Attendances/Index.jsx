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
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    FunnelIcon,
    ClockIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, attendances, teachers, filters }) {
    const [date, setDate] = useState(
        filters?.date || new Date().toISOString().split('T')[0]
    );
    const [teacherId, setTeacherId] = useState(filters?.teacher_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleFilter = () => {
        router.get(
            route('teacher-attendance.index'),
            {
                date,
                teacher_id: teacherId,
                status,
            },
            {
                preserveState: true,
            }
        );
    };

    const handleClear = () => {
        setDate(new Date().toISOString().split('T')[0]);
        setTeacherId('');
        setStatus('');
        router.get(route('teacher-attendance.index'));
    };

    const getStatusVariant = (status) => {
        const map = {
            present: 'success',
            absent: 'danger',
            late: 'warning',
            leave: 'info',
            early_departure: 'primary',
        };

        return map[status] || 'default';
    };

    const formatStatus = (value) => {
        if (!value) return '—';

        return value
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Teacher Attendance" />

            <div className="space-y-7">
                <PageHeader
                    title="Teacher Attendance"
                    subtitle="Monitor daily attendance, check-in activity, and staff presence."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Teacher Attendance' },
                    ]}
                    action={
                        <Button href={route('teacher-attendance.mark')}>
                            <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2" />
                            Mark Attendance
                        </Button>
                    }
                />

                {/* Filters */}
                <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                    <div className="border-b border-slate-200/80 bg-slate-50/70 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <FunnelIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Attendance Filters
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Refine attendance records by date, teacher, or status.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1.5fr_1fr_auto_auto] xl:items-end">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Teacher
                                </label>
                                <select
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Teachers</option>
                                    {teachers.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                    <option value="leave">Leave</option>
                                    <option value="early_departure">
                                        Early Departure
                                    </option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={handleFilter}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Filter
                            </button>

                            {(teacherId || status) && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Attendance Records */}
                <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                    {attendances.data.length === 0 ? (
                        <EmptyState
                            icon={<CalendarIcon />}
                            title="No attendance records found"
                            description="Start by marking teacher attendance for the selected date."
                            action={
                                <Button href={route('teacher-attendance.mark')}>
                                    <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                    Mark Attendance
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="border-b border-slate-200/80 bg-white px-5 py-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Attendance Records
                                        </h2>
                                        <p className="mt-0.5 text-sm text-slate-500">
                                            Teacher attendance for the selected criteria.
                                        </p>
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
                                        <CheckCircleIcon className="h-4 w-4" />
                                        {attendances.total} Records
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Teacher
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Date
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Check In
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Check Out
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Remark
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {attendances.data.map((att) => (
                                            <tr
                                                key={att.id}
                                                className="group transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                            <UserGroupIcon className="h-5 w-5" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {att.teacher?.user?.name}
                                                            </div>
                                                            <div className="mt-0.5 text-xs font-medium text-slate-500">
                                                                {att.teacher?.employee_id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-600">
                                                    {att.date?.split('T')[0]}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                                                        <ClockIcon className="h-4 w-4 text-slate-400" />
                                                        {att.check_in_time || '—'}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                                                        <ClockIcon className="h-4 w-4 text-slate-400" />
                                                        {att.check_out_time || '—'}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(att.status)}>
                                                        {formatStatus(att.status)}
                                                    </Badge>
                                                </td>

                                                <td className="max-w-xs px-6 py-4 text-sm text-slate-500">
                                                    {att.remark || '—'}
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