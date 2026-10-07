import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BuildingOfficeIcon,
    PencilIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    AcademicCapIcon,
    BuildingOffice2Icon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, organization }) {
    const handleToggleStatus = () => {
        router.patch(
            route(
                'school.organizations.toggle-status',
                organization.id
            )
        );
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={organization.name} />

            <div className="space-y-7">
                <PageHeader
                    title={organization.name}
                    subtitle="Organization profile and associated schools"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Organizations',
                            href: route(
                                'school.organizations.index'
                            ),
                        },
                        { label: organization.name },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                onClick={handleToggleStatus}
                            >
                                Toggle Status
                            </Button>

                            <Button
                                href={route(
                                    'school.organizations.edit',
                                    organization.id
                                )}
                            >
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </div>
                    }
                />

                {/* Organization Hero */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-6 shadow-xl shadow-indigo-100">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            {organization.logo ? (
                                <img
                                    src={`/storage/${organization.logo}`}
                                    alt={organization.name}
                                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20"
                                />
                            ) : (
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                    <BuildingOfficeIcon className="h-10 w-10 text-white" />
                                </div>
                            )}

                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-indigo-100 ring-1 ring-white/10">
                                        {organization.code}
                                    </span>

                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                            organization.status === 'active'
                                                ? 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20'
                                                : 'bg-rose-400/15 text-rose-200 ring-1 ring-rose-300/20'
                                        }`}
                                    >
                                        <span
                                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                organization.status === 'active'
                                                    ? 'bg-emerald-400'
                                                    : 'bg-rose-400'
                                            }`}
                                        />
                                        {organization.status}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    {organization.name}
                                </h2>

                                <p className="mt-1 text-sm text-indigo-200">
                                    Educational Organization
                                </p>
                            </div>
                        </div>

                        {organization.schools && (
                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
                                    Schools
                                </p>

                                <p className="mt-1 text-2xl font-bold text-white">
                                    {organization.schools.length}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader
                                title="Organization Information"
                                subtitle="Institutional identity and contact details"
                            />

                            <CardBody className="space-y-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    {organization.logo ? (
                                        <img
                                            src={`/storage/${organization.logo}`}
                                            alt={organization.name}
                                            className="h-20 w-20 rounded-2xl object-cover ring-1 ring-slate-200"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                                            <BuildingOfficeIcon className="h-10 w-10 text-indigo-600" />
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {organization.name}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                {organization.code}
                                            </span>

                                            <Badge
                                                variant={
                                                    organization.status ===
                                                    'active'
                                                        ? 'success'
                                                        : 'danger'
                                                }
                                            >
                                                {organization.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 md:grid-cols-2">
                                    {organization.email && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Email
                                                </p>
                                                <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
                                                    {organization.email}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {organization.phone && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <PhoneIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Phone
                                                </p>
                                                <p className="mt-0.5 text-sm font-medium text-slate-800">
                                                    {organization.phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {organization.website && (
                                        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:col-span-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <GlobeAltIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Website
                                                </p>

                                                <a
                                                    href={organization.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-0.5 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                                                >
                                                    <span className="truncate">
                                                        {organization.website}
                                                    </span>
                                                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" />
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {organization.address && (
                                        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:col-span-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                <MapPinIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Address
                                                </p>

                                                <p className="mt-0.5 text-sm leading-6 text-slate-800">
                                                    {organization.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Schools */}
                    <Card>
                        <CardHeader
                            title="Schools"
                            subtitle={`${organization.schools?.length || 0} total`}
                        />

                        <CardBody className="p-0">
                            {organization.schools &&
                            organization.schools.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {organization.schools.map((school) => (
                                        <Link
                                            key={school.id}
                                            href={route(
                                                'school.schools.show',
                                                school.id
                                            )}
                                            className="group block px-6 py-4 transition hover:bg-indigo-50/40"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 transition group-hover:bg-indigo-100">
                                                    <BuildingOffice2Icon className="h-4 w-4 text-indigo-600" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                                                        {school.name}
                                                    </div>

                                                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                                                        <AcademicCapIcon className="h-3.5 w-3.5" />
                                                        {school.campuses_count}{' '}
                                                        campuses
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center">
                                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                                        <BuildingOffice2Icon className="h-5 w-5 text-slate-400" />
                                    </div>

                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No schools yet
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Associated schools will appear here.
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