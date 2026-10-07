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
    GlobeAltIcon,
    PhotoIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        logo: null,
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('school.organizations.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Organization" />

            <div className="mx-auto max-w-5xl space-y-7">
                <PageHeader
                    title="Create Organization"
                    subtitle="Add a new educational organization to the system"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Organizations',
                            href: route('school.organizations.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                {/* Intro */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 shadow-lg shadow-indigo-100">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />

                    <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                            <BuildingOfficeIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-indigo-100">
                                Organization Setup
                            </p>

                            <h2 className="mt-1 text-lg font-bold text-white">
                                Establish the institution identity
                            </h2>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-indigo-100">
                                Configure the organization's identity, contact
                                information, branding, and operational status.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader
                            title="Organization Information"
                            subtitle="Core institutional information and branding"
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
                                            The name and code will be used throughout
                                            the academic management system.
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
                                    placeholder="e.g. ABC Education Group"
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
                                    placeholder="e.g. ABC"
                                    hint="Unique short code for this organization"
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
                                    placeholder="info@organization.com"
                                />

                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    error={errors.phone}
                                    placeholder="+92 300 1234567"
                                />
                            </div>

                            <Input
                                label="Website"
                                type="url"
                                value={data.website}
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                error={errors.website}
                                placeholder="https://example.com"
                            />

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                error={errors.address}
                                rows={3}
                                placeholder="Enter the organization's complete address..."
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
                                            Upload an image for institutional branding.
                                        </p>
                                    </div>
                                </div>

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
                                    ? 'Creating...'
                                    : 'Create Organization'}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}