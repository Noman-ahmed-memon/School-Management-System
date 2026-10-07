import { Head, Link, router } from '@inertiajs/react';
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
    CalendarDaysIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, types, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = () => {
        router.get(
            route('leave-types.index'),
            { search },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setSearch('');
        router.get(route('leave-types.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this leave type?')) {
            router.delete(route('leave-types.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Leave Types" />

            <div className="space-y-6">
                <PageHeader
                    title="Leave Types"
                    subtitle="Define the categories of leave available to staff"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Leave Types' },
                    ]}
                    action={
                        <Button href={route('leave-types.create')}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Leave Type
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">
                        <div className="flex items-center gap-2 mb-4">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Search Leave Types
                                </p>
                                <p className="text-xs text-slate-500">
                                    Find a leave type by name or code
                                </p>
                            </div>
                        </div>

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search leave types..."
                        />
                    </div>

                    {types.data.length === 0 ? (
                        <EmptyState
                            icon={<CalendarDaysIcon />}
                            title="No leave types configured"
                            description="Create your first leave type to begin tracking staff leave."
                            action={
                                <Button
                                    href={route(
                                        'leave-types.create'
                                    )}
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Leave Type
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
                                                Leave Type
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Days / Year
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Payment
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {types.data.map((type) => (
                                            <tr
                                                key={type.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                                            <CalendarDaysIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-800">
                                                                {type.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                        {type.code}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {type.days_per_year}{' '}
                                                        days
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            type.is_paid
                                                                ? 'success'
                                                                : 'default'
                                                        }
                                                    >
                                                        {type.is_paid
                                                            ? 'Paid'
                                                            : 'Unpaid'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'leave-types.edit',
                                                                type.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    type.id
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
                                links={types.links}
                                from={types.from}
                                to={types.to}
                                total={types.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}