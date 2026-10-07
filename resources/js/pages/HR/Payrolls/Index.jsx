import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import EmptyState from '@/Components/ui/EmptyState';
import Modal from '@/Components/ui/Modal';
import Select from '@/Components/ui/Select';
import Input from '@/Components/ui/Input';
import {
    BanknotesIcon,
    EyeIcon,
    CheckCircleIcon,
    TrashIcon,
    BoltIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    CurrencyDollarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const MONTHS = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

export default function Index({ auth, payrolls, filters }) {
    const [month, setMonth] = useState(filters?.month || '');
    const [year, setYear] = useState(
        filters?.year || new Date().getFullYear()
    );
    const [status, setStatus] = useState(filters?.status || '');
    const [generateModalOpen, setGenerateModalOpen] = useState(false);

    const handleFilter = () => {
        router.get(
            route('payrolls.index'),
            { month, year, status },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setMonth('');
        setYear(new Date().getFullYear());
        setStatus('');
        router.get(route('payrolls.index'));
    };

    const handleApprove = (id) => {
        if (confirm('Approve this payroll?')) {
            router.post(route('payrolls.approve', id));
        }
    };

    const handleMarkPaid = (id) => {
        if (
            confirm(
                'Mark this payroll as paid? A payslip will be generated.'
            )
        ) {
            router.post(route('payrolls.mark-paid', id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this payroll?')) {
            router.delete(route('payrolls.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            draft: 'default',
            approved: 'info',
            paid: 'success',
        };
        return map[status] || 'default';
    };

    const getMonthName = (m) => {
        return MONTHS.find((x) => x.value === m)?.label || '—';
    };

    // Metrics
    const totalNet = payrolls.data.reduce(
        (sum, p) => sum + Number(p.net_salary || 0),
        0
    );
    const draftCount = payrolls.data.filter(
        (p) => p.status === 'draft'
    ).length;
    const approvedCount = payrolls.data.filter(
        (p) => p.status === 'approved'
    ).length;
    const paidCount = payrolls.data.filter(
        (p) => p.status === 'paid'
    ).length;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Payroll" />

            <div className="space-y-6">
                <PageHeader
                    title="Payroll"
                    subtitle="Manage staff and teacher salaries, approvals and payslips"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Payroll' },
                    ]}
                    action={
                        <Button
                            onClick={() =>
                                setGenerateModalOpen(true)
                            }
                        >
                            <BoltIcon className="h-4 w-4 mr-2" />
                            Generate Payroll
                        </Button>
                    }
                />

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Total Payroll
                                </p>
                                <p className="mt-1 text-xl font-bold text-indigo-600">
                                    Rs. {totalNet.toLocaleString()}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <CurrencyDollarIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Draft
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-600">
                                    {draftCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                <ClockIcon className="h-5 w-5 text-slate-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Approved
                                </p>
                                <p className="mt-1 text-2xl font-bold text-blue-600">
                                    {approvedCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Paid
                                </p>
                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {paidCount}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <BanknotesIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">
                        <div className="flex items-center gap-2 mb-4">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Filter Payroll
                                </p>
                                <p className="text-xs text-slate-500">
                                    Filter by month, year or status
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-end">
                            <div className="flex-1 min-w-[140px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Month
                                </label>
                                <select
                                    value={month}
                                    onChange={(e) =>
                                        setMonth(e.target.value)
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Months</option>
                                    {MONTHS.map((m) => (
                                        <option
                                            key={m.value}
                                            value={m.value}
                                        >
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 min-w-[120px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) =>
                                        setYear(e.target.value)
                                    }
                                    min="2000"
                                    max="2100"
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex-1 min-w-[140px]">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="draft">Draft</option>
                                    <option value="approved">
                                        Approved
                                    </option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>

                            <Button onClick={handleFilter}>
                                Filter
                            </Button>

                            {(month || status) && (
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {payrolls.data.length === 0 ? (
                        <EmptyState
                            icon={<BanknotesIcon />}
                            title="No payroll records"
                            description="Generate payroll for the current month to get started."
                            action={
                                <Button
                                    onClick={() =>
                                        setGenerateModalOpen(true)
                                    }
                                >
                                    <BoltIcon className="h-4 w-4 mr-2" />
                                    Generate Payroll
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Employee
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Period
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Basic
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Earnings
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Deductions
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Net Salary
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {payrolls.data.map((payroll) => (
                                            <tr
                                                key={payroll.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                                            <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-800">
                                                                {payroll
                                                                    .teacher
                                                                    ?.user
                                                                    ?.name ||
                                                                    payroll
                                                                        .staff
                                                                        ?.user
                                                                        ?.name ||
                                                                    'Unknown'}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-0.5 capitalize">
                                                                {payroll.teacher_id
                                                                    ? 'Teacher'
                                                                    : 'Staff'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {getMonthName(
                                                        payroll.month
                                                    )}{' '}
                                                    {payroll.year}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-slate-700 tabular-nums">
                                                    Rs.{' '}
                                                    {Number(
                                                        payroll.basic_salary
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-emerald-600 tabular-nums">
                                                    Rs.{' '}
                                                    {Number(
                                                        payroll.total_earnings
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-red-600 tabular-nums">
                                                    Rs.{' '}
                                                    {Number(
                                                        payroll.total_deductions
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-bold text-slate-900 tabular-nums">
                                                    Rs.{' '}
                                                    {Number(
                                                        payroll.net_salary
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            payroll.status
                                                        )}
                                                    >
                                                        {payroll.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'payrolls.show',
                                                                payroll.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>
                                                        {payroll.status ===
                                                            'draft' && (
                                                            <button
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        payroll.id
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition"
                                                                title="Approve"
                                                            >
                                                                <CheckCircleIcon className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        {payroll.status ===
                                                            'approved' && (
                                                            <button
                                                                onClick={() =>
                                                                    handleMarkPaid(
                                                                        payroll.id
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition"
                                                                title="Mark Paid"
                                                            >
                                                                <BanknotesIcon className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        {payroll.status !==
                                                            'paid' && (
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        payroll.id
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                                                title="Delete"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={payrolls.links}
                                from={payrolls.from}
                                to={payrolls.to}
                                total={payrolls.total}
                            />
                        </>
                    )}
                </Card>
            </div>

            <GenerateModal
                show={generateModalOpen}
                onClose={() => setGenerateModalOpen(false)}
            />
        </AuthenticatedLayout>
    );
}

function GenerateModal({ show, onClose }) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { data, setData, post, processing, errors } = useForm({
        month: currentMonth,
        year: currentYear,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('payrolls.generate'), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Generate Payroll"
        >
            <form onSubmit={submit} className="space-y-5">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                    <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-lg bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <BoltIcon className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="text-sm leading-5 text-indigo-800">
                            This will generate payroll records for{' '}
                            <strong>
                                all active teachers and staff
                            </strong>{' '}
                            for the selected month. Existing records
                            are skipped.
                        </p>
                    </div>
                </div>

                <Select
                    label="Month"
                    required
                    value={data.month}
                    onChange={(e) =>
                        setData('month', e.target.value)
                    }
                    error={errors.month}
                    options={MONTHS}
                />

                <Input
                    label="Year"
                    type="number"
                    required
                    value={data.year}
                    onChange={(e) =>
                        setData('year', e.target.value)
                    }
                    error={errors.year}
                    min="2000"
                    max="2100"
                />

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
                        <BoltIcon className="h-4 w-4 mr-2" />
                        {processing ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}