import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    AcademicCapIcon,
    PencilIcon,
    Squares2X2Icon,
    BookOpenIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, standard, stats }) {
    const statCards = [
        {
            label: 'Sections',
            value: stats?.sections_count ?? 0,
            icon: Squares2X2Icon,
            iconClass: 'text-pink-600',
            bgClass: 'bg-pink-50',
            ringClass: 'ring-pink-100',
        },
        {
            label: 'Subjects',
            value: stats?.subjects_count ?? 0,
            icon: BookOpenIcon,
            iconClass: 'text-indigo-600',
            bgClass: 'bg-indigo-50',
            ringClass: 'ring-indigo-100',
        },
        {
            label: 'Students',
            value: stats?.students_count ?? 0,
            icon: UsersIcon,
            iconClass: 'text-blue-600',
            bgClass: 'bg-blue-50',
            ringClass: 'ring-blue-100',
        },
    ];

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={standard.name} />

            <div className="space-y-6">
                <PageHeader
                    title={standard.name}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Standards', href: route('school.standards.index') },
                        { label: standard.name },
                    ]}
                    action={
                        <Button href={route('school.standards.edit', standard.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Standard
                        </Button>
                    }
                />

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {statCards.map((stat) => (
                        <Card key={stat.label} className="overflow-hidden">
                            <div className="flex items-center p-5">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgClass} ${stat.iconClass} ring-1 ${stat.ringClass}`}
                                >
                                    <stat.icon className="h-6 w-6" />
                                </div>

                                <div className="ml-4">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        {stat.label}
                                    </div>
                                    <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Standard Information */}
                <Card className="overflow-hidden">
                    <CardHeader
                        title="Standard Information"
                        subtitle="Academic identity and configuration"
                    />

                    <CardBody className="space-y-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                                <AcademicCapIcon className="h-10 w-10 text-indigo-600" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {standard.name}
                                </h3>

                                <code className="mt-1 inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                    {standard.code}
                                </code>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge
                                        variant={
                                            standard.status === 'active'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {standard.status}
                                    </Badge>

                                    <Badge variant="info">
                                        Order: {standard.order}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {standard.description && (
                            <div className="border-t border-slate-200 pt-5">
                                <div className="mb-2 flex items-center gap-2">
                                    <ClipboardDocumentListIcon className="h-4 w-4 text-slate-400" />
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Description
                                    </div>
                                </div>

                                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                                    {standard.description}
                                </p>
                            </div>
                        )}
                    </CardBody>
                </Card>

                {/* Sections */}
                <Card className="overflow-hidden">
                    <CardHeader
                        title="Sections"
                        subtitle={`${standard.sections?.length || 0} total`}
                    />

                    <CardBody className="p-0">
                        {standard.sections && standard.sections.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {standard.sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/70"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-50 ring-1 ring-pink-100">
                                                <Squares2X2Icon className="h-4 w-4 text-pink-600" />
                                            </div>

                                            <span className="truncate text-sm font-semibold text-slate-800">
                                                {section.name}
                                            </span>
                                        </div>

                                        <span className="ml-4 shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                            Capacity: {section.capacity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                                    <Squares2X2Icon className="h-6 w-6 text-slate-400" />
                                </div>
                                <p className="mt-3 text-sm font-medium text-slate-700">
                                    No sections created yet.
                                </p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}