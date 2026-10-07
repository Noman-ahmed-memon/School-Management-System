import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    PrinterIcon,
    AcademicCapIcon,
    TrophyIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

export default function ReportCard({
    auth,
    student,
    exam,
    results,
    summary,
}) {
    const handlePrint = () => {
        window.print();
    };

    const getGradeColor = (grade) => {
        if (!grade) return 'default';
        if (['A+', 'A'].includes(grade)) return 'success';
        if (['B+', 'B'].includes(grade)) return 'info';
        if (['C+', 'C'].includes(grade)) return 'warning';
        if (grade === 'D') return 'warning';
        return 'danger';
    };

    const getInitials = () => {
        return `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase();
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head
                title={`Report Card - ${student.first_name} ${student.last_name}`}
            />

            <div className="space-y-7">

                <PageHeader
                    title="Report Card"
                    subtitle={`${student.first_name} ${student.last_name} — ${exam.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        {
                            label: exam.name,
                            href: route('exams.show', exam.id),
                        },
                        {
                            label: 'Results',
                            href: route('results.show', exam.id),
                        },
                        { label: 'Report Card' },
                    ]}
                    action={
                        <div className="flex gap-2 print:hidden">
                            <Button
                                variant="outline"
                                href={route('results.show', exam.id)}
                            >
                                Back
                            </Button>

                            <Button onClick={handlePrint}>
                                <PrinterIcon className="mr-2 h-4 w-4" />
                                Print Report
                            </Button>
                        </div>
                    }
                />

                {/* Document */}
                <div className="mx-auto max-w-5xl print:max-w-none">
                    <Card className="overflow-hidden border-slate-200 shadow-xl print:border-0 print:shadow-none">

                        {/* Premium School Header */}
                        <div className="relative overflow-hidden bg-slate-950 px-6 py-8 md:px-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />

                            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                        <AcademicCapIcon className="h-9 w-9 text-indigo-300" />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-extrabold tracking-tight text-white">
                                            {student.campus?.school?.name ||
                                                'School Name'}
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-300">
                                            {student.campus?.name || 'Campus'}
                                        </p>

                                        <div className="mt-3 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                                            Official Academic Record
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:text-right">
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                        Report Card
                                    </div>

                                    <div className="mt-2 text-sm font-semibold text-white">
                                        {exam.exam_type?.name}
                                    </div>

                                    <div className="mt-1 text-xs text-slate-400">
                                        {exam.academic_session?.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student Profile */}
                        <CardBody className="border-b border-slate-100">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_220px]">
                                <div className="flex items-start gap-4">
                                    {student.student_photo ? (
                                        <img
                                            src={`/storage/${student.student_photo}`}
                                            alt={student.first_name}
                                            className="h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-100"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-extrabold text-indigo-600 ring-1 ring-indigo-100">
                                            {getInitials()}
                                        </div>
                                    )}

                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Student
                                        </div>

                                        <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                                            {student.first_name}{' '}
                                            {student.last_name}
                                        </h2>

                                        <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1 text-sm text-slate-500 sm:grid-cols-3">
                                            <div>
                                                Admission #
                                                <span className="ml-1 font-semibold text-slate-800">
                                                    {student.admission_number}
                                                </span>
                                            </div>

                                            {student.roll_number && (
                                                <div>
                                                    Roll #
                                                    <span className="ml-1 font-semibold text-slate-800">
                                                        {student.roll_number}
                                                    </span>
                                                </div>
                                            )}

                                            <div>
                                                Standard
                                                <span className="ml-1 font-semibold text-slate-800">
                                                    {exam.standard?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {summary && (
                                    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center">
                                        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-indigo-200/30" />

                                        <div className="relative">
                                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                                                Final Grade
                                            </div>

                                            <div className="my-1 text-5xl font-black tracking-tight text-indigo-700">
                                                {summary.grade}
                                            </div>

                                            <div className="text-xs font-medium text-slate-500">
                                                GPA: {summary.gpa || '—'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>

                        {/* Marks */}
                        <CardBody>
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                                        Academic Performance
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Subject-wise examination performance
                                    </p>
                                </div>

                                {summary && (
                                    <div className="hidden items-center gap-2 sm:flex">
                                        {summary.is_passed ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                                                <CheckCircleIcon className="h-4 w-4" />
                                                Passed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                                <XCircleIcon className="h-4 w-4" />
                                                Failed
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Subject
                                            </th>
                                            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Total
                                            </th>
                                            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Obtained
                                            </th>
                                            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Percentage
                                            </th>
                                            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Grade
                                            </th>
                                            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Result
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {results.map((result) => (
                                            <tr
                                                key={result.id}
                                                className="hover:bg-slate-50/60"
                                            >
                                                <td className="px-4 py-3 text-sm font-bold text-slate-800">
                                                    {result.subject?.name}
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm text-slate-500">
                                                    {result.total_marks}
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm font-extrabold text-slate-900">
                                                    {result.marks_obtained}
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                                    {Number(result.percentage).toFixed(1)}%
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant={getGradeColor(
                                                            result.grade
                                                        )}
                                                    >
                                                        {result.grade}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    {result.is_passed ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                                                            <CheckCircleIcon className="h-4 w-4" />
                                                            PASS
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                                                            <XCircleIcon className="h-4 w-4" />
                                                            FAIL
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    {summary && (
                                        <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-extrabold text-slate-900">
                                                    Total
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm font-bold text-slate-900">
                                                    {summary.total_marks}
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm font-black text-slate-900">
                                                    {summary.total_marks_obtained}
                                                </td>

                                                <td className="px-4 py-3 text-center text-sm font-bold text-slate-900">
                                                    {Number(summary.percentage).toFixed(1)}%
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant={getGradeColor(
                                                            summary.grade
                                                        )}
                                                    >
                                                        {summary.grade}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    {summary.is_passed ? (
                                                        <span className="text-xs font-bold text-emerald-600">
                                                            PASS
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-red-600">
                                                            FAIL
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </CardBody>

                        {/* Summary */}
                        {summary && (
                            <CardBody className="border-t border-slate-100 bg-slate-50/40">
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    <SummaryBox
                                        label="Total Marks"
                                        value={`${summary.total_marks_obtained} / ${summary.total_marks}`}
                                    />

                                    <SummaryBox
                                        label="Percentage"
                                        value={`${Number(summary.percentage).toFixed(2)}%`}
                                    />

                                    <SummaryBox
                                        label="Position"
                                        value={
                                            summary.position
                                                ? `#${summary.position}`
                                                : '—'
                                        }
                                    />

                                    <SummaryBox
                                        label="Final Result"
                                        value={
                                            summary.is_passed
                                                ? 'PASSED'
                                                : 'FAILED'
                                        }
                                        valueClass={
                                            summary.is_passed
                                                ? 'text-emerald-600'
                                                : 'text-red-600'
                                        }
                                    />
                                </div>

                                {summary.remark && (
                                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                            Academic Remarks
                                        </div>
                                        <div className="mt-1 text-sm text-slate-700">
                                            {summary.remark}
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                        )}

                        {/* Signature */}
                        <div className="border-t border-slate-200 px-6 pb-8 pt-8 md:px-10">
                            <div className="grid grid-cols-2 gap-10 text-center text-xs text-slate-500">
                                <div>
                                    <div className="mx-auto mt-8 max-w-xs border-t border-slate-400 pt-2 font-medium">
                                        Class Teacher Signature
                                    </div>
                                </div>

                                <div>
                                    <div className="mx-auto mt-8 max-w-xs border-t border-slate-400 pt-2 font-medium">
                                        Principal Signature
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center text-[10px] uppercase tracking-[0.18em] text-slate-300">
                                Official Academic Document
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                @media print {
                    @page {
                        margin: 1cm;
                    }

                    body {
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    nav,
                    aside,
                    header {
                        display: none !important;
                    }

                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}

function SummaryBox({ label, value, valueClass = 'text-slate-900' }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {label}
            </div>
            <div className={`mt-1 text-xl font-black ${valueClass}`}>
                {value}
            </div>
        </div>
    );
}