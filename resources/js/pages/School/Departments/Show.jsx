import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BriefcaseIcon,
    PencilIcon,
    BuildingOffice2Icon,
    UserIcon,
    UsersIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, department }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={department.name} />

            <div className="space-y-7">
                <PageHeader
                    title={department.name}
                    subtitle="Department overview and staff directory"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Departments',
                            href: route('school.departments.index'),
                        },
                        { label: department.name },
                    ]}
                    action={
                        <Button
                            href={route(
                                'school.departments.edit',
                                department.id
                            )}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Department
                        </Button>
                    }
                />

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-700 via-cyan-800 to-slate-950 p-6 shadow-xl shadow-teal-100">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                <BriefcaseIcon className="h-8 w-8 text-white" />
                            </div>

                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-teal-100 ring-1 ring-white/10">
                                        {department.code}
                                    </span>

                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                            department.status === 'active'
                                                ? 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20'
                                                : 'bg-rose-400/15 text-rose-200 ring-1 ring-rose-300/20'
                                        }`}
                                    >
                                        <span
                                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                department.status === 'active'
                                                    ? 'bg-emerald-400'
                                                    : 'bg-rose-400'
                                            }`}
                                        />
                                        {department.status}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    {department.name}
                                </h2>

                                {department.campus && (
                                    <p className="mt-1 flex items-center gap-1.5 text-sm text-teal-200">
                                        <BuildingOffice2Icon className="h-4 w-4" />
                                        {department.campus.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Information */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader
                                title="Department Information"
                                subtitle="Academic unit details"
                            />

                            <CardBody className="space-y-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-50 ring-1 ring-teal-100">
                                        <BriefcaseIcon className="h-10 w-10 text-teal-600" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {department.name}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                                                {department.code}
                                            </span>

                                            <Badge
                                                variant={
                                                    department.status ===
                                                    'active'
                                                        ? 'success'
                                                        : 'danger'
                                                }
                                            >
                                                {department.status}
                                            </Badge>

                                            {department.campus && (
                                                <Badge variant="info">
                                                    {department.campus.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {department.head_name && (
                                    <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                            <UserIcon className="h-5 w-5 text-indigo-600" />
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                Head of Department
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">
                                                {department.head_name}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {department.description && (
                                    <div className="border-t border-slate-100 pt-5">
                                        <div className="mb-2 flex items-center gap-2">
                                            <DocumentTextIcon className="h-4 w-4 text-slate-400" />
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                Description
                                            </p>
                                        </div>

                                        <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                                            {department.description}
                                        </p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Staff */}
                    <Card>
                        <CardHeader
                            title="Staff Members"
                            subtitle={`${department.staff?.length || 0} total`}
                        />

                        <CardBody className="p-0">
                            {department.staff &&
                            department.staff.length > 0 ? (
                                <div className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
                                    {department.staff.map((s) => (
                                        <div
                                            key={s.id}
                                            className="flex items-center gap-3 px-6 py-4 transition hover:bg-teal-50/40"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                                <UsersIcon className="h-4 w-4 text-slate-500" />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-slate-800">
                                                    {s.user?.name || '—'}
                                                </div>

                                                <div className="mt-0.5 truncate text-xs text-slate-500">
                                                    {s.designation}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center">
                                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                                        <UsersIcon className="h-5 w-5 text-slate-400" />
                                    </div>

                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No staff members assigned
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Assigned staff will appear here.
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