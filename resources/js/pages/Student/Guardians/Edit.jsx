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

export default function Edit({ auth, guardian }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        first_name: guardian.first_name || '',
        last_name: guardian.last_name || '',
        email: guardian.email || guardian.user?.email || '',
        phone: guardian.phone || '',
        address: guardian.address || '',
        occupation: guardian.occupation || '',
        relation: guardian.relation || 'father',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('guardians.update', guardian.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head
                title={`Edit ${guardian.first_name} ${guardian.last_name}`}
            />

            <div className="mx-auto max-w-3xl space-y-6">
                <PageHeader
                    title="Edit Guardian"
                    subtitle={`Update ${guardian.first_name} ${guardian.last_name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Guardians',
                            href: route('guardians.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Guardian Information"
                            subtitle="Update the guardian's personal details"
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

                        <div className="border-t border-slate-200">
                            <CardHeader
                                title="Account Credentials"
                                subtitle="Update the guardian portal login email"
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
                                />
                            </CardBody>
                        </div>

                        <div className="border-t border-slate-200">
                            <CardHeader
                                title="Contact Information"
                                subtitle="Update contact details"
                            />

                            <CardBody className="space-y-6">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <Input
                                        label="Phone"
                                        required
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData(
                                                'phone',
                                                e.target.value
                                            )
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
                                        setData(
                                            'address',
                                            e.target.value
                                        )
                                    }
                                    error={errors.address}
                                    rows={3}
                                />
                            </CardBody>
                        </div>

                        <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('guardians.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Updating...'
                                    : 'Update Guardian'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}