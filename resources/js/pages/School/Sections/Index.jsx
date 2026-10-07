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
    Squares2X2Icon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, sections, standards, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [standardId, setStandardId] = useState(filters?.standard_id || '');

    const handleSearch = () => {
        router.get(
            route('school.sections.index'),
            {
                search,
                status,
                standard_id: standardId,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setStandardId('');
        router.get(route('school.sections.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Delete this section?')) {
            router.delete(route('school.sections.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Sections" />

            <div className="space-y-6">
                <PageHeader
                    title="Sections"
                    subtitle="Manage class sections"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Sections' },
                    ]}
                    action={
                        <Button href={route('school.sections.create')}>
                            + Add Section
                        </Button>
                    }
                />

                <Card className="overflow-hidden border border-slate-200/80 shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50/80 p-4">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name..."
                        >
                            <select
                                value={standardId}
                                onChange={(e) => setStandardId(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Standards</option>
                                {standards.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
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

                    {sections.data.length === 0 ? (
                        <div className="py-6">
                            <EmptyState
                                icon={<Squares2X2Icon />}
                                title="No sections found"
                                description="Create your first section."
                                action={
                                    <Button href={route('school.sections.create')}>
                                        + Add Section
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50/90">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Standard
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Code
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Capacity
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Enrolled
                                            </th>
                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {sections.data.map((section) => (
                                            <tr
                                                key={section.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                                            <Squares2X2Icon className="h-5 w-5" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {section.name}
                                                            </div>

                                                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                                                                <AcademicCapIcon className="h-3.5 w-3.5" />
                                                                Academic Section
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {section.standard?.name || '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700">
                                                        {section.code || '—'}
                                                    </code>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                                    {section.capacity}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge variant="info">
                                                        {section.student_academic_records_count ?? 0}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            section.status === 'active'
                                                                ? 'success'
                                                                : 'danger'
                                                        }
                                                    >
                                                        {section.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route('school.sections.show', section.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View"
                                                            aria-label={`View ${section.name}`}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route('school.sections.edit', section.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit"
                                                            aria-label={`Edit ${section.name}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(section.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                            aria-label={`Delete ${section.name}`}
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
                                links={sections.links}
                                from={sections.from}
                                to={sections.to}
                                total={sections.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}