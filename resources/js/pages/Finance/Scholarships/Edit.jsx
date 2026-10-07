import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter, CardHeader } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    AcademicCapIcon,
    UserCircleIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, scholarship }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        student_id: scholarship.student_id || '',
        name: scholarship.name || '',
        amount: scholarship.amount || '',
        type: scholarship.type || 'percentage',
        start_date: scholarship.start_date || '',
        end_date: scholarship.end_date || '',
        status: scholarship.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('scholarships.update', scholarship.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${scholarship.name}`} />

            <div className="mx-auto max-w-4xl space-y-6">
                <PageHeader
                    title="Edit Scholarship"
                    subtitle={`Update the scholarship configuration for ${scholarship.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Scholarships',
                            href: route('scholarships.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Student"
                        subtitle="Scholarships are associated with a specific student"
                    />

                    <CardBody>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                    <UserCircleIcon className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                        Student
                                    </p>

                                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                                        {scholarship.student?.first_name}{' '}
                                        {scholarship.student?.last_name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {
                                            scholarship.student
                                                ?.admission_number
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Scholarship Details"
                            subtitle="Update the value, validity and status"
                        />

                        <CardBody className="space-y-6">
                            <Input
                                label="Scholarship Name"
                                required
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                error={errors.name}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Select
                                    label="Scholarship Type"
                                    required
                                    value={data.type}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                    error={errors.type}
                                    options={[
                                        {
                                            value: 'percentage',
                                            label: 'Percentage',
                                        },
                                        {
                                            value: 'fixed',
                                            label: 'Fixed Amount',
                                        },
                                    ]}
                                />

                                <Input
                                    label={
                                        data.type === 'percentage'
                                            ? 'Discount (%)'
                                            : 'Amount (Rs.)'
                                    }
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max={
                                        data.type === 'percentage'
                                            ? '100'
                                            : undefined
                                    }
                                    required
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData(
                                            'amount',
                                            e.target.value
                                        )
                                    }
                                    error={errors.amount}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Start Date"
                                    type="date"
                                    required
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData(
                                            'start_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.start_date}
                                />

                                <Input
                                    label="End Date"
                                    type="date"
                                    required
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData(
                                            'end_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.end_date}
                                />
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
                                    {
                                        value: 'active',
                                        label: 'Active',
                                    },
                                    {
                                        value: 'inactive',
                                        label: 'Inactive',
                                    },
                                ]}
                            />
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                type="button"
                                href={route('scholarships.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                <AcademicCapIcon className="mr-2 h-4 w-4" />
                                {processing
                                    ? 'Updating...'
                                    : 'Update Scholarship'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}