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

export default function Edit({ auth, school, principal, organizations = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        organization_id: school.organization_id || '',
        name: school.name || '',
        code: school.code || '',
        email: school.email || '',
        phone: school.phone || '',
        address: school.address || '',
        website: school.website || '',
        established_year: school.established_year || '',
        logo: null,
        status: school.status || 'active',
        principal_id: principal?.id || '',
        principal_name: principal?.name || '',
        principal_email: principal?.email || '',
        principal_password: '',
        principal_phone: principal?.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.schools.update', school.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${school.name}`} />

            <div className="max-w-4xl mx-auto space-y-7 pb-8">
                <PageHeader
                    title="Edit School"
                    subtitle={`Update details for ${school.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Schools', href: route('school.schools.index') },
                        { label: 'Edit' },
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
                                        Update the school's identity, contact details and status.
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
                                            Institution Profile
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-indigo-700">
                                            Keep the official school information accurate so it remains
                                            consistent throughout the academic management system.
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
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                />

                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Website"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    error={errors.website}
                                />

                                <Input
                                    label="Established Year"
                                    type="number"
                                    value={data.established_year}
                                    onChange={(e) => setData('established_year', e.target.value)}
                                    error={errors.established_year}
                                />
                            </div>

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                error={errors.address}
                                rows={3}
                            />

                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    {school.logo ? (
                                        <img
                                            src={`/storage/${school.logo}`}
                                            alt={school.name}
                                            className="h-14 w-14 rounded-xl border border-slate-200 object-cover shadow-sm"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                            <BuildingOffice2Icon className="h-7 w-7" />
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            School Logo
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Upload a new image to replace the current logo.
                                        </p>
                                    </div>
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
                                        {principal
                                            ? 'Update the existing principal account.'
                                            : 'Configure a principal account for this school.'}
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
                                            {principal ? 'School-Level Access' : 'Principal Setup'}
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-indigo-700">
                                            {principal
                                                ? 'The principal will continue to have school-level access to all campuses.'
                                                : 'Creating a principal will give them school-level access.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" value={data.principal_id} />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Principal Name"
                                    required
                                    value={data.principal_name}
                                    onChange={(e) => setData('principal_name', e.target.value)}
                                    error={errors.principal_name}
                                />

                                <Input
                                    label="Login Email"
                                    type="email"
                                    required
                                    value={data.principal_email}
                                    onChange={(e) => setData('principal_email', e.target.value)}
                                    error={errors.principal_email}
                                    hint="Used to log in"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="New Password (Optional)"
                                    type="password"
                                    value={data.principal_password}
                                    onChange={(e) => setData('principal_password', e.target.value)}
                                    error={errors.principal_password}
                                    hint="Leave blank to keep current password"
                                />

                                <Input
                                    label="Phone"
                                    value={data.principal_phone}
                                    onChange={(e) => setData('principal_phone', e.target.value)}
                                    error={errors.principal_phone}
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
                                {processing ? 'Updating...' : 'Update School'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}