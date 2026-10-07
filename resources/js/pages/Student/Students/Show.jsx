import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Select from '@/Components/ui/Select';
import Input from '@/Components/ui/Input';
import {
    PencilIcon, UserCircleIcon, PhoneIcon, EnvelopeIcon,
    MapPinIcon, CalendarIcon, AcademicCapIcon, HeartIcon,
    UsersIcon, ChartBarIcon, CurrencyDollarIcon,
    DocumentTextIcon, PlusIcon, TrashIcon, StarIcon,
    ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

export default function Show({
    auth,
    student,
    stats,
    allGuardians,
    availableStandards,
    availableSections,
    academicSessions,
}) {
    const [activeTab, setActiveTab] = useState('overview');
    const [guardianModalOpen, setGuardianModalOpen] = useState(false);
    const [academicModalOpen, setAcademicModalOpen] = useState(false);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: UserCircleIcon },
        { id: 'guardians', label: 'Guardians', icon: UsersIcon, count: student.guardians?.length || 0 },
        { id: 'academics', label: 'Academic Records', icon: AcademicCapIcon, count: student.student_academic_records?.length || 0 },
        { id: 'attendance', label: 'Attendance', icon: CalendarIcon },
        { id: 'results', label: 'Results', icon: ChartBarIcon },
        { id: 'fees', label: 'Fees', icon: CurrencyDollarIcon },
        { id: 'documents', label: 'Documents', icon: DocumentTextIcon, count: student.student_documents?.length || 0 },
    ];

    const getInitials = () => {
        return `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase();
    };

    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            enrolled: 'success',
            application: 'warning',
            admitted: 'info',
            graduated: 'primary',
            transferred: 'warning',
            dropped: 'danger',
            promoted: 'info',
        };
        return map[status] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`${student.first_name} ${student.last_name}`} />

            <div className="space-y-6">
                <PageHeader
                    title={`${student.first_name} ${student.last_name}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Students', href: route('students.index') },
                        { label: `${student.first_name} ${student.last_name}` },
                    ]}
                    action={
                        <Button href={route('students.edit', student.id)}>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit Student
                        </Button>
                    }
                />

                {/* Profile Header */}
                <Card>
                    <CardBody>
                        <div className="flex items-start gap-6 flex-wrap">
                            {student.student_photo ? (
                                <img
                                    src={`/storage/${student.student_photo}`}
                                    alt={student.first_name}
                                    className="h-24 w-24 rounded-xl object-cover border-2 border-gray-100"
                                />
                            ) : (
                                <div className="h-24 w-24 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                    {getInitials()}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {student.first_name} {student.last_name}
                                    </h2>
                                    <Badge variant={getStatusVariant(student.status)}>
                                        {student.status}
                                    </Badge>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <AcademicCapIcon className="h-4 w-4" />
                                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                            {student.admission_number}
                                        </code>
                                    </div>
                                    {student.roll_number && <div>Roll: {student.roll_number}</div>}
                                    {student.date_of_birth && (
                                        <div className="flex items-center gap-1.5">
                                            <CalendarIcon className="h-4 w-4" />
                                            {student.date_of_birth.split('T')[0]}
                                        </div>
                                    )}
                                    {student.gender && <div className="capitalize">{student.gender}</div>}
                                    {student.blood_group && (
                                        <div className="flex items-center gap-1.5">
                                            <HeartIcon className="h-4 w-4 text-red-500" />
                                            {student.blood_group}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                                    {student.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <PhoneIcon className="h-4 w-4" />
                                            {student.phone}
                                        </div>
                                    )}
                                    {student.email && (
                                        <div className="flex items-center gap-1.5">
                                            <EnvelopeIcon className="h-4 w-4" />
                                            {student.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <div className="p-5">
                            <div className="text-sm text-gray-500">Attendance</div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {stats?.attendance_percentage ?? 0}%
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-5">
                            <div className="text-sm text-gray-500">Fee Due</div>
                            <div className="text-2xl font-bold text-red-600 mt-1">
                                Rs. {stats?.fee_due?.toLocaleString() ?? 0}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-5">
                            <div className="text-sm text-gray-500">Library Books</div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {stats?.library_books ?? 0}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-5">
                            <div className="text-sm text-gray-500">Guardians</div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {student.guardians?.length ?? 0}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex gap-6 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-sm font-medium whitespace-nowrap transition ${
                                        activeTab === tab.id
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                    {tab.count !== undefined && tab.count > 0 && (
                                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <OverviewTab student={student} />
                )}

                {activeTab === 'guardians' && (
                    <GuardiansTab
                        student={student}
                        allGuardians={allGuardians}
                        onOpenModal={() => setGuardianModalOpen(true)}
                    />
                )}

                {activeTab === 'academics' && (
                    <AcademicsTab
                        student={student}
                        availableStandards={availableStandards}
                        academicSessions={academicSessions}
                        onOpenModal={() => setAcademicModalOpen(true)}
                    />
                )}

                {activeTab === 'documents' && (
                    <DocumentsTab
                        student={student}
                        onOpenModal={() => setDocumentModalOpen(true)}
                    />
                )}

                {['attendance', 'results', 'fees'].includes(activeTab) && (
                    <Card>
                        <CardBody>
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-2 text-3xl">🚧</div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    {tabs.find(t => t.id === activeTab)?.label} — Coming Soon
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Will be built with the {activeTab} module.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>

            {/* Modals */}
            <LinkGuardianModal
                show={guardianModalOpen}
                onClose={() => setGuardianModalOpen(false)}
                student={student}
                allGuardians={allGuardians}
            />

            <AddAcademicRecordModal
                show={academicModalOpen}
                onClose={() => setAcademicModalOpen(false)}
                student={student}
                availableStandards={availableStandards}
                availableSections={availableSections}
                academicSessions={academicSessions}
            />

            <UploadDocumentModal
                show={documentModalOpen}
                onClose={() => setDocumentModalOpen(false)}
                student={student}
            />
        </AuthenticatedLayout>
    );
}

/* ============ OVERVIEW TAB ============ */
function OverviewTab({ student }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader title="Personal Information" />
                <CardBody>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoField label="Full Name" value={`${student.first_name} ${student.last_name}`} />
                        <InfoField label="Admission Number" value={student.admission_number} />
                        <InfoField label="Date of Birth" value={student.date_of_birth?.split('T')[0]} />
                        <InfoField label="Gender" value={student.gender} capitalize />
                        <InfoField label="Blood Group" value={student.blood_group} />
                        <InfoField label="Nationality" value={student.nationality} />
                        <InfoField label="Religion" value={student.religion} />
                        <InfoField label="Admission Date" value={student.admission_date?.split('T')[0]} />
                        <InfoField label="Address" value={student.address} className="md:col-span-2" />
                        <InfoField label="Previous School" value={student.previous_school} className="md:col-span-2" />
                    </dl>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Current Class" />
                <CardBody>
                    {student.current_academic_record ? (
                        <div className="space-y-3 text-sm">
                            <InfoField label="Standard" value={student.current_academic_record.standard?.name} />
                            {student.current_academic_record.section && (
                                <InfoField label="Section" value={student.current_academic_record.section.name} />
                            )}
                            <InfoField label="Academic Session" value={student.current_academic_record.academic_session?.name} />
                            <InfoField label="Enrolled Since" value={student.current_academic_record.enrollment_date?.split('T')[0]} />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                            Not enrolled in any class yet.
                        </p>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

function InfoField({ label, value, capitalize, className = '' }) {
    return (
        <div className={className}>
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className={`text-sm font-medium mt-1 ${capitalize ? 'capitalize' : ''}`}>
                {value || '—'}
            </dd>
        </div>
    );
}

/* ============ GUARDIANS TAB ============ */
function GuardiansTab({ student, allGuardians, onOpenModal }) {
    const handleUnlink = (studentGuardianId) => {
        if (confirm('Unlink this guardian from the student?')) {
            router.delete(route('student-guardians.destroy', studentGuardianId));
        }
    };

    const handleSetPrimary = (studentGuardianId) => {
        router.patch(route('student-guardians.set-primary', studentGuardianId));
    };

    const availableGuardians = allGuardians?.filter(
        (g) => !student.guardians?.some((sg) => sg.id === g.id)
    ) || [];

    return (
        <Card>
            <CardHeader
                title="Linked Guardians"
                subtitle="Parents and guardians associated with this student"
                action={
                    <Button onClick={onOpenModal} disabled={availableGuardians.length === 0}>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Link Guardian
                    </Button>
                }
            />
            <CardBody className="p-0">
                {student.guardians && student.guardians.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {student.guardians.map((guardian) => {
                            const pivot = guardian.pivot;
                            const isPrimary = pivot?.is_primary_contact;
                            const studentGuardianId = pivot?.id;

                            return (
                                <div key={guardian.id} className="px-6 py-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                                            {guardian.first_name?.[0]}{guardian.last_name?.[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">
                                                    {guardian.first_name} {guardian.last_name}
                                                </span>
                                                <Badge variant="info">{guardian.relation}</Badge>
                                                {isPrimary && (
                                                    <Badge variant="success">
                                                        <StarIcon className="h-3 w-3 inline mr-1" />
                                                        Primary
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                {guardian.phone && (
                                                    <span className="flex items-center gap-1">
                                                        <PhoneIcon className="h-3.5 w-3.5" />
                                                        {guardian.phone}
                                                    </span>
                                                )}
                                                {guardian.email && (
                                                    <span className="flex items-center gap-1">
                                                        <EnvelopeIcon className="h-3.5 w-3.5" />
                                                        {guardian.email}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {!isPrimary && studentGuardianId && (
                                            <button
                                                onClick={() => handleSetPrimary(studentGuardianId)}
                                                className="px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded"
                                                title="Set as Primary Contact"
                                            >
                                                Set Primary
                                            </button>
                                        )}
                                        {studentGuardianId && (
                                            <button
                                                onClick={() => handleUnlink(studentGuardianId)}
                                                className="p-1 text-gray-500 hover:text-red-600"
                                                title="Unlink"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center">
                        <UsersIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No guardians linked yet.</p>
                        {availableGuardians.length > 0 ? (
                            <Button onClick={onOpenModal} className="mt-4">
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Link First Guardian
                            </Button>
                        ) : (
                            <div className="mt-4">
                                <Link href={route('guardians.create')}>
                                    <Button>+ Create Guardian First</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* ============ ACADEMICS TAB ============ */
function AcademicsTab({ student, availableStandards, academicSessions, onOpenModal }) {
    const records = student.student_academic_records || [];

    return (
        <Card>
            <CardHeader
                title="Academic Records"
                subtitle="Enrollment history across academic sessions"
                action={
                    <Button onClick={onOpenModal}>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Record
                    </Button>
                }
            />
            <CardBody className="p-0">
                {records.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Session</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Standard</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {records.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {record.academic_session?.name || '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {record.standard?.name || '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {record.section?.name || '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {record.enrollment_date?.split('T')[0] || '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={record.status === 'enrolled' ? 'success' : 'info'}>
                                                {record.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center">
                        <AcademicCapIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No academic records yet.</p>
                        <Button onClick={onOpenModal} className="mt-4">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add First Record
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* ============ DOCUMENTS TAB ============ */
function DocumentsTab({ student, onOpenModal }) {
    const documents = student.student_documents || [];

    const handleDelete = (docId) => {
        if (confirm('Delete this document?')) {
            router.delete(route('students.documents.destroy', docId));
        }
    };

    const getTypeLabel = (type) => {
        const map = {
            birth_certificate: 'Birth Certificate',
            previous_school_letter: 'Previous School Letter',
            medical_report: 'Medical Report',
            other: 'Other',
        };
        return map[type] || type;
    };

    return (
        <Card>
            <CardHeader
                title="Documents"
                subtitle="Uploaded files for this student"
                action={
                    <Button onClick={onOpenModal}>
                        <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                        Upload Document
                    </Button>
                }
            />
            <CardBody className="p-0">
                {documents.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {documents.map((doc) => (
                            <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-medium text-gray-900 truncate">{doc.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {getTypeLabel(doc.type)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`/storage/${doc.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-1 text-gray-500 hover:text-red-600"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center">
                        <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                        <Button onClick={onOpenModal} className="mt-4">
                            <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                            Upload First Document
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* ============ MODALS ============ */

function LinkGuardianModal({ show, onClose, student, allGuardians }) {
    const [guardianId, setGuardianId] = useState('');
    const [isPrimary, setIsPrimary] = useState(false);

    const availableGuardians = allGuardians?.filter(
        (g) => !student.guardians?.some((sg) => sg.id === g.id)
    ) || [];

    const submit = (e) => {
        e.preventDefault();
        router.post(route('student-guardians.store'), {
            student_id: student.id,
            guardian_id: guardianId,
            is_primary_contact: isPrimary,
        }, {
            onSuccess: () => {
                onClose();
                setGuardianId('');
                setIsPrimary(false);
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Link Guardian to Student">
            <form onSubmit={submit} className="space-y-4">
                <Select
                    label="Guardian"
                    required
                    value={guardianId}
                    onChange={(e) => setGuardianId(e.target.value)}
                    placeholder="Select Guardian"
                    options={availableGuardians.map((g) => ({
                        value: g.id,
                        label: `${g.first_name} ${g.last_name} (${g.relation})`,
                    }))}
                />

                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <input
                        type="checkbox"
                        id="is_primary"
                        checked={isPrimary}
                        onChange={(e) => setIsPrimary(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="is_primary" className="text-sm text-gray-700 cursor-pointer">
                        Set as primary contact for this student
                    </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!guardianId}>
                        Link Guardian
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

function AddAcademicRecordModal({
    show,
    onClose,
    student,
    availableStandards,
    availableSections,
    academicSessions,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        standard_id: '',
        section_id: '',
        academic_session_id: '',
        enrollment_date: new Date().toISOString().split('T')[0],
        status: 'enrolled',
    });

    // Filter sections by selected standard
    const filteredSections = (availableSections || []).filter(
        (s) => !data.standard_id || s.standard_id == data.standard_id
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('students.academic-records.store', student.id), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Add Academic Record">
            <form onSubmit={submit} className="space-y-4">
                <Select
                    label="Academic Session"
                    required
                    value={data.academic_session_id}
                    onChange={(e) => setData('academic_session_id', e.target.value)}
                    error={errors.academic_session_id}
                    placeholder="Select Session"
                    options={academicSessions?.map((s) => ({ value: s.id, label: s.name })) || []}
                />

                <Select
                    label="Standard"
                    required
                    value={data.standard_id}
                    onChange={(e) => {
                        setData('standard_id', e.target.value);
                        setData('section_id', '');
                    }}
                    error={errors.standard_id}
                    placeholder="Select Standard"
                    options={availableStandards?.map((s) => ({
                        value: s.id,
                        label: `${s.name} (${s.code})`,
                    })) || []}
                />

                <Select
                    label="Section"
                    required
                    value={data.section_id}
                    onChange={(e) => setData('section_id', e.target.value)}
                    error={errors.section_id}
                    placeholder={data.standard_id ? 'Select Section' : 'Select a standard first'}
                    options={filteredSections.map((s) => ({
                        value: s.id,
                        label: `${s.name}${s.code ? ` (${s.code})` : ''}`,
                    }))}
                    disabled={!data.standard_id}
                />

                {data.standard_id && filteredSections.length === 0 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                        No sections found for this standard. Please{' '}
                        <a href={route('school.sections.create')} className="font-medium underline">
                            create a section
                        </a>{' '}
                        first.
                    </div>
                )}

                <Input
                    label="Enrollment Date"
                    type="date"
                    required
                    value={data.enrollment_date}
                    onChange={(e) => setData('enrollment_date', e.target.value)}
                    error={errors.enrollment_date}
                />

                <Select
                    label="Status"
                    required
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    error={errors.status}
                    options={[
                        { value: 'enrolled', label: 'Enrolled' },
                        { value: 'promoted', label: 'Promoted' },
                        { value: 'graduated', label: 'Graduated' },
                        { value: 'transferred', label: 'Transferred' },
                    ]}
                />

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Add Record
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

function UploadDocumentModal({ show, onClose, student }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        file: null,
        type: 'other',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('students.documents.store', student.id), {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Upload Document">
            <form onSubmit={submit} className="space-y-4">
                <Input
                    label="Document Name"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="e.g. Birth Certificate Copy"
                />

                <Select
                    label="Document Type"
                    required
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    error={errors.type}
                    options={[
                        { value: 'birth_certificate', label: 'Birth Certificate' },
                        { value: 'previous_school_letter', label: 'Previous School Letter' },
                        { value: 'medical_report', label: 'Medical Report' },
                        { value: 'other', label: 'Other' },
                    ]}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        File <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setData('file', e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Upload
                    </Button>
                </div>
            </form>
        </Modal>
    );
}