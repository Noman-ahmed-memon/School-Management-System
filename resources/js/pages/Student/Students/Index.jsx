import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Edit({ auth, student }) {
    const [photoPreview, setPhotoPreview] = useState(
        student.student_photo
            ? `/storage/${student.student_photo}`
            : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        first_name: student.first_name || '',
        last_name: student.last_name || '',
        admission_number: student.admission_number || '',
        roll_number: student.roll_number || '',
        date_of_birth: student.date_of_birth
            ? student.date_of_birth.split('T')[0]
            : '',
        gender: student.gender || '',
        blood_group: student.blood_group || '',
        nationality: student.nationality || '',
        religion: student.religion || '',
        address: student.address || '',
        phone: student.phone || '',
        email: student.email || '',
        previous_school: student.previous_school || '',
        admission_date: student.admission_date
            ? student.admission_date.split('T')[0]
            : '',
        student_photo: null,
        status: student.status || 'enrolled',
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

        post(route('students.update', student.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head
                title={`Edit ${student.first_name} ${student.last_name}`}
            />

            <div className="mx-auto max-w-4xl space-y-6">
                <PageHeader
                    title="Edit Student"
                    subtitle={`Update details for ${student.first_name} ${student.last_name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Students',
                            href: route('students.index'),
                        },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Personal Information"
                            subtitle="Update the student's personal and identification details"
                        />

                        <CardBody className="space-y-6">
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
                                            Change Photo
                                        </label>

                                        <p className="mb-3 text-xs text-slate-500">
                                            Upload a new photograph if you
                                            want to replace the current one.
                                        </p>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
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
                                    setData(
                                        'address',
                                        e.target.value
                                    )
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
                                    {
                                        value: 'promoted',
                                        label: 'Promoted',
                                    },
                                    {
                                        value: 'graduated',
                                        label: 'Graduated',
                                    },
                                    {
                                        value: 'transferred',
                                        label: 'Transferred',
                                    },
                                    {
                                        value: 'dropped',
                                        label: 'Dropped',
                                    },
                                ]}
                            />
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
                                ? 'Updating...'
                                : 'Update Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}