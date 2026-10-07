import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    PencilIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    BriefcaseIcon,
    UserGroupIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, guardian, availableStudents }) {
    const getInitials = () => {
        return `${guardian.first_name?.[0] || ''}${
            guardian.last_name?.[0] || ''
        }`.toUpperCase();
    };

    const getRelationVariant = (relation) => {
        const map = {
            father: 'info',
            mother: 'primary',
            guardian: 'warning',
        };

        return map[relation] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head
                title={`${guardian.first_name} ${guardian.last_name}`}
            />

            <div className="space-y-6">
                <PageHeader
                    title={`${guardian.first_name} ${guardian.last_name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Guardians',
                            href: route('guardians.index'),
                        },
                        {
                            label: `${guardian.first_name} ${guardian.last_name}`,
                        },
                    ]}
                    action={
                        <Button
                            href={route(
                                'guardians.edit',
                                guardian.id
                            )}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Guardian
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="overflow-hidden lg:col-span-2">
                        <div className="bg-gradient-to-r from-indigo-50 via-white to-slate-50 px-6 py-7">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700 ring-8 ring-indigo-50">
                                    {getInitials()}
                                </div>

                                <div>
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                            {guardian.first_name}{' '}
                                            {guardian.last_name}
                                        </h2>

                                        <Badge
                                            variant={getRelationVariant(
                                                guardian.relation
                                            )}
                                        >
                                            {guardian.relation}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-slate-500">
                                        Parent / guardian profile
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardHeader title="Contact & Profile Details" />

                        <CardBody>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {guardian.phone && (
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                            <PhoneIcon className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Phone
                                            </p>
                                            <p className="mt-0.5 text-sm font-medium text-slate-800">
                                                {guardian.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {guardian.email && (
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                            <EnvelopeIcon className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Email
                                            </p>
                                            <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
                                                {guardian.email}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {guardian.occupation && (
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                            <BriefcaseIcon className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Occupation
                                            </p>
                                            <p className="mt-0.5 text-sm font-medium text-slate-800">
                                                {guardian.occupation}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {guardian.address && (
                                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 md:col-span-2">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                                            <MapPinIcon className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Address
                                            </p>
                                            <p className="mt-0.5 text-sm font-medium text-slate-800">
                                                {guardian.address}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Children"
                            subtitle={`${
                                guardian.students?.length || 0
                            } linked`}
                        />

                        <CardBody className="p-0">
                            {guardian.students &&
                            guardian.students.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {guardian.students.map((student) => (
                                        <Link
                                            key={student.id}
                                            href={route(
                                                'students.show',
                                                student.id
                                            )}
                                            className="group flex items-center gap-3 px-5 py-4 transition hover:bg-indigo-50/50"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                <AcademicCapIcon className="h-4 w-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-700">
                                                    {student.first_name}{' '}
                                                    {student.last_name}
                                                </div>

                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    {
                                                        student.admission_number
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                        <UserGroupIcon className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm font-medium text-slate-700">
                                        No children linked
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        No students are currently associated
                                        with this guardian.
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