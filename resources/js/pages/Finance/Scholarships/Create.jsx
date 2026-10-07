import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter, CardHeader } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    AcademicCapIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, students = [] }) {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const formatDate = (date) =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;

    const [search, setSearch] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        name: '',
        amount: '',
        type: 'percentage',
        start_date: formatDate(today),
        end_date: formatDate(nextYear),
        status: 'active',
    });

    const filteredStudents = useMemo(() => {
        if (!search) return students.slice(0, 20);

        const term = search.toLowerCase();

        return students.filter((student) => {
            const name =
                `${student.first_name || ''} ${student.last_name || ''}`
                    .trim()
                    .toLowerCase();

            return (
                name.includes(term) ||
                (student.admission_number || '')
                    .toLowerCase()
                    .includes(term)
            );
        });
    }, [students, search]);

    const submit = (e) => {
        e.preventDefault();
        post(route('scholarships.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Scholarship" />

            <div className="mx-auto max-w-4xl space-y-6">
                <PageHeader
                    title="Add Scholarship"
                    subtitle="Create a financial award or fee concession for a student"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Scholarships',
                            href: route('scholarships.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 shadow-xl shadow-indigo-100">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                            <AcademicCapIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                Student Financial Aid
                            </p>

                            <h2 className="text-xl font-bold text-white">
                                Create Scholarship
                            </h2>

                            <p className="mt-1 text-sm text-indigo-100">
                                Apply a percentage or fixed financial benefit to a student.
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Student"
                        subtitle="Search and select the student receiving the scholarship"
                    />

                    <CardBody className="space-y-5">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search student name or admission number..."
                                className="w-full rounded-xl border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                            />
                        </div>

                        <Select
                            label="Student"
                            required
                            value={data.student_id}
                            onChange={(e) =>
                                setData('student_id', e.target.value)
                            }
                            error={errors.student_id}
                            options={[
                                {
                                    value: '',
                                    label: 'Select Student',
                                },
                                ...filteredStudents.map((student) => ({
                                    value: student.id,
                                    label: `${student.first_name} ${student.last_name} — ${student.admission_number}`,
                                })),
                            ]}
                        />

                        {data.student_id && (
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                        <UserCircleIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                            Student Selected
                                        </p>

                                        <p className="text-sm font-semibold text-slate-900">
                                            {students.find(
                                                (student) =>
                                                    String(student.id) ===
                                                    String(data.student_id)
                                            )?.first_name}{' '}
                                            {students.find(
                                                (student) =>
                                                    String(student.id) ===
                                                    String(data.student_id)
                                            )?.last_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Scholarship Details"
                            subtitle="Define the value, validity and current status"
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
                                placeholder="e.g. Merit Scholarship"
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

                            <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                                <SparklesIcon className="h-5 w-5 shrink-0 text-emerald-600" />

                                <p className="text-xs leading-5 text-emerald-700">
                                    {data.type === 'percentage'
                                        ? 'The scholarship will reduce eligible fees by the specified percentage.'
                                        : 'The scholarship will apply the specified fixed amount as a financial concession.'}
                                </p>
                            </div>
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
                                    ? 'Creating...'
                                    : 'Create Scholarship'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}