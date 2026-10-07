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

export default function Edit({ auth, department, campuses }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        campus_id: department.campus_id || '',
        name: department.name || '',
        code: department.code || '',
        description: department.description || '',
        head_name: department.head_name || '',
        status: department.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.departments.update', department.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${department.name}`} />

            <div className="mx-auto max-w-4xl space-y-7">
                <PageHeader
                    title="Edit Department"
                    subtitle={`Update ${department.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Departments',
                            href: route('school.departments.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                {/* Current Department */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-50 blur-3xl" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-100">
                                <BriefcaseIcon className="h-6 w-6 text-teal-600" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Editing Department
                                </p>

                                <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                                    {department.name}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Department code:{' '}
                                    <span className="font-semibold text-teal-600">
                                        {department.code}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                department.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                            }`}
                        >
                            <span
                                className={`mr-2 h-1.5 w-1.5 rounded-full ${
                                    department.status === 'active'
                                        ? 'bg-emerald-500'
                                        : 'bg-rose-500'
                                }`}
                            />
                            {department.status}
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader
                            title="Department Information"
                            subtitle="Update the academic unit's information"
                        />

                        <CardBody className="space-y-6">
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Department Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={errors.name}
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
                                />
                            </div>

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
                                            Update the current head of department.
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
                                    ? 'Updating...'
                                    : 'Update Department'}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}