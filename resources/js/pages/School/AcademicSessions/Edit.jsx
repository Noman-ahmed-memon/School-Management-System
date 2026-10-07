import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    PencilSquareIcon,
    CalendarDaysIcon,
    BuildingOffice2Icon,
    CheckCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, session, campuses }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        campus_id: session.campus_id || '',
        name: session.name || '',
        start_date: session.start_date ? session.start_date.split('T')[0] : '',
        end_date: session.end_date ? session.end_date.split('T')[0] : '',
        is_current: session.is_current || false,
        status: session.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('school.academic-sessions.update', session.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${session.name}`} />

            <div className="mx-auto max-w-3xl space-y-7">
                <PageHeader
                    title="Edit Academic Session"
                    subtitle={`Updating ${session.name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Academic Sessions',
                            href: route('school.academic-sessions.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                {/* Academic Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950" />

                    <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                <PencilSquareIcon className="h-7 w-7 text-indigo-300" />
                            </div>

                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                                    Academic Office
                                </div>
                                <h2 className="mt-1 text-xl font-bold text-white">
                                    {session.name}
                                </h2>
                                <p className="mt-1 text-sm text-slate-300">
                                    Update session details, dates and status.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Session ID
                            </div>
                            <div className="mt-1 font-mono text-sm font-bold text-indigo-200">
                                #{session.id}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden border-slate-200 shadow-sm">
                        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-800" />

                        <CardBody className="space-y-6 p-6 sm:p-8">
                            <SectionHeading
                                icon={BuildingOffice2Icon}
                                title="Campus & Identification"
                            />

                            <div className="grid grid-cols-1 gap-5">
                                <Select
                                    label="Campus"
                                    required
                                    value={data.campus_id}
                                    onChange={(e) =>
                                        setData('campus_id', e.target.value)
                                    }
                                    error={errors.campus_id}
                                    placeholder="Select Campus"
                                    options={campuses.map((c) => ({
                                        value: c.id,
                                        label: c.name,
                                    }))}
                                />

                                <Input
                                    label="Session Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={errors.name}
                                />
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <SectionHeading
                                    icon={CalendarDaysIcon}
                                    title="Session Duration"
                                />

                                <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <SectionHeading
                                    icon={CheckCircleIcon}
                                    title="Session Settings"
                                />

                                <div className="mt-4 space-y-5">
                                    <label
                                        htmlFor="is_current"
                                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                                            data.is_current
                                                ? 'border-indigo-200 bg-indigo-50'
                                                : 'border-slate-200 bg-slate-50/70 hover:border-indigo-200 hover:bg-indigo-50/40'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            id="is_current"
                                            checked={data.is_current}
                                            onChange={(e) =>
                                                setData(
                                                    'is_current',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />

                                        <div>
                                            <div className="text-sm font-semibold text-slate-800">
                                                Set as current session
                                            </div>
                                            <div className="mt-0.5 text-xs text-slate-500">
                                                This will unmark any other
                                                current sessions for this
                                                campus.
                                            </div>
                                        </div>
                                    </label>

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
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 ring-1 ring-indigo-100">
                                    <InformationCircleIcon className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                                        Note
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Marking this session as{' '}
                                        <span className="font-semibold">
                                            current
                                        </span>{' '}
                                        will automatically clear the previous
                                        current session for the same campus.
                                    </p>
                                </div>
                            </div>
                        </CardBody>

                        <CardFooter className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:px-8">
                            <div className="text-xs text-slate-400">
                                Session ID:{' '}
                                <span className="font-mono font-semibold text-slate-600">
                                    #{session.id}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    href={route(
                                        'school.academic-sessions.index'
                                    )}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Session'}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

function SectionHeading({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                {title}
            </h3>
        </div>
    );
}