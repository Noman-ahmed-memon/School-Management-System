import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    Squares2X2Icon,
    AcademicCapIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, section, standards }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        standard_id: section.standard_id || '',
        name: section.name || '',
        code: section.code || '',
        capacity: section.capacity || 30,
        status: section.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.sections.update', section.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${section.name}`} />

            <div className="max-w-2xl mx-auto space-y-7 pb-8">
                <PageHeader
                    title="Edit Section"
                    subtitle={`Update configuration for ${section.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Sections', href: route('school.sections.index') },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
                                    <Squares2X2Icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Section Details
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Update academic placement, capacity and operational status.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6 bg-white p-6">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                <div className="flex items-start gap-3">
                                    <AcademicCapIcon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-indigo-900">
                                            Academic Placement
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-indigo-700">
                                            Update the standard association and section identity
                                            without changing the existing enrollment records.
                                        </p>
                                    </div>
                                </div>
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Section Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />

                                <Input
                                    label="Code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    error={errors.code}
                                />
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                        <UserGroupIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Enrollment Capacity
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Control the maximum number of students allowed.
                                        </p>
                                    </div>
                                </div>

                                <Input
                                    label="Capacity"
                                    type="number"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', e.target.value)}
                                    error={errors.capacity}
                                />
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
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('school.sections.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Section'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}