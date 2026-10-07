import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import EmptyState from '@/Components/ui/EmptyState';
import {
    TrophyIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClipboardDocumentCheckIcon,
    DocumentArrowDownIcon,
    AcademicCapIcon,
    UserGroupIcon,
    ChartBarIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, exam, summaries }) {
    const handlePublish = () => {
        if (
            confirm(
                'Publish these results? Students and parents will be able to view them.'
            )
        ) {
            router.post(route('results.publish', exam.id));
        }
    };

    const getGradeColor = (grade) => {
        if (!grade) return 'default';
        if (['A+', 'A'].includes(grade)) return 'success';
        if (['B+', 'B'].includes(grade)) return 'info';
        if (['C+', 'C'].includes(grade)) return 'warning';
        if (grade === 'D') return 'warning';
        return 'danger';
    };

    const totalStudents = summaries?.length || 0;
    const passed = summaries?.filter((s) => s.is_passed).length || 0;
    const failed = totalStudents - passed;

    const average =
        totalStudents > 0
            ? (
                  summaries.reduce(
                      (acc, s) => acc + Number(s.percentage || 0),
                      0
                  ) / totalStudents
              ).toFixed(1)
            : '0.0';

    const passRate =
        totalStudents > 0
            ? ((passed / totalStudents) * 100).toFixed(1)
            : '0.0';

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Results - ${exam.name}`} />

            <div className="space-y-7">

                <PageHeader
                    title={`Results — ${exam.name}`}
                    subtitle={`${exam.standard?.name} • ${exam.exam_type?.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        {
                            label: exam.name,
                            href: route('exams.show', exam.id),
                        },
                        { label: 'Results' },
                    ]}
                    action={
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                href={route(
                                    'results.marks-entry',
                                    exam.id
                                )}
                            >
                                <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                Edit Marks
                            </Button>

                            {exam.status !== 'completed' &&
                                summaries?.length > 0 && (
                                    <Button onClick={handlePublish}>
                                        <TrophyIcon className="mr-2 h-4 w-4" />
                                        Publish Results
                                    </Button>
                                )}
                        </div>
                    }
                />

                {/* Premium Exam Header */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />

                    <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative px-6 py-7 md:px-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                    <TrophyIcon className="h-7 w-7 text-indigo-300" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                            Examination Results
                                        </span>
                                        <SparklesIcon className="h-4 w-4 text-indigo-300" />
                                    </div>

                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        {exam.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-300">
                                        {exam.standard?.name} •{' '}
                                        {exam.academic_session?.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-sm font-bold capitalize text-indigo-200">
                                            {exam.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Pass Rate
                                    </div>
                                    <div className="mt-1 text-xl font-bold text-emerald-300">
                                        {passRate}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                {summaries?.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <StatCard
                            icon={<UserGroupIcon />}
                            label="Total Students"
                            value={totalStudents}
                            description="Students with results"
                            iconClass="bg-indigo-50 text-indigo-600"
                        />

                        <StatCard
                            icon={<CheckCircleIcon />}
                            label="Passed"
                            value={passed}
                            description={`${passRate}% pass rate`}
                            iconClass="bg-emerald-50 text-emerald-600"
                            valueClass="text-emerald-600"
                        />

                        <StatCard
                            icon={<XCircleIcon />}
                            label="Failed"
                            value={failed}
                            description="Needs attention"
                            iconClass="bg-red-50 text-red-600"
                            valueClass="text-red-600"
                        />

                        <StatCard
                            icon={<ChartBarIcon />}
                            label="Class Average"
                            value={`${average}%`}
                            description="Average percentage"
                            iconClass="bg-blue-50 text-blue-600"
                        />
                    </div>
                )}

                {/* Results */}
                {summaries?.length === 0 ? (
                    <Card className="border-slate-200 shadow-sm">
                        <EmptyState
                            icon={<TrophyIcon />}
                            title="No results yet"
                            description="Enter marks for students to generate academic results."
                            action={
                                <Button
                                    href={route(
                                        'results.marks-entry',
                                        exam.id
                                    )}
                                >
                                    <ClipboardDocumentCheckIcon className="mr-2 h-4 w-4" />
                                    Enter Marks
                                </Button>
                            }
                        />
                    </Card>
                ) : (
                    <Card className="overflow-hidden border-slate-200 shadow-sm">
                        <CardHeader
                            title="Student Results"
                            subtitle={`${summaries.length} students • Ranked academic performance`}
                        />

                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Position
                                            </th>

                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Student
                                            </th>

                                            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Marks
                                            </th>

                                            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Percentage
                                            </th>

                                            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Grade
                                            </th>

                                            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                GPA
                                            </th>

                                            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Result
                                            </th>

                                            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {summaries.map((summary, index) => {
                                            const isFirst =
                                                index === 0 ||
                                                summary.position === 1;

                                            return (
                                                <tr
                                                    key={summary.id}
                                                    className="group transition-colors hover:bg-indigo-50/30"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {isFirst ? (
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                                                                    <TrophyIcon className="h-4 w-4 text-amber-500" />
                                                                </div>
                                                            ) : (
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-xs font-bold text-slate-500">
                                                                    {index + 1}
                                                                </div>
                                                            )}

                                                            <span
                                                                className={`text-sm font-extrabold ${
                                                                    isFirst
                                                                        ? 'text-amber-600'
                                                                        : 'text-slate-700'
                                                                }`}
                                                            >
                                                                #
                                                                {summary.position ||
                                                                    index + 1}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                                                                {
                                                                    summary
                                                                        .student
                                                                        ?.first_name?.[0]
                                                                }
                                                                {
                                                                    summary
                                                                        .student
                                                                        ?.last_name?.[0]
                                                                }
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="truncate text-sm font-bold text-slate-800">
                                                                    {
                                                                        summary
                                                                            .student
                                                                            ?.first_name
                                                                    }{' '}
                                                                    {
                                                                        summary
                                                                            .student
                                                                            ?.last_name
                                                                    }
                                                                </div>

                                                                <div className="mt-0.5 text-xs text-slate-400">
                                                                    {
                                                                        summary
                                                                            .student
                                                                            ?.admission_number
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm font-bold text-slate-800">
                                                            {
                                                                summary.total_marks_obtained
                                                            }
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            {' '}
                                                            /{' '}
                                                            {
                                                                summary.total_marks
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        <div className="text-sm font-extrabold text-slate-800">
                                                            {Number(
                                                                summary.percentage
                                                            ).toFixed(1)}
                                                            %
                                                        </div>

                                                        <div className="mx-auto mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                                                            <div
                                                                className="h-full rounded-full bg-indigo-500"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        Number(
                                                                            summary.percentage
                                                                        ),
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        <Badge
                                                            variant={getGradeColor(
                                                                summary.grade
                                                            )}
                                                        >
                                                            {summary.grade ||
                                                                '—'}
                                                        </Badge>
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm font-bold text-slate-600">
                                                            {summary.gpa ||
                                                                '—'}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        {summary.is_passed ? (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                                                <CheckCircleIcon className="h-4 w-4" />
                                                                Pass
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
                                                                <XCircleIcon className="h-4 w-4" />
                                                                Fail
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href={route(
                                                                'results.report-card',
                                                                [
                                                                    summary.student_id,
                                                                    exam.id,
                                                                ]
                                                            )}
                                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-800"
                                                        >
                                                            <DocumentArrowDownIcon className="h-4 w-4" />
                                                            Report Card
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({
    icon,
    label,
    value,
    description,
    iconClass,
    valueClass = 'text-slate-900',
}) {
    return (
        <Card className="group border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {label}
                        </div>

                        <div
                            className={`mt-2 text-2xl font-black tracking-tight ${valueClass}`}
                        >
                            {value}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                            {description}
                        </div>
                    </div>

                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
                    >
                        <span className="h-5 w-5">{icon}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}