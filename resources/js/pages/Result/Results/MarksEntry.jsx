import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    BookOpenIcon,
    CheckCircleIcon,
    XCircleIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function MarksEntry({
    auth,
    exam,
    students,
    subjects,
    existing,
}) {
    const [marks, setMarks] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const initial = {};

        students?.forEach((student) => {
            initial[student.id] = {};

            subjects?.forEach((subject) => {
                const ex = existing?.[student.id]?.[subject.id];

                initial[student.id][subject.id] = {
                    student_id: student.id,
                    subject_id: subject.id,
                    marks_obtained: ex?.marks_obtained ?? '',
                };
            });
        });

        setMarks(initial);
    }, [students, subjects, existing]);

    const handleChange = (studentId, subjectId, value) => {
        setMarks((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [subjectId]: {
                    student_id: studentId,
                    subject_id: subjectId,
                    marks_obtained: value,
                },
            },
        }));
    };

    const handleSubmit = () => {
        const flatResults = [];

        Object.values(marks).forEach((studentMarks) => {
            Object.values(studentMarks).forEach((m) => {
                if (
                    m.marks_obtained !== '' &&
                    m.marks_obtained !== null
                ) {
                    flatResults.push({
                        student_id: m.student_id,
                        subject_id: m.subject_id,
                        marks_obtained: Number(m.marks_obtained),
                    });
                }
            });
        });

        if (flatResults.length === 0) {
            alert('Please enter at least one mark.');
            return;
        }

        setProcessing(true);

        router.post(
            route('results.save-marks', exam.id),
            {
                results: flatResults,
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    const getCellColor = (value) => {
        if (value === '' || value === null) {
            return 'border-slate-200 bg-white';
        }

        const num = Number(value);

        if (num >= exam.passing_marks) {
            return 'border-emerald-300 bg-emerald-50 text-emerald-800';
        }

        return 'border-red-300 bg-red-50 text-red-800';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Enter Marks - ${exam.name}`} />

            <div className="space-y-7">

                <PageHeader
                    title={`Enter Marks — ${exam.name}`}
                    subtitle={`Total marks per subject: ${exam.total_marks} • Passing: ${exam.passing_marks}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        {
                            label: exam.name,
                            href: route('exams.show', exam.id),
                        },
                        { label: 'Marks Entry' },
                    ]}
                    action={
                        <Button
                            variant="outline"
                            href={route('exams.show', exam.id)}
                        >
                            Back to Exam
                        </Button>
                    }
                />

                {/* Academic Control Header */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950" />

                    <div className="relative px-6 py-7 md:px-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                    <ClipboardDocumentCheckIcon className="h-7 w-7 text-indigo-300" />
                                </div>

                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                        Examination Workspace
                                    </div>

                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        Marks Entry Console
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-300">
                                        Enter and review marks across all enrolled students.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Students
                                    </div>
                                    <div className="mt-1 text-xl font-bold text-white">
                                        {students?.length || 0}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Subjects
                                    </div>
                                    <div className="mt-1 text-xl font-bold text-white">
                                        {subjects?.length || 0}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                                        Passing
                                    </div>
                                    <div className="mt-1 text-xl font-bold text-indigo-200">
                                        {exam.passing_marks}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exam Information */}
                <Card className="border-slate-200 shadow-sm">
                    <CardBody>
                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                            <InfoItem
                                icon={<BookOpenIcon />}
                                label="Standard"
                                value={exam.standard?.name}
                            />

                            <InfoItem
                                icon={<UserGroupIcon />}
                                label="Students"
                                value={students?.length || 0}
                            />

                            <InfoItem
                                icon={<ClipboardDocumentCheckIcon />}
                                label="Subjects"
                                value={subjects?.length || 0}
                            />

                            <div>
                                <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </div>
                                <Badge
                                    variant={
                                        exam.status === 'completed'
                                            ? 'success'
                                            : 'info'
                                    }
                                >
                                    {exam.status}
                                </Badge>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Empty states */}
                {students?.length === 0 ? (
                    <Card>
                        <CardBody>
                            <div className="py-14 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                                    <UserGroupIcon className="h-8 w-8 text-indigo-500" />
                                </div>
                                <h3 className="font-bold text-slate-800">
                                    No students enrolled
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    No students are currently enrolled in this exam's standard.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ) : subjects?.length === 0 ? (
                    <Card>
                        <CardBody>
                            <div className="py-14 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                                    <BookOpenIcon className="h-8 w-8 text-indigo-500" />
                                </div>
                                <h3 className="font-bold text-slate-800">
                                    No subjects assigned
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    No subjects are assigned to this standard.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="overflow-hidden border-slate-200 shadow-sm">
                        <CardHeader
                            title="Marks Entry"
                            subtitle="Enter marks for each subject. Cells automatically indicate pass or fail status."
                        />

                        <CardBody className="p-0 overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="sticky left-0 z-20 min-w-[240px] border-r border-slate-200 bg-slate-50 px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            Student
                                        </th>

                                        {subjects.map((subject) => (
                                            <th
                                                key={subject.id}
                                                className="min-w-[135px] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500"
                                            >
                                                <div className="text-slate-700">
                                                    {subject.name}
                                                </div>
                                                <div className="mt-1 text-[10px] font-medium normal-case text-slate-400">
                                                    Maximum {exam.total_marks}
                                                </div>
                                            </th>
                                        ))}

                                        <th className="min-w-[120px] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {students.map((student) => {
                                        let totalObtained = 0;
                                        let totalSubjects = 0;

                                        subjects.forEach((subject) => {
                                            const m =
                                                marks[student.id]?.[subject.id]
                                                    ?.marks_obtained;

                                            if (
                                                m !== '' &&
                                                m !== null &&
                                                m !== undefined
                                            ) {
                                                totalObtained += Number(m);
                                                totalSubjects++;
                                            }
                                        });

                                        return (
                                            <tr
                                                key={student.id}
                                                className="group hover:bg-slate-50/70"
                                            >
                                                <td className="sticky left-0 z-10 border-r border-slate-100 bg-white px-5 py-3 group-hover:bg-slate-50/70">
                                                    <div className="flex items-center gap-3">
                                                        {student.student_photo ? (
                                                            <img
                                                                src={`/storage/${student.student_photo}`}
                                                                alt={student.first_name}
                                                                className="h-9 w-9 rounded-xl object-cover ring-2 ring-slate-100"
                                                            />
                                                        ) : (
                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                                                                {student.first_name?.[0]}
                                                                {student.last_name?.[0]}
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-bold text-slate-800">
                                                                {student.first_name}{' '}
                                                                {student.last_name}
                                                            </div>
                                                            <div className="mt-0.5 text-xs text-slate-400">
                                                                {student.admission_number}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {subjects.map((subject) => {
                                                    const value =
                                                        marks[student.id]?.[
                                                            subject.id
                                                        ]?.marks_obtained ?? '';

                                                    return (
                                                        <td
                                                            key={subject.id}
                                                            className="px-2 py-2"
                                                        >
                                                            <div className="relative">
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max={exam.total_marks}
                                                                    value={value}
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            student.id,
                                                                            subject.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className={`w-full rounded-xl border py-2.5 text-center text-sm font-semibold shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 ${getCellColor(
                                                                        value
                                                                    )}`}
                                                                    placeholder="—"
                                                                />

                                                                {value !== '' &&
                                                                    value !== null && (
                                                                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                                                                            {Number(value) >=
                                                                            exam.passing_marks ? (
                                                                                <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                                                                            ) : (
                                                                                <XCircleIcon className="h-4 w-4 text-red-500" />
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}

                                                <td className="px-4 py-3 text-center">
                                                    <div className="text-sm font-extrabold text-slate-800">
                                                        {totalObtained}
                                                    </div>
                                                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                                        of{' '}
                                                        {totalSubjects *
                                                            exam.total_marks}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                )}

                {/* Save */}
                {students?.length > 0 && subjects?.length > 0 && (
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="hidden items-center gap-3 sm:flex">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <div className="text-sm font-semibold text-slate-700">
                                    Ready to save results?
                                </div>
                                <div className="text-xs text-slate-400">
                                    Entered marks will be processed for all students.
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto flex gap-3">
                            <Button
                                variant="outline"
                                href={route('exams.show', exam.id)}
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
                                    : 'Save All Marks'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="h-4 w-4 text-indigo-500">
                    {icon}
                </span>
                {label}
            </div>
            <div className="text-sm font-bold text-slate-800">
                {value || '—'}
            </div>
        </div>
    );
}