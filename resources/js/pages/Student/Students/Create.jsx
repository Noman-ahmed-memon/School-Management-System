import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, {
    CardHeader,
    CardBody,
} from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import {
    PhotoIcon,
    AcademicCapIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

export default function Create({
    auth,
    campuses = [],
    standards = [],
    academicSessions = [],
}) {
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        first_name: '',
        last_name: '',
        admission_number: '',
        roll_number: '',
        date_of_birth: '',
        gender: '',
        blood_group: '',
        nationality: '',
        religion: '',
        address: '',
        phone: '',
        email: '',
        previous_school: '',
        admission_date: new Date().toISOString().split('T')[0],
        student_photo: null,
        status: 'enrolled',
        standard_id: '',
        section_id: '',
        academic_session_id: '',
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        setData('student_photo', file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (ev) =>
                setPhotoPreview(ev.target.result);

            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('students.store'), {
            forceFormData: true,
        });
    };

    const showCampusSelector = campuses.length > 1;

    const filteredStandards = data.campus_id
        ? standards.filter(
              (s) => s.campus_id == data.campus_id
          )
        : standards;

    const filteredSessions = data.campus_id
        ? academicSessions.filter(
              (s) => s.campus_id == data.campus_id
          )
        : academicSessions;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Student" />

            <div className="mx-auto max-w-4xl space-y-6">
                <PageHeader
                    title="Add Student"
                    subtitle="Create a new student record"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Students',
                            href: route('students.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    {showCampusSelector && (
                        <Card className="overflow-hidden">
                            <CardHeader
                                title="Campus Assignment"
                                subtitle="Choose which campus this student belongs to"
                            />

                            <CardBody className="bg-slate-50/50">
                                <Select
                                    label="Campus"
                                    required
                                    value={data.campus_id}
                                    onChange={(e) => {
                                        setData(
                                            'campus_id',
                                            e.target.value
                                        );
                                        setData('standard_id', '');
                                        setData('section_id', '');
                                        setData(
                                            'academic_session_id',
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

                    {/* Personal Information */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Personal Information"
                            subtitle="Basic details and identification information"
                        />

                        <CardBody className="space-y-6">
                            {/* Photo */}
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <div className="shrink-0">
                                        {photoPreview ? (
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white shadow-md"
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-slate-400 ring-1 ring-slate-200">
                                                <PhotoIcon className="h-10 w-10" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                                            Student Photo
                                        </label>

                                        <p className="mb-3 text-xs text-slate-500">
                                            Upload a clear profile photograph
                                            for the student's record.
                                        </p>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                        />

                                        {errors.student_photo && (
                                            <p className="mt-1.5 text-sm text-rose-600">
                                                {errors.student_photo}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="First Name"
                                    required
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData(
                                            'first_name',
                                            e.target.value
                                        )
                                    }
                                    error={errors.first_name}
                                />

                                <Input
                                    label="Last Name"
                                    required
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData(
                                            'last_name',
                                            e.target.value
                                        )
                                    }
                                    error={errors.last_name}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Admission Number"
                                    required
                                    value={data.admission_number}
                                    onChange={(e) =>
                                        setData(
                                            'admission_number',
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    error={errors.admission_number}
                                    placeholder="e.g. ADM-2026-001"
                                />

                                <Input
                                    label="Roll Number"
                                    value={data.roll_number}
                                    onChange={(e) =>
                                        setData(
                                            'roll_number',
                                            e.target.value
                                        )
                                    }
                                    error={errors.roll_number}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    required
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData(
                                            'date_of_birth',
                                            e.target.value
                                        )
                                    }
                                    error={errors.date_of_birth}
                                />

                                <Select
                                    label="Gender"
                                    required
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData(
                                            'gender',
                                            e.target.value
                                        )
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

                                <Select
                                    label="Blood Group"
                                    value={data.blood_group}
                                    onChange={(e) =>
                                        setData(
                                            'blood_group',
                                            e.target.value
                                        )
                                    }
                                    error={errors.blood_group}
                                    placeholder="Select Blood Group"
                                    options={[
                                        { value: 'A+', label: 'A+' },
                                        { value: 'A-', label: 'A-' },
                                        { value: 'B+', label: 'B+' },
                                        { value: 'B-', label: 'B-' },
                                        { value: 'AB+', label: 'AB+' },
                                        { value: 'AB-', label: 'AB-' },
                                        { value: 'O+', label: 'O+' },
                                        { value: 'O-', label: 'O-' },
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Nationality"
                                    value={data.nationality}
                                    onChange={(e) =>
                                        setData(
                                            'nationality',
                                            e.target.value
                                        )
                                    }
                                    error={errors.nationality}
                                    placeholder="e.g. Pakistani"
                                />

                                <Input
                                    label="Religion"
                                    value={data.religion}
                                    onChange={(e) =>
                                        setData(
                                            'religion',
                                            e.target.value
                                        )
                                    }
                                    error={errors.religion}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                                <Input
                                    label="Email"
                                    type="email"
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

                            <Textarea
                                label="Address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                error={errors.address}
                                rows={2}
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Previous School"
                                    value={data.previous_school}
                                    onChange={(e) =>
                                        setData(
                                            'previous_school',
                                            e.target.value
                                        )
                                    }
                                    error={errors.previous_school}
                                />

                                <Input
                                    label="Admission Date"
                                    type="date"
                                    required
                                    value={data.admission_date}
                                    onChange={(e) =>
                                        setData(
                                            'admission_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.admission_date}
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
                                        value: 'application',
                                        label: 'Application',
                                    },
                                    {
                                        value: 'admitted',
                                        label: 'Admitted',
                                    },
                                    {
                                        value: 'enrolled',
                                        label: 'Enrolled',
                                    },
                                    {
                                        value: 'active',
                                        label: 'Active',
                                    },
                                ]}
                            />
                        </CardBody>
                    </Card>

                    {/* Academic Placement */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Academic Placement"
                            subtitle="Optional placement information for the student's initial enrollment"
                        />

                        <CardBody className="space-y-6">
                            <Select
                                label="Academic Session"
                                value={data.academic_session_id}
                                onChange={(e) =>
                                    setData(
                                        'academic_session_id',
                                        e.target.value
                                    )
                                }
                                error={errors.academic_session_id}
                                placeholder="Select Session"
                                options={filteredSessions.map((s) => ({
                                    value: s.id,
                                    label: s.name,
                                }))}
                            />

                            <Select
                                label="Standard"
                                value={data.standard_id}
                                onChange={(e) => {
                                    setData(
                                        'standard_id',
                                        e.target.value
                                    );
                                    setData('section_id', '');
                                }}
                                error={errors.standard_id}
                                placeholder="Select Standard"
                                options={filteredStandards.map((s) => ({
                                    value: s.id,
                                    label: `${s.name}${
                                        s.code ? ` (${s.code})` : ''
                                    }`,
                                }))}
                            />

                            <Select
                                label="Section"
                                value={data.section_id}
                                onChange={(e) =>
                                    setData(
                                        'section_id',
                                        e.target.value
                                    )
                                }
                                error={errors.section_id}
                                placeholder="Select Section (optional)"
                                options={[]}
                                disabled
                            />

                            <div className="flex items-start gap-2 rounded-lg border border-indigo-100 bg-indigo-50/60 p-3">
                                <AcademicCapIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

                                <p className="text-xs leading-5 text-indigo-700">
                                    Save the student first, then assign a
                                    section from their profile.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button
                            variant="outline"
                            href={route('students.index')}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing
                                ? 'Creating...'
                                : 'Create Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}