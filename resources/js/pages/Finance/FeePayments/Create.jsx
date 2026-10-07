import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import EmptyState from '@/Components/ui/EmptyState';
import {
    BanknotesIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    UserCircleIcon,
    CheckCircleIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, invoice, invoices = [] }) {
    const [search, setSearch] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(invoice || null);

    const { data, setData, post, processing, errors } = useForm({
        fee_invoice_id: invoice?.id || '',
        amount: invoice?.outstanding_amount || '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'cash',
        transaction_id: '',
        bank_name: '',
        cheque_number: '',
    });

    const filteredInvoices = useMemo(() => {
        if (!search) return invoices.slice(0, 20);

        const term = search.toLowerCase();

        return invoices.filter((inv) => {
            const studentName =
                `${inv.student?.first_name || ''} ${inv.student?.last_name || ''}`
                    .trim()
                    .toLowerCase();

            return (
                inv.invoice_number?.toLowerCase().includes(term) ||
                studentName.includes(term) ||
                (inv.student?.admission_number || '').toLowerCase().includes(term)
            );
        });
    }, [invoices, search]);

    const handleSelectInvoice = (inv) => {
        setSelectedInvoice(inv);

        setData({
            ...data,
            fee_invoice_id: inv.id,
            amount: inv.outstanding_amount,
        });
    };

    const handleChangeInvoice = () => {
        setSelectedInvoice(null);
        setSearch('');
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('fee-payments.store'));
    };

    const maxAmount = selectedInvoice
        ? Number(selectedInvoice.outstanding_amount)
        : 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Record Payment" />

            <div className="max-w-4xl mx-auto space-y-6">
                <PageHeader
                    title="Record Payment"
                    subtitle="Collect and record a payment against an outstanding student invoice"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Fee Payments',
                            href: route('fee-payments.index'),
                        },
                        { label: 'Record Payment' },
                    ]}
                />

                {/* Progress / Context Header */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 shadow-lg shadow-indigo-100">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

                    <div className="relative flex items-center gap-4 px-6 py-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                            <BanknotesIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                Finance
                            </p>
                            <h2 className="mt-0.5 text-lg font-semibold text-white">
                                Payment Collection
                            </h2>
                            <p className="mt-0.5 text-sm text-indigo-100">
                                Select an invoice, verify the amount and record the transaction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Invoice Selection */}
                {!selectedInvoice ? (
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Select Invoice"
                            subtitle="Find an unpaid or partially-paid invoice to receive a payment"
                        />

                        <CardBody className="space-y-5">
                            {/* Search */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Search invoices
                                </label>

                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Invoice number, student name or admission number..."
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            {filteredInvoices.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10">
                                    <EmptyState
                                        icon={<DocumentTextIcon />}
                                        title="No invoices found"
                                        description="Try searching with a different invoice number, student name or admission number."
                                    />
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Available Invoices
                                            </span>
                                            <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                                                {filteredInvoices.length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-slate-100">
                                        {filteredInvoices.map((inv) => (
                                            <button
                                                key={inv.id}
                                                type="button"
                                                onClick={() => handleSelectInvoice(inv)}
                                                className="group w-full px-4 py-4 text-left transition duration-200 hover:bg-indigo-50/60 focus:bg-indigo-50 focus:outline-none"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition duration-200 group-hover:bg-indigo-100">
                                                        <DocumentTextIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                                                                {inv.invoice_number}
                                                            </code>

                                                            {Number(inv.outstanding_amount) > 0 && (
                                                                <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                                                                    Outstanding
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-2 flex items-center gap-2">
                                                            <UserCircleIcon className="h-4 w-4 text-slate-400" />

                                                            <span className="truncate text-sm font-semibold text-slate-900">
                                                                {inv.student?.first_name}{' '}
                                                                {inv.student?.last_name}
                                                            </span>
                                                        </div>

                                                        <div className="mt-1 text-xs text-slate-500">
                                                            {inv.student?.admission_number}
                                                        </div>
                                                    </div>

                                                    <div className="flex shrink-0 items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                                Outstanding
                                                            </div>

                                                            <div className="mt-1 text-base font-bold text-rose-600">
                                                                Rs.{' '}
                                                                {Number(
                                                                    inv.outstanding_amount
                                                                ).toLocaleString()}
                                                            </div>
                                                        </div>

                                                        <ArrowRightIcon className="h-5 w-5 text-slate-300 transition duration-200 group-hover:translate-x-1 group-hover:text-indigo-500" />
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                ) : (
                    <>
                        {/* Selected Invoice */}
                        <Card className="overflow-hidden">
                            <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-white px-6 py-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                                            <CheckCircleIcon className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                                Invoice Selected
                                            </p>
                                            <h3 className="mt-0.5 font-semibold text-slate-900">
                                                {selectedInvoice.invoice_number}
                                            </h3>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleChangeInvoice}
                                        className="self-start rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100 sm:self-auto"
                                    >
                                        Change Invoice
                                    </button>
                                </div>
                            </div>

                            <CardBody>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Invoice #
                                        </div>
                                        <div className="mt-1.5 text-sm font-semibold text-slate-900">
                                            {selectedInvoice.invoice_number}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Student
                                        </div>
                                        <div className="mt-1.5 truncate text-sm font-semibold text-slate-900">
                                            {selectedInvoice.student?.first_name}{' '}
                                            {selectedInvoice.student?.last_name}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Net Amount
                                        </div>
                                        <div className="mt-1.5 text-sm font-semibold text-slate-900">
                                            Rs.{' '}
                                            {Number(
                                                selectedInvoice.net_amount
                                            ).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-500">
                                            Outstanding
                                        </div>
                                        <div className="mt-1.5 text-sm font-bold text-rose-700">
                                            Rs.{' '}
                                            {Number(
                                                selectedInvoice.outstanding_amount
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Payment Form */}
                        <form onSubmit={submit}>
                            <Card className="overflow-hidden">
                                <CardHeader
                                    title="Payment Details"
                                    subtitle="Enter the amount and transaction information"
                                />

                                <CardBody className="space-y-6">
                                    {/* Main payment fields */}
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                            <Input
                                                label="Amount (Rs.)"
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                max={maxAmount}
                                                required
                                                value={data.amount}
                                                onChange={(e) =>
                                                    setData(
                                                        'amount',
                                                        e.target.value
                                                    )
                                                }
                                                error={errors.amount}
                                                hint={`Maximum payable: Rs. ${maxAmount.toLocaleString()}`}
                                            />
                                        </div>

                                        <Input
                                            label="Payment Date"
                                            type="date"
                                            required
                                            value={data.payment_date}
                                            onChange={(e) =>
                                                setData(
                                                    'payment_date',
                                                    e.target.value
                                                )
                                            }
                                            error={errors.payment_date}
                                        />
                                    </div>

                                    {/* Payment method */}
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-slate-700">
                                            Payment Method
                                        </label>

                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            {[
                                                {
                                                    value: 'cash',
                                                    label: 'Cash',
                                                    description: 'Physical cash',
                                                },
                                                {
                                                    value: 'bank',
                                                    label: 'Bank',
                                                    description: 'Bank transfer',
                                                },
                                                {
                                                    value: 'online',
                                                    label: 'Online',
                                                    description: 'Online gateway',
                                                },
                                                {
                                                    value: 'card',
                                                    label: 'Card',
                                                    description: 'Debit / credit',
                                                },
                                            ].map((method) => {
                                                const active =
                                                    data.payment_method ===
                                                    method.value;

                                                return (
                                                    <button
                                                        key={method.value}
                                                        type="button"
                                                        onClick={() =>
                                                            setData(
                                                                'payment_method',
                                                                method.value
                                                            )
                                                        }
                                                        className={`rounded-xl border p-4 text-left transition duration-200 ${
                                                            active
                                                                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100'
                                                                : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                                active
                                                                    ? 'bg-indigo-600 text-white'
                                                                    : 'bg-slate-100 text-slate-500'
                                                            }`}
                                                        >
                                                            <BanknotesIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="mt-3 text-sm font-semibold text-slate-900">
                                                            {method.label}
                                                        </div>

                                                        <div className="mt-0.5 text-xs text-slate-500">
                                                            {method.description}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {errors.payment_method && (
                                            <p className="mt-2 text-xs text-red-600">
                                                {errors.payment_method}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bank details */}
                                    {data.payment_method === 'bank' && (
                                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-slate-900">
                                                    Bank Transaction
                                                </h4>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    Provide the bank information for this payment.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                <Input
                                                    label="Bank Name"
                                                    value={data.bank_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'bank_name',
                                                            e.target.value
                                                        )
                                                    }
                                                    error={errors.bank_name}
                                                />

                                                <Input
                                                    label="Transaction ID"
                                                    value={data.transaction_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            'transaction_id',
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors.transaction_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Cheque / card number */}
                                    {(data.payment_method === 'bank' ||
                                        data.payment_method === 'card') && (
                                        <Input
                                            label={
                                                data.payment_method === 'card'
                                                    ? 'Card Number'
                                                    : 'Cheque Number'
                                            }
                                            value={data.cheque_number}
                                            onChange={(e) =>
                                                setData(
                                                    'cheque_number',
                                                    e.target.value
                                                )
                                            }
                                            error={errors.cheque_number}
                                            placeholder="Optional"
                                        />
                                    )}

                                    {/* Online/card transaction */}
                                    {(data.payment_method === 'online' ||
                                        data.payment_method === 'card') && (
                                        <Input
                                            label="Transaction ID"
                                            value={data.transaction_id}
                                            onChange={(e) =>
                                                setData(
                                                    'transaction_id',
                                                    e.target.value
                                                )
                                            }
                                            error={errors.transaction_id}
                                            placeholder="Gateway reference"
                                        />
                                    )}
                                </CardBody>

                                <CardFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 sm:flex-row sm:justify-end">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        href={route('fee-payments.index')}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        <BanknotesIcon className="mr-2 h-4 w-4" />

                                        {processing
                                            ? 'Recording...'
                                            : 'Record Payment'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

