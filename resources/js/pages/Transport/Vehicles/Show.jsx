import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    TruckIcon,
    PencilIcon,
    UserIcon,
    PhoneIcon,
    CalendarIcon,
    ShieldCheckIcon,
    MapIcon,
} from '@heroicons/react/24/outline';

const safeDate = (val) => {
    if (!val) return null;
    return String(val).split('T')[0];
};

export default function Show({ auth, vehicle, routes = [] }) {
    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            inactive: 'default',
            maintenance: 'warning',
        };

        return map[status] || 'default';
    };

    if (!vehicle) {
        return (
            <AuthenticatedLayout user={auth?.user}>
                <Head title="Vehicle" />

                <div className="flex min-h-[60vh] items-center justify-center px-6">
                    <div className="max-w-md text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                            <TruckIcon className="h-8 w-8" />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-slate-900">
                            Vehicle not found
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            The vehicle you requested does not exist.
                        </p>

                        <Button
                            href={route('vehicles.index')}
                            className="mt-5"
                        >
                            Back to Vehicles
                        </Button>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={vehicle.registration_number || 'Vehicle'} />

            <div className="space-y-6">
                <PageHeader
                    title={vehicle.registration_number}
                    subtitle={vehicle.model || 'Transport Vehicle'}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Vehicles', href: route('vehicles.index') },
                        { label: vehicle.registration_number },
                    ]}
                    action={
                        <Button href={route('vehicles.edit', vehicle.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Vehicle
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)] lg:col-span-2">
                        <CardHeader
                            title="Vehicle Information"
                            subtitle="Vehicle, driver, capacity, and operational details."
                        />

                        <CardBody className="space-y-6">
                            <div className="flex flex-col gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 p-5 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                                    <TruckIcon className="h-10 w-10" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {vehicle.model || '—'}
                                    </h3>

                                    <code className="mt-2 inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700">
                                        {vehicle.registration_number}
                                    </code>

                                    <div className="mt-3">
                                        <Badge variant={getStatusVariant(vehicle.status)}>
                                            {vehicle.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 md:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Driver
                                    </div>

                                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                        <UserIcon className="h-4 w-4 text-indigo-500" />
                                        {vehicle.driver_name || '—'}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Driver Phone
                                    </div>

                                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                        <PhoneIcon className="h-4 w-4 text-indigo-500" />
                                        {vehicle.driver_phone || '—'}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Capacity
                                    </div>

                                    <div className="mt-2 text-sm font-bold text-slate-800">
                                        {vehicle.capacity} seats
                                    </div>
                                </div>

                                {vehicle.maintenance_date && (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            Next Maintenance
                                        </div>

                                        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                            <CalendarIcon className="h-4 w-4 text-amber-500" />
                                            {safeDate(vehicle.maintenance_date)}
                                        </div>
                                    </div>
                                )}

                                {vehicle.insurance_details && (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 md:col-span-2">
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            Insurance
                                        </div>

                                        <div className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-700">
                                            <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                            <span>{vehicle.insurance_details}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Assigned Routes"
                            subtitle={`${routes?.length || 0} route${(routes?.length || 0) !== 1 ? 's' : ''}`}
                        />

                        <CardBody className="p-0">
                            {routes && routes.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {routes.map((r) => (
                                        <Link
                                            key={r.id}
                                            href={route('routes.show', r.id)}
                                            className="group flex items-center gap-3 px-6 py-4 transition hover:bg-indigo-50/50"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                                                <MapIcon className="h-4 w-4" />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-slate-800">
                                                    {r.name}
                                                </div>

                                                <div className="mt-0.5 text-xs font-medium text-slate-500">
                                                    {r.code}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                        <MapIcon className="h-6 w-6" />
                                    </div>

                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No routes assigned
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        This vehicle is not currently assigned to any route.
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