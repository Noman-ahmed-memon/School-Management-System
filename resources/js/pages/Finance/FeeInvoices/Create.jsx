import { Head, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    PlusIcon,
    TrashIcon,
    BanknotesIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    AcademicCapIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({
    auth,
    students = [],
    standards = [],
    feeTypes = [],
    academicSessions = [],
}) {
    const [selectedStandardId, setSelectedStandardId] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [items, setItems] = useState([
        {
            fee_type_id: '',
            amount: '',
            description: '',
        },
    ]);

    const [data, setData] = useState({
        student_id: '',
        academic_session_id: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString().split('T')[0],
        discount_amount: 0,
        discount_type: 'fixed',
        discount_reason: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [scholarshipApplied, setScholarshipApplied] =
        useState(false);

    const filteredStudents = useMemo(() => {
        return students.filter((s) => {
            if (
                selectedStandardId &&
                s.standard_id != selectedStandardId
            ) {
                return false;
            }

            if (studentSearch) {
                const term = studentSearch.toLowerCase();

                const fullName =
                    `${s.first_name} ${s.last_name}`.toLowerCase();

                const admNum =
                    (s.admission_number || '').toLowerCase();

                if (
                    !fullName.includes(term) &&
                    !admNum.includes(term)
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [students, selectedStandardId, studentSearch]);

    useEffect(() => {
        if (!selectedStudent) return;

        const sch = selectedStudent.scholarship;

        if (sch) {
            const discountValue = sch.amount;

            setData((prev) => ({
                ...prev,
                discount_type:
                    sch.type === 'percentage'
                        ? 'percentage'
                        : 'fixed',
                discount_amount: discountValue,
                discount_reason: sch.name,
            }));

            setScholarshipApplied(true);
        } else {
            setScholarshipApplied(false);
        }
    }, [selectedStudent]);

    const handleStudentChange = (studentId) => {
        setData({
            ...data,
            student_id: studentId,
        });

        const student = students.find(
            (s) => s.id == studentId
        );

        setSelectedStudent(student);
    };

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                fee_type_id: '',
                amount: '',
                description: '',
            },
        ]);
    };

    const handleRemoveItem = (index) => {
        if (items.length === 1) return;

        setItems(
            items.filter((_, i) => i !== index)
        );
    };

    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const totalAmount = items.reduce(
        (sum, i) => sum + Number(i.amount || 0),
        0
    );

    const discountValue =
        data.discount_type === 'percentage'
            ? (totalAmount *
                  Number(data.discount_amount || 0)) /
              100
            : Number(data.discount_amount || 0);

    const netAmount = Math.max(
        0,
        totalAmount - discountValue
    );

    const clearScholarship = () => {
        setData((prev) => ({
            ...prev,
            discount_amount: 0,
            discount_type: 'fixed',
            discount_reason: '',
        }));

        setScholarshipApplied(false);
    };

    const submit = (e) => {
        e.preventDefault();

        const filledItems = items.filter(
            (i) => i.fee_type_id && i.amount
        );

        if (filledItems.length === 0) {
            alert('Please add at least one fee item.');
            return;
        }

        if (!data.student_id) {
            alert('Please select a student.');
            return;
        }

        if (!data.academic_session_id) {
            alert('Please select an academic session.');
            return;
        }

        setProcessing(true);

        router.post(
            route('fee-invoices.store'),
            {
                student_id: data.student_id,
                academic_session_id:
                    data.academic_session_id,
                issue_date: data.issue_date,
                due_date: data.due_date,
                items: filledItems,
                discount_amount:
                    data.discount_amount,
                discount_type: data.discount_type,
                discount_reason:
                    data.discount_reason,
            },
            {
                onError: (errs) => {
                    setErrors(errs);
                    setProcessing(false);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const feeTypeOptions = feeTypes.map((f) => ({
        value: f.id,
        label: `${f.name} (${f.code})`,
    }));

    const standardOptions = standards.map((s) => ({
        value: s.id,
        label: `${s.name} (${s.code})`,
    }));

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="New Invoice" />

            <div className="max-w-5xl mx-auto space-y-6">

                <PageHeader
                    title="New Invoice"
                    subtitle="Create a student fee invoice"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Fee Invoices',
                            href: route('fee-invoices.index'),
                        },
                        { label: 'Create' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">

                    {/* Student */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Student & Academic Session"
                            subtitle="Select the student and academic period for this invoice"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <Select
                                    label="Filter by Standard"
                                    value={selectedStandardId}
                                    onChange={(e) => {
                                        setSelectedStandardId(
                                            e.target.value
                                        );

                                        setData({
                                            ...data,
                                            student_id: '',
                                        });

                                        setSelectedStudent(null);
                                    }}
                                    placeholder="All Standards"
                                    options={standardOptions}
                                    hint="Optional: narrow students by class"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Search Student
                                    </label>

                                    <div className="relative">
                                        <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="text"
                                            value={studentSearch}
                                            onChange={(e) =>
                                                setStudentSearch(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Name or admission number..."
                                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                            </div>

                            <Select
                                label="Student"
                                required
                                value={data.student_id}
                                onChange={(e) =>
                                    handleStudentChange(
                                        e.target.value
                                    )
                                }
                                error={errors.student_id}
                                placeholder={
                                    filteredStudents.length === 0
                                        ? 'No students match your filters'
                                        : `Select Student (${filteredStudents.length} available)`
                                }
                                options={filteredStudents.map(
                                    (s) => ({
                                        value: s.id,
                                        label: `${s.first_name} ${s.last_name} (${s.admission_number})${s.standard_name ? ` — ${s.standard_name}` : ''}${s.scholarship ? ' 🎓' : ''}`,
                                    })
                                )}
                            />

                            {selectedStudent && (
                                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-full bg-white border border-indigo-100 flex items-center justify-center">
                                                <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {selectedStudent.first_name}{' '}
                                                    {selectedStudent.last_name}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Admission:{' '}
                                                    {selectedStudent.admission_number}

                                                    {selectedStudent.standard_name && (
                                                        <>
                                                            <span className="mx-1.5">
                                                                •
                                                            </span>
                                                            {
                                                                selectedStudent.standard_name
                                                            }
                                                        </>
                                                    )}

                                                    {selectedStudent.section_name && (
                                                        <>
                                                            <span className="mx-1.5">
                                                                •
                                                            </span>
                                                            {
                                                                selectedStudent.section_name
                                                            }
                                                        </>
                                                    )}
                                                </p>
                                            </div>

                                        </div>

                                        {selectedStudent.scholarship && (
                                            <div className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2">

                                                <AcademicCapIcon className="h-5 w-5 text-purple-600" />

                                                <div>
                                                    <p className="text-xs font-semibold text-purple-900">
                                                        {
                                                            selectedStudent.scholarship.name
                                                        }
                                                    </p>

                                                    <p className="text-[11px] text-purple-700">
                                                        {selectedStudent.scholarship.type ===
                                                        'percentage'
                                                            ? `${selectedStudent.scholarship.amount}% off`
                                                            : `Rs. ${Number(
                                                                  selectedStudent
                                                                      .scholarship
                                                                      .amount
                                                              ).toLocaleString()} off`}
                                                    </p>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}

                            <Select
                                label="Academic Session"
                                required
                                value={
                                    data.academic_session_id
                                }
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        academic_session_id:
                                            e.target.value,
                                    })
                                }
                                error={
                                    errors.academic_session_id
                                }
                                placeholder="Select Session"
                                options={academicSessions.map(
                                    (s) => ({
                                        value: s.id,
                                        label: s.name,
                                    })
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <Input
                                    label="Issue Date"
                                    type="date"
                                    required
                                    value={data.issue_date}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            issue_date:
                                                e.target.value,
                                        })
                                    }
                                    error={errors.issue_date}
                                />

                                <Input
                                    label="Due Date"
                                    type="date"
                                    required
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            due_date:
                                                e.target.value,
                                        })
                                    }
                                    error={errors.due_date}
                                />

                            </div>

                        </CardBody>
                    </Card>

                    {/* Items */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Fee Items"
                            subtitle="Add the charges that make up this invoice"
                            action={
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddItem}
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Add Item
                                </Button>
                            }
                        />

                        <CardBody className="space-y-3">

                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                                >

                                    <div className="flex items-center justify-between mb-4">

                                        <div className="flex items-center gap-2">
                                            <span className="h-7 w-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </span>

                                            <span className="text-sm font-semibold text-slate-800">
                                                Fee Item
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveItem(
                                                    index
                                                )
                                            }
                                            disabled={
                                                items.length === 1
                                            }
                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                            title="Remove item"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                        <div className="md:col-span-5">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Fee Type
                                            </label>

                                            <select
                                                value={
                                                    item.fee_type_id
                                                }
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        'fee_type_id',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="">
                                                    Select Fee Type
                                                </option>

                                                {feeTypeOptions.map(
                                                    (opt) => (
                                                        <option
                                                            key={
                                                                opt.value
                                                            }
                                                            value={
                                                                opt.value
                                                            }
                                                        >
                                                            {opt.label}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Amount (Rs.)
                                            </label>

                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={
                                                    item.amount
                                                }
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        'amount',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0"
                                                className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>

                                        <div className="md:col-span-4">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Description
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    item.description
                                                }
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        'description',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Optional note"
                                                className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </CardBody>
                    </Card>

                    {/* Discount */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Discount"
                            subtitle={
                                scholarshipApplied
                                    ? 'Automatically applied from student scholarship'
                                    : 'Optional invoice discount'
                            }
                            action={
                                scholarshipApplied && (
                                    <button
                                        type="button"
                                        onClick={
                                            clearScholarship
                                        }
                                        className="text-xs font-medium text-red-600 hover:underline"
                                    >
                                        Remove discount
                                    </button>
                                )
                            }
                        />

                        <CardBody className="space-y-5">

                            {scholarshipApplied && (
                                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 flex items-center gap-3">

                                    <AcademicCapIcon className="h-5 w-5 text-purple-600 shrink-0" />

                                    <p className="text-sm text-purple-800">
                                        Scholarship discount from{' '}
                                        <strong>
                                            {
                                                selectedStudent
                                                    ?.scholarship
                                                    ?.name
                                            }
                                        </strong>{' '}
                                        has been applied automatically.
                                    </p>

                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <Select
                                    label="Discount Type"
                                    value={
                                        data.discount_type
                                    }
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            discount_type:
                                                e.target.value,
                                        })
                                    }
                                    options={[
                                        {
                                            value: 'fixed',
                                            label: 'Fixed Amount (Rs.)',
                                        },
                                        {
                                            value: 'percentage',
                                            label: 'Percentage (%)',
                                        },
                                    ]}
                                />

                                <Input
                                    label="Discount Amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={
                                        data.discount_amount
                                    }
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            discount_amount:
                                                e.target.value,
                                        })
                                    }
                                />

                                <Input
                                    label="Reason"
                                    value={
                                        data.discount_reason
                                    }
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            discount_reason:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Sibling discount"
                                />

                            </div>

                        </CardBody>
                    </Card>

                    {/* Summary */}
                    <Card className="overflow-hidden">

                        <CardBody>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                <div className="flex items-start gap-3">

                                    <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                        <DocumentTextIcon className="h-5 w-5 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Invoice Summary
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Review the final amount before creating the invoice.
                                        </p>
                                    </div>

                                </div>

                                <div className="w-full md:w-80 space-y-3">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Subtotal
                                        </span>

                                        <span className="font-medium text-slate-800">
                                            Rs.{' '}
                                            {totalAmount.toLocaleString()}
                                        </span>
                                    </div>

                                    {discountValue > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Discount
                                                {data.discount_reason &&
                                                    ` (${data.discount_reason})`}
                                            </span>

                                            <span className="font-medium text-red-600">
                                                - Rs.{' '}
                                                {discountValue.toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-800">
                                            Net Amount
                                        </span>

                                        <span className="text-2xl font-bold text-indigo-600">
                                            Rs.{' '}
                                            {netAmount.toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </CardBody>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">

                        <Button
                            variant="outline"
                            href={route(
                                'fee-invoices.index'
                            )}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            <BanknotesIcon className="h-4 w-4 mr-2" />
                            {processing
                                ? 'Creating...'
                                : 'Create Invoice'}
                        </Button>

                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}