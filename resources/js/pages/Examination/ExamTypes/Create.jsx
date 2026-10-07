import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import {
    ClipboardDocumentListIcon,
    InformationCircleIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('exam-types.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Exam Type" />

            <div className="max-w-3xl mx-auto space-y-6">

                <PageHeader
                    title="Create Exam Type"
                    subtitle="Define a new examination category for your academic system."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Exam Types', href: route('exam-types.index') },
                        { label: 'Create' },
                    ]}
                />

                {/* Intro Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-800 px-6 py-6 shadow-lg">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-indigo-400/10 blur-2xl" />

                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                            <ClipboardDocumentListIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-indigo-200">
                                Academic Configuration
                            </p>
                            <h2 className="mt-0.5 text-lg font-semibold text-white">
                                Add a new examination type
                            </h2>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">

                        <CardBody className="p-6 sm:p-8">

                            <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <InformationCircleIcon className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        Examination Information
                                    </h3>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Enter the basic details for this exam category.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <Input
                                    label="Exam Type Name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g. Midterm, Final, Monthly Test"
                                />

                                <div className="relative">
                                    <Input
                                        label="Code"
                                        required
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value.toUpperCase())
                                        }
                                        error={errors.code}
                                        placeholder="e.g. MID, FIN"
                                    />

                                    <div className="pointer-events-none absolute right-3 top-[34px]">
                                        <TagIcon className="h-5 w-5 text-slate-300" />
                                    </div>
                                </div>

                                <Textarea
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    error={errors.description}
                                    rows={4}
                                    placeholder="Briefly describe this examination type..."
                                />

                            </div>
                        </CardBody>

                        <CardFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
                            <div className="flex w-full items-center justify-between gap-3">
                                <p className="hidden text-xs text-slate-400 sm:block">
                                    Fields marked with * are required
                                </p>

                                <div className="ml-auto flex gap-3">
                                    <Button
                                        variant="outline"
                                        href={route('exam-types.index')}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Creating...'
                                            : 'Create Exam Type'}
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>

                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}