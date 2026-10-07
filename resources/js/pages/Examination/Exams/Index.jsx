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
    DocumentTextIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, exams, standards, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [standardId, setStandardId] = useState(filters?.standard_id || '');

    const handleSearch = () => {
        router.get(
            route('exams.index'),
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
        router.get(route('exams.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this exam?')) {
            router.delete(route('exams.destroy', id));
        }
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

    const getStatusStyles = (status) => {
        const map = {
            scheduled: 'bg-blue-50 text-blue-700 ring-blue-600/10',
            ongoing: 'bg-amber-50 text-amber-700 ring-amber-600/10',
            completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
            cancelled: 'bg-red-50 text-red-700 ring-red-600/10',
        };

        return map[status] || 'bg-slate-50 text-slate-600 ring-slate-500/10';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Exams" />

            <div className="space-y-7">

                <PageHeader
                    title="Examinations"
                    subtitle="Manage assessments, schedules and academic results"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams' },
                    ]}
                    action={
                        <Button href={route('exams.create')}>
                            <span className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 5v14M5 12h14"
                                    />
                                </svg>
                                Create Exam
                            </span>
                        </Button>
                    }
                />

                {/* =====================================================
                    OVERVIEW STRIP
                ====================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-4
                ">

                    <div className="
                        relative overflow-hidden
                        rounded-2xl
                        border border-blue-100
                        bg-gradient-to-br from-blue-50 to-white
                        p-5
                    ">
                        <div className="
                            absolute -right-5 -top-5
                            h-24 w-24
                            rounded-full
                            bg-blue-500/5
                        " />

                        <div className="relative flex items-center gap-4">

                            <div className="
                                h-11 w-11
                                rounded-xl
                                bg-blue-600
                                flex items-center justify-center
                                shadow-lg shadow-blue-600/20
                            ">
                                <DocumentTextIcon className="h-5 w-5 text-white" />
                            </div>

                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {exams.total}
                                </div>
                                <div className="text-xs text-slate-500">
                                    Total examinations
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="
                        rounded-2xl
                        border border-amber-100
                        bg-gradient-to-br from-amber-50 to-white
                        p-5
                    ">
                        <div className="flex items-center gap-4">

                            <div className="
                                h-11 w-11
                                rounded-xl
                                bg-amber-500
                                flex items-center justify-center
                                shadow-lg shadow-amber-500/20
                            ">
                                <svg
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <div className="text-lg font-bold text-slate-900">
                                    Academic
                                </div>
                                <div className="text-xs text-slate-500">
                                    Assessment management
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="
                        rounded-2xl
                        border border-emerald-100
                        bg-gradient-to-br from-emerald-50 to-white
                        p-5
                    ">
                        <div className="flex items-center gap-4">

                            <div className="
                                h-11 w-11
                                rounded-xl
                                bg-emerald-500
                                flex items-center justify-center
                                shadow-lg shadow-emerald-500/20
                            ">
                                <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />
                            </div>

                            <div>
                                <div className="text-lg font-bold text-slate-900">
                                    Results
                                </div>
                                <div className="text-xs text-slate-500">
                                    Marks entry available
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* =====================================================
                    MAIN TABLE
                ====================================================== */}

                <Card className="
                    overflow-hidden
                    border-slate-200/80
                    shadow-sm
                ">

                    {/* Filter header */}
                    <div className="
                        border-b border-slate-100
                        bg-slate-50/60
                        p-4
                    ">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by exam name..."
                        >
                            <select
                                value={standardId}
                                onChange={(e) =>
                                    setStandardId(e.target.value)
                                }
                                className="
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    text-sm
                                    text-slate-700
                                    shadow-sm
                                    focus:border-blue-500
                                    focus:ring-blue-500/20
                                "
                            >
                                <option value="">All Standards</option>

                                {standards.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    text-sm
                                    text-slate-700
                                    shadow-sm
                                    focus:border-blue-500
                                    focus:ring-blue-500/20
                                "
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
                        <div className="py-8">
                            <EmptyState
                                icon={<DocumentTextIcon />}
                                title="No exams found"
                                description="Create your first exam to get started."
                                action={
                                    <Button href={route('exams.create')}>
                                        Create Exam
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">

                                <table className="min-w-full">

                                    <thead>
                                        <tr className="
                                            border-b
                                            border-slate-100
                                            bg-slate-50/50
                                        ">
                                            {[
                                                'Exam',
                                                'Type',
                                                'Standard',
                                                'Session',
                                                'Dates',
                                                'Marks',
                                                'Status',
                                                'Actions',
                                            ].map((heading, index) => (
                                                <th
                                                    key={heading}
                                                    className={`
                                                        px-5 py-4
                                                        text-left
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.12em]
                                                        text-slate-400
                                                        ${index === 7 ? 'text-right' : ''}
                                                    `}
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">

                                        {exams.data.map((exam) => (

                                            <tr
                                                key={exam.id}
                                                className="
                                                    group
                                                    transition-colors
                                                    hover:bg-blue-50/30
                                                "
                                            >

                                                {/* Exam */}
                                                <td className="px-5 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="
                                                            relative
                                                            h-11 w-11
                                                            shrink-0
                                                            rounded-xl
                                                            bg-gradient-to-br
                                                            from-blue-50
                                                            to-indigo-100
                                                            flex items-center justify-center
                                                            ring-1 ring-blue-100
                                                        ">
                                                            <DocumentTextIcon className="
                                                                h-5 w-5
                                                                text-blue-600
                                                            " />

                                                            <span className="
                                                                absolute
                                                                -bottom-1
                                                                -right-1
                                                                h-3 w-3
                                                                rounded-full
                                                                bg-blue-500
                                                                ring-2
                                                                ring-white
                                                            " />
                                                        </div>

                                                        <div className="min-w-0">

                                                            <div className="
                                                                text-sm
                                                                font-semibold
                                                                text-slate-900
                                                                truncate
                                                                max-w-[220px]
                                                            ">
                                                                {exam.name}
                                                            </div>

                                                            <div className="
                                                                mt-1
                                                                text-[11px]
                                                                text-slate-400
                                                            ">
                                                                Examination #{exam.id}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* Type */}
                                                <td className="
                                                    px-5 py-5
                                                    text-sm
                                                    text-slate-600
                                                ">
                                                    {exam.exam_type?.name || '—'}
                                                </td>

                                                {/* Standard */}
                                                <td className="
                                                    px-5 py-5
                                                    text-sm
                                                    text-slate-600
                                                ">
                                                    {exam.standard?.name || '—'}
                                                </td>

                                                {/* Session */}
                                                <td className="
                                                    px-5 py-5
                                                    text-sm
                                                    text-slate-600
                                                ">
                                                    {exam.academic_session?.name || '—'}
                                                </td>

                                                {/* Dates */}
                                                <td className="px-5 py-5">

                                                    <div className="
                                                        text-xs
                                                        font-medium
                                                        text-slate-700
                                                    ">
                                                        {exam.start_date?.split('T')[0]}
                                                    </div>

                                                    <div className="
                                                        mt-1
                                                        text-[10px]
                                                        text-slate-400
                                                    ">
                                                        to {exam.end_date?.split('T')[0]}
                                                    </div>

                                                </td>

                                                {/* Marks */}
                                                <td className="px-5 py-5">

                                                    <div className="
                                                        text-sm
                                                        font-semibold
                                                        text-slate-700
                                                    ">
                                                        {exam.total_marks}
                                                    </div>

                                                    <div className="
                                                        mt-1
                                                        text-[10px]
                                                        text-slate-400
                                                    ">
                                                        Pass: {exam.passing_marks}
                                                    </div>

                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-5">

                                                    <span className={`
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        px-2.5 py-1
                                                        text-[10px]
                                                        font-bold
                                                        capitalize
                                                        ring-1
                                                        ring-inset
                                                        ${getStatusStyles(exam.status)}
                                                    `}>
                                                        <span className="
                                                            h-1.5 w-1.5
                                                            rounded-full
                                                            bg-current
                                                        " />
                                                        {exam.status}
                                                    </span>

                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-5">

                                                    <div className="
                                                        flex
                                                        justify-end
                                                        items-center
                                                        gap-1
                                                    ">

                                                        <Link
                                                            href={route(
                                                                'results.marks-entry',
                                                                exam.id
                                                            )}
                                                            className="
                                                                group/action
                                                                h-8 w-8
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-slate-400
                                                                hover:bg-emerald-50
                                                                hover:text-emerald-600
                                                                transition-all
                                                            "
                                                            title="Enter Marks"
                                                        >
                                                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'exams.show',
                                                                exam.id
                                                            )}
                                                            className="
                                                                h-8 w-8
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-slate-400
                                                                hover:bg-blue-50
                                                                hover:text-blue-600
                                                                transition-all
                                                            "
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'exams.edit',
                                                                exam.id
                                                            )}
                                                            className="
                                                                h-8 w-8
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-slate-400
                                                                hover:bg-indigo-50
                                                                hover:text-indigo-600
                                                                transition-all
                                                            "
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(exam.id)
                                                            }
                                                            className="
                                                                h-8 w-8
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-slate-400
                                                                hover:bg-red-50
                                                                hover:text-red-600
                                                                transition-all
                                                            "
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

                            <div className="border-t border-slate-100">
                                <Pagination
                                    links={exams.links}
                                    from={exams.from}
                                    to={exams.to}
                                    total={exams.total}
                                />
                            </div>
                        </>
                    )}

                </Card>

            </div>
        </AuthenticatedLayout>
    );
}