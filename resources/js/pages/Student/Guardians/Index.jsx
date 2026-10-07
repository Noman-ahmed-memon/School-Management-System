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
    UserGroupIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PhoneIcon,
    EnvelopeIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, guardians, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [relation, setRelation] = useState(filters?.relation || '');

    const handleSearch = () => {
        router.get(
            route('guardians.index'),
            { search, relation },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setRelation('');
        router.get(route('guardians.index'));
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Delete this guardian? This will also delete their user account.'
            )
        ) {
            router.delete(route('guardians.destroy', id));
        }
    };

    const getInitials = (guardian) => {
        return `${guardian.first_name?.[0] || ''}${
            guardian.last_name?.[0] || ''
        }`.toUpperCase();
    };

    const getRelationVariant = (relation) => {
        const map = {
            father: 'info',
            mother: 'primary',
            guardian: 'warning',
        };

        return map[relation] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Guardians" />

            <div className="space-y-6">
                <PageHeader
                    title="Guardians"
                    subtitle="Manage parents and guardians"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Guardians' },
                    ]}
                    action={
                        <Button href={route('guardians.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Guardian
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    <div className="border-b border-slate-200/80 bg-slate-50/70 p-5">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name, email or phone..."
                        >
                            <select
                                value={relation}
                                onChange={(e) =>
                                    setRelation(e.target.value)
                                }
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Relations</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="guardian">Guardian</option>
                            </select>
                        </SearchBar>
                    </div>

                    {guardians.data.length === 0 ? (
                        <EmptyState
                            icon={<UserGroupIcon />}
                            title="No guardians found"
                            description="Add guardians to link them with students."
                            action={
                                <Button
                                    href={route('guardians.create')}
                                >
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Guardian
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50/90">
                                        <tr>
                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Guardian
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Relation
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Contact
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Occupation
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Children
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {guardians.data.map((guardian) => (
                                            <tr
                                                key={guardian.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700 ring-4 ring-indigo-50">
                                                            {getInitials(
                                                                guardian
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {
                                                                    guardian.first_name
                                                                }{' '}
                                                                {
                                                                    guardian.last_name
                                                                }
                                                            </div>

                                                            <div className="truncate text-xs text-slate-500">
                                                                {
                                                                    guardian
                                                                        .user
                                                                        ?.email
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={getRelationVariant(
                                                            guardian.relation
                                                        )}
                                                    >
                                                        {guardian.relation}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {guardian.phone && (
                                                        <div className="flex items-center gap-1.5">
                                                            <PhoneIcon className="h-3.5 w-3.5 text-slate-400" />
                                                            {guardian.phone}
                                                        </div>
                                                    )}

                                                    {guardian.email && (
                                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                                            <EnvelopeIcon className="h-3.5 w-3.5" />
                                                            {guardian.email}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {guardian.occupation ||
                                                        '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {guardian.students_count ??
                                                            guardian.students
                                                                ?.length ??
                                                            0}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Link
                                                            href={route(
                                                                'guardians.show',
                                                                guardian.id
                                                            )}
                                                            aria-label={`View ${guardian.first_name} ${guardian.last_name}`}
                                                            title="View"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'guardians.edit',
                                                                guardian.id
                                                            )}
                                                            aria-label={`Edit ${guardian.first_name} ${guardian.last_name}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    guardian.id
                                                                )
                                                            }
                                                            aria-label={`Delete ${guardian.first_name} ${guardian.last_name}`}
                                                            title="Delete"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
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
                                links={guardians.links}
                                from={guardians.from}
                                to={guardians.to}
                                total={guardians.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}