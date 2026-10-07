import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    MapIcon,
    TruckIcon,
    ClockIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, vehicles }) {
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        name: '',
        code: '',
        description: '',
        start_time: '07:00',
        end_time: '08:30',
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('routes.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Route" />

            <div className="max-w-4xl mx-auto space-y-6">
                <PageHeader
                    title="Add Route"
                    subtitle="Create a transport route and configure its operating schedule."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Routes', href: route('routes.index') },
                        { label: 'Add' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {/* Route Identity */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Route Information"
                            subtitle="Define the basic identity of this transport route."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <MapIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5 bg-white">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Route Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g. Route A — DHA"
                                />

                                <Input
                                    label="Route Code"
                                    required
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    error={errors.code}
                                    placeholder="e.g. RT-A"
                                />
                            </div>

                            <Select
                                label="Vehicle"
                                required
                                value={data.vehicle_id}
                                onChange={(e) => setData('vehicle_id', e.target.value)}
                                error={errors.vehicle_id}
                                placeholder="Select Vehicle"
                                options={(vehicles || []).map((v) => ({
                                    value: v.id,
                                    label: `${v.registration_number} — ${v.model} (${v.capacity} seats)`,
                                }))}
                            />
                        </CardBody>
                    </Card>

                    {/* Description */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Route Description"
                            subtitle="Add optional information that helps staff understand this route."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <InformationCircleIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="bg-slate-50/40">
                            <Textarea
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                rows={3}
                                placeholder="Describe the route, service area, or any relevant notes..."
                            />
                        </CardBody>
                    </Card>

                    {/* Schedule */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Operating Schedule"
                            subtitle="Set the expected start and end time for this route."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <ClockIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Start Time"
                                    type="time"
                                    required
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    error={errors.start_time}
                                />

                                <Input
                                    label="End Time"
                                    type="time"
                                    required
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    error={errors.end_time}
                                />
                            </div>

                            <Select
                                label="Status"
                                required
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                            />
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 bg-slate-50/70 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('routes.index')}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Adding...' : 'Add Route'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}