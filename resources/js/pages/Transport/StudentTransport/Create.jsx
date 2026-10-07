import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    MagnifyingGlassIcon,
    UserCircleIcon,
    MapPinIcon,
    MapIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, students = [], routes = [], academicSessions = [] }) {
    const [studentSearch, setStudentSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [stops, setStops] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        route_id: '',
        pickup_stop_id: '',
        dropoff_stop_id: '',
        academic_session_id: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        status: 'active',
    });

    const filteredStudents = useMemo(() => {
        if (!studentSearch) return students.slice(0, 20);

        const term = studentSearch.toLowerCase();

        return students.filter((s) => {
            const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
            const admNum = (s.admission_number || '').toLowerCase();

            return fullName.includes(term) || admNum.includes(term);
        });
    }, [students, studentSearch]);

    useEffect(() => {
        if (!data.route_id) {
            setStops([]);
            return;
        }

        fetch(`/api/routes/${data.route_id}/stops`)
            .then((res) => res.json())
            .then((data) => setStops(data.stops || []))
            .catch(() => setStops([]));
    }, [data.route_id]);

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setData('student_id', student.id);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('student-transport.store'));
    };

    const stopOptions = stops.map((s) => ({
        value: s.id,
        label: `${s.stop_name}${s.arrival_time ? ` — ${String(s.arrival_time).slice(0, 5)}` : ''}`,
    }));

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Assign Student to Route" />

            <div className="max-w-4xl mx-auto space-y-6">
                <PageHeader
                    title="Assign Student to Route"
                    subtitle="Configure a student's transport assignment, route stops, and academic period."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Student Transport', href: route('student-transport.index') },
                        { label: 'Assign' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {/* Student Selection */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Select Student"
                            subtitle="Find the student who will receive this transport assignment."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <UserCircleIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-4">
                            {!data.student_id ? (
                                <>
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="text"
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                            placeholder="Search by name or admission #..."
                                            className="w-full rounded-xl border-slate-300 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm shadow-sm transition focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                        <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
                                            {filteredStudents.length === 0 ? (
                                                <div className="p-8 text-center">
                                                    <UserCircleIcon className="mx-auto h-10 w-10 text-slate-300" />
                                                    <p className="mt-2 text-sm font-medium text-slate-600">
                                                        No students match your search.
                                                    </p>
                                                </div>
                                            ) : (
                                                filteredStudents.map((student) => (
                                                    <button
                                                        key={student.id}
                                                        type="button"
                                                        onClick={() => handleStudentSelect(student)}
                                                        className="w-full px-4 py-3 text-left transition hover:bg-indigo-50/60"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                                                <UserCircleIcon className="h-6 w-6" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="truncate text-sm font-semibold text-slate-800">
                                                                    {student.first_name} {student.last_name}
                                                                </div>

                                                                <div className="mt-0.5 text-xs text-slate-500">
                                                                    {student.admission_number}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                                            <UserCircleIcon className="h-7 w-7" />
                                        </div>

                                        <div>
                                            <div className="font-semibold text-slate-900">
                                                {selectedStudent?.first_name} {selectedStudent?.last_name}
                                            </div>

                                            <div className="mt-0.5 text-xs text-slate-600">
                                                {selectedStudent?.admission_number}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedStudent(null);
                                            setData('student_id', '');
                                        }}
                                        className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-white hover:text-indigo-700"
                                    >
                                        Change
                                    </button>
                                </div>
                            )}

                            {errors.student_id && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.student_id}
                                </p>
                            )}
                        </CardBody>
                    </Card>

                    {/* Route */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Route & Stops"
                            subtitle="Choose the transport route and pickup/drop-off points."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <MapIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <Select
                                label="Route"
                                required
                                value={data.route_id}
                                onChange={(e) => {
                                    setData((prev) => ({
                                        ...prev,
                                        route_id: e.target.value,
                                        pickup_stop_id: '',
                                        dropoff_stop_id: '',
                                    }));
                                }}
                                error={errors.route_id}
                                placeholder="Select Route"
                                options={(routes || []).map((r) => ({
                                    value: r.id,
                                    label: `${r.name} (${r.code})`,
                                }))}
                            />

                            {data.route_id && (
                                <>
                                    {stops.length === 0 ? (
                                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                            <div className="flex gap-3">
                                                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                                                <div className="text-sm text-amber-800">
                                                    <p className="font-semibold">
                                                        This route has no stops yet.
                                                    </p>

                                                    <p className="mt-1">
                                                        <a
                                                            href={`/routes/${data.route_id}`}
                                                            className="font-semibold underline underline-offset-2"
                                                        >
                                                            Add stops
                                                        </a>{' '}
                                                        before assigning pickup and drop-off points.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <Select
                                                label="Pickup Stop"
                                                required
                                                value={data.pickup_stop_id}
                                                onChange={(e) => setData('pickup_stop_id', e.target.value)}
                                                error={errors.pickup_stop_id}
                                                placeholder="Select Pickup"
                                                options={stopOptions}
                                            />

                                            <Select
                                                label="Drop-off Stop"
                                                required
                                                value={data.dropoff_stop_id}
                                                onChange={(e) => setData('dropoff_stop_id', e.target.value)}
                                                error={errors.dropoff_stop_id}
                                                placeholder="Select Drop-off"
                                                options={stopOptions}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </CardBody>
                    </Card>

                    {/* Duration */}
                    <Card className="overflow-hidden border-slate-200/80 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                        <CardHeader
                            title="Duration & Session"
                            subtitle="Define the academic session and validity period."
                            action={
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <CalendarDaysIcon className="h-5 w-5" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">
                            <Select
                                label="Academic Session"
                                required
                                value={data.academic_session_id}
                                onChange={(e) => setData('academic_session_id', e.target.value)}
                                error={errors.academic_session_id}
                                placeholder="Select Session"
                                options={(academicSessions || []).map((s) => ({
                                    value: s.id,
                                    label: s.name,
                                }))}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Start Date"
                                    type="date"
                                    required
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    error={errors.start_date}
                                />

                                <Input
                                    label="End Date (optional)"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    error={errors.end_date}
                                    hint="Leave blank for ongoing"
                                />
                            </div>

                            <Select
                                label="Status"
                                required
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                            />
                        </CardBody>

                        <CardFooter className="flex flex-col-reverse gap-3 bg-slate-50/70 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                href={route('student-transport.index')}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Assigning...' : 'Assign Student'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}