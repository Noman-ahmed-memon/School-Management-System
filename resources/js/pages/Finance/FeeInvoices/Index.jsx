import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import SearchBar from '@/Components/ui/SearchBar';
import EmptyState from '@/Components/ui/EmptyState';
import Modal from '@/Components/ui/Modal';
import Select from '@/Components/ui/Select';
import Input from '@/Components/ui/Input';
import {
    DocumentTextIcon,
    EyeIcon,
    TrashIcon,
    PlusIcon,
    BoltIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Index({
    auth,
    invoices,
    standards,
    academicSessions,
    filters,
}) {
    const [search, setSearch] = useState(
        filters?.search || ''
    );

    const [status, setStatus] = useState(
        filters?.status || ''
    );

    const [bulkModalOpen, setBulkModalOpen] =
        useState(false);

    const handleSearch = () => {
        router.get(
            route('fee-invoices.index'),
            { search, status },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');

        router.get(route('fee-invoices.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this invoice?')) {
            router.delete(
                route('fee-invoices.destroy', id)
            );
        }
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

    const paidCount = invoices.data.filter(
        (invoice) => invoice.status === 'paid'
    ).length;

    const overdueCount = invoices.data.filter(
        (invoice) => invoice.status === 'overdue'
    ).length;

    const outstandingTotal = invoices.data.reduce(
        (sum, invoice) =>
            sum + Number(invoice.outstanding_amount || 0),
        0
    );

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Fee Invoices" />

            <div className="space-y-6">

                <PageHeader
                    title="Fee Invoices"
                    subtitle="Manage student billing, invoices and outstanding payments"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Fee Invoices' },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2">

                            <Button
                                variant="outline"
                                onClick={() =>
                                    setBulkModalOpen(true)
                                }
                            >
                                <BoltIcon className="h-4 w-4 mr-2" />
                                Bulk Generate
                            </Button>

                            <Button
                                href={route(
                                    'fee-invoices.create'
                                )}
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                New Invoice
                            </Button>

                        </div>
                    }
                />

                {/* Financial Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Paid Invoices
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {paidCount}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Overdue
                                </p>

                                <p className="mt-1 text-2xl font-bold text-red-600">
                                    {overdueCount}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Outstanding
                                </p>

                                <p className="mt-1 text-xl font-bold text-amber-600">
                                    Rs.{' '}
                                    {outstandingTotal.toLocaleString()}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                <CurrencyDollarIcon className="h-5 w-5 text-amber-600" />
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
                                    Invoice Search
                                </p>

                                <p className="text-xs text-slate-500">
                                    Search invoices by number or student
                                </p>
                            </div>

                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by invoice number or student..."
                        >
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">
                                    All Status
                                </option>
                                <option value="draft">
                                    Draft
                                </option>
                                <option value="issued">
                                    Issued
                                </option>
                                <option value="partial_paid">
                                    Partial Paid
                                </option>
                                <option value="paid">
                                    Paid
                                </option>
                                <option value="overdue">
                                    Overdue
                                </option>
                                <option value="cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </SearchBar>

                    </div>

                    {invoices.data.length === 0 ? (
                        <EmptyState
                            icon={<DocumentTextIcon />}
                            title="No invoices yet"
                            description="Generate invoices for students to begin managing fee collection."
                            action={
                                <Button
                                    onClick={() =>
                                        setBulkModalOpen(true)
                                    }
                                >
                                    <BoltIcon className="h-4 w-4 mr-2" />
                                    Bulk Generate Invoices
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
                                                Invoice
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Student
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Issue Date
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Total
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Paid
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Outstanding
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

                                        {invoices.data.map((inv) => (
                                            <tr
                                                key={inv.id}
                                                className="group hover:bg-slate-50/80 transition"
                                            >

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                                            <DocumentTextIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                            {inv.invoice_number}
                                                        </code>

                                                    </div>

                                                </td>

                                                <td className="px-6 py-4">

                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {inv.student?.first_name}{' '}
                                                        {inv.student?.last_name}
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {inv.student?.admission_number}
                                                    </p>

                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {inv.issue_date?.split(
                                                        'T'
                                                    )[0]}
                                                </td>

                                                <td className="px-6 py-4 text-right text-sm font-medium text-slate-800">
                                                    Rs.{' '}
                                                    {Number(
                                                        inv.net_amount
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4 text-right text-sm font-medium text-emerald-600">
                                                    Rs.{' '}
                                                    {Number(
                                                        inv.paid_amount
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4 text-right">

                                                    <span
                                                        className={`text-sm font-semibold ${
                                                            Number(
                                                                inv.outstanding_amount
                                                            ) > 0
                                                                ? 'text-red-600'
                                                                : 'text-slate-400'
                                                        }`}
                                                    >
                                                        Rs.{' '}
                                                        {Number(
                                                            inv.outstanding_amount
                                                        ).toLocaleString()}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-4">

                                                    <Badge
                                                        variant={getStatusVariant(
                                                            inv.status
                                                        )}
                                                    >
                                                        {inv.status.replace(
                                                            '_',
                                                            ' '
                                                        )}
                                                    </Badge>

                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end gap-1">

                                                        <Link
                                                            href={route(
                                                                'fee-invoices.show',
                                                                inv.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    inv.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                                            title="Delete"
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

                            <Pagination
                                links={invoices.links}
                                from={invoices.from}
                                to={invoices.to}
                                total={invoices.total}
                            />

                        </>
                    )}

                </Card>
            </div>

            <BulkGenerateModal
                show={bulkModalOpen}
                onClose={() =>
                    setBulkModalOpen(false)
                }
                standards={standards}
                academicSessions={academicSessions}
            />

        </AuthenticatedLayout>
    );
}

function BulkGenerateModal({
    show,
    onClose,
    standards,
    academicSessions,
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        standard_id: '',
        academic_session_id: '',
        due_date: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        )
            .toISOString()
            .split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('fee-invoices.bulk-generate'), {
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
            title="Bulk Generate Invoices"
        >
            <form
                onSubmit={submit}
                className="space-y-5"
            >

                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

                    <div className="flex gap-3">

                        <div className="h-9 w-9 rounded-lg bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <BoltIcon className="h-4 w-4 text-indigo-600" />
                        </div>

                        <p className="text-sm leading-5 text-indigo-800">
                            Generate invoices for all enrolled
                            students in a selected class using the
                            configured fee structure.
                        </p>

                    </div>

                </div>

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
                    options={(standards || []).map(
                        (s) => ({
                            value: s.id,
                            label: `${s.name} (${s.code})`,
                        })
                    )}
                />

                <Select
                    label="Academic Session"
                    required
                    value={
                        data.academic_session_id
                    }
                    onChange={(e) =>
                        setData(
                            'academic_session_id',
                            e.target.value
                        )
                    }
                    error={
                        errors.academic_session_id
                    }
                    placeholder="Select Session"
                    options={(academicSessions || []).map(
                        (s) => ({
                            value: s.id,
                            label: s.name,
                        })
                    )}
                />

                <Input
                    label="Due Date"
                    type="date"
                    required
                    value={data.due_date}
                    onChange={(e) =>
                        setData(
                            'due_date',
                            e.target.value
                        )
                    }
                    error={errors.due_date}
                />

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
                        <BoltIcon className="h-4 w-4 mr-2" />
                        {processing
                            ? 'Generating...'
                            : 'Generate Invoices'}
                    </Button>

                </div>

            </form>
        </Modal>
    );
}