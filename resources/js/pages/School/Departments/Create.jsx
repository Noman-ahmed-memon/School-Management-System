import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    BriefcaseIcon,
    BuildingOffice2Icon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, campuses }) {
    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        name: '',
        code: '',
        description: '',
        head_name: '',
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.departments.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Department" />

            <div className="mx-auto max-w-4xl space-y-7">
                <PageHeader
                    title="Create Department"
                    subtitle="Establish a new academic department within a campus"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Departments',
                            href: route('school.departments.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                {/* Intro */}
                <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-600 via-cyan-700 to-slate-900 p-6 shadow-lg shadow-teal-100">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                            <BriefcaseIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-teal-100">
                                Department Setup
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-white">
                                Define an academic unit
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-teal-100">
                                Assign the department to a campus and configure its
                                identity, leadership, description, and status.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader
                            title="Department Information"
                            subtitle="Provide the core information for this department"
                        />

                        <CardBody className="space-y-6">
                            {/* Campus */}
                            <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100">
                                        <BuildingOffice2Icon className="h-5 w-5 text-teal-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Academic placement
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-600">
                                            Select the campus where this department
                                            operates.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Select
                                label="Campus"
                                required
                                value={data.campus_id}
                                onChange={(e) =>
                                    setData('campus_id', e.target.value)
                                }
                                error={errors.campus_id}
                                placeholder="Select Campus"
                                options={campuses.map((c) => ({
                                    value: c.id,
                                    label: c.name,
                                }))}
                            />

                            {/* Identity */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Department Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={errors.name}
                                    placeholder="e.g. Science Department"
                                />

                                <Input
                                    label="Code"
                                    required
                                    value={data.code}
                                    onChange={(e) =>
                                        setData(
                                            'code',
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    error={errors.code}
                                    placeholder="e.g. SCI"
                                    hint="Use a short unique identifier"
                                />
                            </div>

                            {/* Leadership */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                        <AcademicCapIcon className="h-5 w-5 text-slate-500" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Department Leadership
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Record the current head of department.
                                        </p>
                                    </div>
                                </div>

                                <Input
                                    label="Head of Department"
                                    value={data.head_name}
                                    onChange={(e) =>
                                        setData('head_name', e.target.value)
                                    }
                                    error={errors.head_name}
                                    placeholder="e.g. Dr. Ahmed Khan"
                                />
                            </div>

                            <Textarea
                                label="Description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                error={errors.description}
                                rows={4}
                                placeholder="Describe the department, its academic focus, or responsibilities..."
                            />

                            <Select
                                label="Status"
                                required
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                error={errors.status}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                            />
                        </CardBody>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('school.departments.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Creating...'
                                    : 'Create Department'}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}