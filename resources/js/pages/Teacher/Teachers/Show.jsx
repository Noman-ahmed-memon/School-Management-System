import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    PencilIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    IdentificationIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, teacher }) {
    const getInitials = () => {
        if (!teacher.user?.name) return '?';

        return teacher.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={teacher.user?.name} />

            <div className="space-y-7">
                <PageHeader
                    title={teacher.user?.name}
                    subtitle="Teacher profile and professional information."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Teachers',
                            href: route('teachers.index'),
                        },
                        { label: teacher.user?.name },
                    ]}
                    action={
                        <Button
                            href={route('teachers.edit', teacher.id)}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Teacher
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Profile */}
                    <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)] lg:col-span-2">
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-800 px-6 py-7 sm:px-8">
                            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/5" />
                            <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-indigo-400/10" />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                                {teacher.user?.profile_picture ? (
                                    <img
                                        src={`/storage/${teacher.user.profile_picture}`}
                                        alt={teacher.user.name}
                                        className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/10"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white ring-4 ring-white/10">
                                        {getInitials()}
                                    </div>
                                )}

                                <div className="min-w-0 text-white">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                        Teacher Profile
                                    </p>

                                    <h2 className="truncate text-2xl font-bold">
                                        {teacher.user?.name}
                                    </h2>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs font-semibold text-indigo-100">
                                            {teacher.employee_id}
                                        </span>

                                        <Badge
                                            variant={
                                                teacher.status === 'active'
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {teacher.status}
                                        </Badge>

                                        {teacher.specialization && (
                                            <span className="rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-indigo-100">
                                                {teacher.specialization}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6 p-6 sm:p-8">
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-5 w-1 rounded-full bg-indigo-600" />
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                                        Contact & Profile
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {teacher.user?.email && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                                <EnvelopeIcon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Email
                                                </p>
                                                <p className="truncate text-sm font-medium text-slate-700">
                                                    {teacher.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {teacher.user?.phone && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                                <PhoneIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Phone
                                                </p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {teacher.user.phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {teacher.qualification && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                                <AcademicCapIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Qualification
                                                </p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {teacher.qualification}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {teacher.joining_date && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                                                <CalendarIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Joining Date
                                                </p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {teacher.joining_date.split(
                                                        'T'
                                                    )[0]}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {teacher.user?.address && (
                                        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 md:col-span-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                                <MapPinIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Address
                                                </p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {teacher.user.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Experience / Employment */}
                    <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Professional Profile"
                            subtitle="Employment overview"
                        />

                        <CardBody className="space-y-4">
                            <div className="rounded-xl bg-indigo-50 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                                            Experience
                                        </p>
                                        <p className="mt-1 text-3xl font-bold text-indigo-900">
                                            {teacher.experience_years || 0}
                                        </p>
                                        <p className="text-xs font-medium text-indigo-600">
                                            Years
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                                        <BriefcaseIcon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                                <div className="flex items-center justify-between gap-4 p-4">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <IdentificationIcon className="h-4 w-4" />
                                        <span className="text-sm">
                                            Employee ID
                                        </span>
                                    </div>

                                    <span className="font-mono text-xs font-bold text-slate-700">
                                        {teacher.employee_id}
                                    </span>
                                </div>

                                {teacher.specialization && (
                                    <div className="flex items-center justify-between gap-4 p-4">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <AcademicCapIcon className="h-4 w-4" />
                                            <span className="text-sm">
                                                Specialization
                                            </span>
                                        </div>

                                        <span className="text-right text-sm font-semibold text-slate-700">
                                            {teacher.specialization}
                                        </span>
                                    </div>
                                )}

                                {teacher.employment_type && (
                                    <div className="flex items-center justify-between gap-4 p-4">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <BriefcaseIcon className="h-4 w-4" />
                                            <span className="text-sm">
                                                Employment
                                            </span>
                                        </div>

                                        <span className="text-sm font-semibold capitalize text-slate-700">
                                            {teacher.employment_type.replace(
                                                '_',
                                                ' '
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-slate-400" />
                                    <span className="text-xs font-semibold text-slate-500">
                                        Current Status
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <Badge
                                        variant={
                                            teacher.status === 'active'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {teacher.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}