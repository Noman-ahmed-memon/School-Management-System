import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    BookOpenIcon,
    InformationCircleIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, subject }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: subject.name || '',
        code: subject.code || '',
        type: subject.type || 'theory',
        is_compulsory: subject.is_compulsory ?? true,
        credit_hours: subject.credit_hours || 0,
        description: subject.description || '',
        status: subject.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.subjects.update', subject.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${subject.name}`} />

            <div className="max-w-3xl mx-auto space-y-6">
                <PageHeader
                    title="Edit Subject"
                    subtitle={`Update details for ${subject.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Subjects', href: route('school.subjects.index') },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
                                    <BookOpenIcon className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Subject Information
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Maintain the academic properties of this subject.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Subject Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />

                                <Input
                                    label="Code"
                                    required
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    error={errors.code}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Select
                                    label="Type"
                                    required
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    error={errors.type}
                                    options={[
                                        { value: 'theory', label: 'Theory' },
                                        { value: 'practical', label: 'Practical' },
                                    ]}
                                />

                                <Input
                                    label="Credit Hours"
                                    type="number"
                                    value={data.credit_hours}
                                    onChange={(e) => setData('credit_hours', e.target.value)}
                                    error={errors.credit_hours}
                                />
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

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <AcademicCapIcon className="h-4 w-4 text-indigo-600" />
                                        <span className="text-sm font-semibold text-slate-800">
                                            Compulsory subject
                                        </span>
                                    </div>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Mark this subject as mandatory within the curriculum.
                                    </p>
                                </div>
                            </label>

                            <Textarea
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                rows={4}
                                placeholder="Add an optional description..."
                            />

                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                                        <InformationCircleIcon className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Subject Availability
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Control whether this subject can currently be used.
                                        </p>
                                    </div>
                                </div>

                                <Select
                                    label="Status"
                                    required
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'inactive', label: 'Inactive' },
                                    ]}
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('school.subjects.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Subject'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}