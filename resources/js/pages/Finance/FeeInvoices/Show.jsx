import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, {
    CardHeader,
    CardBody,
} from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    PrinterIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    DocumentTextIcon,
    BuildingLibraryIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, invoice }) {
    const handlePrint = () => {
        window.print();
    };

    const getStatusVariant = (status) => {
        const map = {
            draft: 'default',
            issued: 'info',
            partial_paid: 'warning',
            paid: 'success',
            overdue: 'danger',
            cancelled: 'default',
        };

        return map[status] || 'default';
    };

    const handleRecordPayment = () => {
        router.get(
            route('fee-payments.create'),
            {
                invoice_id: invoice.id,
            }
        );
    };

    const totalPaid =
        invoice.fee_payments?.reduce(
            (sum, p) => sum + Number(p.amount),
            0
        ) || 0;

    const netAmount = Number(invoice.net_amount || 0);
    const paidAmount = Number(invoice.paid_amount || 0);
    const outstandingAmount = Number(
        invoice.outstanding_amount || 0
    );

    const paymentPercentage =
        netAmount > 0
            ? Math.min(
                  100,
                  Math.round(
                      (paidAmount / netAmount) * 100
                  )
              )
            : 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head
                title={`Invoice ${invoice.invoice_number}`}
            />

            <div className="space-y-6">

                {/* Header */}
                <PageHeader
                    title={`Invoice ${invoice.invoice_number}`}
                    subtitle={`Issued ${invoice.issue_date?.split('T')[0]}`}
                    breadcrumbs={[
                        {
                            label: 'Dashboard',
                            href: '/dashboard',
                        },
                        {
                            label: 'Fee Invoices',
                            href: route(
                                'fee-invoices.index'
                            ),
                        },
                        {
                            label:
                                invoice.invoice_number,
                        },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2 print:hidden">

                            {invoice.outstanding_amount >
                                0 && (
                                <Button
                                    onClick={
                                        handleRecordPayment
                                    }
                                >
                                    <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                                    Record Payment
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                onClick={handlePrint}
                            >
                                <PrinterIcon className="h-4 w-4 mr-2" />
                                Print
                            </Button>

                        </div>
                    }
                />

                {/* Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Net Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">
                            Rs.{' '}
                            {netAmount.toLocaleString()}
                        </p>

                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Paid
                        </p>

                        <p className="mt-1 text-2xl font-bold text-emerald-600">
                            Rs.{' '}
                            {paidAmount.toLocaleString()}
                        </p>

                    </div>

                    <div className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Outstanding
                        </p>

                        <p className="mt-1 text-2xl font-bold text-red-600">
                            Rs.{' '}
                            {outstandingAmount.toLocaleString()}
                        </p>

                    </div>

                </div>

                {/* Invoice Document */}
                <div className="print:shadow-none">

                    <Card className="overflow-hidden print:border-0 print:shadow-none">

                        {/* Document Header */}
                        <div className="px-6 sm:px-8 pt-7 pb-6 border-b-2 border-indigo-600">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                                <div className="flex items-center gap-4">

                                    <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                                        <DocumentTextIcon className="h-7 w-7" />
                                    </div>

                                    <div>

                                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                            {invoice.student?.campus?.school?.name ||
                                                'School Invoice'}
                                        </h1>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Official Fee Invoice
                                        </p>

                                    </div>

                                </div>

                                <div className="sm:text-right">

                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        Invoice Number
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-900">
                                        {invoice.invoice_number}
                                    </p>

                                    <Badge
                                        variant={getStatusVariant(
                                            invoice.status
                                        )}
                                        className="mt-2"
                                    >
                                        {invoice.status.replace(
                                            '_',
                                            ' '
                                        )}
                                    </Badge>

                                </div>

                            </div>

                        </div>

                        {/* Student Info */}
                        <CardBody className="pb-0">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-200">

                                <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        Student
                                    </p>

                                    <div className="mt-2 flex items-center gap-3">

                                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                            <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {
                                                    invoice
                                                        .student
                                                        ?.first_name
                                                }{' '}
                                                {
                                                    invoice
                                                        .student
                                                        ?.last_name
                                                }
                                            </p>

                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {
                                                    invoice
                                                        .student
                                                        ?.admission_number
                                                }
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        Issue Date
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                                        {invoice.issue_date?.split(
                                            'T'
                                        )[0]}
                                    </div>

                                </div>

                                <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        Due Date
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                                        {invoice.due_date?.split(
                                            'T'
                                        )[0]}
                                    </div>

                                </div>

                            </div>

                        </CardBody>

                        {/* Items */}
                        <CardBody className="pt-6">

                            <div className="flex items-center gap-2 mb-4">
                                <BuildingLibraryIcon className="h-4 w-4 text-indigo-600" />

                                <h2 className="text-sm font-semibold text-slate-800">
                                    Fee Breakdown
                                </h2>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200">

                                <table className="min-w-full divide-y divide-slate-200">

                                    <thead className="bg-slate-50">

                                        <tr>

                                            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Fee Item
                                            </th>

                                            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Description
                                            </th>

                                            <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Amount
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">

                                        {invoice.fee_invoice_items?.map(
                                            (item) => (
                                                <tr key={item.id}>

                                                    <td className="px-4 py-3.5 text-sm font-semibold text-slate-800">
                                                        {item.fee_type?.name ||
                                                            'Fee'}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-sm text-slate-500">
                                                        {item.description ||
                                                            '—'}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-sm font-medium text-right text-slate-800">
                                                        Rs.{' '}
                                                        {Number(
                                                            item.amount
                                                        ).toLocaleString()}
                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* Totals */}
                            <div className="flex justify-end mt-6">

                                <div className="w-full max-w-sm space-y-3">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Subtotal
                                        </span>

                                        <span className="font-medium text-slate-800">
                                            Rs.{' '}
                                            {Number(
                                                invoice.total_amount
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    {Number(
                                        invoice.discount_amount
                                    ) > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Discount
                                                {invoice.discount_reason &&
                                                    ` (${invoice.discount_reason})`}
                                            </span>

                                            <span className="font-medium text-red-600">
                                                - Rs.{' '}
                                                {Number(
                                                    invoice.discount_amount
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    {Number(
                                        invoice.late_fee_amount
                                    ) > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Late Fee
                                            </span>

                                            <span className="font-medium text-orange-600">
                                                + Rs.{' '}
                                                {Number(
                                                    invoice.late_fee_amount
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold">
                                        <span>
                                            Net Amount
                                        </span>

                                        <span className="text-indigo-600">
                                            Rs.{' '}
                                            {netAmount.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Paid
                                        </span>

                                        <span className="font-semibold text-emerald-600">
                                            Rs.{' '}
                                            {paidAmount.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold">
                                        <span>
                                            Outstanding
                                        </span>

                                        <span className="text-red-600">
                                            Rs.{' '}
                                            {outstandingAmount.toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </CardBody>

                    </Card>

                </div>

                {/* Payment Progress */}
                <Card className="print:hidden">

                    <CardBody>

                        <div className="flex flex-col md:flex-row md:items-center gap-5">

                            <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />
                            </div>

                            <div className="flex-1">

                                <div className="flex justify-between items-center mb-2">

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Payment Progress
                                        </p>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {paymentPercentage}% of the invoice has been paid
                                        </p>
                                    </div>

                                    <span className="text-sm font-bold text-emerald-600">
                                        {paymentPercentage}%
                                    </span>

                                </div>

                                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">

                                    <div
                                        className="h-full rounded-full bg-emerald-500 transition-all"
                                        style={{
                                            width: `${paymentPercentage}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    </CardBody>

                </Card>

                {/* Payment History */}
                {invoice.fee_payments &&
                    invoice.fee_payments.length > 0 && (
                        <Card className="overflow-hidden print:hidden">

                            <CardHeader
                                title="Payment History"
                                subtitle={`${invoice.fee_payments.length} payment${
                                    invoice.fee_payments.length !==
                                    1
                                        ? 's'
                                        : ''
                                } recorded`}
                            />

                            <CardBody className="p-0">

                                <div className="divide-y divide-slate-100">

                                    {invoice.fee_payments.map(
                                        (payment) => (
                                            <div
                                                key={
                                                    payment.id
                                                }
                                                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition"
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                                        <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {
                                                                payment.receipt_number
                                                            }
                                                        </p>

                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {
                                                                payment
                                                                    .payment_date
                                                                    ?.split(
                                                                        'T'
                                                                    )[0]
                                                            }

                                                            <span className="mx-1.5">
                                                                •
                                                            </span>

                                                            {
                                                                payment.payment_method
                                                            }
                                                        </p>
                                                    </div>

                                                </div>

                                                <div className="sm:text-right">

                                                    <p className="text-sm font-bold text-emerald-600">
                                                        Rs.{' '}
                                                        {Number(
                                                            payment.amount
                                                        ).toLocaleString()}
                                                    </p>

                                                    <Badge
                                                        variant={
                                                            payment.status ===
                                                            'completed'
                                                                ? 'success'
                                                                : 'warning'
                                                        }
                                                        className="mt-1"
                                                    >
                                                        {
                                                            payment.status
                                                        }
                                                    </Badge>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </CardBody>

                        </Card>
                    )}

                {/* Footer */}
                <div className="flex justify-end gap-3 print:hidden">

                    <Button
                        variant="outline"
                        href={route(
                            'fee-invoices.index'
                        )}
                    >
                        Back to Invoices
                    </Button>

                </div>

            </div>

            <style>{`
                @media print {
                    @page {
                        margin: 1cm;
                    }

                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>

        </AuthenticatedLayout>
    );
}