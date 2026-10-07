import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import EmptyState from '@/Components/ui/EmptyState';
import {
    BanknotesIcon,
    PlusIcon,
    TrashIcon,
    PencilIcon,
    MagnifyingGlassIcon,
    CurrencyDollarIcon,
    SparklesIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Index({
    auth,
    structures,
    standards = [],
    feeTypes = [],
    academicSessions = [],
    filters,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [standardId, setStandardId] = useState(
        filters?.standard_id || ''
    );
    const [sessionId, setSessionId] = useState(
        filters?.academic_session_id || ''
    );

    const handleFilter = () => {
        router.get(
            route('fee-structures.index'),
            {
                standard_id: standardId,
                academic_session_id: sessionId,
            },
            { preserveState: true }
        );
    };

    const handleClear = () => {
        setStandardId('');
        setSessionId('');
        router.get(route('fee-structures.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this fee structure?')) {
            router.delete(
                route('fee-structures.destroy', id)
            );
        }
    };

    const openAdd = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setModalOpen(true);
    };

    // Group by standard
    const groupedByStandard = {};
    structures?.data?.forEach((s) => {
        const key = s.standard?.name || 'Unknown';
        if (!groupedByStandard[key]) {
            groupedByStandard[key] = [];
        }
        groupedByStandard[key].push(s);
    });

    // Overview metrics
    const totalStructures = structures?.data?.length || 0;
    const totalStandards = Object.keys(
        groupedByStandard
    ).length;
    const totalValue = structures?.data?.reduce(
        (sum, s) => sum + Number(s.amount || 0),
        0
    ) || 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Fee Structures" />

            <div className="space-y-6">

                <PageHeader
                    title="Fee Structures"
                    subtitle="Configure fee amounts applied to standards and academic sessions"
                    breadcrumbs={[
                        {
                            label: 'Dashboard',
                            href: '/dashboard',
                        },
                        { label: 'Fee Structures' },
                    ]}
                    action={
                        <Button onClick={openAdd}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Fee Structure
                        </Button>
                    }
                />

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Total Structures
                                </p>

                                <p className="mt-1 text-2xl font-bold text-indigo-600">
                                    {totalStructures}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Standards Covered
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {totalStandards}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <SparklesIcon className="h-5 w-5 text-emerald-600" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Total Configured
                                </p>

                                <p className="mt-1 text-xl font-bold text-amber-600">
                                    Rs. {totalValue.toLocaleString()}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                <CurrencyDollarIcon className="h-5 w-5 text-amber-600" />
                            </div>

                        </div>
                    </div>

                </div>

                {/* Filters */}
                <Card className="overflow-hidden">

                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">

                        <div className="flex items-center gap-2 mb-4">

                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Filter Structures
                                </p>

                                <p className="text-xs text-slate-500">
                                    Narrow down by standard or session
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 items-end">

                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Standard
                                </label>

                                <select
                                    value={standardId}
                                    onChange={(e) =>
                                        setStandardId(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        All Standards
                                    </option>

                                    {(standards || []).map((s) => (
                                        <option
                                            key={s.id}
                                            value={s.id}
                                        >
                                            {s.name}{' '}
                                            {s.code
                                                ? `(${s.code})`
                                                : ''}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Academic Session
                                </label>

                                <select
                                    value={sessionId}
                                    onChange={(e) =>
                                        setSessionId(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        All Sessions
                                    </option>

                                    {(academicSessions || []).map(
                                        (s) => (
                                            <option
                                                key={s.id}
                                                value={s.id}
                                            >
                                                {s.name}
                                            </option>
                                        )
                                    )}

                                </select>
                            </div>

                            <Button onClick={handleFilter}>
                                Filter
                            </Button>

                            {(standardId || sessionId) && (
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition"
                                >
                                    Clear
                                </button>
                            )}

                        </div>

                    </div>

                    {/* Content */}
                    {!structures?.data ||
                    structures.data.length === 0 ? (
                        <EmptyState
                            icon={<BanknotesIcon />}
                            title="No fee structures configured"
                            description="Assign fee amounts to standards to begin collecting fees."
                            action={
                                <Button onClick={openAdd}>
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Fee Structure
                                </Button>
                            }
                        />
                    ) : (
                        <div className="p-4 sm:p-6 space-y-5 bg-slate-50/40">

                            {Object.entries(
                                groupedByStandard
                            ).map(([standardName, items]) => (

                                <Card
                                    key={standardName}
                                    className="overflow-hidden bg-white"
                                >

                                    {/* Standard Header */}
                                    <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-slate-50 to-white">

                                        <div className="flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                                <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-800">
                                                    {standardName}
                                                </h3>

                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {items[0]
                                                        ?.academic_session
                                                        ?.name}{' '}
                                                    • Total per student:{' '}
                                                    <span className="font-semibold text-indigo-600">
                                                        Rs.{' '}
                                                        {items
                                                            .reduce(
                                                                (
                                                                    sum,
                                                                    i
                                                                ) =>
                                                                    sum +
                                                                    Number(
                                                                        i.amount
                                                                    ),
                                                                0
                                                            )
                                                            .toLocaleString()}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>

                                        <Badge variant="info">
                                            {items.length} fee
                                            {items.length > 1
                                                ? 's'
                                                : ''}
                                        </Badge>

                                    </div>

                                    {/* Fee Items */}
                                    <div className="divide-y divide-slate-100">

                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50/80 transition group"
                                            >

                                                <div className="flex items-center gap-3 min-w-0">

                                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                                        <BanknotesIcon className="h-5 w-5 text-emerald-600" />
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="text-sm font-semibold text-slate-800 truncate">
                                                            {item
                                                                .fee_type
                                                                ?.name ||
                                                                '—'}
                                                        </p>

                                                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">

                                                            {item
                                                                .fee_type
                                                                ?.code && (
                                                                <code className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                                                                    {
                                                                        item
                                                                            .fee_type
                                                                            .code
                                                                    }
                                                                </code>
                                                            )}

                                                            {item.is_optional && (
                                                                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                                    Optional
                                                                </span>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-4">

                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-slate-800 tabular-nums">
                                                            Rs.{' '}
                                                            {Number(
                                                                item.amount
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1">

                                                        <button
                                                            onClick={() =>
                                                                openEdit(
                                                                    item
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                                            title="Delete"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        ))}

                                    </div>

                                </Card>

                            ))}

                        </div>
                    )}

                </Card>

            </div>

            <FeeStructureModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                editing={editing}
                standards={standards}
                feeTypes={feeTypes}
                academicSessions={academicSessions}
            />

        </AuthenticatedLayout>
    );
}

// =========================================================
// FEE STRUCTURE MODAL
// =========================================================
function FeeStructureModal({
    show,
    onClose,
    editing,
    standards = [],
    feeTypes = [],
    academicSessions = [],
}) {
    const isEdit = !!editing;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        _method: 'POST',
        standard_id: '',
        fee_type_id: '',
        academic_session_id: '',
        amount: '',
        is_optional: false,
    });

    const [loadedId, setLoadedId] = useState(null);

    if (show && editing && loadedId !== editing.id) {
        setData({
            _method: 'PUT',
            standard_id: editing.standard_id || '',
            fee_type_id: editing.fee_type_id || '',
            academic_session_id:
                editing.academic_session_id || '',
            amount: editing.amount || '',
            is_optional: editing.is_optional || false,
        });
        setLoadedId(editing.id);
    }

    if (show && !editing && loadedId !== 'new') {
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
            ? route(
                  'fee-structures.update',
                  editing.id
              )
            : route('fee-structures.store');

        post(url, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    // Standard options
    const standardOptions = [
        ...(!isEdit
            ? [
                  {
                      value: 'all',
                      label:
                          '⭐ All Standards (Bulk Apply)',
                  },
              ]
            : []),
        ...standards.map((s) => ({
            value: s.id,
            label: `${s.name}${
                s.code ? ` (${s.code})` : ''
            }`,
        })),
    ];

    const isBulk = data.standard_id === 'all';

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={
                isEdit
                    ? 'Edit Fee Structure'
                    : 'Add Fee Structure'
            }
        >
            <form
                onSubmit={submit}
                className="space-y-5"
            >

                <Select
                    label="Standard"
                    required
                    value={data.standard_id}
                    onChange={(e) =>
                        setData(
                            'standard_id',
                            e.target.value
                        )
                    }
                    error={errors.standard_id}
                    placeholder="Select Standard"
                    options={standardOptions}
                />

                {isBulk && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">

                        <div className="flex gap-3">

                            <div className="h-9 w-9 rounded-lg bg-white border border-amber-200 flex items-center justify-center shrink-0">
                                <SparklesIcon className="h-4 w-4 text-amber-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-amber-900">
                                    Bulk Apply
                                </p>

                                <p className="text-xs text-amber-800 mt-0.5">
                                    This will create or update
                                    this fee for{' '}
                                    <strong>
                                        all{' '}
                                        {standards.length}{' '}
                                        active standard
                                        {standards.length !== 1
                                            ? 's'
                                            : ''}
                                    </strong>{' '}
                                    in the current academic
                                    session.
                                </p>
                            </div>

                        </div>

                    </div>
                )}

                <Select
                    label="Fee Type"
                    required
                    value={data.fee_type_id}
                    onChange={(e) =>
                        setData(
                            'fee_type_id',
                            e.target.value
                        )
                    }
                    error={errors.fee_type_id}
                    placeholder="Select Fee Type"
                    options={(feeTypes || []).map((f) => ({
                        value: f.id,
                        label: `${f.name}${
                            f.code ? ` (${f.code})` : ''
                        }`,
                    }))}
                />

                <Select
                    label="Academic Session"
                    required
                    value={data.academic_session_id}
                    onChange={(e) =>
                        setData(
                            'academic_session_id',
                            e.target.value
                        )
                    }
                    error={errors.academic_session_id}
                    placeholder="Select Session"
                    options={(academicSessions || []).map(
                        (s) => ({
                            value: s.id,
                            label: s.name,
                        })
                    )}
                />

                <Input
                    label="Amount (Rs.)"
                    type="number"
                    step="0.01"
                    required
                    value={data.amount}
                    onChange={(e) =>
                        setData('amount', e.target.value)
                    }
                    error={errors.amount}
                    placeholder="e.g. 10000"
                />

                <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

                    <input
                        type="checkbox"
                        id="is_optional"
                        checked={data.is_optional}
                        onChange={(e) =>
                            setData(
                                'is_optional',
                                e.target.checked
                            )
                        }
                        className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <div>
                        <label
                            htmlFor="is_optional"
                            className="text-sm font-medium text-indigo-900 cursor-pointer"
                        >
                            Optional fee
                        </label>

                        <p className="text-xs text-indigo-700/80 mt-0.5">
                            Students can opt out of this fee
                            (e.g. Transport, Library)
                        </p>
                    </div>

                </div>

                {errors.error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {errors.error}
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

                    <Button
                        variant="outline"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={processing}
                    >
                        {processing
                            ? isBulk
                                ? 'Applying to all...'
                                : 'Saving...'
                            : isBulk
                            ? 'Apply to All Standards'
                            : isEdit
                            ? 'Update'
                            : 'Add'}
                    </Button>

                </div>

            </form>
        </Modal>
    );
}