import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    BuildingOfficeIcon,
    PhotoIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, organization }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: organization.name || '',
        code: organization.code || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        website: organization.website || '',
        logo: null,
        status: organization.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('school.organizations.update', organization.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${organization.name}`} />

            <div className="mx-auto max-w-5xl space-y-7">
                <PageHeader
                    title="Edit Organization"
                    subtitle={`Update details for ${organization.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Organizations',
                            href: route('school.organizations.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                {/* Current Organization */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-indigo-50 blur-3xl" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            {organization.logo ? (
                                <img
                                    src={`/storage/${organization.logo}`}
                                    alt={organization.name}
                                    className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                                />
                            ) : (
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                    <BuildingOfficeIcon className="h-7 w-7 text-indigo-600" />
                                </div>
                            )}

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Editing Organization
                                </p>

                                <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                                    {organization.name}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Code:{' '}
                                    <span className="font-semibold text-indigo-600">
                                        {organization.code}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                organization.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                            }`}
                        >
                            <span
                                className={`mr-2 h-1.5 w-1.5 rounded-full ${
                                    organization.status === 'active'
                                        ? 'bg-emerald-500'
                                        : 'bg-rose-500'
                                }`}
                            />
                            {organization.status}
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader
                            title="Organization Information"
                            subtitle="Update institutional information and branding"
                        />

                        <CardBody className="space-y-6">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                        <InformationCircleIcon className="h-5 w-5 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Organization identity
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-600">
                                            Keep the organization name and code
                                            consistent across the system.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Organization Name"
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    error={errors.email}
                                />

                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    error={errors.phone}
                                />
                            </div>

                            <Input
                                label="Website"
                                value={data.website}
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                error={errors.website}
                            />

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                error={errors.address}
                                rows={3}
                            />

                            {/* Logo */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                        <PhotoIcon className="h-5 w-5 text-slate-500" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Organization Logo
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Replace the current logo if needed.
                                        </p>
                                    </div>
                                </div>

                                {organization.logo && (
                                    <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3">
                                        <img
                                            src={`/storage/${organization.logo}`}
                                            alt={organization.name}
                                            className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Current Logo
                                            </p>
                                            <p className="mt-1 text-sm text-slate-600">
                                                Upload a new image below to replace it.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'logo',
                                            e.target.files[0]
                                        )
                                    }
                                    className="block w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-500 file:mr-4 file:border-0 file:bg-indigo-50 file:px-4 file:py-2.5 file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />

                                {errors.logo && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>

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
                                href={route(
                                    'school.organizations.index'
                                )}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Updating...'
                                    : 'Update Organization'}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}