import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, {
    CardHeader,
    CardBody,
    CardFooter,
} from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    BuildingOffice2Icon,
    UserIcon,
    KeyIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, campuses = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        occupation: '',
        relation: 'father',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('guardians.store'));
    };

    const showCampusSelector = campuses.length > 1;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Guardian" />

            <div className="mx-auto max-w-3xl space-y-6">
                <PageHeader
                    title="Add Guardian"
                    subtitle="Create a new parent or guardian account"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Guardians',
                            href: route('guardians.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {showCampusSelector && (
                        <Card className="overflow-hidden">
                            <CardHeader
                                title="Campus Assignment"
                                subtitle="Choose which campus this guardian belongs to"
                            />

                            <CardBody className="bg-slate-50/50">
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
                            </CardBody>
                        </Card>
                    )}

                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Guardian Information"
                            subtitle="Enter the guardian's personal details"
                        />

                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="First Name"
                                    required
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData(
                                            'first_name',
                                            e.target.value
                                        )
                                    }
                                    error={errors.first_name}
                                />

                                <Input
                                    label="Last Name"
                                    required
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData(
                                            'last_name',
                                            e.target.value
                                        )
                                    }
                                    error={errors.last_name}
                                />
                            </div>

                            <Select
                                label="Relation"
                                required
                                value={data.relation}
                                onChange={(e) =>
                                    setData('relation', e.target.value)
                                }
                                error={errors.relation}
                                options={[
                                    {
                                        value: 'father',
                                        label: 'Father',
                                    },
                                    {
                                        value: 'mother',
                                        label: 'Mother',
                                    },
                                    {
                                        value: 'guardian',
                                        label: 'Guardian',
                                    },
                                ]}
                            />
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Account Credentials"
                            subtitle="Credentials used to access the guardian portal"
                        />

                        <CardBody className="space-y-5">
                            <Input
                                label="Email (Login)"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                hint="Used for guardian portal login"
                            />

                            <Input
                                label="Password"
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                error={errors.password}
                                hint="Minimum 8 characters"
                            />
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Contact Information"
                            subtitle="How the guardian can be contacted"
                        />

                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Phone"
                                    required
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    error={errors.phone}
                                />

                                <Input
                                    label="Occupation"
                                    value={data.occupation}
                                    onChange={(e) =>
                                        setData(
                                            'occupation',
                                            e.target.value
                                        )
                                    }
                                    error={errors.occupation}
                                />
                            </div>

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                error={errors.address}
                                rows={3}
                            />
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('guardians.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Creating...'
                                    : 'Create Guardian'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}