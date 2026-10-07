import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    AcademicCapIcon,
    CalendarDaysIcon,
    UserCircleIcon,
    PencilIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, scholarship }) {
    const isActive = scholarship.status === 'active';

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={scholarship.name} />

            <div className="mx-auto max-w-4xl space-y-6">
                <PageHeader
                    title={scholarship.name}
                    subtitle="Scholarship details and student financial aid information"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Scholarships',
                            href: route('scholarships.index'),
                        },
                        { label: scholarship.name },
                    ]}
                    action={
                        <Button
                            href={route(
                                'scholarships.edit',
                                scholarship.id
                            )}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Scholarship
                        </Button>
                    }
                />

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 shadow-xl shadow-indigo-100 sm:p-8">
                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-indigo-300/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
                                <AcademicCapIcon className="h-7 w-7" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                    Student Financial Aid
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-white">
                                    {scholarship.name}
                                </h2>

                                <p className="mt-1 text-sm text-indigo-100">
                                    {scholarship.type === 'percentage'
                                        ? `${Number(scholarship.amount)}% fee concession`
                                        : `Rs. ${Number(
                                              scholarship.amount
                                          ).toLocaleString()} fixed concession`}
                                </p>
                            </div>
                        </div>

                        <div>
                            <Badge
                                variant={
                                    isActive ? 'success' : 'danger'
                                }
                            >
                                {isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <AcademicCapIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Scholarship Information
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Financial aid configuration
                                </p>
                            </div>
                        </div>
                    </div>

                    <CardBody className="space-y-6">
                        {/* Student */}
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                    <UserCircleIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                        Student
                                    </p>

                                    <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
                                        {scholarship.student?.first_name}{' '}
                                        {scholarship.student?.last_name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {
                                            scholarship.student
                                                ?.admission_number
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main values */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <DetailCard
                                icon={CurrencyDollarIcon}
                                label="Scholarship Value"
                                value={
                                    scholarship.type === 'percentage'
                                        ? `${Number(
                                              scholarship.amount
                                          )}%`
                                        : `Rs. ${Number(
                                              scholarship.amount
                                          ).toLocaleString()}`
                                }
                                accent="indigo"
                            />

                            <DetailCard
                                icon={CalendarDaysIcon}
                                label="Start Date"
                                value={scholarship.start_date}
                                accent="slate"
                            />

                            <DetailCard
                                icon={CalendarDaysIcon}
                                label="End Date"
                                value={scholarship.end_date}
                                accent="slate"
                            />
                        </div>

                        {/* Type and status */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Scholarship Type
                                </p>

                                <div className="mt-3">
                                    {scholarship.type ===
                                    'percentage' ? (
                                        <Badge variant="info">
                                            Percentage
                                        </Badge>
                                    ) : (
                                        <Badge variant="warning">
                                            Fixed Amount
                                        </Badge>
                                    )}
                                </div>

                                <p className="mt-3 text-xs leading-5 text-slate-500">
                                    {scholarship.type === 'percentage'
                                        ? 'The scholarship reduces eligible fees by a percentage.'
                                        : 'The scholarship provides a fixed monetary concession.'}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Current Status
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    {isActive ? (
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                    ) : (
                                        <ClockIcon className="h-5 w-5 text-rose-500" />
                                    )}

                                    <Badge
                                        variant={
                                            isActive
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {isActive
                                            ? 'Active'
                                            : 'Inactive'}
                                    </Badge>
                                </div>

                                <p className="mt-3 text-xs leading-5 text-slate-500">
                                    {isActive
                                        ? 'This scholarship is currently enabled for the student.'
                                        : 'This scholarship is currently inactive.'}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

function DetailCard({
    icon: Icon,
    label,
    value,
    accent = 'indigo',
}) {
    const styles = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        slate: 'bg-slate-50 text-slate-600 border-slate-200',
    };

    return (
        <div
            className={`rounded-xl border p-5 ${styles[accent]}`}
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/80">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
                {value || '—'}
            </p>
        </div>
    );
}