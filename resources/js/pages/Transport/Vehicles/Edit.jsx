import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    TruckIcon,
    UserIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, vehicle }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        registration_number: vehicle.registration_number || '',
        model: vehicle.model || '',
        capacity: vehicle.capacity || '',
        driver_name: vehicle.driver_name || '',
        driver_phone: vehicle.driver_phone || '',
        driver_license: vehicle.driver_license || '',
        insurance_details: vehicle.insurance_details || '',
        maintenance_date: vehicle.maintenance_date?.split('T')[0] || '',
        status: vehicle.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vehicles.update', vehicle.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${vehicle.registration_number}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <PageHeader
                    title="Edit Vehicle"
                    subtitle={`Update the details and operational status of ${vehicle.registration_number}.`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Vehicles', href: route('vehicles.index') },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Vehicle Details"
                            subtitle="Update the vehicle registration, model, and capacity."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <TruckIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Registration Number"
                                    required
                                    value={data.registration_number}
                                    onChange={(e) => setData('registration_number', e.target.value.toUpperCase())}
                                    error={errors.registration_number}
                                />

                                <Input
                                    label="Model"
                                    required
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    error={errors.model}
                                />
                            </div>

                            <Input
                                label="Capacity (seats)"
                                type="number"
                                min="1"
                                required
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                error={errors.capacity}
                            />
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Driver Information"
                            subtitle="Maintain the primary driver's information."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <UserIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Driver Name"
                                    required
                                    value={data.driver_name}
                                    onChange={(e) => setData('driver_name', e.target.value)}
                                    error={errors.driver_name}
                                />

                                <Input
                                    label="Driver Phone"
                                    required
                                    value={data.driver_phone}
                                    onChange={(e) => setData('driver_phone', e.target.value)}
                                    error={errors.driver_phone}
                                />
                            </div>

                            <Input
                                label="Driver License #"
                                value={data.driver_license}
                                onChange={(e) => setData('driver_license', e.target.value)}
                                error={errors.driver_license}
                            />
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Additional Details"
                            subtitle="Update insurance, maintenance, and availability information."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ShieldCheckIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <Textarea
                                label="Insurance Details"
                                value={data.insurance_details}
                                onChange={(e) => setData('insurance_details', e.target.value)}
                                error={errors.insurance_details}
                                rows={3}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Next Maintenance Date"
                                    type="date"
                                    value={data.maintenance_date}
                                    onChange={(e) => setData('maintenance_date', e.target.value)}
                                    error={errors.maintenance_date}
                                />

                                <Select
                                    label="Status"
                                    required
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'inactive', label: 'Inactive' },
                                        { value: 'maintenance', label: 'Maintenance' },
                                    ]}
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 bg-slate-50/70 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('vehicles.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Vehicle'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}