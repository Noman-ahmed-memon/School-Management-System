import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import SearchBar from '@/Components/ui/SearchBar';
import Pagination from '@/Components/ui/Pagination';
import {
    AcademicCapIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    FunnelIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, scholarships, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [type, setType] = useState(filters.type || '');

    const handleSearch = (e) => {
        e?.preventDefault();

        router.get(
            route('scholarships.index'),
            {
                search,
                status,
                type,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setType('');

        router.get(
            route('scholarships.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Are you sure you want to delete this scholarship?'
            )
        ) {
            router.delete(route('scholarships.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Scholarships" />

            <div className="space-y-6">
                <PageHeader
                    title="Scholarships"
                    subtitle="Manage student financial aid, concessions and merit awards"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Scholarships' },
                    ]}
                    action={
                        <Button href={route('scholarships.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Scholarship
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard
                        icon={AcademicCapIcon}
                        label="Total Scholarships"
                        value={
                            scholarships?.total ??
                            scholarships?.data?.length ??
                            0
                        }
                    />

                    <StatCard
                        icon={CheckCircleIcon}
                        label="Active"
                        value={
                            scholarships?.data?.filter(
                                (item) => item.status === 'active'
                            ).length ?? 0
                        }
                        accent="green"
                    />

                    <StatCard
                        icon={CurrencyDollarIcon}
                        label="Current View"
                        value={
                            type
                                ? type === 'percentage'
                                    ? 'Percentage'
                                    : 'Fixed'
                                : 'All Types'
                        }
                        accent="slate"
                    />
                </div>

                <Card>
                    <CardBody className="p-4">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-3 xl:flex-row"
                        >
                            <div className="flex-1">
                                <SearchBar
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search scholarship or student..."
                                />
                            </div>

                            <select
                                value={type}
                                onChange={(e) =>
                                    setType(e.target.value)
                                }
                                className="rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-indigo-500 focus:ring-indigo-500 xl:w-48"
                            >
                                <option value="">All Types</option>
                                <option value="percentage">
                                    Percentage
                                </option>
                                <option value="fixed">Fixed Amount</option>
                            </select>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-indigo-500 focus:ring-indigo-500 xl:w-44"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <div className="flex gap-2">
                                <Button type="submit">
                                    <FunnelIcon className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>

                                {(search || status || type) && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={clearFilters}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <Card className="overflow-hidden">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <AcademicCapIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Scholarship Register
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Student financial aid records
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Scholarship
                                    </th>
                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Student
                                    </th>
                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Type
                                    </th>
                                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Period
                                    </th>
                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {scholarships?.data?.length ? (
                                    scholarships.data.map((scholarship) => (
                                        <tr
                                            key={scholarship.id}
                                            className="group transition hover:bg-indigo-50/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                        <AcademicCapIcon className="h-5 w-5" />
                                                    </div>

                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-900">
                                                            {
                                                                scholarship.name
                                                            }
                                                        </div>

                                                        <div className="mt-0.5 text-xs text-slate-400">
                                                            Scholarship
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="text-sm font-semibold text-slate-800">
                                                    {
                                                        scholarship.student
                                                            ?.first_name
                                                    }{' '}
                                                    {
                                                        scholarship.student
                                                            ?.last_name
                                                    }
                                                </div>

                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    {
                                                        scholarship.student
                                                            ?.admission_number
                                                    }
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {scholarship.type ===
                                                'percentage' ? (
                                                    <Badge variant="info">
                                                        Percentage
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="warning">
                                                        Fixed
                                                    </Badge>
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <span className="text-sm font-bold text-indigo-700">
                                                    {scholarship.type ===
                                                    'percentage'
                                                        ? `${Number(scholarship.amount)}%`
                                                        : `Rs. ${Number(
                                                              scholarship.amount
                                                          ).toLocaleString()}`}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="text-xs text-slate-600">
                                                    {scholarship.start_date}
                                                </div>

                                                <div className="my-1 h-px w-4 bg-slate-200" />

                                                <div className="text-xs text-slate-400">
                                                    {scholarship.end_date}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {scholarship.status ===
                                                'active' ? (
                                                    <Badge variant="success">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="danger">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <a
                                                        href={route(
                                                            'scholarships.show',
                                                            scholarship.id
                                                        )}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                        title="View"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </a>

                                                    <a
                                                        href={route(
                                                            'scholarships.edit',
                                                            scholarship.id
                                                        )}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                scholarship.id
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-400">
                                                <AcademicCapIcon className="h-7 w-7" />
                                            </div>

                                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                                No scholarships found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Create a scholarship to start managing student financial aid.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {scholarships?.links && (
                        <div className="border-t border-slate-100 px-5 py-4">
                            <Pagination links={scholarships.links} />
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ icon: Icon, label, value, accent = 'indigo' }) {
    const styles = {
        indigo: 'bg-indigo-50 text-indigo-600',
        green: 'bg-emerald-50 text-emerald-600',
        slate: 'bg-slate-100 text-slate-600',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                        {value}
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