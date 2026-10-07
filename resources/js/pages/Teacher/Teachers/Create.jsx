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
    BriefcaseIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, campuses = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        address: '',
        employee_id: '',
        qualification: '',
        experience_years: 0,
        specialization: '',
        salary: '',
        employment_type: 'full_time',
        joining_date: new Date().toISOString().split('T')[0],
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('teachers.store'));
    };

    const showCampusSelector = campuses.length > 1;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Teacher" />

            <div className="mx-auto max-w-4xl space-y-7">
                <PageHeader
                    title="Add Teacher"
                    subtitle="Create a teacher profile and user account."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Teachers', href: route('teachers.index') },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {showCampusSelector && (
                        <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                            <CardHeader
                                title="Campus Assignment"
                                subtitle="Choose the campus this teacher belongs to."
                            />

                            <CardBody>
                                <div className="max-w-xl">
                                    <Select
                                        label="Campus"
                                        required
                                        value={data.campus_id}
                                        onChange={(e) =>
                                            setData(
                                                'campus_id',
                                                e.target.value
                                            )
                                        }
                                        error={errors.campus_id}
                                        placeholder="Select Campus"
                                        options={campuses.map((c) => ({
                                            value: c.id,
                                            label: c.name,
                                        }))}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Personal & Account Information"
                            subtitle="Basic identity and login information for the teacher."
                        />

                        <CardBody className="space-y-6">
                            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                    <UserIcon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Teacher Profile
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Enter the teacher's personal details and
                                        account credentials.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Full Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={errors.name}
                                    placeholder="e.g. Ahmed Khan"
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    error={errors.email}
                                    placeholder="teacher@example.com"
                                />
                            </div>

                            <div className="relative">
                                <LockClosedIcon className="pointer-events-none absolute right-3 top-[34px] h-4 w-4 text-slate-400" />

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
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    error={errors.phone}
                                    placeholder="+92..."
                                />

                                <Select
                                    label="Gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData('gender', e.target.value)
                                    }
                                    error={errors.gender}
                                    placeholder="Select Gender"
                                    options={[
                                        {
                                            value: 'male',
                                            label: 'Male',
                                        },
                                        {
                                            value: 'female',
                                            label: 'Female',
                                        },
                                        {
                                            value: 'other',
                                            label: 'Other',
                                        },
                                    ]}
                                />

                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData(
                                            'date_of_birth',
                                            e.target.value
                                        )
                                    }
                                    error={errors.date_of_birth}
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
                                placeholder="Enter residential address..."
                            />
                        </CardBody>
                    </Card>

                    <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Employment Details"
                            subtitle="Professional information and employment status."
                        />

                        <CardBody className="space-y-6">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
                                    <BriefcaseIcon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Professional Details
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Define the teacher's role, qualification,
                                        experience, and employment status.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                    placeholder="e.g. TCH-001"
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Qualification"
                                    value={data.qualification}
                                    onChange={(e) =>
                                        setData(
                                            'qualification',
                                            e.target.value
                                        )
                                    }
                                    error={errors.qualification}
                                    placeholder="e.g. M.Sc Mathematics"
                                />

                                <Input
                                    label="Specialization"
                                    value={data.specialization}
                                    onChange={(e) =>
                                        setData(
                                            'specialization',
                                            e.target.value
                                        )
                                    }
                                    error={errors.specialization}
                                    placeholder="e.g. Mathematics"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Salary (Rs.)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.salary}
                                    onChange={(e) =>
                                        setData('salary', e.target.value)
                                    }
                                    error={errors.salary}
                                    placeholder="e.g. 50000"
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Experience (Years)"
                                    type="number"
                                    min={0}
                                    value={data.experience_years}
                                    onChange={(e) =>
                                        setData(
                                            'experience_years',
                                            e.target.value
                                        )
                                    }
                                    error={errors.experience_years}
                                />

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
                                        {
                                            value: 'terminated',
                                            label: 'Terminated',
                                        },
                                    ]}
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/60 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('teachers.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Creating...'
                                    : 'Create Teacher'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}