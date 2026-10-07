import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BuildingOffice2Icon,
    PencilIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    AcademicCapIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, school }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={school.name} />

            <div className="space-y-6">
                <PageHeader
                    title={school.name}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Schools', href: route('school.schools.index') },
                        { label: school.name },
                    ]}
                    action={
                        <Button href={route('school.schools.edit', school.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                            <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-7">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    {school.logo ? (
                                        <img
                                            src={`/storage/${school.logo}`}
                                            alt={school.name}
                                            className="h-24 w-24 rounded-2xl border border-white object-cover shadow-md ring-1 ring-slate-200"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200">
                                            <BuildingOffice2Icon className="h-12 w-12" />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-slate-700 shadow-sm">
                                                {school.code}
                                            </span>

                                            <Badge
                                                variant={
                                                    school.status === 'active'
                                                        ? 'success'
                                                        : 'danger'
                                                }
                                            >
                                                {school.status}
                                            </Badge>
                                        </div>

                                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                            {school.name}
                                        </h2>

                                        {school.organization && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                <BuildingOfficeIcon className="h-4 w-4" />
                                                {school.organization.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <CardBody className="space-y-6 bg-white p-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {school.email && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                    <EnvelopeIcon className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        Email
                                                    </p>
                                                    <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                                        {school.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {school.phone && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                    <PhoneIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        Phone
                                                    </p>
                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {school.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {school.website && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                    <GlobeAltIcon className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        Website
                                                    </p>
                                                    <a
                                                        href={school.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 block truncate text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                                                    >
                                                        {school.website}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {school.established_year && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                    <AcademicCapIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        Established
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        {school.established_year}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {school.address && (
                                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Address
                                                </p>
                                                <p className="mt-1 text-sm leading-6 text-slate-700">
                                                    {school.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {school.principal_name && (
                                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                                <AcademicCapIcon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                                                    Principal
                                                </p>
                                                <p className="mt-0.5 text-sm font-semibold text-indigo-950">
                                                    {school.principal_name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Campuses */}
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                        <CardHeader
                            title="Campuses"
                            subtitle={`${school.campuses?.length || 0} total`}
                        />

                        <CardBody className="p-0">
                            {school.campuses && school.campuses.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {school.campuses.map((campus) => (
                                        <Link
                                            key={campus.id}
                                            href={route('school.campuses.show', campus.id)}
                                            className="group block px-6 py-4 transition hover:bg-indigo-50/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                                                    <BuildingOffice2Icon className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-700">
                                                        {campus.name}
                                                    </div>
                                                    <div className="mt-0.5 font-mono text-xs text-slate-400">
                                                        {campus.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <BuildingOffice2Icon className="mx-auto h-9 w-9 text-slate-300" />
                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No campuses yet
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Campuses associated with this school will appear here.
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