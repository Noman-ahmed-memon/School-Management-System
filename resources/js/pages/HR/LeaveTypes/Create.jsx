import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        days_per_year: 12,
        is_paid: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('leave-types.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Leave Type" />

            <div className="max-w-2xl mx-auto space-y-6">
                <PageHeader
                    title="Create Leave Type"
                    subtitle="Define a new category of staff leave"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Leave Types',
                            href: route('leave-types.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader title="Leave Type Details" />
                        <CardBody className="space-y-5">
                            <Input
                                label="Leave Type Name"
                                required
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                error={errors.name}
                                placeholder="e.g. Annual Leave, Sick Leave"
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
                                placeholder="e.g. ANN, SICK"
                            />

                            <Input
                                label="Days Per Year"
                                type="number"
                                min="0"
                                required
                                value={data.days_per_year}
                                onChange={(e) =>
                                    setData(
                                        'days_per_year',
                                        e.target.value
                                    )
                                }
                                error={errors.days_per_year}
                                hint="Number of days allocated per year"
                            />

                            <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <input
                                    type="checkbox"
                                    id="is_paid"
                                    checked={data.is_paid}
                                    onChange={(e) =>
                                        setData(
                                            'is_paid',
                                            e.target.checked
                                        )
                                    }
                                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <div>
                                    <label
                                        htmlFor="is_paid"
                                        className="text-sm font-medium text-indigo-900 cursor-pointer"
                                    >
                                        Paid leave
                                    </label>
                                    <p className="text-xs text-indigo-700/80 mt-0.5">
                                        Salary continues to be paid during this leave
                                    </p>
                                </div>
                            </div>
                        </CardBody>

                        <CardFooter className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                href={route('leave-types.index')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Creating...'
                                    : 'Create Leave Type'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}