import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';

export default function Edit({ auth, staff, departments }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: staff.user?.name || '',
        email: staff.user?.email || '',
        phone: staff.user?.phone || '',
        employee_id: staff.employee_id || '',
        department_id: staff.department_id || '',
        designation: staff.designation || '',
        salary: staff.salary || '',
        employment_type: staff.employment_type || 'full_time',
        joining_date: staff.joining_date?.split('T')[0] || '',
        termination_date:
            staff.termination_date?.split('T')[0] || '',
        status: staff.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('staff.update', staff.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${staff.user?.name}`} />

            <div className="max-w-3xl mx-auto space-y-6">
                <PageHeader
                    title="Edit Staff Member"
                    subtitle={`Update ${staff.user?.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Staff',
                            href: route('staff.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader title="Personal Information" />
                        <CardBody className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Full Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    error={errors.name}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    error={errors.email}
                                />
                            </div>

                            <Input
                                label="Phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData(
                                        'phone',
                                        e.target.value
                                    )
                                }
                                error={errors.phone}
                            />
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader title="Employment Details" />
                        <CardBody className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Employee ID"
                                    required
                                    value={data.employee_id}
                                    onChange={(e) =>
                                        setData(
                                            'employee_id',
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    error={errors.employee_id}
                                />
                                <Select
                                    label="Department"
                                    required
                                    value={data.department_id}
                                    onChange={(e) =>
                                        setData(
                                            'department_id',
                                            e.target.value
                                        )
                                    }
                                    error={errors.department_id}
                                    placeholder="Select Department"
                                    options={departments.map((d) => ({
                                        value: d.id,
                                        label: d.name,
                                    }))}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Designation"
                                    required
                                    value={data.designation}
                                    onChange={(e) =>
                                        setData(
                                            'designation',
                                            e.target.value
                                        )
                                    }
                                    error={errors.designation}
                                />
                                <Select
                                    label="Employment Type"
                                    required
                                    value={data.employment_type}
                                    onChange={(e) =>
                                        setData(
                                            'employment_type',
                                            e.target.value
                                        )
                                    }
                                    error={errors.employment_type}
                                    options={[
                                        {
                                            value: 'full_time',
                                            label: 'Full Time',
                                        },
                                        {
                                            value: 'part_time',
                                            label: 'Part Time',
                                        },
                                        {
                                            value: 'contract',
                                            label: 'Contract',
                                        },
                                        {
                                            value: 'intern',
                                            label: 'Intern',
                                        },
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Salary"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={data.salary}
                                    onChange={(e) =>
                                        setData(
                                            'salary',
                                            e.target.value
                                        )
                                    }
                                    error={errors.salary}
                                />
                                <Input
                                    label="Joining Date"
                                    type="date"
                                    required
                                    value={data.joining_date}
                                    onChange={(e) =>
                                        setData(
                                            'joining_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.joining_date}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Termination Date"
                                    type="date"
                                    value={data.termination_date}
                                    onChange={(e) =>
                                        setData(
                                            'termination_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.termination_date}
                                />
                                <Select
                                    label="Status"
                                    required
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            'status',
                                            e.target.value
                                        )
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
                                        {
                                            value: 'terminated',
                                            label: 'Terminated',
                                        },
                                    ]}
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                href={route('staff.index')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Updating...'
                                    : 'Update Staff'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}