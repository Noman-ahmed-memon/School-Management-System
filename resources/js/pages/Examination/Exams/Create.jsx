import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';

export default function Create({ auth, examTypes, standards, academicSessions }) {
    const { data, setData, post, processing, errors } = useForm({
        exam_type_id: '',
        academic_session_id: '',
        standard_id: '',
        name: '',
        start_date: '',
        end_date: '',
        total_marks: 100,
        passing_marks: 40,
        status: 'scheduled',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('exams.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Exam" />

            <div className="max-w-4xl mx-auto space-y-7">

                <PageHeader
                    title="Create Exam"
                    subtitle="Set up a new academic assessment"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exams', href: route('exams.index') },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit}>

                    <Card className="overflow-hidden border-slate-200/80 shadow-sm">

                        {/* Form introduction */}
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
                                            d="M9 5h6M9 3h6a1 1 0 011 1v1h2a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h2V4a1 1 0 011-1z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.6"
                                            d="M8 11h8M8 15h5"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        Examination Details
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400">
                                        Configure the assessment, schedule and grading structure.
                                    </div>
                                </div>

                            </div>
                        </div>

                        <CardBody className="space-y-7 p-6 sm:p-8">

                            <div>
                                <div className="
                                    mb-4
                                    flex items-center gap-3
                                ">
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
                                            setData('academic_session_id', e.target.value)
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
                                        placeholder="e.g. Midterm Mathematics 2026"
                                    />

                                </div>
                            </div>

                            <div>
                                <div className="
                                    mb-4
                                    flex items-center gap-3
                                ">
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
                                <div className="
                                    mb-4
                                    flex items-center gap-3
                                ">
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
                                            setData('passing_marks', e.target.value)
                                        }
                                        error={errors.passing_marks}
                                    />

                                </div>
                            </div>

                            <div className="
                                rounded-xl
                                border border-blue-100
                                bg-blue-50/60
                                p-4
                            ">
                                <div className="flex gap-3">

                                    <svg
                                        className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.7"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <div>
                                        <div className="text-sm font-semibold text-blue-900">
                                            Examination status
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-blue-700/70">
                                            Select the current lifecycle state of this examination.
                                        </div>
                                    </div>

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
                                {processing ? 'Creating...' : 'Create Exam'}
                            </Button>

                        </CardFooter>

                    </Card>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}