import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import SearchBar from '@/Components/ui/SearchBar';
import EmptyState from '@/Components/ui/EmptyState';
import {
    TruckIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PhoneIcon,
    UserIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, vehicles, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(route('vehicles.index'), { search, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        router.get(route('vehicles.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this vehicle?')) {
            router.delete(route('vehicles.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            inactive: 'default',
            maintenance: 'warning',
        };

        return map[status] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Vehicles" />

            <div className="space-y-6">
                <PageHeader
                    title="Vehicles"
                    subtitle="Manage school transport vehicles, drivers, and maintenance status."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Vehicles' },
                    ]}
                    action={
                        <Button href={route('vehicles.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Vehicle
                        </Button>
                    }
                />

                <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                    <div className="border-b border-slate-200/80 bg-slate-50/70 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by registration or model..."
                        >
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </SearchBar>
                    </div>

                    {vehicles.data.length === 0 ? (
                        <div className="py-4">
                            <EmptyState
                                icon={<TruckIcon />}
                                title="No vehicles found"
                                description="Add your first vehicle to get started."
                                action={
                                    <Button href={route('vehicles.create')}>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Vehicle
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50/90">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Vehicle
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Driver
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Capacity
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {vehicles.data.map((v) => (
                                            <tr
                                                key={v.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                                                            <TruckIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-bold text-slate-900">
                                                                {v.registration_number}
                                                            </div>

                                                            <div className="mt-0.5 truncate text-xs text-slate-500">
                                                                {v.model}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-2">
                                                        <UserIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                                                        <div>
                                                            <div className="text-sm font-medium text-slate-800">
                                                                {v.driver_name}
                                                            </div>

                                                            {v.driver_phone && (
                                                                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                                                    <PhoneIcon className="h-3 w-3" />
                                                                    {v.driver_phone}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                                                        {v.capacity} seats
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(v.status)}>
                                                        {v.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route('vehicles.show', v.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                            aria-label={`View ${v.registration_number}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route('vehicles.edit', v.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${v.registration_number}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(v.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${v.registration_number}`}
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={vehicles.links}
                                from={vehicles.from}
                                to={vehicles.to}
                                total={vehicles.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}