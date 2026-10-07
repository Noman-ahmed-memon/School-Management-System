import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import {
    BanknotesIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, feeType }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: feeType.name || '',
        code: feeType.code || '',
        description: feeType.description || '',
        is_recurring: !!feeType.is_recurring,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fee-types.update', feeType.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${feeType.name}`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <PageHeader
                    title="Edit Fee Type"
                    subtitle={`Update the configuration for ${feeType.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Fee Types',
                            href: route('fee-types.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                            <BanknotesIcon className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                Editing Fee Type
                            </p>

                            <h2 className="mt-0.5 font-semibold text-slate-900">
                                {feeType.name}
                            </h2>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Fee Type Name"
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

                            <Textarea
                                label="Description"
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value
                                    )
                                }
                                error={errors.description}
                                rows={4}
                            />

                            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/30">
                                <input
                                    type="checkbox"
                                    checked={!!data.is_recurring}
                                    onChange={(e) =>
                                        setData(
                                            'is_recurring',
                                            e.target.checked
                                        )
                                    }
                                    className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />

                                <div>
                                    <div className="flex items-center gap-2">
                                        <ArrowPathIcon className="h-5 w-5 text-indigo-600" />

                                        <span className="text-sm font-semibold text-slate-900">
                                            Recurring Fee
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Indicates that this fee normally repeats
                                        during the academic period.
                                    </p>
                                </div>
                            </label>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                type="button"
                                href={route('fee-types.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                <BanknotesIcon className="mr-2 h-4 w-4" />
                                {processing
                                    ? 'Updating...'
                                    : 'Update Fee Type'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}