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
    TrophyIcon,
    ClipboardDocumentCheckIcon,
    EyeIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, exams, standards, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [standardId, setStandardId] = useState(filters?.standard_id || '');

    const handleSearch = () => {
        router.get(
            route('results.index'),
            { search, status, standard_id: standardId },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setStandardId('');
        router.get(route('results.index'));
    };

    const getStatusVariant = (status) => {
        const map = {
            scheduled: 'info',
            ongoing: 'warning',
            completed: 'success',
            cancelled: 'danger',
        };

        return map[status] || 'default';
    };

    const completedCount = exams.data.filter(
        (exam) => exam.status === 'completed'
    ).length;

    const totalEntries = exams.data.reduce(
        (sum, exam) => sum + Number(exam.results_count || 0),
        0
    );

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Results" />

            <div className="space-y-7">

                <PageHeader
                    title="Academic Results"
                    subtitle="Review examinations, marks entry progress and student result summaries"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Results' },
                    ]}
                />

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950" />

                    <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

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
                                    Examination Results Center
                                </h2>
                                <p className="mt-1 text-sm text-slate-300">
                                    Monitor result preparation across examinations and standards.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Exams
                                </div>
                                <div className="mt-1 text-xl font-bold text-white">
                                    {exams.total}
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Completed
                                </div>
                                <div className="mt-1 text-xl font-bold text-emerald-300">
                                    {completedCount}
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    Entries
                                </div>
                                <div className="mt-1 text-xl font-bold text-indigo-300">
                                    {totalEntries}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50/60 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search examinations..."
                        >
                            <select
                                value={standardId}
                                onChange={(e) => setStandardId(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Standards</option>
                                {standards.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} ({s.code})
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </SearchBar>
                    </div>

                    {exams.data.length === 0 ? (
                        <div className="px-6 py-12">
                            <EmptyState
                                icon={<TrophyIcon />}
                                title="No examinations found"
                                description="Create an examination first to enter and manage results."
                                action={
                                    <Button href={route('exams.create')}>
                                        Create Examination
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
                                                Examination
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Standard
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Session
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Marks Entered
                                            </th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                Summaries
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
                                        {exams.data.map((exam) => (
                                            <tr
                                                key={exam.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                                            <DocumentTextIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-bold text-slate-800">
                                                                {exam.name}
                                                            </div>

                                                            {exam.exam_type && (
                                                                <div className="mt-0.5 text-xs text-slate-400">
                                                                    {exam.exam_type.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                                    {exam.standard?.name || '—'}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {exam.academic_session?.name || '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            exam.results_count > 0
                                                                ? 'success'
                                                                : 'default'
                                                        }
                                                    >
                                                        {exam.results_count} entries
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            exam.result_summaries_count > 0
                                                                ? 'info'
                                                                : 'default'
                                                        }
                                                    >
                                                        {exam.result_summaries_count} students
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(exam.status)}>
                                                        {exam.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'results.marks-entry',
                                                                exam.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                                                            title="Enter Marks"
                                                        >
                                                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'results.show',
                                                                exam.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View Results"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={exams.links}
                                from={exams.from}
                                to={exams.to}
                                total={exams.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}