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
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        is_recurring: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fee-types.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Fee Type" />

            <div className="mx-auto max-w-3xl space-y-6">
                <PageHeader
                    title="Add Fee Type"
                    subtitle="Create a reusable fee category for your school's billing system"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Fee Types',
                            href: route('fee-types.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-slate-900 p-6 shadow-xl shadow-indigo-100">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                            <BanknotesIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                Finance Setup
                            </p>

                            <h2 className="text-xl font-bold text-white">
                                Define a New Fee Type
                            </h2>

                            <p className="mt-1 text-sm text-indigo-100">
                                Create a consistent category that can be used across fee structures.
                            </p>
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
                                    placeholder="e.g. Tuition Fee"
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
                                    placeholder="e.g. TUITION"
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
                                placeholder="Describe what this fee covers..."
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

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <ArrowPathIcon className="h-5 w-5 text-indigo-600" />

                                        <span className="text-sm font-semibold text-slate-900">
                                            Recurring Fee
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Enable this when the fee is expected
                                        to repeat automatically or regularly
                                        during the academic period.
                                    </p>
                                </div>
                            </label>

                            <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <InformationCircleIcon className="h-5 w-5 shrink-0 text-blue-600" />

                                <p className="text-xs leading-5 text-blue-700">
                                    Fee types are reusable definitions. The
                                    actual amount for each standard is configured
                                    later through Fee Structures.
                                </p>
                            </div>
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
                                    ? 'Creating...'
                                    : 'Create Fee Type'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}