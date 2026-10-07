import { Head, router } from '@inertiajs/react';
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
    UserGroupIcon,
    TrashIcon,
    MapPinIcon,
    MapIcon,
    PlusIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, assignments, routes, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [routeId, setRouteId] = useState(filters?.route_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(route('student-transport.index'), {
            search,
            route_id: routeId,
            status,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClear = () => {
        setSearch('');
        setRouteId('');
        setStatus('');
        router.get(route('student-transport.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Remove this student from the route?')) {
            router.delete(route('student-transport.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            inactive: 'default',
        };

        return map[status] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Student Transport" />

            <div className="space-y-6">
                <PageHeader
                    title="Student Transport"
                    subtitle="Manage student assignments across school transport routes."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Student Transport' },
                    ]}
                    action={
                        <Button href={route('student-transport.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Assign Student
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
                            placeholder="Search by student name or admission #..."
                        >
                            <select
                                value={routeId}
                                onChange={(e) => setRouteId(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Routes</option>

                                {(routes || []).map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {assignments.data.length === 0 ? (
                        <div className="py-4">
                            <EmptyState
                                icon={<UserGroupIcon />}
                                title="No students assigned"
                                description="Assign students to transport routes to get started."
                                action={
                                    <Button href={route('student-transport.create')}>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Assign Student
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
                                            {[
                                                'Student',
                                                'Route',
                                                'Pickup',
                                                'Drop-off',
                                                'Period',
                                                'Status',
                                                'Actions',
                                            ].map((heading) => (
                                                <th
                                                    key={heading}
                                                    className={`px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 ${
                                                        heading === 'Actions' ? 'text-right' : ''
                                                    }`}
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {assignments.data.map((a) => (
                                            <tr
                                                key={a.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                            <UserGroupIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {a.student?.first_name} {a.student?.last_name}
                                                            </div>

                                                            <div className="mt-0.5 text-xs text-slate-500">
                                                                {a.student?.admission_number}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                            <MapIcon className="h-4 w-4" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-800">
                                                                {a.route?.name}
                                                            </div>
                                                            <div className="mt-0.5 text-xs font-medium text-slate-500">
                                                                {a.route?.code}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex max-w-[190px] items-center gap-2 text-sm text-slate-600">
                                                        <MapPinIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                                                        <span className="truncate">
                                                            {a.pickup_stop?.stop_name || '—'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex max-w-[190px] items-center gap-2 text-sm text-slate-600">
                                                        <MapPinIcon className="h-4 w-4 shrink-0 text-rose-500" />
                                                        <span className="truncate">
                                                            {a.dropoff_stop?.stop_name || '—'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-2">
                                                        <CalendarDaysIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                                                        <div className="text-xs font-medium text-slate-600">
                                                            <div>
                                                                {a.start_date?.split('T')[0]}
                                                            </div>

                                                            {a.end_date && (
                                                                <div className="mt-1 text-slate-400">
                                                                    to {a.end_date.split('T')[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(a.status)}>
                                                        {a.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(a.id)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                        title="Remove Assignment"
                                                        aria-label={`Remove ${a.student?.first_name} ${a.student?.last_name} from route`}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={assignments.links}
                                from={assignments.from}
                                to={assignments.to}
                                total={assignments.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}