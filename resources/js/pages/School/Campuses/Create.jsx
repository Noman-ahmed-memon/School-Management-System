import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    BuildingStorefrontIcon,
    UserGroupIcon,
    MapPinIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, schools = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        school_id: '',
        name: '',
        code: '',
        address: '',
        phone: '',
        status: 'active',
        vp_name: '',
        vp_email: '',
        vp_password: '',
        vp_phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.campuses.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Campus" />

            <div className="mx-auto max-w-5xl space-y-7">
                <PageHeader
                    title="Create Campus"
                    subtitle="Add a new campus and configure its vice principal account"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Campuses', href: route('school.campuses.index') },
                        { label: 'Create' },
                    ]}
                />

                {/* Intro Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 shadow-lg shadow-indigo-100">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />

                    <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                            <BuildingStorefrontIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-indigo-100">
                                Campus Setup
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-white">
                                Establish a new academic location
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-indigo-100">
                                Define the campus identity, contact information, status,
                                and dedicated vice principal access.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Campus Information */}
                    <Card>
                        <CardHeader
                            title="Campus Information"
                            subtitle="Basic information used to identify and manage this campus"
                        />

                        <CardBody className="space-y-6">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                        <BuildingStorefrontIcon className="h-5 w-5 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Campus identity
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-600">
                                            Select the parent school and provide a unique
                                            campus name and code.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Select
                                label="School"
                                required
                                value={data.school_id}
                                onChange={(e) => setData('school_id', e.target.value)}
                                error={errors.school_id}
                                placeholder="Select School"
                                options={schools.map((s) => ({
                                    value: s.id,
                                    label: s.name,
                                }))}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Campus Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g. Main Campus"
                                />

                                <Input
                                    label="Campus Code"
                                    required
                                    value={data.code}
                                    onChange={(e) =>
                                        setData('code', e.target.value.toUpperCase())
                                    }
                                    error={errors.code}
                                    placeholder="e.g. MAIN"
                                    hint="Use a short unique identifier"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                    placeholder="Campus contact number"
                                />

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

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                error={errors.address}
                                rows={3}
                                placeholder="Enter the complete campus address..."
                            />
                        </CardBody>
                    </Card>

                    {/* VP Account */}
                    <Card>
                        <CardHeader
                            title="Vice Principal Account"
                            subtitle="Configure campus-level login access for the vice principal"
                        />

                        <CardBody className="space-y-6">
                            <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                                        <ShieldCheckIcon className="h-5 w-5 text-emerald-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-emerald-900">
                                            Campus-level access
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-emerald-800/80">
                                            This account will be created for the Vice
                                            Principal and will only have access to data
                                            belonging to this campus.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="VP Name"
                                    required
                                    value={data.vp_name}
                                    onChange={(e) => setData('vp_name', e.target.value)}
                                    error={errors.vp_name}
                                    placeholder="e.g. Ms. Fatima Ali"
                                />

                                <Input
                                    label="Login Email"
                                    type="email"
                                    required
                                    value={data.vp_email}
                                    onChange={(e) => setData('vp_email', e.target.value)}
                                    error={errors.vp_email}
                                    placeholder="vp@school.com"
                                    hint="Used to log in"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    value={data.vp_password}
                                    onChange={(e) =>
                                        setData('vp_password', e.target.value)
                                    }
                                    error={errors.vp_password}
                                    hint="Minimum 8 characters"
                                />

                                <Input
                                    label="Phone"
                                    value={data.vp_phone}
                                    onChange={(e) =>
                                        setData('vp_phone', e.target.value)
                                    }
                                    error={errors.vp_phone}
                                    placeholder="VP contact number"
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                        <Button
                            variant="outline"
                            href={route('school.campuses.index')}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Campus & VP'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}