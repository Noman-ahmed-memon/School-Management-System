import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';

export default function Edit({ auth, slot }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        day_of_week: slot.day_of_week || 'monday',
        start_time: slot.start_time?.slice(0, 5) || '08:00',
        end_time: slot.end_time?.slice(0, 5) || '09:00',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('time-slots.update', slot.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Edit Time Slot" />

            <div className="max-w-2xl mx-auto space-y-6">
                <PageHeader
                    title="Edit Time Slot"
                    subtitle="Update the timetable period and timing"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Time Slots', href: route('time-slots.index') },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit}>
                    <Card className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]">
                        <CardBody className="space-y-6 p-6 sm:p-7">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3">
                                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                                    Schedule Definition
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                    Update the weekday and time range for this timetable period.
                                </p>
                            </div>

                            <Select
                                label="Day of Week"
                                required
                                value={data.day_of_week}
                                onChange={(e) => setData('day_of_week', e.target.value)}
                                error={errors.day_of_week}
                                options={[
                                    { value: 'monday', label: 'Monday' },
                                    { value: 'tuesday', label: 'Tuesday' },
                                    { value: 'wednesday', label: 'Wednesday' },
                                    { value: 'thursday', label: 'Thursday' },
                                    { value: 'friday', label: 'Friday' },
                                    { value: 'saturday', label: 'Saturday' },
                                    { value: 'sunday', label: 'Sunday' },
                                ]}
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                                    <Input
                                        label="Start Time"
                                        type="time"
                                        required
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        error={errors.start_time}
                                    />
                                </div>

                                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                                    <Input
                                        label="End Time"
                                        type="time"
                                        required
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        error={errors.end_time}
                                    />
                                </div>
                            </div>
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-200/80 bg-slate-50/60 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('time-slots.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Time Slot'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}