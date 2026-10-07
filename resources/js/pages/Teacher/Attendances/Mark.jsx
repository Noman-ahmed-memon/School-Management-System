import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import {
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Mark({ auth, teachers, existing, date: initialDate }) {
    const [date, setDate] = useState(
        initialDate || new Date().toISOString().split('T')[0]
    );
    const [attendances, setAttendances] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const initial = {};

        teachers?.forEach((teacher) => {
            const ex = existing?.[teacher.id];

            initial[teacher.id] = {
                teacher_id: teacher.id,
                status: ex?.status || 'present',
                check_in_time: ex?.check_in_time || '',
                check_out_time: ex?.check_out_time || '',
                remark: ex?.remark || '',
            };
        });

        setAttendances(initial);
    }, [teachers, existing]);

    const handleLoad = () => {
        router.get(
            route('teacher-attendance.mark'),
            { date },
            { preserveState: true }
        );
    };

    const setStatus = (teacherId, status) => {
        setAttendances((prev) => ({
            ...prev,
            [teacherId]: {
                ...prev[teacherId],
                status,
            },
        }));
    };

    const setAllStatus = (status) => {
        const updated = {};

        Object.keys(attendances).forEach((id) => {
            updated[id] = {
                ...attendances[id],
                status,
            };
        });

        setAttendances(updated);
    };

    const handleSubmit = () => {
        setProcessing(true);

        router.post(
            route('teacher-attendance.store'),
            {
                date,
                attendances: Object.values(attendances),
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    const statusStyles = {
        present: {
            active: 'border-emerald-500 bg-emerald-500 text-white shadow-sm',
            inactive:
                'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700',
            icon: CheckCircleIcon,
        },
        absent: {
            active: 'border-rose-500 bg-rose-500 text-white shadow-sm',
            inactive:
                'border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700',
            icon: XCircleIcon,
        },
        late: {
            active: 'border-amber-500 bg-amber-500 text-white shadow-sm',
            inactive:
                'border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700',
            icon: ClockIcon,
        },
        leave: {
            active: 'border-sky-500 bg-sky-500 text-white shadow-sm',
            inactive:
                'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700',
            icon: CalendarDaysIcon,
        },
        early_departure: {
            active: 'border-violet-500 bg-violet-500 text-white shadow-sm',
            inactive:
                'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700',
            icon: ArrowRightStartOnRectangleIcon,
        },
    };

    const statusLabels = {
        present: 'Present',
        absent: 'Absent',
        late: 'Late',
        leave: 'Leave',
        early_departure: 'Early Departure',
    };

    const hasTeachers = teachers && teachers.length > 0;

    const summary = Object.values(attendances).reduce(
        (acc, attendance) => {
            if (acc[attendance.status] !== undefined) {
                acc[attendance.status] += 1;
            }

            return acc;
        },
        {
            present: 0,
            absent: 0,
            late: 0,
            leave: 0,
            early_departure: 0,
        }
    );

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Mark Teacher Attendance" />

            <div className="space-y-7">
                <PageHeader
                    title="Mark Teacher Attendance"
                    subtitle="Record attendance for teaching staff."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Teacher Attendance',
                            href: route('teacher-attendance.index'),
                        },
                        { label: 'Mark' },
                    ]}
                />

                {/* Date Selection */}
                <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                    <CardHeader
                        title="Attendance Date"
                        subtitle="Select the date for which you want to record attendance."
                    />

                    <CardBody>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                            <div className="w-full sm:max-w-xs">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Date
                                </label>

                                <div className="relative">
                                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-lg border-slate-300 bg-white pl-10 text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <Button onClick={handleLoad}>
                                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                                Load Attendance
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {hasTeachers && (
                    <>
                        {/* Quick Actions */}
                        <Card className="overflow-hidden border border-indigo-100 bg-indigo-50/40 shadow-[0_12px_35px_-20px_rgba(79,70,229,0.35)]">
                            <CardBody>
                                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Quick Actions
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Apply one attendance status to every teacher.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(statusLabels).map(
                                            ([status, label]) => {
                                                const Icon =
                                                    statusStyles[status].icon;

                                                return (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        onClick={() =>
                                                            setAllStatus(status)
                                                        }
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {label}
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Summary */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                            {[
                                {
                                    key: 'present',
                                    label: 'Present',
                                    icon: CheckCircleIcon,
                                    wrapper:
                                        'border-emerald-100 bg-emerald-50 text-emerald-700',
                                },
                                {
                                    key: 'absent',
                                    label: 'Absent',
                                    icon: XCircleIcon,
                                    wrapper:
                                        'border-rose-100 bg-rose-50 text-rose-700',
                                },
                                {
                                    key: 'late',
                                    label: 'Late',
                                    icon: ClockIcon,
                                    wrapper:
                                        'border-amber-100 bg-amber-50 text-amber-700',
                                },
                                {
                                    key: 'leave',
                                    label: 'Leave',
                                    icon: CalendarDaysIcon,
                                    wrapper:
                                        'border-sky-100 bg-sky-50 text-sky-700',
                                },
                                {
                                    key: 'early_departure',
                                    label: 'Early',
                                    icon: ArrowRightStartOnRectangleIcon,
                                    wrapper:
                                        'border-violet-100 bg-violet-50 text-violet-700',
                                },
                            ].map(
                                ({
                                    key,
                                    label,
                                    icon: Icon,
                                    wrapper,
                                }) => (
                                    <div
                                        key={key}
                                        className={`rounded-xl border p-4 ${wrapper}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Icon className="h-5 w-5" />
                                            <span className="text-2xl font-bold">
                                                {summary[key]}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide">
                                            {label}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Teacher List */}
                        <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                            <CardHeader
                                title={`Teachers (${teachers.length})`}
                                subtitle="Select the attendance status for each teacher."
                            />

                            <CardBody className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {teachers.map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            className="group px-5 py-5 transition hover:bg-slate-50/70 sm:px-6"
                                        >
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600 ring-4 ring-indigo-50/50">
                                                        {teacher.user?.name
                                                            ?.split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .substring(0, 2)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="truncate text-sm font-semibold text-slate-900">
                                                            {teacher.user?.name}
                                                        </div>

                                                        <div className="mt-0.5 text-xs font-medium text-slate-500">
                                                            {teacher.employee_id}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 lg:justify-end">
                                                    {Object.entries(
                                                        statusLabels
                                                    ).map(
                                                        ([
                                                            status,
                                                            label,
                                                        ]) => {
                                                            const Icon =
                                                                statusStyles[
                                                                    status
                                                                ].icon;

                                                            const isActive =
                                                                attendances[
                                                                    teacher.id
                                                                ]?.status ===
                                                                status;

                                                            return (
                                                                <button
                                                                    key={status}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setStatus(
                                                                            teacher.id,
                                                                            status
                                                                        )
                                                                    }
                                                                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                                                        isActive
                                                                            ? statusStyles[
                                                                                  status
                                                                              ]
                                                                                  .active
                                                                            : statusStyles[
                                                                                  status
                                                                              ]
                                                                                  .inactive
                                                                    }`}
                                                                >
                                                                    <Icon className="h-4 w-4" />
                                                                    {label}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('teacher-attendance.index')}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                {processing
                                    ? 'Saving...'
                                    : 'Save Attendance'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}