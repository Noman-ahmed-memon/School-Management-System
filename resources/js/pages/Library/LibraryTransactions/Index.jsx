import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Pagination from '@/Components/ui/Pagination';
import SearchBar from '@/Components/ui/SearchBar';
import EmptyState from '@/Components/ui/EmptyState';
import {
    BookOpenIcon,
    PlusIcon,
    ArrowUturnLeftIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, transactions, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(
            route('library-transactions.index'),
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
        router.get(route('library-transactions.index'));
    };

    const handleReturn = (id) => {
        if (confirm('Mark this book as returned?')) {
            router.post(
                route('library-transactions.return', id)
            );
        }
    };

    const handleRenew = (id) => {
        const newDate = prompt(
            'Enter new due date (YYYY-MM-DD):',
            new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
            )
                .toISOString()
                .split('T')[0]
        );

        if (newDate) {
            router.post(
                route('library-transactions.renew', id),
                {
                    new_due_date: newDate,
                }
            );
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            issued: 'info',
            returned: 'success',
            renewed: 'warning',
            lost: 'danger',
            damaged: 'danger',
            reserved: 'primary',
        };

        return map[status] || 'default';
    };

    const isOverdue = (transaction) => {
        if (transaction.status !== 'issued') return false;
        if (!transaction.due_date) return false;

        return new Date(transaction.due_date) < new Date();
    };

    const issuedCount = transactions.data.filter(
        (tx) => tx.status === 'issued'
    ).length;

    const overdueCount = transactions.data.filter(
        (tx) => isOverdue(tx)
    ).length;

    const returnedCount = transactions.data.filter(
        (tx) => tx.status === 'returned'
    ).length;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Library Transactions" />

            <div className="space-y-6">

                <PageHeader
                    title="Library Transactions"
                    subtitle="Monitor book issues, returns and renewals"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Library Transactions' },
                    ]}
                    action={
                        <Button
                            href={route(
                                'library-transactions.create'
                            )}
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Issue Book
                        </Button>
                    }
                />

                {/* Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Active Issues
                                </p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {issuedCount}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <BookOpenIcon className="h-5 w-5 text-blue-600" />
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
                                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Returned
                                </p>
                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {returnedCount}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
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
                                    Transaction Search
                                </p>

                                <p className="text-xs text-slate-500">
                                    Find transactions by book or student
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by book title or student name..."
                        >
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="issued">Issued</option>
                                <option value="returned">Returned</option>
                                <option value="renewed">Renewed</option>
                                <option value="lost">Lost</option>
                                <option value="damaged">Damaged</option>
                            </select>
                        </SearchBar>

                    </div>

                    {transactions.data.length === 0 ? (
                        <EmptyState
                            icon={<BookOpenIcon />}
                            title="No transactions found"
                            description="Issue books to students to start tracking library activity."
                            action={
                                <Button
                                    href={route(
                                        'library-transactions.create'
                                    )}
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Issue Book
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
                                                Book
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Student
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Issued
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Due
                                            </th>

                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Returned
                                            </th>

                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Fine
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

                                        {transactions.data.map((tx) => {

                                            const overdue = isOverdue(tx);

                                            return (
                                                <tr
                                                    key={tx.id}
                                                    className={`group transition-colors ${
                                                        overdue
                                                            ? 'bg-red-50/50 hover:bg-red-50'
                                                            : 'hover:bg-slate-50/80'
                                                    }`}
                                                >

                                                    {/* Book */}
                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-3">

                                                            <div className="h-11 w-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                                                                <BookOpenIcon className="h-5 w-5 text-amber-600" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold text-slate-900 truncate max-w-[220px]">
                                                                    {tx.book?.title}
                                                                </p>

                                                                <p className="text-xs text-slate-500 mt-0.5">
                                                                    {tx.book?.author}
                                                                </p>
                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Student */}
                                                    <td className="px-6 py-4">

                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {tx.student?.first_name}{' '}
                                                            {tx.student?.last_name}
                                                        </p>

                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {tx.student?.admission_number}
                                                        </p>

                                                    </td>

                                                    {/* Issued */}
                                                    <td className="px-6 py-4 text-xs text-slate-600">
                                                        {tx.issue_date?.split('T')[0]}
                                                    </td>

                                                    {/* Due */}
                                                    <td className="px-6 py-4 text-xs">

                                                        <div
                                                            className={
                                                                overdue
                                                                    ? 'text-red-600 font-semibold'
                                                                    : 'text-slate-600'
                                                            }
                                                        >
                                                            {tx.due_date?.split('T')[0]}

                                                            {overdue && (
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    <ExclamationTriangleIcon className="h-3 w-3" />
                                                                    Overdue
                                                                </div>
                                                            )}
                                                        </div>

                                                    </td>

                                                    {/* Returned */}
                                                    <td className="px-6 py-4 text-xs text-slate-600">
                                                        {tx.return_date?.split('T')[0] || '—'}
                                                    </td>

                                                    {/* Fine */}
                                                    <td className="px-6 py-4 text-right">

                                                        {Number(tx.fine_amount) > 0 ? (
                                                            <span className="text-sm font-semibold text-red-600">
                                                                Rs.{' '}
                                                                {Number(
                                                                    tx.fine_amount
                                                                ).toLocaleString()}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400">
                                                                —
                                                            </span>
                                                        )}

                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4">
                                                        <Badge
                                                            variant={getStatusVariant(
                                                                tx.status
                                                            )}
                                                        >
                                                            {tx.status}
                                                        </Badge>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-4">

                                                        <div className="flex justify-end gap-1">

                                                            {['issued', 'renewed'].includes(
                                                                tx.status
                                                            ) && (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleReturn(
                                                                                tx.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition"
                                                                        title="Mark as Returned"
                                                                    >
                                                                        <ArrowUturnLeftIcon className="h-4 w-4" />
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            handleRenew(
                                                                                tx.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg p-2 text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition"
                                                                        title="Renew"
                                                                    >
                                                                        <ArrowPathIcon className="h-4 w-4" />
                                                                    </button>
                                                                </>
                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </table>

                            </div>

                            <Pagination
                                links={transactions.links}
                                from={transactions.from}
                                to={transactions.to}
                                total={transactions.total}
                            />
                        </>
                    )}

                </Card>
            </div>
        </AuthenticatedLayout>
    );
}