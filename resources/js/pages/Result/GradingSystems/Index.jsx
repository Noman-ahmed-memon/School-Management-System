import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Modal from '@/Components/ui/Modal';
import Input from '@/Components/ui/Input';
import EmptyState from '@/Components/ui/EmptyState';
import {
    ChartBarIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    AcademicCapIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, grades }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Delete this grade?')) {
            router.delete(route('grading-systems.destroy', id));
        }
    };

    const openAdd = () => {
        setEditingGrade(null);
        setModalOpen(true);
    };

    const openEdit = (grade) => {
        setEditingGrade(grade);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingGrade(null);
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Grading Systems" />

            <div className="space-y-7">

                {/* Header */}
                <PageHeader
                    title="Grading System"
                    subtitle="Configure academic grade boundaries and GPA points"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Grading Systems' },
                    ]}
                    action={
                        <Button onClick={openAdd}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Grade
                        </Button>
                    }
                />

                {/* Academic Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900" />

                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="relative px-6 py-7 md:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur">
                                    <AcademicCapIcon className="h-7 w-7 text-indigo-300" />
                                </div>

                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                                            Academic Framework
                                        </span>
                                        <SparklesIcon className="h-4 w-4 text-indigo-300" />
                                    </div>

                                    <h2 className="text-xl font-bold tracking-tight text-white">
                                        Academic Performance Scale
                                    </h2>

                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
                                        Define percentage boundaries and corresponding grade
                                        points used throughout examination and result processing.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:min-w-[230px]">
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Grades
                                    </div>
                                    <div className="mt-1 text-2xl font-bold text-white">
                                        {grades.data.length}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Scale
                                    </div>
                                    <div className="mt-1 text-2xl font-bold text-indigo-300">
                                        0–100%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grade Table */}
                <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <CardHeader
                        title="Grade Scale"
                        subtitle="Percentage ranges are used to automatically calculate grades and GPA points"
                    />

                    <CardBody className="p-0">
                        {grades.data.length === 0 ? (
                            <div className="px-6 py-12">
                                <EmptyState
                                    icon={<ChartBarIcon />}
                                    title="No grading system configured"
                                    description="Add grade ranges to enable automatic academic grading."
                                    action={
                                        <Button onClick={openAdd}>
                                            <PlusIcon className="h-4 w-4 mr-2" />
                                            Add First Grade
                                        </Button>
                                    }
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Grade
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Classification
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Percentage Range
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Grade Points
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Description
                                            </th>
                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {grades.data.map((grade, index) => (
                                            <tr
                                                key={grade.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg font-extrabold text-indigo-700 ring-1 ring-indigo-100">
                                                            {grade.grade}
                                                        </div>

                                                        {index === 0 && (
                                                            <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-700">
                                                                Top
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-slate-800">
                                                        {grade.name}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-slate-400">
                                                        Academic classification
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                                            <div
                                                                className="h-full rounded-full bg-indigo-500"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        Number(grade.max_percentage),
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            />
                                                        </div>

                                                        <span className="text-sm font-semibold text-slate-700">
                                                            {grade.min_percentage}% — {grade.max_percentage}%
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">
                                                        {grade.points}
                                                    </span>
                                                </td>

                                                <td className="max-w-xs px-6 py-4 text-sm text-slate-500">
                                                    {grade.description || (
                                                        <span className="italic text-slate-300">
                                                            No description
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEdit(grade)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="Edit grade"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(grade.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete grade"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

            <GradeModal
                show={modalOpen}
                onClose={closeModal}
                grade={editingGrade}
            />
        </AuthenticatedLayout>
    );
}

function GradeModal({ show, onClose, grade }) {
    const isEdit = !!grade;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        name: '',
        grade: '',
        min_percentage: '',
        max_percentage: '',
        points: '',
        description: '',
    });

    const [loadedId, setLoadedId] = useState(null);

    if (show && grade && loadedId !== grade.id) {
        setData({
            _method: 'PUT',
            name: grade.name || '',
            grade: grade.grade || '',
            min_percentage: grade.min_percentage || '',
            max_percentage: grade.max_percentage || '',
            points: grade.points || '',
            description: grade.description || '',
        });

        setLoadedId(grade.id);
    }

    if (show && !grade && loadedId !== 'new') {
        reset();
        setData('_method', 'POST');
        setLoadedId('new');
    }

    if (!show && loadedId !== null) {
        setLoadedId(null);
    }

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit
            ? route('grading-systems.update', grade.id)
            : route('grading-systems.store');

        post(url, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={isEdit ? 'Edit Grade' : 'Add Grade'}
        >
            <form onSubmit={submit} className="space-y-5">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                            <ChartBarIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">
                                {isEdit ? 'Update grade configuration' : 'Create grade configuration'}
                            </p>
                            <p className="text-xs text-slate-500">
                                Define the classification and academic points.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Grade"
                        required
                        value={data.grade}
                        onChange={(e) =>
                            setData('grade', e.target.value.toUpperCase())
                        }
                        error={errors.grade}
                        placeholder="e.g. A+"
                    />

                    <Input
                        label="Name"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="e.g. Excellent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Minimum %"
                        type="number"
                        step="0.01"
                        required
                        value={data.min_percentage}
                        onChange={(e) =>
                            setData('min_percentage', e.target.value)
                        }
                        error={errors.min_percentage}
                        placeholder="e.g. 90"
                    />

                    <Input
                        label="Maximum %"
                        type="number"
                        step="0.01"
                        required
                        value={data.max_percentage}
                        onChange={(e) =>
                            setData('max_percentage', e.target.value)
                        }
                        error={errors.max_percentage}
                        placeholder="e.g. 100"
                    />
                </div>

                <Input
                    label="Grade Points"
                    type="number"
                    step="0.01"
                    required
                    value={data.points}
                    onChange={(e) => setData('points', e.target.value)}
                    error={errors.points}
                    placeholder="e.g. 4.0"
                />

                <Input
                    label="Description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Optional academic note"
                />

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {processing
                            ? 'Saving...'
                            : isEdit
                                ? 'Update Grade'
                                : 'Add Grade'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}