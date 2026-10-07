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
    BanknotesIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowPathIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, types, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e?.preventDefault();

        router.get(
            route('fee-types.index'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Are you sure you want to delete this fee type?'
            )
        ) {
            router.delete(route('fee-types.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Fee Types" />

            <div className="space-y-6">
                <PageHeader
                    title="Fee Types"
                    subtitle="Manage reusable categories used across your school's fee structures"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Fee Types' },
                    ]}
                    action={
                        <Button href={route('fee-types.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Fee Type
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <MiniStat
                        icon={BanknotesIcon}
                        label="Total Types"
                        value={
                            types?.total ??
                            types?.data?.length ??
                            0
                        }
                    />

                    <MiniStat
                        icon={ArrowPathIcon}
                        label="Recurring"
                        value={
                            types?.data?.filter(
                                (type) => type.is_recurring
                            ).length ?? 0
                        }
                        accent="indigo"
                    />

                    <MiniStat
                        icon={FunnelIcon}
                        label="Filter"
                        value={search ? 'Active' : 'All'}
                        accent="slate"
                    />
                </div>

                <Card>
                    <CardBody className="p-4">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="flex-1">
                                <SearchBar
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search fee type name or code..."
                                />
                            </div>

                            <Button type="submit">
                                <FunnelIcon className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                <Card className="overflow-hidden">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <BanknotesIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Fee Type Catalog
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Available billing categories
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Recurring
                                    </th>
                                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {types?.data?.length ? (
                                    types.data.map((type) => (
                                        <tr
                                            key={type.id}
                                            className="group transition hover:bg-indigo-50/30"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                        <BanknotesIcon className="h-4 w-4" />
                                                    </div>

                                                    <span className="text-sm font-semibold text-slate-900">
                                                        {type.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                                                    {type.code}
                                                </code>
                                            </td>

                                            <td className="px-6 py-4">
                                                {type.is_recurring ? (
                                                    <Badge variant="info">
                                                        <ArrowPathIcon className="mr-1 inline h-3.5 w-3.5" />
                                                        Recurring
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="default">
                                                        One-time
                                                    </Badge>
                                                )}
                                            </td>

                                            <td className="max-w-md px-6 py-4">
                                                <p className="truncate text-sm text-slate-500">
                                                    {type.description ||
                                                        'No description provided'}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <a
                                                        href={route(
                                                            'fee-types.edit',
                                                            type.id
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
                                                                type.id
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
                                            colSpan="5"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                                <BanknotesIcon className="h-7 w-7" />
                                            </div>

                                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                                No fee types found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Create your first fee type to begin configuring fee structures.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {types?.links && (
                        <div className="border-t border-slate-100 px-6 py-4">
                            <Pagination links={types.links} />
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

function MiniStat({ icon: Icon, label, value, accent = 'indigo' }) {
    const classes = {
        indigo: 'bg-indigo-50 text-indigo-600',
        slate: 'bg-slate-100 text-slate-600',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${classes[accent]}`}
                >
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}