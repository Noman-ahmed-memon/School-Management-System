import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Input from '@/Components/ui/Input';
import {
    MapIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    TruckIcon,
    ClockIcon,
    MapPinIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, route: routeData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStop, setEditingStop] = useState(null);

    const stops = routeData.stops || [];

    const handleDeleteStop = (id) => {
        if (confirm('Remove this stop from the route?')) {
            router.delete(route('route-stops.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleReorder = (stopId, direction) => {
        const currentIndex = stops.findIndex((s) => s.id === stopId);

        if (currentIndex < 0) return;

        const swapIndex = direction === 'up'
            ? currentIndex - 1
            : currentIndex + 1;

        if (swapIndex < 0 || swapIndex >= stops.length) return;

        const current = stops[currentIndex];
        const other = stops[swapIndex];

        router.post(
            route('route-stops.reorder'),
            {
                stop1_id: current.id,
                stop1_order: other.stop_order,
                stop2_id: other.id,
                stop2_order: current.stop_order,
            },
            { preserveScroll: true }
        );
    };

    const openAdd = () => {
        setEditingStop(null);
        setModalOpen(true);
    };

    const openEdit = (stop) => {
        setEditingStop(stop);
        setModalOpen(true);
    };

    const formatTime = (time) => {
        if (!time) return '—';
        return String(time).slice(0, 5);
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={routeData.name} />

            <div className="space-y-6">
                <PageHeader
                    title={routeData.name}
                    subtitle="Manage route details, operating schedule, and stop sequence."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Routes', href: route('routes.index') },
                        { label: routeData.name },
                    ]}
                    action={
                        <Button href={route('routes.edit', routeData.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Route
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Route Information */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Route Information"
                            subtitle="Core configuration"
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <MapIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                                    Route Code
                                </div>

                                <code className="mt-2 inline-flex rounded-lg border border-indigo-100 bg-white px-3 py-1.5 text-sm font-bold text-indigo-700">
                                    {routeData.code}
                                </code>
                            </div>

                            {routeData.vehicle && (
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <TruckIcon className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                            Assigned Vehicle
                                        </div>
                                        <div className="mt-0.5 text-sm font-semibold text-slate-800">
                                            {routeData.vehicle.registration_number}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                    <ClockIcon className="h-4 w-4" />
                                </div>

                                <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                        Operating Hours
                                    </div>
                                    <div className="mt-0.5 text-sm font-semibold text-slate-800">
                                        {formatTime(routeData.start_time)} → {formatTime(routeData.end_time)}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Status
                                </div>

                                <Badge
                                    variant={
                                        routeData.status === 'active'
                                            ? 'success'
                                            : 'default'
                                    }
                                >
                                    {routeData.status}
                                </Badge>
                            </div>

                            {routeData.description && (
                                <div className="border-t border-slate-200 pt-5">
                                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                        Description
                                    </div>

                                    <p className="text-sm leading-6 text-slate-600">
                                        {routeData.description}
                                    </p>
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    {/* Stops */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)] lg:col-span-2">
                        <CardHeader
                            title={`Stops (${stops.length})`}
                            subtitle="Reorder with arrows or select a stop to edit it."
                            action={
                                <Button onClick={openAdd} size="sm">
                                    <PlusIcon className="mr-1 h-4 w-4" />
                                    Add Stop
                                </Button>
                            }
                        />

                        <CardBody className="p-0">
                            {stops.length === 0 ? (
                                <div className="px-6 py-14 text-center">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                                        <MapPinIcon className="h-7 w-7" />
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-800">
                                        No stops added yet
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Add the first stop to begin building this route.
                                    </p>

                                    <div className="mt-5">
                                        <Button onClick={openAdd}>
                                            <PlusIcon className="mr-2 h-4 w-4" />
                                            Add First Stop
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {stops.map((stop, index) => (
                                        <div
                                            key={stop.id}
                                            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-indigo-50/30"
                                        >
                                            <div className="relative flex shrink-0 flex-col items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-sm font-bold text-indigo-700">
                                                    {index + 1}
                                                </div>

                                                {index < stops.length - 1 && (
                                                    <div className="absolute top-10 h-8 w-px bg-slate-200" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="font-semibold text-sm text-slate-900">
                                                    {stop.stop_name}
                                                </div>

                                                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <ClockIcon className="h-3.5 w-3.5 text-indigo-500" />
                                                        {formatTime(stop.arrival_time)}
                                                    </span>

                                                    {stop.latitude && stop.longitude && (
                                                        <span className="text-slate-400">
                                                            {Number(stop.latitude).toFixed(4)}, {Number(stop.longitude).toFixed(4)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 opacity-80 transition group-hover:opacity-100">
                                                <button
                                                    onClick={() => handleReorder(stop.id, 'up')}
                                                    disabled={index === 0}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-25"
                                                    title="Move Up"
                                                    aria-label={`Move ${stop.stop_name} up`}
                                                >
                                                    <ArrowUpIcon className="h-4 w-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleReorder(stop.id, 'down')}
                                                    disabled={index === stops.length - 1}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-25"
                                                    title="Move Down"
                                                    aria-label={`Move ${stop.stop_name} down`}
                                                >
                                                    <ArrowDownIcon className="h-4 w-4" />
                                                </button>

                                                <button
                                                    onClick={() => openEdit(stop)}
                                                    className="ml-1 rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                    title="Edit"
                                                    aria-label={`Edit ${stop.stop_name}`}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteStop(stop.id)}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                    title="Delete"
                                                    aria-label={`Delete ${stop.stop_name}`}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>

            <StopModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                routeId={routeData.id}
                stop={editingStop}
                nextOrder={stops.length + 1}
            />
        </AuthenticatedLayout>
    );
}

function StopModal({ show, onClose, routeId, stop, nextOrder }) {
    const isEdit = !!stop;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        route_id: routeId,
        stop_name: '',
        latitude: '',
        longitude: '',
        stop_order: nextOrder,
        arrival_time: '07:00',
    });

    const [loadedId, setLoadedId] = useState(null);

    if (show && isEdit && loadedId !== stop.id) {
        setData({
            _method: 'PUT',
            route_id: routeId,
            stop_name: stop.stop_name || '',
            latitude: stop.latitude || '',
            longitude: stop.longitude || '',
            stop_order: stop.stop_order || nextOrder,
            arrival_time: stop.arrival_time?.slice(0, 5) || '07:00',
        });

        setLoadedId(stop.id);
    }

    if (show && !isEdit && loadedId !== 'new') {
        reset();

        setData({
            _method: 'POST',
            route_id: routeId,
            stop_name: '',
            latitude: '',
            longitude: '',
            stop_order: nextOrder,
            arrival_time: '07:00',
        });

        setLoadedId('new');
    }

    if (!show && loadedId !== null) {
        setLoadedId(null);
    }

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit
            ? route('route-stops.update', stop.id)
            : route('route-stops.store');

        post(url, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={isEdit ? 'Edit Stop' : 'Add Stop'}
        >
            <form onSubmit={submit} className="space-y-5">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                            <MapPinIcon className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {isEdit ? 'Update route stop' : 'Add a route stop'}
                            </p>
                            <p className="mt-0.5 text-xs leading-5 text-slate-500">
                                Configure the stop name, location, arrival time, and sequence.
                            </p>
                        </div>
                    </div>
                </div>

                <Input
                    label="Stop Name"
                    required
                    value={data.stop_name}
                    onChange={(e) => setData('stop_name', e.target.value)}
                    error={errors.stop_name}
                    placeholder="e.g. DHA Phase 5 Gate"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="Latitude"
                        type="number"
                        step="0.00000001"
                        value={data.latitude}
                        onChange={(e) => setData('latitude', e.target.value)}
                        error={errors.latitude}
                        placeholder="Optional"
                    />

                    <Input
                        label="Longitude"
                        type="number"
                        step="0.00000001"
                        value={data.longitude}
                        onChange={(e) => setData('longitude', e.target.value)}
                        error={errors.longitude}
                        placeholder="Optional"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="Arrival Time"
                        type="time"
                        required
                        value={data.arrival_time}
                        onChange={(e) => setData('arrival_time', e.target.value)}
                        error={errors.arrival_time}
                    />

                    <Input
                        label="Order"
                        type="number"
                        min="1"
                        required
                        value={data.stop_order}
                        onChange={(e) => setData('stop_order', e.target.value)}
                        error={errors.stop_order}
                        hint="Position on the route"
                    />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {isEdit ? 'Update Stop' : 'Add Stop'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}