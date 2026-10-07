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
    CalendarDaysIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    PlusIcon,
    AcademicCapIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, sessions, campuses, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [campusId, setCampusId] = useState(filters?.campus_id || '');

    const handleSearch = () => {
        router.get(
            route('school.academic-sessions.index'),
            { search, status, campus_id: campusId },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setCampusId('');
        router.get(route('school.academic-sessions.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this academic session?')) {
            router.delete(route('school.academic-sessions.destroy', id));
        }
    };

    const formatDate = (date) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const activeCount = sessions.data.filter(
        (s) => s.status === 'active'
    ).length;
    const currentCount = sessions.data.filter((s) => s.is_current).length;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Academic Sessions" />

            <div className="space-y-7">
                <PageHeader
                    title="Academic Sessions"
                    subtitle="Manage academic years and sessions across campuses"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Academic Sessions' },
                    ]}
                    action={
                        <Button
                            href={route('school.academic-sessions.create')}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Session
                        </Button>
                    }
                />

                {/* Academic Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950" />

                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col justify-between gap-6 px-6 py-7 md:flex-row md:items-center md:px-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                <AcademicCapIcon className="h-7 w-7 text-indigo-300" />
                            </div>

                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                    Academic Office
                                </div>
                                <h2 className="mt-1 text-xl font-bold text-white">
                                    Academic Sessions Registry
                                </h2>
                                <p className="mt-1 text-sm text-slate-300">
                                    Define academic years, durations and
                                    current session status.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Total
                                </div>
                                <div className="mt-1 text-xl font-bold text-white">
                                    {sessions.total}
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Active
                                </div>
                                <div className="mt-1 text-xl font-bold text-emerald-300">
                                    {activeCount}
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Current
                                </div>
                                <div className="mt-1 text-xl font-bold text-indigo-300">
                                    {currentCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50/60 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search sessions by name..."
                        >
                            <select
                                value={campusId}
                                onChange={(e) =>
                                    setCampusId(e.target.value)
                                }
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Campuses</option>
                                {campuses.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
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

                    {sessions.data.length === 0 ? (
                        <div className="px-6 py-12">
                            <EmptyState
                                icon={<CalendarDaysIcon />}
                                title="No academic sessions found"
                                description="Create your first academic session to get started."
                                action={
                                    <Button
                                        href={route(
                                            'school.academic-sessions.create'
                                        )}
                                    >
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Session
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Session
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Campus
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Duration
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Current
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {sessions.data.map((session) => (
                                            <tr
                                                key={session.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                                            <CalendarDaysIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-bold text-slate-800">
                                                                {session.name}
                                                            </div>
                                                            <div className="mt-0.5 text-xs text-slate-400">
                                                                Session ID #
                                                                {session.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                                    {session.campus?.name ||
                                                        '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <ClockIcon className="h-4 w-4 text-slate-400" />
                                                        <div>
                                                            <div className="font-semibold text-slate-700">
                                                                {formatDate(
                                                                    session.start_date
                                                                )}
                                                            </div>
                                                            <div className="text-slate-400">
                                                                to{' '}
                                                                {formatDate(
                                                                    session.end_date
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {session.is_current ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                                            <CheckCircleIcon className="h-3.5 w-3.5" />
                                                            Current
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-slate-300">
                                                            —
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            session.status ===
                                                            'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {session.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'school.academic-sessions.show',
                                                                session.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'school.academic-sessions.edit',
                                                                session.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    session.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                            title="Delete"
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
                                links={sessions.links}
                                from={sessions.from}
                                to={sessions.to}
                                total={sessions.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}