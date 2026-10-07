import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Select from '@/Components/ui/Select';
import {
    LinkIcon,
    AcademicCapIcon,
    BookOpenIcon,
    UserIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, standards, subjects, teachers, academicSessions }) {
    const { data, setData, post, processing, errors } = useForm({
        standard_id: '',
        subject_id: '',
        teacher_id: '',
        academic_session_id: '',
        is_compulsory: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.standard-subjects.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Assign Subject" />

            <div className="max-w-3xl mx-auto space-y-6">
                <PageHeader
                    title="Assign Subject to Standard"
                    subtitle="Link a subject, teacher and academic session to a standard"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Standard Subjects',
                            href: route('school.standard-subjects.index'),
                        },
                        { label: 'Assign' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
                                    <LinkIcon className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Subject Assignment
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Connect the academic entities that define this subject offering.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <AcademicCapIcon className="h-4 w-4 text-indigo-600" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Academic Standard
                                        </span>
                                    </div>

                                    <Select
                                        label="Standard"
                                        required
                                        value={data.standard_id}
                                        onChange={(e) => setData('standard_id', e.target.value)}
                                        error={errors.standard_id}
                                        placeholder="Select Standard"
                                        options={standards.map((s) => ({
                                            value: s.id,
                                            label: `${s.name} (${s.code})`,
                                        }))}
                                    />
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <BookOpenIcon className="h-4 w-4 text-indigo-600" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Subject
                                        </span>
                                    </div>

                                    <Select
                                        label="Subject"
                                        required
                                        value={data.subject_id}
                                        onChange={(e) => setData('subject_id', e.target.value)}
                                        error={errors.subject_id}
                                        placeholder="Select Subject"
                                        options={subjects.map((s) => ({
                                            value: s.id,
                                            label: `${s.name} (${s.code})`,
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <UserIcon className="h-4 w-4 text-indigo-600" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Instruction
                                        </span>
                                    </div>

                                    <Select
                                        label="Teacher"
                                        required
                                        value={data.teacher_id}
                                        onChange={(e) => setData('teacher_id', e.target.value)}
                                        error={errors.teacher_id}
                                        placeholder="Select Teacher"
                                        options={teachers.map((t) => ({
                                            value: t.id,
                                            label: t.name,
                                        }))}
                                    />
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <CalendarDaysIcon className="h-4 w-4 text-indigo-600" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Academic Period
                                        </span>
                                    </div>

                                    <Select
                                        label="Academic Session"
                                        required
                                        value={data.academic_session_id}
                                        onChange={(e) =>
                                            setData('academic_session_id', e.target.value)
                                        }
                                        error={errors.academic_session_id}
                                        placeholder="Select Academic Session"
                                        options={academicSessions.map((s) => ({
                                            value: s.id,
                                            label: s.name,
                                        }))}
                                    />
                                </div>
                            </div>

                            <label
                                htmlFor="is_compulsory"
                                className="flex cursor-pointer items-center gap-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 transition hover:bg-indigo-50"
                            >
                                <input
                                    type="checkbox"
                                    id="is_compulsory"
                                    checked={data.is_compulsory}
                                    onChange={(e) =>
                                        setData('is_compulsory', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />

                                <div>
                                    <div className="text-sm font-semibold text-slate-800">
                                        Compulsory subject
                                    </div>
                                    <div className="mt-0.5 text-xs text-slate-500">
                                        Mark this subject as mandatory for students in this standard.
                                    </div>
                                </div>
                            </label>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('school.standard-subjects.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Assigning...' : 'Assign Subject'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}