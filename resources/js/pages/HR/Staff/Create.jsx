import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

export default function Create({ auth, campuses = [], departments = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        employee_id: '',
        department_id: '',
        designation: '',
        salary: '',
        employment_type: 'full_time',
        joining_date: new Date().toISOString().split('T')[0],
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('staff.store'));
    };

    const showCampusSelector = campuses.length > 1;

    const filteredDepartments = data.campus_id
        ? departments.filter(
              (d) => d.campus_id == data.campus_id
          )
        : departments;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Staff" />

            <div className="max-w-3xl mx-auto space-y-6">
                <PageHeader
                    title="Add Staff Member"
                    subtitle="Create a new non-teaching staff account"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Staff',
                            href: route('staff.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {showCampusSelector && (
                        <Card>
                            <CardHeader
                                title="Campus"
                                subtitle="Choose which campus this staff member belongs to"
                            />
                            <CardBody>
                                <Select
                                    label="Campus"
                                    required
                                    value={data.campus_id}
                                    onChange={(e) => {
                                        setData(
                                            'campus_id',
                                            e.target.value
                                        );
                                        setData(
                                            'department_id',
                                            ''
                                        );
                                    }}
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
                                label="Password"
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) =>
                                    setData(
                                        'password',
                                        e.target.value
                                    )
                                }
                                error={errors.password}
                                hint="Minimum 8 characters"
                            />

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
                        <CardHeader
                            title="Employment Details"
                            subtitle="Assign a department to determine their role and permissions"
                        />
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
                                    placeholder="e.g. STF-001"
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
                                    options={filteredDepartments.map(
                                        (d) => ({
                                            value: d.id,
                                            label: d.name,
                                        })
                                    )}
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
                                    placeholder="e.g. Head Librarian"
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
                                    label="Salary (Rs.)"
                                    type="number"
                                    step="0.01"
                                    min="0"
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
                                    ? 'Creating...'
                                    : 'Create Staff'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}