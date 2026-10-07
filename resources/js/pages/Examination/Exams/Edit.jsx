import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';

export default function Edit({
    auth,
    exam,
    examTypes,
    standards,
    academicSessions,
}) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        exam_type_id: exam.exam_type_id || '',
        academic_session_id: exam.academic_session_id || '',
        standard_id: exam.standard_id || '',
        name: exam.name || '',
        start_date: exam.start_date?.split('T')[0] || '',
        end_date: exam.end_date?.split('T')[0] || '',
        total_marks: exam.total_marks || 100,
        passing_marks: exam.passing_marks || 40,
        status: exam.status || 'scheduled',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('exams.update', exam.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${exam.name}`} />

            <div className="max-w-4xl mx-auto space-y-7">

                <PageHeader
                    title="Edit Exam"
                    subtitle={`Update configuration for ${exam.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit}>

                    <Card className="overflow-hidden border-slate-200/80 shadow-sm">

                        <div className="
                            relative
                            overflow-hidden
                            border-b border-slate-200
                            bg-gradient-to-r
                            from-[#07111f]
                            via-[#0d1c31]
                            to-[#102b50]
                            px-6 py-7
                            sm:px-8
                        ">
                            <div className="
                                absolute -right-16 -top-24
                                h-56 w-56
                                rounded-full
                                bg-blue-500/10
                                blur-3xl
                            " />

                            <div className="relative flex items-center gap-4">

                                <div className="
                                    h-12 w-12
                                    rounded-xl
                                    bg-blue-500/15
                                    border border-blue-400/20
                                    flex items-center justify-center
                                ">
                                    <svg
                                        className="h-6 w-6 text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.6"
                                            d="M11 5h8M11 9h8M11 13h5M5 5h.01M5 9h.01M5 13h.01"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.6"
                                            d="M4 19l3-3 2 2 5-5"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        Examination Configuration
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400">
                                        Modify academic, schedule and grading information.
                                    </div>
                                </div>

                            </div>
                        </div>

                        <CardBody className="space-y-7 p-6 sm:p-8">

                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-100" />
                                    <span className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.18em]
                                        font-semibold
                                        text-slate-400
                                    ">
                                        Academic Context
                                    </span>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <Select
                                        label="Exam Type"
                                        required
                                        value={data.exam_type_id}
                                        onChange={(e) =>
                                            setData('exam_type_id', e.target.value)
                                        }
                                        error={errors.exam_type_id}
                                        placeholder="Select Exam Type"
                                        options={examTypes.map((t) => ({
                                            value: t.id,
                                            label: t.name,
                                        }))}
                                    />

                                    <Select
                                        label="Academic Session"
                                        required
                                        value={data.academic_session_id}
                                        onChange={(e) =>
                                            setData(
                                                'academic_session_id',
                                                e.target.value
                                            )
                                        }
                                        error={errors.academic_session_id}
                                        placeholder="Select Session"
                                        options={academicSessions.map((s) => ({
                                            value: s.id,
                                            label: s.name,
                                        }))}
                                    />

                                    <Select
                                        label="Standard"
                                        required
                                        value={data.standard_id}
                                        onChange={(e) =>
                                            setData('standard_id', e.target.value)
                                        }
                                        error={errors.standard_id}
                                        placeholder="Select Standard"
                                        options={standards.map((s) => ({
                                            value: s.id,
                                            label: `${s.name} (${s.code})`,
                                        }))}
                                    />

                                    <Input
                                        label="Exam Name"
                                        required
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        error={errors.name}
                                    />

                                </div>
                            </div>

                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-100" />
                                    <span className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.18em]
                                        font-semibold
                                        text-slate-400
                                    ">
                                        Examination Schedule
                                    </span>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <Input
                                        label="Start Date"
                                        type="date"
                                        required
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData('start_date', e.target.value)
                                        }
                                        error={errors.start_date}
                                    />

                                    <Input
                                        label="End Date"
                                        type="date"
                                        required
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData('end_date', e.target.value)
                                        }
                                        error={errors.end_date}
                                    />

                                </div>
                            </div>

                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-100" />
                                    <span className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.18em]
                                        font-semibold
                                        text-slate-400
                                    ">
                                        Grading Configuration
                                    </span>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <Input
                                        label="Total Marks"
                                        type="number"
                                        required
                                        min={1}
                                        value={data.total_marks}
                                        onChange={(e) =>
                                            setData('total_marks', e.target.value)
                                        }
                                        error={errors.total_marks}
                                    />

                                    <Input
                                        label="Passing Marks"
                                        type="number"
                                        required
                                        min={0}
                                        value={data.passing_marks}
                                        onChange={(e) =>
                                            setData(
                                                'passing_marks',
                                                e.target.value
                                            )
                                        }
                                        error={errors.passing_marks}
                                    />

                                </div>
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
                                    { value: 'scheduled', label: 'Scheduled' },
                                    { value: 'ongoing', label: 'Ongoing' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'cancelled', label: 'Cancelled' },
                                ]}
                            />

                        </CardBody>

                        <CardFooter className="
                            flex flex-col-reverse
                            sm:flex-row
                            justify-between
                            items-stretch
                            sm:items-center
                            gap-3
                            border-t border-slate-100
                            bg-slate-50/70
                            px-6 py-4
                            sm:px-8
                        ">

                            <Button
                                variant="outline"
                                href={route('exams.index')}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Updating...' : 'Update Exam'}
                            </Button>

                        </CardFooter>

                    </Card>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}