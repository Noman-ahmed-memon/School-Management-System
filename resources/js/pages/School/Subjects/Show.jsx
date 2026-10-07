import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BookOpenIcon,
    PencilIcon,
    AcademicCapIcon,
    ClockIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, subject }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={subject.name} />

            <div className="space-y-6">
                <PageHeader
                    title={subject.name}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Subjects', href: route('school.subjects.index') },
                        { label: subject.name },
                    ]}
                    action={
                        <Button href={route('school.subjects.edit', subject.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Subject Information"
                        subtitle="Academic identity and curriculum configuration"
                    />

                    <CardBody className="space-y-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                                <BookOpenIcon className="h-10 w-10 text-indigo-600" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {subject.name}
                                </h3>

                                <code className="mt-1 inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                    {subject.code}
                                </code>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge
                                        variant={
                                            subject.status === 'active'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {subject.status}
                                    </Badge>

                                    <Badge variant="info">
                                        {subject.type}
                                    </Badge>

                                    {subject.is_compulsory ? (
                                        <Badge variant="success">
                                            Compulsory
                                        </Badge>
                                    ) : (
                                        <Badge variant="warning">
                                            Optional
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 md:grid-cols-3">
                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                <div className="flex items-center gap-2">
                                    <AcademicCapIcon className="h-4 w-4 text-indigo-500" />
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Type
                                    </div>
                                </div>

                                <div className="mt-2 text-sm font-semibold capitalize text-slate-800">
                                    {subject.type}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="h-4 w-4 text-indigo-500" />
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Credit Hours
                                    </div>
                                </div>

                                <div className="mt-2 text-sm font-semibold text-slate-800">
                                    {subject.credit_hours}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                <div className="flex items-center gap-2">
                                    <InformationCircleIcon className="h-4 w-4 text-indigo-500" />
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Compulsory
                                    </div>
                                </div>

                                <div className="mt-2 text-sm font-semibold text-slate-800">
                                    {subject.is_compulsory ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </div>

                        {subject.description && (
                            <div className="border-t border-slate-200 pt-5">
                                <div className="mb-2 flex items-center gap-2">
                                    <InformationCircleIcon className="h-4 w-4 text-slate-400" />
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Description
                                    </div>
                                </div>

                                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                                    {subject.description}
                                </p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}