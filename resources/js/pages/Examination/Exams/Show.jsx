import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    DocumentTextIcon,
    PencilIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, exam }) {
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
            <Head title={exam.name} />

            <div className="space-y-7">

                <PageHeader
                    title={exam.name}
                    subtitle="Examination overview and configuration"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        { label: exam.name },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2">

                            <Button
                                variant="outline"
                                href={route(
                                    'results.marks-entry',
                                    exam.id
                                )}
                            >
                                <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2" />
                                Enter Marks
                            </Button>

                            <Button
                                href={route('exams.edit', exam.id)}
                            >
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Edit
                            </Button>

                        </div>
                    }
                />

                {/* =====================================================
                    HERO EXAM CARD
                ====================================================== */}

                <div className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#07111f]
                    via-[#0d1c31]
                    to-[#102b50]
                    shadow-xl
                    shadow-slate-900/10
                ">

                    <div className="
                        absolute
                        -right-24
                        -top-32
                        h-72 w-72
                        rounded-full
                        bg-blue-500/10
                        blur-3xl
                    " />

                    <div className="
                        absolute
                        -bottom-32
                        left-1/3
                        h-64 w-64
                        rounded-full
                        bg-indigo-500/10
                        blur-3xl
                    " />

                    <div className="
                        relative
                        flex flex-col
                        md:flex-row
                        md:items-center
                        justify-between
                        gap-6
                        p-6 sm:p-8
                    ">

                        <div className="flex items-center gap-5">

                            <div className="
                                h-16 w-16
                                shrink-0
                                rounded-2xl
                                border border-blue-400/20
                                bg-blue-500/10
                                flex items-center justify-center
                            ">
                                <DocumentTextIcon className="
                                    h-8 w-8
                                    text-blue-300
                                " />
                            </div>

                            <div>

                                <div className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    font-semibold
                                    text-blue-300
                                ">
                                    Examination
                                </div>

                                <h2 className="
                                    mt-1
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    text-white
                                    tracking-tight
                                ">
                                    {exam.name}
                                </h2>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    <span className={`
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        px-3 py-1
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

                                    {exam.exam_type && (
                                        <span className="
                                            inline-flex
                                            items-center
                                            rounded-full
                                            bg-white/[0.07]
                                            px-3 py-1
                                            text-[10px]
                                            font-semibold
                                            text-slate-300
                                            ring-1
                                            ring-inset
                                            ring-white/10
                                        ">
                                            {exam.exam_type.name}
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="
                            flex
                            md:flex-col
                            items-start
                            md:items-end
                            gap-1
                            text-left
                            md:text-right
                        ">
                            <div className="
                                text-[10px]
                                uppercase
                                tracking-wider
                                text-slate-500
                            ">
                                Total Marks
                            </div>

                            <div className="
                                text-3xl
                                font-bold
                                text-white
                            ">
                                {exam.total_marks}
                            </div>

                            <div className="
                                text-[10px]
                                text-slate-500
                            ">
                                Passing: {exam.passing_marks}
                            </div>
                        </div>

                    </div>

                </div>

                {/* =====================================================
                    INFORMATION GRID
                ====================================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main details */}
                    <Card className="
                        lg:col-span-2
                        border-slate-200/80
                        shadow-sm
                        overflow-hidden
                    ">

                        <CardHeader
                            title="Exam Details"
                        />

                        <CardBody>

                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-0
                            ">

                                {/* Standard */}
                                <div className="
                                    p-5
                                    border-b
                                    sm:border-r
                                    border-slate-100
                                ">
                                    <div className="
                                        flex items-center gap-3
                                    ">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-blue-50
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M4 19h16M6 17V8l6-4 6 4v9M9 17v-4h6v4"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                font-semibold
                                                text-slate-400
                                            ">
                                                Standard
                                            </div>

                                            <div className="
                                                mt-1
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {exam.standard?.name || '—'}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Session */}
                                <div className="
                                    p-5
                                    border-b
                                    border-slate-100
                                ">
                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-indigo-50
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-indigo-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                font-semibold
                                                text-slate-400
                                            ">
                                                Academic Session
                                            </div>

                                            <div className="
                                                mt-1
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {exam.academic_session?.name || '—'}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Start */}
                                <div className="
                                    p-5
                                    border-b
                                    sm:border-b-0
                                    sm:border-r
                                    border-slate-100
                                ">
                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-emerald-50
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-emerald-600"
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
                                            <div className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                font-semibold
                                                text-slate-400
                                            ">
                                                Start Date
                                            </div>

                                            <div className="
                                                mt-1
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {exam.start_date?.split('T')[0]}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* End */}
                                <div className="p-5">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-amber-50
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-amber-600"
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
                                            <div className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                font-semibold
                                                text-slate-400
                                            ">
                                                End Date
                                            </div>

                                            <div className="
                                                mt-1
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {exam.end_date?.split('T')[0]}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </CardBody>
                    </Card>

                    {/* Quick actions */}
                    <Card className="
                        border-slate-200/80
                        shadow-sm
                    ">

                        <CardHeader title="Quick Actions" />

                        <CardBody className="space-y-3">

                            <Link
                                href={route(
                                    'results.marks-entry',
                                    exam.id
                                )}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    rounded-xl
                                    border
                                    border-blue-100
                                    bg-blue-50/60
                                    px-4 py-3
                                    transition-all
                                    hover:bg-blue-600
                                    hover:border-blue-600
                                "
                            >
                                <div className="
                                    h-9 w-9
                                    rounded-lg
                                    bg-blue-100
                                    group-hover:bg-white/10
                                    flex
                                    items-center
                                    justify-center
                                    transition-colors
                                ">
                                    <ClipboardDocumentCheckIcon className="
                                        h-5 w-5
                                        text-blue-600
                                        group-hover:text-white
                                    " />
                                </div>

                                <div>
                                    <div className="
                                        text-sm
                                        font-semibold
                                        text-blue-900
                                        group-hover:text-white
                                    ">
                                        Enter Marks
                                    </div>

                                    <div className="
                                        text-[10px]
                                        text-blue-600/60
                                        group-hover:text-blue-100
                                    ">
                                        Record student results
                                    </div>
                                </div>

                            </Link>

                            <Link
                                href={route(
                                    'results.show',
                                    exam.id
                                )}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4 py-3
                                    transition-all
                                    hover:bg-slate-50
                                    hover:border-slate-300
                                "
                            >
                                <div className="
                                    h-9 w-9
                                    rounded-lg
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <svg
                                        className="
                                            h-5 w-5
                                            text-slate-500
                                        "
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.7"
                                            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="2.5"
                                            strokeWidth="1.7"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <div className="
                                        text-sm
                                        font-semibold
                                        text-slate-800
                                    ">
                                        View Results
                                    </div>

                                    <div className="
                                        text-[10px]
                                        text-slate-400
                                    ">
                                        Review examination results
                                    </div>
                                </div>

                            </Link>

                        </CardBody>
                    </Card>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}