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
    CalendarIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, staff }) {
    const getInitials = () => {
        if (!staff.user?.name) return '?';
        return staff.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const getEmploymentVariant = (type) => {
        const map = {
            full_time: 'success',
            part_time: 'info',
            contract: 'warning',
            intern: 'default',
        };
        return map[type] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={staff.user?.name} />

            <div className="space-y-6">
                <PageHeader
                    title={staff.user?.name}
                    subtitle={`Staff member • ${staff.designation || 'N/A'}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Staff',
                            href: route('staff.index'),
                        },
                        { label: staff.user?.name },
                    ]}
                    action={
                        <Button
                            href={route('staff.edit', staff.id)}
                        >
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit Staff
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader title="Staff Information" />
                        <CardBody className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                    {getInitials()}
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800">
                                        {staff.user?.name}
                                    </h3>

                                    <code className="inline-block rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 mt-1">
                                        {staff.employee_id}
                                    </code>

                                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                                        <Badge
                                            variant={
                                                staff.status ===
                                                'active'
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {staff.status}
                                        </Badge>
                                        <Badge
                                            variant={getEmploymentVariant(
                                                staff.employment_type
                                            )}
                                        >
                                            {staff.employment_type?.replace(
                                                '_',
                                                ' '
                                            )}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                {staff.user?.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                                        <span className="text-slate-700">
                                            {staff.user.email}
                                        </span>
                                    </div>
                                )}
                                {staff.user?.phone && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <PhoneIcon className="h-5 w-5 text-slate-400" />
                                        <span className="text-slate-700">
                                            {staff.user.phone}
                                        </span>
                                    </div>
                                )}
                                {staff.department && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <BriefcaseIcon className="h-5 w-5 text-slate-400" />
                                        <span className="text-slate-700">
                                            {staff.department.name}
                                        </span>
                                    </div>
                                )}
                                {staff.joining_date && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarIcon className="h-5 w-5 text-slate-400" />
                                        <span className="text-slate-700">
                                            Joined:{' '}
                                            {staff.joining_date.split(
                                                'T'
                                            )[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader title="Job Details" />
                        <CardBody className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Designation
                                </span>
                                <span className="font-medium text-slate-800">
                                    {staff.designation}
                                </span>
                            </div>
                            {staff.salary && (
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">
                                        Salary
                                    </span>
                                    <span className="font-semibold text-slate-800 flex items-center gap-1 tabular-nums">
                                        <CurrencyDollarIcon className="h-4 w-4 text-slate-400" />
                                        Rs.{' '}
                                        {Number(
                                            staff.salary
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Type
                                </span>
                                <span className="font-medium text-slate-800 capitalize">
                                    {staff.employment_type?.replace(
                                        '_',
                                        ' '
                                    )}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}