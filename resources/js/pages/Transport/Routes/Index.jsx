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
    MapIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    TruckIcon,
    ClockIcon,
    MapPinIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, routes, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(route('routes.index'), { search, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        router.get(route('routes.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this route?')) {
            router.delete(route('routes.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            inactive: 'default',
        };
        return map[status] || 'default';
    };

    const formatTime = (time) => {
        if (!time) return '—';

        if (typeof time === 'string' && time.includes('T')) {
            const d = new Date(time);

            if (isNaN(d.getTime())) return '—';

            return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        }

        return String(time).slice(0, 5);
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Routes" />

            <div className="space-y-6">
                <PageHeader
                    title="Transport Routes"
                    subtitle="Manage bus routes, assigned vehicles, schedules, and stops."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Routes' },
                    ]}
                    action={
                        <Button href={route('routes.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Route
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
                            placeholder="Search by route name or code..."
                        >
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {routes.data.length === 0 ? (
                        <div className="py-4">
                            <EmptyState
                                icon={<MapIcon />}
                                title="No routes found"
                                description="Create your first transport route."
                                action={
                                    <Button href={route('routes.create')}>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Route
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
                                                Route
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Vehicle
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Timings
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Stops
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
                                        {routes.data.map((r) => (
                                            <tr
                                                key={r.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                                                            <MapIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {r.name}
                                                            </div>

                                                            <code className="mt-1 inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                                                                {r.code}
                                                            </code>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {r.vehicle ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                                <TruckIcon className="h-4 w-4" />
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-700">
                                                                {r.vehicle.registration_number}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-slate-400">Unassigned</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                                                        <ClockIcon className="h-3.5 w-3.5 text-indigo-500" />
                                                        {formatTime(r.start_time)}
                                                        <span className="text-slate-300">→</span>
                                                        {formatTime(r.end_time)}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {r.stops_count ?? 0}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(r.status)}>
                                                        {r.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route('routes.show', r.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="Manage Stops"
                                                            aria-label={`Manage stops for ${r.name}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route('routes.edit', r.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${r.name}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(r.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${r.name}`}
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
                                links={routes.links}
                                from={routes.from}
                                to={routes.to}
                                total={routes.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}