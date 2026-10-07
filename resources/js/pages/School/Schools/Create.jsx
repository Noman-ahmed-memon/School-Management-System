import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    AcademicCapIcon,
    BuildingOffice2Icon,
    UserCircleIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, organizations = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        organization_id: '',
        name: '',
        code: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        established_year: '',
        logo: null,
        status: 'active',
        principal_name: '',
        principal_email: '',
        principal_password: '',
        principal_phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.schools.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create School" />

            <div className="max-w-4xl mx-auto space-y-7 pb-8">
                <PageHeader
                    title="Create School"
                    subtitle="Establish a new school and configure its principal account"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Schools', href: route('school.schools.index') },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {/* School Information */}
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
                                    <BuildingOffice2Icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        School Information
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Define the school's identity, contact details and operational status.
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
                                            Academic Institution Setup
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-indigo-700">
                                            Select the parent organization first, then provide the official
                                            school identity and contact information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Select
                                label="Organization"
                                required
                                value={data.organization_id}
                                onChange={(e) => setData('organization_id', e.target.value)}
                                error={errors.organization_id}
                                placeholder="Select Organization"
                                options={organizations.map((o) => ({
                                    value: o.id,
                                    label: o.name,
                                }))}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="School Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g. Beaconhouse School"
                                />

                                <Input
                                    label="Code"
                                    required
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    error={errors.code}
                                    placeholder="e.g. BHS"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                    placeholder="school@example.com"
                                />

                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                    placeholder="+92 300 0000000"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    error={errors.website}
                                    placeholder="https://example.com"
                                />

                                <Input
                                    label="Established Year"
                                    type="number"
                                    value={data.established_year}
                                    onChange={(e) => setData('established_year', e.target.value)}
                                    error={errors.established_year}
                                    placeholder="e.g. 2005"
                                />
                            </div>

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                error={errors.address}
                                rows={3}
                                placeholder="Enter the school's complete address..."
                            />

                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-3">
                                    <p className="text-sm font-semibold text-slate-800">
                                        School Logo
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Upload an image to visually identify the school throughout the system.
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files[0])}
                                    className="block w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-500 shadow-sm transition file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
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
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                            />
                        </CardBody>
                    </Card>

                    {/* Principal Account */}
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-indigo-50/60 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm">
                                    <UserCircleIcon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Principal Account
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Configure the school-level administrator account.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardBody className="space-y-6 bg-white p-6">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-indigo-900">
                                            School-Level Access
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-indigo-700">
                                            This creates a user account that can log in with the credentials
                                            below. The principal sees all data for this school across its campuses.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Principal Name"
                                    required
                                    value={data.principal_name}
                                    onChange={(e) => setData('principal_name', e.target.value)}
                                    error={errors.principal_name}
                                    placeholder="e.g. Mr. Ahmed Khan"
                                />

                                <Input
                                    label="Login Email"
                                    type="email"
                                    required
                                    value={data.principal_email}
                                    onChange={(e) => setData('principal_email', e.target.value)}
                                    error={errors.principal_email}
                                    placeholder="principal@school.com"
                                    hint="Used to log in"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    value={data.principal_password}
                                    onChange={(e) => setData('principal_password', e.target.value)}
                                    error={errors.principal_password}
                                    hint="Minimum 8 characters"
                                />

                                <Input
                                    label="Phone"
                                    value={data.principal_phone}
                                    onChange={(e) => setData('principal_phone', e.target.value)}
                                    error={errors.principal_phone}
                                    placeholder="+92 300 0000000"
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('school.schools.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create School & Principal'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}