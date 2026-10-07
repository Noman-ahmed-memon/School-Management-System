import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Modal from '@/Components/ui/Modal';
import Select from '@/Components/ui/Select';
import Input from '@/Components/ui/Input';
import EmptyState from '@/Components/ui/EmptyState';
import {
    CalendarIcon,
    PlusIcon,
    TrashIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    UserCircleIcon,
    HomeIcon,
} from '@heroicons/react/24/outline';

const DAYS = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

const formatTime = (time) => {
    if (!time) return '';

    if (typeof time === 'string' && time.includes('T')) {
        const d = new Date(time);

        if (isNaN(d.getTime())) return '';

        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');

        return `${hh}:${mm}`;
    }

    return String(time).slice(0, 5);
};

export default function Index({
    auth,
    entries,
    timeSlots,
    standards,
    sections,
    subjects,
    teachers,
    filters,
    meta,
}) {
    const [standardId, setStandardId] = useState(filters?.standard_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleLoad = () => {
        if (!standardId || !sectionId) return;

        router.get(
            route('timetable.index'),
            {
                standard_id: standardId,
                section_id: sectionId,
            },
            { preserveState: true }
        );
    };

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setModalOpen(true);
    };

    const handleDelete = (entryId) => {
        if (confirm('Remove this class from the timetable?')) {
            router.delete(route('timetable.destroy', entryId), {
                preserveScroll: true,
            });
        }
    };

    const filteredSections = sections.filter(
        (s) => !standardId || s.standard_id == standardId
    );

    const uniqueTimes = Array.from(
        new Set(timeSlots?.map((s) => formatTime(s.start_time)))
    )
        .filter(Boolean)
        .sort();

    const hasSelection = standardId && sectionId;

    const missingPrereqs = [];

    if (!meta?.has_current_session) {
        missingPrereqs.push({
            label: 'Current Academic Session',
            href: '/school/academic-sessions',
        });
    }

    if (!meta?.has_time_slots) {
        missingPrereqs.push({
            label: 'Time Slots',
            href: '/time-slots',
        });
    }

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Timetable" />

            <div className="space-y-6">
                <PageHeader
                    title="Timetable"
                    subtitle="Class schedule and teacher assignments"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Timetable' },
                    ]}
                />

                {missingPrereqs.length > 0 && (
                    <Card className="overflow-hidden border-amber-200/80 bg-white/95 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.3)]">
                        <CardBody className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                    <ExclamationTriangleIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Missing Prerequisites
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Set up the following before using the timetable:
                                    </p>

                                    <ul className="mt-3 space-y-2">
                                        {missingPrereqs.map((p) => (
                                            <li
                                                key={p.label}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                <a
                                                    href={p.href}
                                                    className="font-semibold text-indigo-600 transition hover:text-indigo-800 hover:underline"
                                                >
                                                    {p.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {/* Timetable Selection */}
                <Card className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_15px_40px_-24px_rgba(15,23,42,0.3)]">
                    <CardBody className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <CalendarIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-slate-900">
                                    Select Class
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Choose a standard and section to load its weekly schedule.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                    Standard <span className="text-red-500">*</span>
                                </label>

                                <select
                                    value={standardId}
                                    onChange={(e) => {
                                        setStandardId(e.target.value);
                                        setSectionId('');
                                    }}
                                    className="w-full rounded-xl border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Standard</option>

                                    {standards.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                    Section <span className="text-red-500">*</span>
                                </label>

                                <select
                                    value={sectionId}
                                    onChange={(e) => setSectionId(e.target.value)}
                                    disabled={!standardId}
                                    className="w-full rounded-xl border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                                >
                                    <option value="">Select Section</option>

                                    {filteredSections.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                onClick={handleLoad}
                                disabled={!standardId || !sectionId}
                            >
                                Load Timetable
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {!hasSelection && (
                    <Card className="border-slate-200/80 bg-white/95 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.3)]">
                        <EmptyState
                            icon={<CalendarIcon />}
                            title="Select a class to view timetable"
                            description="Choose a standard and section above to load the timetable."
                        />
                    </Card>
                )}

                {hasSelection && timeSlots?.length === 0 && (
                    <Card className="border-slate-200/80 bg-white/95 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.3)]">
                        <EmptyState
                            icon={<ClockIcon />}
                            title="No time slots configured"
                            description="Create time slots first."
                            action={
                                <Button href={route('time-slots.create')}>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Time Slot
                                </Button>
                            }
                        />
                    </Card>
                )}

                {hasSelection && timeSlots?.length > 0 && (
                    <Card className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)]">
                        <CardHeader
                            title="Weekly Timetable"
                            subtitle="Click any empty slot to assign a subject"
                        />

                        <CardBody className="overflow-x-auto p-0">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50/90">
                                    <tr>
                                        <th className="w-32 px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Time
                                        </th>

                                        {DAYS.map((day) => (
                                            <th
                                                key={day}
                                                className="min-w-[150px] px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500"
                                            >
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {uniqueTimes.map((time) => {
                                        const slotsAtTime = timeSlots.filter(
                                            (s) => formatTime(s.start_time) === time
                                        );

                                        return (
                                            <tr
                                                key={time}
                                                className="transition-colors hover:bg-slate-50/60"
                                            >
                                                <td className="bg-slate-50/70 px-4 py-4 align-top">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                                            <ClockIcon className="h-4 w-4" />
                                                        </div>

                                                        <span className="text-sm font-bold text-slate-700">
                                                            {time}
                                                        </span>
                                                    </div>
                                                </td>

                                                {DAYS.map((day) => {
                                                    const slot = slotsAtTime.find(
                                                        (s) => s.day_of_week === day
                                                    );

                                                    if (!slot) {
                                                        return (
                                                            <td
                                                                key={day}
                                                                className="border-l border-slate-100 px-2 py-3 text-center text-xs text-slate-300"
                                                            >
                                                                —
                                                            </td>
                                                        );
                                                    }

                                                    const entry = entries?.[slot.id];

                                                    return (
                                                        <td
                                                            key={day}
                                                            className="min-w-[150px] border-l border-slate-100 px-2 py-2 align-top"
                                                        >
                                                            {entry ? (
                                                                <div className="group relative rounded-xl border border-indigo-200 bg-indigo-50/80 p-3 shadow-sm transition hover:border-indigo-300 hover:shadow-md">
                                                                    <div className="pr-6 text-xs font-bold leading-tight text-indigo-950">
                                                                        {entry.subject?.name ||
                                                                            'No Subject'}
                                                                    </div>

                                                                    {entry.teacher?.user?.name && (
                                                                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-indigo-700">
                                                                            <UserCircleIcon className="h-3.5 w-3.5 shrink-0" />
                                                                            <span className="truncate">
                                                                                {entry.teacher.user.name}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {entry.room_number && (
                                                                        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                                            <HomeIcon className="h-3.5 w-3.5 shrink-0" />
                                                                            Room {entry.room_number}
                                                                        </div>
                                                                    )}

                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDelete(entry.id);
                                                                        }}
                                                                        aria-label="Remove class from timetable"
                                                                        title="Remove"
                                                                        className="absolute right-1.5 top-1.5 rounded-lg p-1.5 text-red-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
                                                                    >
                                                                        <TrashIcon className="h-3.5 w-3.5" />
                                                                    </button>

                                                                    <div className="mt-2 border-t border-indigo-200/70 pt-1.5 text-[9px] font-medium text-indigo-500">
                                                                        {formatTime(slot.start_time)} –{' '}
                                                                        {formatTime(slot.end_time)}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleSlotClick(slot)
                                                                    }
                                                                    aria-label={`Assign class to ${day} at ${time}`}
                                                                    className="flex min-h-[78px] w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 text-slate-400 transition hover:border-indigo-400 hover:bg-indigo-50/60 hover:text-indigo-600"
                                                                >
                                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-current">
                                                                        <PlusIcon className="h-4 w-4" />
                                                                    </div>

                                                                    <span className="text-[10px] font-semibold uppercase tracking-wide">
                                                                        Assign
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                )}
            </div>

            <AddTimetableEntryModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                slot={selectedSlot}
                standardId={standardId}
                sectionId={sectionId}
                subjects={subjects}
                teachers={teachers}
            />
        </AuthenticatedLayout>
    );
}

function AddTimetableEntryModal({
    show,
    onClose,
    slot,
    standardId,
    sectionId,
    subjects,
    teachers,
}) {
    const { data, setData, post, processing, errors } = useForm({
        standard_id: standardId || '',
        section_id: sectionId || '',
        subject_id: '',
        teacher_id: '',
        time_slot_id: slot?.id || '',
        room_number: '',
    });

    if (slot && data.time_slot_id !== slot.id) {
        setData({
            standard_id: standardId,
            section_id: sectionId,
            subject_id: '',
            teacher_id: '',
            time_slot_id: slot.id,
            room_number: '',
        });
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('timetable.store'), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Assign Class to Slot">
            {slot && (
                <div className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                        Selected Period
                    </div>

                    <div className="mt-1 text-sm font-bold capitalize text-indigo-950">
                        {slot.day_of_week}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-indigo-700">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <Select
                    label="Subject"
                    required
                    value={data.subject_id}
                    onChange={(e) => setData('subject_id', e.target.value)}
                    error={errors.subject_id}
                    placeholder="Select Subject"
                    options={
                        subjects?.map((s) => ({
                            value: s.id,
                            label: `${s.name} (${s.code})`,
                        })) || []
                    }
                />

                <Select
                    label="Teacher"
                    required
                    value={data.teacher_id}
                    onChange={(e) => setData('teacher_id', e.target.value)}
                    error={errors.teacher_id}
                    placeholder="Select Teacher"
                    options={
                        teachers?.map((t) => ({
                            value: t.id,
                            label: t.name,
                        })) || []
                    }
                />

                <Input
                    label="Room Number"
                    required
                    value={data.room_number}
                    onChange={(e) => setData('room_number', e.target.value)}
                    error={errors.room_number}
                    placeholder="e.g. 101, Lab A"
                />

                {errors.error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                        {errors.error}
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Assigning...' : 'Assign Class'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}