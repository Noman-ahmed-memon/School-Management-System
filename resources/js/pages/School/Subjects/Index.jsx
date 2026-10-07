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
    BookOpenIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, subjects, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [type, setType] = useState(filters?.type || '');

    const handleSearch = () => {
        router.get(
            route('school.subjects.index'),
            { search, status, type },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setType('');
        router.get(route('school.subjects.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this subject?')) {
            router.delete(route('school.subjects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Subjects" />

            <div className="space-y-6">
                <PageHeader
                    title="Subjects"
                    subtitle="Manage all subjects"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Subjects' },
                    ]}
                    action={
                        <Button href={route('school.subjects.create')}>
                            + Add Subject
                        </Button>
                    }
                />

                <Card className="overflow-hidden">
                    <div className="border-b border-slate-200 bg-slate-50/70 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or code..."
                        >
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Types</option>
                                <option value="theory">Theory</option>
                                <option value="practical">Practical</option>
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </SearchBar>
                    </div>

                    {subjects.data.length === 0 ? (
                        <EmptyState
                            icon={<BookOpenIcon />}
                            title="No subjects found"
                            description="Add your first subject."
                            action={
                                <Button href={route('school.subjects.create')}>
                                    + Add Subject
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Type
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Compulsory
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Credit Hours
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {subjects.data.map((subject) => (
                                            <tr
                                                key={subject.id}
                                                className="transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                                                            <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                                                        </div>

                                                        <div className="text-sm font-semibold text-slate-900">
                                                            {subject.name}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {subject.code}
                                                    </code>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                                                        {subject.type}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {subject.is_compulsory ? (
                                                        <Badge variant="success">
                                                            Compulsory
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="warning">
                                                            Optional
                                                        </Badge>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-slate-600">
                                                        {subject.credit_hours}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            subject.status === 'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {subject.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Link
                                                            href={route(
                                                                'school.subjects.show',
                                                                subject.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                            aria-label={`View ${subject.name}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'school.subjects.edit',
                                                                subject.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${subject.name}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(subject.id)
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${subject.name}`}
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
                                links={subjects.links}
                                from={subjects.from}
                                to={subjects.to}
                                total={subjects.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}