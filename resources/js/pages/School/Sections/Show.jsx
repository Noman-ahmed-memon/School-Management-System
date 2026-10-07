import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    Squares2X2Icon,
    PencilIcon,
    UsersIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, section }) {
    const enrolled = section.student_academic_records?.length || 0;
    const capacity = section.capacity || 0;
    const fillPercent = capacity > 0
        ? Math.round((enrolled / capacity) * 100)
        : 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={section.name} />

            <div className="space-y-6">
                <PageHeader
                    title={section.name}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Sections', href: route('school.sections.index') },
                        { label: section.name },
                    ]}
                    action={
                        <Button href={route('school.sections.edit', section.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Section Information */}
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm lg:col-span-2">
                        <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-7">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200">
                                    <Squares2X2Icon className="h-12 w-12" />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {section.code && (
                                            <code className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-slate-700 shadow-sm">
                                                {section.code}
                                            </code>
                                        )}

                                        <Badge
                                            variant={
                                                section.status === 'active'
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {section.status}
                                        </Badge>
                                    </div>

                                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                        {section.name}
                                    </h2>

                                    {section.standard && (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                            <AcademicCapIcon className="h-4 w-4" />
                                            {section.standard.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6 bg-white p-6">
                            {/* Capacity */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Capacity Utilization
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            Current Enrollment
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <UsersIcon className="h-5 w-5 text-indigo-500" />
                                        <span className="text-sm font-bold text-slate-800">
                                            {enrolled} / {capacity}
                                        </span>
                                    </div>
                                </div>

                                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            fillPercent > 90
                                                ? 'bg-red-500'
                                                : fillPercent > 70
                                                    ? 'bg-amber-500'
                                                    : 'bg-emerald-500'
                                        }`}
                                        style={{
                                            width: `${Math.min(fillPercent, 100)}%`,
                                        }}
                                    />
                                </div>

                                <div className="mt-2 flex justify-between text-xs">
                                    <span className="text-slate-400">
                                        Enrollment utilization
                                    </span>
                                    <span className="font-semibold text-slate-600">
                                        {fillPercent}% filled
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Students */}
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                        <CardHeader
                            title="Enrolled Students"
                            subtitle={`${enrolled} total`}
                        />

                        <CardBody className="p-0">
                            {section.student_academic_records &&
                            section.student_academic_records.length > 0 ? (
                                <div className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
                                    {section.student_academic_records.map((record) => (
                                        <div
                                            key={record.id}
                                            className="group px-6 py-4 transition hover:bg-indigo-50/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                                                    <UsersIcon className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-800">
                                                        {record.student?.first_name}{' '}
                                                        {record.student?.last_name}
                                                    </div>

                                                    <div className="mt-0.5 font-mono text-xs text-slate-400">
                                                        {record.student?.admission_number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <UsersIcon className="mx-auto h-9 w-9 text-slate-300" />
                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No students enrolled yet
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Enrolled students will appear here.
                                    </p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}