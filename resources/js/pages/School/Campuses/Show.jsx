import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BuildingStorefrontIcon,
    PencilIcon,
    PhoneIcon,
    MapPinIcon,
    UsersIcon,
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, campus, stats }) {
    const statCards = [
        {
            label: 'Students',
            value: stats?.students ?? 0,
            icon: UsersIcon,
            iconStyle: 'bg-blue-50 text-blue-600 ring-blue-100',
        },
        {
            label: 'Teachers',
            value: stats?.teachers ?? 0,
            icon: UserGroupIcon,
            iconStyle: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
        },
        {
            label: 'Standards',
            value: stats?.standards ?? 0,
            icon: AcademicCapIcon,
            iconStyle: 'bg-violet-50 text-violet-600 ring-violet-100',
        },
        {
            label: 'Subjects',
            value: stats?.subjects ?? 0,
            icon: BookOpenIcon,
            iconStyle: 'bg-amber-50 text-amber-600 ring-amber-100',
        },
    ];

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={campus.name} />

            <div className="space-y-7">
                <PageHeader
                    title={campus.name}
                    subtitle="Campus overview and academic activity"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Campuses',
                            href: route('school.campuses.index'),
                        },
                        { label: campus.name },
                    ]}
                    action={
                        <Button
                            href={route(
                                'school.campuses.edit',
                                campus.id
                            )}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Campus
                        </Button>
                    }
                />

                {/* Campus Hero */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-6 shadow-xl shadow-indigo-100">
                    <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-violet-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                                <BuildingStorefrontIcon className="h-8 w-8 text-white" />
                            </div>

                            <div>
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-indigo-100 ring-1 ring-white/10">
                                        {campus.code}
                                    </span>

                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                            campus.status === 'active'
                                                ? 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20'
                                                : 'bg-rose-400/15 text-rose-200 ring-1 ring-rose-300/20'
                                        }`}
                                    >
                                        <span
                                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                campus.status === 'active'
                                                    ? 'bg-emerald-400'
                                                    : 'bg-rose-400'
                                            }`}
                                        />
                                        {campus.status}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    {campus.name}
                                </h2>

                                {campus.school && (
                                    <p className="mt-1 text-sm text-indigo-200">
                                        {campus.school.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="hidden h-16 w-px bg-white/10 md:block" />

                        <div className="max-w-sm text-sm leading-6 text-indigo-100/80">
                            Campus-level academic operations, student records,
                            staff activity, and curriculum information.
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <Card key={stat.label}>
                                <div className="flex items-center p-5">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${stat.iconStyle}`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <div className="ml-4 min-w-0">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            {stat.label}
                                        </div>

                                        <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Campus Details */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader
                                title="Campus Information"
                                subtitle="Identity and contact information"
                            />

                            <CardBody className="space-y-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                                        <BuildingStorefrontIcon className="h-10 w-10 text-indigo-600" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {campus.name}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                {campus.code}
                                            </span>

                                            <Badge
                                                variant={
                                                    campus.status === 'active'
                                                        ? 'success'
                                                        : 'danger'
                                                }
                                            >
                                                {campus.status}
                                            </Badge>

                                            {campus.school && (
                                                <Badge variant="info">
                                                    {campus.school.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 md:grid-cols-2">
                                    {campus.phone && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <PhoneIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Phone
                                                </p>
                                                <p className="mt-0.5 text-sm font-medium text-slate-800">
                                                    {campus.phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {campus.address && (
                                        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:col-span-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <MapPinIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Address
                                                </p>
                                                <p className="mt-0.5 text-sm leading-6 text-slate-800">
                                                    {campus.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Academic Sessions */}
                    <Card>
                        <CardHeader
                            title="Academic Sessions"
                            subtitle={`${campus.academic_sessions?.length || 0} total`}
                        />

                        <CardBody className="p-0">
                            {campus.academic_sessions &&
                            campus.academic_sessions.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {campus.academic_sessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="group px-6 py-4 transition hover:bg-indigo-50/40"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                    <CalendarDaysIcon className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-slate-800">
                                                        {session.name}
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {session.start_date} →{' '}
                                                        {session.end_date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center">
                                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                                        <CalendarDaysIcon className="h-5 w-5 text-slate-400" />
                                    </div>

                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No academic sessions yet
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Sessions will appear here once configured.
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