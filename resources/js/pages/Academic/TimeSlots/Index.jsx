import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import EmptyState from '@/Components/ui/EmptyState';
import {
    ClockIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

const DAYS = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

const formatTime = (time) => {
    if (!time) return '—';

    if (typeof time === 'string' && time.includes('T')) {
        const d = new Date(time);

        if (isNaN(d.getTime())) return '—';

        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');

        return `${hh}:${mm}`;
    }

    return String(time).slice(0, 5);
};

const calcDuration = (start, end) => {
    if (!start || !end) return '—';

    const getMinutes = (t) => {
        if (typeof t === 'string' && t.includes('T')) {
            const d = new Date(t);

            if (isNaN(d.getTime())) return NaN;

            return d.getHours() * 60 + d.getMinutes();
        }

        const parts = String(t).split(':').map(Number);
        const [h, m] = parts;

        if (isNaN(h) || isNaN(m)) return NaN;

        return h * 60 + m;
    };

    const diff = getMinutes(end) - getMinutes(start);

    if (isNaN(diff) || diff <= 0) return '—';

    return `${diff} min`;
};

export default function Index({ auth, slots, filters }) {
    const [dayFilter, setDayFilter] = useState(filters?.day_of_week || '');

    const handleFilter = (day) => {
        setDayFilter(day);

        router.get(
            route('time-slots.index'),
            { day_of_week: day },
            { preserveState: true }
        );
    };

    const handleDelete = (id) => {
        if (confirm('Delete this time slot?')) {
            router.delete(route('time-slots.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Time Slots" />

            <div className="space-y-6">
                <PageHeader
                    title="Time Slots"
                    subtitle="Define daily periods/classes schedule"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Time Slots' },
                    ]}
                    action={
                        <Button href={route('time-slots.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Time Slot
                        </Button>
                    }
                />

                {/* Day Filter */}
                <Card className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.35)]">
                    <div className="border-b border-slate-200/70 bg-slate-50/70 px-4 py-3 sm:px-5">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <FunnelIcon className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Filter by day
                                </p>
                                <p className="text-xs text-slate-500">
                                    Quickly view scheduled periods for a specific day.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 p-4 sm:p-5">
                        <button
                            type="button"
                            onClick={() => handleFilter('')}
                            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                                !dayFilter
                                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700'
                            }`}
                        >
                            All Days
                        </button>

                        {DAYS.map((day) => (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => handleFilter(day.value)}
                                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                                    dayFilter === day.value
                                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700'
                                }`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </Card>

                {slots.data.length === 0 ? (
                    <Card className="border-slate-200/80 bg-white/95 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.35)]">
                        <EmptyState
                            icon={<ClockIcon />}
                            title="No time slots configured"
                            description="Create time slots to build the timetable."
                            action={
                                <Button href={route('time-slots.create')}>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Time Slot
                                </Button>
                            }
                        />
                    </Card>
                ) : (
                    <Card className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_18px_45px_-26px_rgba(15,23,42,0.32)]">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50/90">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Day
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Start Time
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            End Time
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Duration
                                        </th>
                                        <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {slots.data.map((slot) => {
                                        const start = formatTime(slot.start_time);
                                        const end = formatTime(slot.end_time);
                                        const duration = calcDuration(
                                            slot.start_time,
                                            slot.end_time
                                        );

                                        return (
                                            <tr
                                                key={slot.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant="info"
                                                        className="capitalize"
                                                    >
                                                        {slot.day_of_week}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                                            <ClockIcon className="h-4 w-4" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-800">
                                                            {start}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-slate-800">
                                                        {end}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {duration}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Link
                                                            href={route('time-slots.edit', slot.id)}
                                                            aria-label={`Edit ${slot.day_of_week} time slot`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(slot.id)}
                                                            aria-label={`Delete ${slot.day_of_week} time slot`}
                                                            title="Delete"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}