import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Select from '@/Components/ui/Select';
import {
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Mark({
    auth,
    standards,
    sections,
    students,
    existing,
    filters,
}) {
    const [standardId, setStandardId] = useState(filters?.standard_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [date, setDate] = useState(
        filters?.date || new Date().toISOString().split('T')[0]
    );
    const [attendances, setAttendances] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const initial = {};

        students?.forEach((student) => {
            const existing_record = existing?.[student.id];

            initial[student.id] = {
                student_id: student.id,
                status: existing_record?.status || 'present',
                remark: existing_record?.remark || '',
            };
        });

        setAttendances(initial);
    }, [students, existing]);

    const handleLoad = () => {
        router.get(
            route('attendance.mark'),
            {
                standard_id: standardId,
                section_id: sectionId,
                date,
            },
            {
                preserveState: true,
            }
        );
    };

    const setStatus = (studentId, status) => {
        setAttendances((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
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
            route('attendance.store'),
            {
                date,
                standard_id: standardId,
                section_id: sectionId,
                attendances: Object.values(attendances),
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    const filteredSections = sections.filter(
        (s) => !standardId || s.standard_id == standardId
    );

    const statusStyles = {
        present: {
            active:
                'bg-emerald-600 text-white shadow-sm shadow-emerald-200',
            inactive:
                'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
            icon: CheckCircleIcon,
        },
        absent: {
            active: 'bg-rose-600 text-white shadow-sm shadow-rose-200',
            inactive:
                'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
            icon: XCircleIcon,
        },
        late: {
            active: 'bg-amber-500 text-white shadow-sm shadow-amber-200',
            inactive:
                'border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
            icon: ClockIcon,
        },
        leave: {
            active: 'bg-sky-600 text-white shadow-sm shadow-sky-200',
            inactive:
                'border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
            icon: InformationCircleIcon,
        },
        half_day: {
            active: 'bg-violet-600 text-white shadow-sm shadow-violet-200',
            inactive:
                'border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100',
            icon: ClockIcon,
        },
    };

    const statusLabels = {
        present: 'Present',
        absent: 'Absent',
        late: 'Late',
        leave: 'Leave',
        half_day: 'Half Day',
    };

    const currentStudents = students || [];
    const hasStudents = currentStudents.length > 0;

    const summary = {
        present: Object.values(attendances).filter(
            (a) => a.status === 'present'
        ).length,
        absent: Object.values(attendances).filter(
            (a) => a.status === 'absent'
        ).length,
        late: Object.values(attendances).filter(
            (a) => a.status === 'late'
        ).length,
        leave: Object.values(attendances).filter(
            (a) => a.status === 'leave'
        ).length,
        half_day: Object.values(attendances).filter(
            (a) => a.status === 'half_day'
        ).length,
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Mark Attendance" />

            <div className="space-y-6">
                <PageHeader
                    title="Mark Attendance"
                    subtitle="Select a class and record attendance for every student"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Attendance',
                            href: route('attendance.index'),
                        },
                        { label: 'Mark' },
                    ]}
                />

                {/* Class Selection */}
                <Card className="overflow-hidden">
                    <CardHeader
                        title="Attendance Session"
                        subtitle="Choose the date, standard, and section to load students."
                    />

                    <CardBody className="bg-slate-50/50">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Date
                                </label>

                                <div className="relative">
                                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-lg border-slate-300 bg-white pl-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <Select
                                    label="Standard"
                                    required
                                    value={standardId}
                                    onChange={(e) => {
                                        setStandardId(e.target.value);
                                        setSectionId('');
                                    }}
                                    placeholder="Select Standard"
                                    options={standards.map((s) => ({
                                        value: s.id,
                                        label: `${s.name} (${s.code})`,
                                    }))}
                                />
                            </div>

                            <div>
                                <Select
                                    label="Section"
                                    required
                                    value={sectionId}
                                    onChange={(e) =>
                                        setSectionId(e.target.value)
                                    }
                                    placeholder="Select Section"
                                    options={filteredSections.map((s) => ({
                                        value: s.id,
                                        label: s.name,
                                    }))}
                                    disabled={!standardId}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={handleLoad}
                                    disabled={!standardId || !sectionId}
                                    className="w-full"
                                >
                                    <UserGroupIcon className="mr-2 h-4 w-4" />
                                    Load Students
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {hasStudents && (
                    <>
                        {/* Attendance Summary / Bulk Actions */}
                        <Card className="overflow-hidden">
                            <CardBody>
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                            </div>

                                            <span className="text-sm font-semibold text-slate-900">
                                                Quick Actions
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="mr-1 text-xs font-medium text-slate-500">
                                                Mark all as:
                                            </span>

                                            {Object.entries(statusLabels).map(
                                                ([status, label]) => {
                                                    const Icon =
                                                        statusStyles[status]
                                                            .icon;

                                                    return (
                                                        <button
                                                            key={status}
                                                            onClick={() =>
                                                                setAllStatus(
                                                                    status
                                                                )
                                                            }
                                                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${statusStyles[status].inactive}`}
                                                        >
                                                            <Icon className="h-3.5 w-3.5" />
                                                            {label}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                                            <div className="text-lg font-bold text-emerald-700">
                                                {summary.present}
                                            </div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                                                Present
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-center">
                                            <div className="text-lg font-bold text-rose-700">
                                                {summary.absent}
                                            </div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-rose-600">
                                                Absent
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-center">
                                            <div className="text-lg font-bold text-amber-700">
                                                {summary.late}
                                            </div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                                                Late
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-center">
                                            <div className="text-lg font-bold text-sky-700">
                                                {summary.leave}
                                            </div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-sky-600">
                                                Leave
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-center">
                                            <div className="text-lg font-bold text-violet-700">
                                                {summary.half_day}
                                            </div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-violet-600">
                                                Half Day
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Student List */}
                        <Card className="overflow-hidden">
                            <CardHeader
                                title={`Students (${currentStudents.length})`}
                                subtitle="Select the appropriate attendance status for each student."
                            />

                            <CardBody className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {currentStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className="group flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-indigo-50/30 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
                                        >
                                            <div className="flex min-w-0 flex-1 items-center gap-4">
                                                {student.student_photo ? (
                                                    <img
                                                        src={`/storage/${student.student_photo}`}
                                                        alt={student.first_name}
                                                        className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-white shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700 ring-2 ring-white">
                                                        {student.first_name?.[0]}
                                                        {student.last_name?.[0]}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-900">
                                                        {student.first_name}{' '}
                                                        {student.last_name}
                                                    </div>

                                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                                        <span>
                                                            {
                                                                student.admission_number
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 lg:justify-end">
                                                {Object.entries(
                                                    statusLabels
                                                ).map(
                                                    ([status, label]) => {
                                                        const isActive =
                                                            attendances[
                                                                student.id
                                                            ]?.status ===
                                                            status;

                                                        const Icon =
                                                            statusStyles[
                                                                status
                                                            ].icon;

                                                        return (
                                                            <button
                                                                key={status}
                                                                onClick={() =>
                                                                    setStatus(
                                                                        student.id,
                                                                        status
                                                                    )
                                                                }
                                                                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
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
                                                                <Icon className="h-3.5 w-3.5" />
                                                                {label}
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Submit */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('attendance.index')}
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

                {!hasStudents && standardId && sectionId && (
                    <Card>
                        <CardBody>
                            <div className="py-14 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <UserGroupIcon className="h-7 w-7" />
                                </div>

                                <h3 className="text-sm font-semibold text-slate-900">
                                    No Students Found
                                </h3>

                                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                    No students are currently enrolled in the
                                    selected class.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}