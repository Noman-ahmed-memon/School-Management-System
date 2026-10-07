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
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, campus, vp, schools = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        school_id: campus.school_id || '',
        name: campus.name || '',
        code: campus.code || '',
        address: campus.address || '',
        phone: campus.phone || '',
        status: campus.status || 'active',
        vp_id: vp?.id || '',
        vp_name: vp?.name || '',
        vp_email: vp?.email || '',
        vp_password: '',
        vp_phone: vp?.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.campuses.update', campus.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${campus.name}`} />

            <div className="mx-auto max-w-5xl space-y-7">
                <PageHeader
                    title="Edit Campus"
                    subtitle={`Update details and access settings for ${campus.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Campuses', href: route('school.campuses.index') },
                        { label: 'Edit' },
                    ]}
                />

                {/* Current Campus Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-50 blur-2xl" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                <BuildingStorefrontIcon className="h-6 w-6 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Editing Campus
                                </p>
                                <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                                    {campus.name}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Campus code:{' '}
                                    <span className="font-semibold text-indigo-600">
                                        {campus.code}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                campus.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                            }`}
                        >
                            <span
                                className={`mr-2 h-1.5 w-1.5 rounded-full ${
                                    campus.status === 'active'
                                        ? 'bg-emerald-500'
                                        : 'bg-rose-500'
                                }`}
                            />
                            {campus.status}
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Campus Information */}
                    <Card>
                        <CardHeader
                            title="Campus Information"
                            subtitle="Update the campus identity and contact details"
                        />

                        <CardBody className="space-y-6">
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
                                />

                                <Input
                                    label="Campus Code"
                                    required
                                    value={data.code}
                                    onChange={(e) =>
                                        setData('code', e.target.value.toUpperCase())
                                    }
                                    error={errors.code}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
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
                            />
                        </CardBody>
                    </Card>

                    {/* VP Account */}
                    <Card>
                        <CardHeader
                            title="Vice Principal Account"
                            subtitle={
                                vp
                                    ? 'Update the VP information. Leave the password blank to keep it unchanged.'
                                    : 'No VP is currently assigned — configure one now.'
                            }
                        />

                        <CardBody className="space-y-6">
                            <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                                        <UserGroupIcon className="h-5 w-5 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-indigo-900">
                                            {vp
                                                ? 'Existing VP access'
                                                : 'Create campus-level access'}
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-indigo-800/80">
                                            {vp
                                                ? 'The VP will continue to have campus-level access to this campus.'
                                                : 'Creating a VP will give them campus-level access.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" value={data.vp_id} />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="VP Name"
                                    required
                                    value={data.vp_name}
                                    onChange={(e) => setData('vp_name', e.target.value)}
                                    error={errors.vp_name}
                                />

                                <Input
                                    label="Login Email"
                                    type="email"
                                    required
                                    value={data.vp_email}
                                    onChange={(e) => setData('vp_email', e.target.value)}
                                    error={errors.vp_email}
                                    hint="Used to log in"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="New Password (Optional)"
                                    type="password"
                                    value={data.vp_password}
                                    onChange={(e) =>
                                        setData('vp_password', e.target.value)
                                    }
                                    error={errors.vp_password}
                                    hint="Leave blank to keep current password"
                                />

                                <Input
                                    label="Phone"
                                    value={data.vp_phone}
                                    onChange={(e) =>
                                        setData('vp_phone', e.target.value)
                                    }
                                    error={errors.vp_phone}
                                />
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <ShieldCheckIcon className="h-5 w-5 shrink-0 text-slate-500" />
                                <p className="text-xs leading-5 text-slate-600">
                                    Account permissions remain restricted to this campus.
                                </p>
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
                            {processing ? 'Updating...' : 'Update Campus'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}