import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import EmptyState from '@/Components/ui/EmptyState';
import {
    LinkIcon,
    TrashIcon,
    UserCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
    FunnelIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, assignments, standards, teachers, filters }) {
    const [standardId, setStandardId] = useState(filters?.standard_id || '');
    const [teacherId, setTeacherId] = useState(filters?.teacher_id || '');

    const handleFilter = () => {
        router.get(
            route('school.standard-subjects.index'),
            {
                standard_id: standardId,
                teacher_id: teacherId,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setStandardId('');
        setTeacherId('');
        router.get(route('school.standard-subjects.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Remove this subject assignment?')) {
            router.delete(route('school.standard-subjects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Standard Subjects" />

            <div className="space-y-6">
                <PageHeader
                    title="Standard Subjects"
                    subtitle="Assign subjects and teachers to standards"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Standard Subjects' },
                    ]}
                    action={
                        <Button href={route('school.standard-subjects.create')}>
                            + Assign Subject
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    {/* Filter Panel */}
                    <div className="border-b border-slate-200 bg-slate-50/70 p-5">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                <FunnelIcon className="h-4 w-4 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Assignment Filters
                                </p>
                                <p className="text-xs text-slate-500">
                                    Narrow the assignment list by standard or teacher.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-end gap-4">
                            <div className="min-w-[220px] flex-1">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Standard
                                </label>

                                <select
                                    value={standardId}
                                    onChange={(e) => setStandardId(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Standards</option>
                                    {standards.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="min-w-[220px] flex-1">
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Teacher
                                </label>

                                <select
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Teachers</option>
                                    {teachers.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleFilter}
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Filter
                            </button>

                            {(standardId || teacherId) && (
                                <button
                                    onClick={handleClear}
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {assignments.data.length === 0 ? (
                        <EmptyState
                            icon={<LinkIcon />}
                            title="No subject assignments found"
                            description="Assign subjects to standards to get started."
                            action={
                                <Button href={route('school.standard-subjects.create')}>
                                    + Assign Subject
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Standard
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Subject
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Teacher
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Session
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Type
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {assignments.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100">
                                                            <AcademicCapIcon className="h-4 w-4 text-indigo-600" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {item.standard?.name}
                                                            </div>
                                                            <code className="text-xs font-medium text-slate-400">
                                                                {item.standard?.code}
                                                            </code>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
                                                            <BookOpenIcon className="h-4 w-4 text-emerald-600" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {item.subject?.name}
                                                            </div>
                                                            <code className="rounded bg-slate-50 px-1.5 py-0.5 text-xs text-slate-500">
                                                                {item.subject?.code}
                                                            </code>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <UserCircleIcon className="h-7 w-7 text-slate-300" />
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {item.teacher?.user?.name || '—'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <CalendarDaysIcon className="h-4 w-4 text-slate-400" />
                                                        {item.academic_session?.name || '—'}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {item.is_compulsory ? (
                                                        <Badge variant="success">
                                                            Compulsory
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="warning">
                                                            Optional
                                                        </Badge>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                        title="Remove"
                                                        aria-label={`Remove ${item.subject?.name || 'subject'} assignment`}
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