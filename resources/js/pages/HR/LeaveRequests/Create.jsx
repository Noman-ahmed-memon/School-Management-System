import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    CalendarDaysIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, employees = [], leaveTypes = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_key: '',
        employee_type: '',
        employee_id: '',
        leave_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const [days, setDays] = useState(0);

    useEffect(() => {
        if (data.start_date && data.end_date) {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);
            const diff =
                Math.floor(
                    (end - start) / (1000 * 60 * 60 * 24)
                ) + 1;
            setDays(diff > 0 ? diff : 0);
        } else {
            setDays(0);
        }
    }, [data.start_date, data.end_date]);

    const handleEmployeeChange = (value) => {
        const [type, id] = value.split(':');
        setData((prev) => ({
            ...prev,
            employee_key: value,
            employee_type: type,
            employee_id: id,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('leave-requests.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="New Leave Request" />

            <div className="max-w-2xl mx-auto space-y-6">
                <PageHeader
                    title="New Leave Request"
                    subtitle="Submit a leave application for a staff member"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Leave Requests',
                            href: route('leave-requests.index'),
                        },
                        { label: 'New' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader title="Leave Details" />
                        <CardBody className="space-y-5">
                            <Select
                                label="Employee"
                                required
                                value={data.employee_key}
                                onChange={(e) =>
                                    handleEmployeeChange(e.target.value)
                                }
                                error={errors.employee_id}
                                placeholder="Select Employee"
                                options={employees.map((e) => ({
                                    value: `${e.type}:${e.id}`,
                                    label: `${e.name} (${e.employee_id}) — ${
                                        e.type === 'teacher'
                                            ? 'Teacher'
                                            : 'Staff'
                                    }`,
                                }))}
                            />

                            <Select
                                label="Leave Type"
                                required
                                value={data.leave_type_id}
                                onChange={(e) =>
                                    setData(
                                        'leave_type_id',
                                        e.target.value
                                    )
                                }
                                error={errors.leave_type_id}
                                placeholder="Select Leave Type"
                                options={leaveTypes.map((t) => ({
                                    value: t.id,
                                    label: `${t.name} (${t.days_per_year} days/year)`,
                                }))}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                            {days > 0 && (
                                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                    <div className="flex gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                                            <ClockIcon className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                                                Duration
                                            </p>
                                            <p className="text-sm text-indigo-900 mt-0.5">
                                                <strong>
                                                    {days} day
                                                    {days > 1 ? 's' : ''}
                                                </strong>{' '}
                                                total leave requested
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Textarea
                                label="Reason"
                                required
                                value={data.reason}
                                onChange={(e) =>
                                    setData('reason', e.target.value)
                                }
                                error={errors.reason}
                                rows={3}
                                placeholder="Provide a brief reason for this leave request..."
                            />
                        </CardBody>

                        <CardFooter className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                href={route('leave-requests.index')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Submitting...'
                                    : 'Submit Request'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}