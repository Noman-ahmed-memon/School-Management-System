import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    AcademicCapIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        order: '',
        description: '',
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.standards.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Standard" />

            <div className="max-w-3xl mx-auto space-y-6">
                <PageHeader
                    title="Create Standard"
                    subtitle="Add a new class or academic standard to the system"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Standards', href: route('school.standards.index') },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        {/* Section Header */}
                        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
                                    <AcademicCapIcon className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Standard Information
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Define the identity and ordering of this academic standard.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g. Grade 1, Playgroup"
                                />

                                <Input
                                    label="Code"
                                    required
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    error={errors.code}
                                    placeholder="e.g. G1, PG"
                                />
                            </div>

                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                                        <AdjustmentsHorizontalIcon className="h-4 w-4" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Display ordering
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                                            Use the display order to control how standards appear
                                            throughout academic lists.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Input
                                        label="Display Order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', e.target.value)}
                                        error={errors.order}
                                        placeholder="Leave empty to auto-assign"
                                        hint="Determines sorting order in lists"
                                    />
                                </div>
                            </div>

                            <Textarea
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                rows={4}
                                placeholder="Add an optional description for this standard..."
                            />

                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                                        <InformationCircleIcon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Availability
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Control whether this standard is currently available.
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
                                href={route('school.standards.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Standard'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}