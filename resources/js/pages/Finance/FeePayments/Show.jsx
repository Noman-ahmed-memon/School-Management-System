import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BanknotesIcon,
    PrinterIcon,
    ArrowUturnLeftIcon,
    UserCircleIcon,
    BuildingOffice2Icon,
    CalendarDaysIcon,
    DocumentTextIcon,
    CreditCardIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, payment }) {
    const handlePrint = () => {
        window.print();
    };

    const handleRefund = () => {
        if (
            confirm(
                'Are you sure you want to refund this payment? This action cannot be undone.'
            )
        ) {
            router.post(route('fee-payments.refund', payment.id));
        }
    };

    const methodConfig = {
        cash: ['Cash', 'success'],
        bank: ['Bank Transfer', 'info'],
        online: ['Online Payment', 'primary'],
        card: ['Card Payment', 'warning'],
    };

    const statusConfig = {
        completed: ['Completed', 'success'],
        refunded: ['Refunded', 'danger'],
        pending: ['Pending', 'warning'],
    };

    const [methodLabel, methodVariant] =
        methodConfig[payment.payment_method] || methodConfig.cash;

    const [statusLabel, statusVariant] =
        statusConfig[payment.status] || statusConfig.pending;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Receipt ${payment.receipt_number}`} />

            <div className="mx-auto max-w-4xl space-y-6 print:max-w-none">
                <div className="print:hidden">
                    <PageHeader
                        title={payment.receipt_number}
                        subtitle="Payment receipt and transaction details"
                        breadcrumbs={[
                            { label: 'Dashboard', href: '/dashboard' },
                            {
                                label: 'Fee Payments',
                                href: route('fee-payments.index'),
                            },
                            { label: payment.receipt_number },
                        ]}
                        action={
                            <div className="flex gap-2">
                                {payment.status === 'completed' && (
                                    <Button
                                        variant="outline"
                                        onClick={handleRefund}
                                    >
                                        <ArrowUturnLeftIcon className="mr-2 h-4 w-4" />
                                        Refund
                                    </Button>
                                )}

                                <Button onClick={handlePrint}>
                                    <PrinterIcon className="mr-2 h-4 w-4" />
                                    Print Receipt
                                </Button>
                            </div>
                        }
                    />
                </div>

                <Card className="overflow-hidden shadow-lg print:shadow-none">
                    <div className="h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-700" />

                    <CardBody className="p-0">
                        {/* Receipt Header */}
                        <div className="border-b border-slate-100 px-6 py-8 sm:px-10">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                            <BuildingOffice2Icon className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <h1 className="text-xl font-bold text-slate-900">
                                                {payment.student?.campus?.school
                                                    ?.name || 'School'}
                                            </h1>

                                            <p className="text-sm text-slate-500">
                                                Official Fee Payment Receipt
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Receipt Number
                                    </p>

                                    <p className="mt-1 font-mono text-lg font-bold text-indigo-700">
                                        {payment.receipt_number}
                                    </p>

                                    <div className="mt-2">
                                        <Badge variant={statusVariant}>
                                            {statusLabel}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student */}
                        <div className="border-b border-slate-100 px-6 py-6 sm:px-10">
                            <SectionHeading
                                icon={UserCircleIcon}
                                title="Student Information"
                            />

                            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <InfoItem
                                    label="Student"
                                    value={`${payment.student?.first_name || ''} ${payment.student?.last_name || ''}`}
                                />

                                <InfoItem
                                    label="Admission Number"
                                    value={
                                        payment.student?.admission_number || '—'
                                    }
                                />

                                <InfoItem
                                    label="Campus"
                                    value={
                                        payment.student?.campus?.name || '—'
                                    }
                                />
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="border-b border-slate-100 px-6 py-6 sm:px-10">
                            <SectionHeading
                                icon={CreditCardIcon}
                                title="Payment Details"
                            />

                            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <InfoItem
                                    icon={CalendarDaysIcon}
                                    label="Payment Date"
                                    value={payment.payment_date}
                                />

                                <InfoItem
                                    icon={DocumentTextIcon}
                                    label="Invoice"
                                    value={
                                        payment.fee_invoice
                                            ?.invoice_number || '—'
                                    }
                                />

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                        Payment Method
                                    </p>

                                    <div className="mt-2">
                                        <Badge variant={methodVariant}>
                                            {methodLabel}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-7 sm:px-10">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                                        Amount Received
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Payment successfully recorded against the invoice.
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="text-3xl font-black tracking-tight text-emerald-600">
                                        Rs.{' '}
                                        {Number(
                                            payment.amount
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Invoice Summary */}
                        <div className="border-b border-slate-100 px-6 py-6 sm:px-10">
                            <SectionHeading
                                icon={BanknotesIcon}
                                title="Invoice Summary"
                            />

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <MoneyItem
                                    label="Net Amount"
                                    value={payment.fee_invoice?.net_amount}
                                />

                                <MoneyItem
                                    label="Paid Amount"
                                    value={payment.fee_invoice?.paid_amount}
                                    positive
                                />

                                <MoneyItem
                                    label="Outstanding"
                                    value={
                                        payment.fee_invoice
                                            ?.outstanding_amount
                                    }
                                    danger
                                />
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {(payment.bank_name ||
                            payment.transaction_id ||
                            payment.cheque_number) && (
                            <div className="border-b border-slate-100 px-6 py-6 sm:px-10">
                                <SectionHeading
                                    icon={DocumentTextIcon}
                                    title="Transaction Details"
                                />

                                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                    {payment.bank_name && (
                                        <InfoItem
                                            label="Bank Name"
                                            value={payment.bank_name}
                                        />
                                    )}

                                    {payment.transaction_id && (
                                        <InfoItem
                                            label="Transaction ID"
                                            value={payment.transaction_id}
                                        />
                                    )}

                                    {payment.cheque_number && (
                                        <InfoItem
                                            label="Cheque / Card Number"
                                            value={payment.cheque_number}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-6 py-8 sm:px-10">
                            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <div className="h-px w-48 bg-slate-300" />
                                    <p className="mt-2 text-xs text-slate-500">
                                        Authorized Signature
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                        Payment Recorded
                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                        This receipt is generated electronically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }

                    nav,
                    aside,
                    header {
                        display: none !important;
                    }

                    .print\\:hidden {
                        display: none !important;
                    }

                    @page {
                        margin: 12mm;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}

function SectionHeading({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="h-4.5 w-4.5" />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        </div>
    );
}

function InfoItem({ label, value, icon: Icon }) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {label}
            </p>

            <div className="mt-1.5 flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-slate-400" />}

                <p className="break-words text-sm font-semibold text-slate-800">
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}

function MoneyItem({ label, value, positive, danger }) {
    return (
        <div
            className={`rounded-xl border p-4 ${
                danger
                    ? 'border-rose-100 bg-rose-50'
                    : positive
                      ? 'border-emerald-100 bg-emerald-50'
                      : 'border-slate-200 bg-white'
            }`}
        >
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {label}
            </p>

            <p
                className={`mt-2 text-lg font-bold ${
                    danger
                        ? 'text-rose-600'
                        : positive
                          ? 'text-emerald-600'
                          : 'text-slate-900'
                }`}
            >
                Rs. {Number(value || 0).toLocaleString()}
            </p>
        </div>
    );
}