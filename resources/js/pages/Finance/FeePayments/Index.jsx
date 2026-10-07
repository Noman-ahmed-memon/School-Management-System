import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import SearchBar from '@/Components/ui/SearchBar';
import Pagination from '@/Components/ui/Pagination';
import {
    BanknotesIcon,
    EyeIcon,
    ArrowPathIcon,
    FunnelIcon,
    CalendarDaysIcon,
    ReceiptPercentIcon,
    ArrowUturnLeftIcon,
    CheckCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, payments, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [method, setMethod] = useState(filters.method || '');
    const [date, setDate] = useState(filters.date || '');

    const handleSearch = (e) => {
        e?.preventDefault();

        router.get(
            route('fee-payments.index'),
            {
                search,
                method,
                date,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setMethod('');
        setDate('');

        router.get(
            route('fee-payments.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleRefund = (id) => {
        if (
            confirm(
                'Are you sure you want to refund this payment? This action cannot be undone.'
            )
        ) {
            router.post(route('fee-payments.refund', id));
        }
    };

    const methodConfig = {
        cash: {
            label: 'Cash',
            variant: 'success',
        },
        bank: {
            label: 'Bank Transfer',
            variant: 'info',
        },
        online: {
            label: 'Online',
            variant: 'primary',
        },
        card: {
            label: 'Card',
            variant: 'warning',
        },
    };

    const statusConfig = {
        completed: {
            label: 'Completed',
            variant: 'success',
            icon: CheckCircleIcon,
        },
        refunded: {
            label: 'Refunded',
            variant: 'danger',
            icon: ArrowUturnLeftIcon,
        },
        pending: {
            label: 'Pending',
            variant: 'warning',
            icon: ClockIcon,
        },
    };

    const totalAmount =
        payments?.data?.reduce(
            (sum, payment) => sum + Number(payment.amount || 0),
            0
        ) || 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Fee Payments" />

            <div className="space-y-6">
                <PageHeader
                    title="Fee Payments"
                    subtitle="Monitor, record and manage student fee transactions"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Fee Payments' },
                    ]}
                    action={
                        <Button href={route('fee-payments.create')}>
                            <BanknotesIcon className="mr-2 h-4 w-4" />
                            Record Payment
                        </Button>
                    }
                />

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <SummaryCard
                        icon={ReceiptPercentIcon}
                        label="Transactions"
                        value={payments?.total ?? payments?.data?.length ?? 0}
                        description="Payments in current results"
                    />

                    <SummaryCard
                        icon={BanknotesIcon}
                        label="Displayed Amount"
                        value={`Rs. ${totalAmount.toLocaleString()}`}
                        description="Total payment value"
                    />

                    <SummaryCard
                        icon={CheckCircleIcon}
                        label="Collection Status"
                        value="Live"
                        description="Transaction ledger"
                        accent="green"
                    />
                </div>

                {/* Filters */}
                <Card className="overflow-hidden">
                    <CardBody className="p-4">
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
                                <div className="min-w-0 flex-1">
                                    <SearchBar
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search receipt, student or invoice..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:w-[420px]">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Method
                                        </label>

                                        <select
                                            value={method}
                                            onChange={(e) =>
                                                setMethod(e.target.value)
                                            }
                                            className="w-full rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">
                                                All Methods
                                            </option>
                                            <option value="cash">Cash</option>
                                            <option value="bank">
                                                Bank Transfer
                                            </option>
                                            <option value="online">
                                                Online
                                            </option>
                                            <option value="card">Card</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Date
                                        </label>

                                        <div className="relative">
                                            <CalendarDaysIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) =>
                                                    setDate(e.target.value)
                                                }
                                                className="w-full rounded-lg border-slate-200 bg-slate-50 pl-9 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit">
                                        <FunnelIcon className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>

                                    {(search || method || date) && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={clearFilters}
                                        >
                                            <ArrowPathIcon className="mr-2 h-4 w-4" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                {/* Transactions */}
                <Card className="overflow-hidden">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <BanknotesIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Payment Ledger
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Recorded student fee transactions
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    {[
                                        'Receipt',
                                        'Student',
                                        'Invoice',
                                        'Date',
                                        'Method',
                                        'Amount',
                                        'Status',
                                        'Actions',
                                    ].map((heading) => (
                                        <th
                                            key={heading}
                                            className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {payments?.data?.length ? (
                                    payments.data.map((payment) => {
                                        const methodData =
                                            methodConfig[
                                                payment.payment_method
                                            ] || methodConfig.cash;

                                        const statusData =
                                            statusConfig[payment.status] ||
                                            statusConfig.pending;

                                        const StatusIcon = statusData.icon;

                                        return (
                                            <tr
                                                key={payment.id}
                                                className="group transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-5 py-4">
                                                    <Link
                                                        href={route(
                                                            'fee-payments.show',
                                                            payment.id
                                                        )}
                                                        className="font-mono text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        {payment.receipt_number}
                                                    </Link>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                                                            {payment.student?.first_name?.charAt(
                                                                0
                                                            )}
                                                            {payment.student?.last_name?.charAt(
                                                                0
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {
                                                                    payment
                                                                        .student
                                                                        ?.first_name
                                                                }{' '}
                                                                {
                                                                    payment
                                                                        .student
                                                                        ?.last_name
                                                                }
                                                            </div>

                                                            <div className="text-xs text-slate-500">
                                                                {
                                                                    payment
                                                                        .student
                                                                        ?.admission_number
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                                                        {
                                                            payment.fee_invoice
                                                                ?.invoice_number
                                                        }
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                    {payment.payment_date}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <Badge
                                                        variant={
                                                            methodData.variant
                                                        }
                                                    >
                                                        {methodData.label}
                                                    </Badge>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <span className="text-sm font-bold text-slate-900">
                                                        Rs.{' '}
                                                        {Number(
                                                            payment.amount
                                                        ).toLocaleString()}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <Badge
                                                        variant={
                                                            statusData.variant
                                                        }
                                                    >
                                                        <StatusIcon className="mr-1 inline h-3.5 w-3.5" />
                                                        {statusData.label}
                                                    </Badge>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <Link
                                                            href={route(
                                                                'fee-payments.show',
                                                                payment.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View receipt"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        {payment.status ===
                                                            'completed' && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRefund(
                                                                        payment.id
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                                title="Refund payment"
                                                            >
                                                                <ArrowUturnLeftIcon className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                                <BanknotesIcon className="h-7 w-7" />
                                            </div>

                                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                                No payments found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                No payment transactions match your current filters.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {payments?.links && (
                        <div className="border-t border-slate-100 px-5 py-4">
                            <Pagination links={payments.links} />
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

function SummaryCard({
    icon: Icon,
    label,
    value,
    description,
    accent = 'indigo',
}) {
    const styles = {
        indigo: 'bg-indigo-50 text-indigo-600',
        green: 'bg-emerald-50 text-emerald-600',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        {description}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[accent]}`}
                >
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}