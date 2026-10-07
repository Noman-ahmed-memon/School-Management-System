import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    CalendarDaysIcon,
    PencilIcon,
    CheckCircleIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    BanknotesIcon,
    ClockIcon,
    BuildingOffice2Icon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, session }) {
    const formatDate = (date) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const durationDays = () => {
        if (!session.start_date || !session.end_date) return 0;
        const start = new Date(session.start_date);
        const end = new Date(session.end_date);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={session.name} />

            <div className="space-y-7">
                <PageHeader
                    title={session.name}
                    subtitle="Academic session overview and configuration"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Academic Sessions',
                            href: route('school.academic-sessions.index'),
                        },
                        { label: session.name },
                    ]}
                    action={
                        <Button
                            href={route(
                                'school.academic-sessions.edit',
                                session.id
                            )}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Session
                        </Button>
                    }
                />

                {/* Academic Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950" />

                    <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                <CalendarDaysIcon className="h-7 w-7 text-indigo-300" />
                            </div>

                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                    Academic Session
                                </div>
                                <h2 className="mt-1 text-xl font-bold text-white">
                                    {session.name}
                                </h2>
                                <p className="mt-1 text-sm text-slate-300">
                                    {session.campus?.name || 'Campus'} •
                                    Session ID #{session.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Duration
                                </div>
                                <div className="mt-1 text-xl font-bold text-white">
                                    {durationDays()} days
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <Badge
                                        variant={
                                            session.status === 'active'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {session.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Session Details */}
                    <Card className="overflow-hidden border-slate-200 shadow-sm lg:col-span-2">
                        <CardHeader
                            title="Session Details"
                            subtitle="Core information about this academic session"
                        />

                        <CardBody className="space-y-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                                    <CalendarDaysIcon className="h-10 w-10 text-indigo-600" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-lg font-extrabold text-slate-900">
                                        {session.name}
                                    </h3>

                                    {session.campus && (
                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                            <BuildingOffice2Icon className="h-4 w-4 text-slate-400" />
                                            {session.campus.name}
                                        </div>
                                    )}

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <Badge
                                            variant={
                                                session.status === 'active'
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {session.status}
                                        </Badge>

                                        {session.is_current && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                                                <CheckCircleIcon className="h-3.5 w-3.5" />
                                                Current Session
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 md:grid-cols-3">
                                <DetailItem
                                    icon={CalendarDaysIcon}
                                    label="Start Date"
                                    value={formatDate(session.start_date)}
                                />
                                <DetailItem
                                    icon={CalendarDaysIcon}
                                    label="End Date"
                                    value={formatDate(session.end_date)}
                                />
                                <DetailItem
                                    icon={ClockIcon}
                                    label="Duration"
                                    value={`${durationDays()} days`}
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="overflow-hidden border-slate-200 shadow-sm">
                        <CardHeader
                            title="Quick Stats"
                            subtitle="Related records"
                        />

                        <CardBody className="space-y-3">
                            <StatRow
                                icon={UserGroupIcon}
                                label="Enrolled Students"
                                value={
                                    session.student_academic_records_count ??
                                    0
                                }
                                iconClass="bg-indigo-50 text-indigo-600"
                            />

                            <StatRow
                                icon={ClipboardDocumentCheckIcon}
                                label="Exams Scheduled"
                                value={session.exams_count ?? 0}
                                iconClass="bg-sky-50 text-sky-600"
                            />

                            <StatRow
                                icon={BanknotesIcon}
                                label="Fee Structures"
                                value={session.fee_structures_count ?? 0}
                                iconClass="bg-emerald-50 text-emerald-600"
                            />

                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                                <ChartBarIcon className="h-4 w-4 text-slate-400" />
                                <div className="text-xs text-slate-500">
                                    Statistics update as records are added to
                                    this session.
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </div>
            <div className="mt-1.5 text-sm font-bold text-slate-800">
                {value || '—'}
            </div>
        </div>
    );
}

function StatRow({ icon: Icon, label, value, iconClass }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 transition hover:border-indigo-100 hover:bg-indigo-50/30">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
                >
                    <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium text-slate-600">
                    {label}
                </div>
            </div>

            <div className="text-sm font-extrabold text-slate-900">
                {value}
            </div>
        </div>
    );
}