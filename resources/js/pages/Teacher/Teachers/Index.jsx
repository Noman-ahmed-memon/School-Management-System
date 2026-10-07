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
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, teachers, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = () => {
        router.get(
            route('teachers.index'),
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
        router.get(route('teachers.index'));
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Delete this teacher? This will also delete their user account.'
            )
        ) {
            router.delete(route('teachers.destroy', id));
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';

        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const getStatusVariant = (teacherStatus) => {
        if (teacherStatus === 'active') return 'success';
        if (teacherStatus === 'inactive') return 'warning';

        return 'danger';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Teachers" />

            <div className="space-y-7">
                <PageHeader
                    title="Teachers"
                    subtitle="Manage teaching staff, professional profiles, and employment records."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Teachers' },
                    ]}
                    action={
                        <Button href={route('teachers.create')}>
                            <UserGroupIcon className="mr-2 h-4 w-4" />
                            Add Teacher
                        </Button>
                    }
                />

                <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.25)]">
                    {/* Search / Filter */}
                    <div className="border-b border-slate-200/80 bg-slate-50/70 p-5">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            onClear={handleClear}
                            onSubmit={handleSearch}
                            placeholder="Search by name or email..."
                        >
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-300 bg-white text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="terminated">
                                    Terminated
                                </option>
                            </select>
                        </SearchBar>
                    </div>

                    {teachers.data.length === 0 ? (
                        <EmptyState
                            icon={<UserGroupIcon />}
                            title="No teachers found"
                            description="Get started by adding your first teacher."
                            action={
                                <Button
                                    href={route('teachers.create')}
                                >
                                    <UserGroupIcon className="mr-2 h-4 w-4" />
                                    Add Teacher
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/80">
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Teacher
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Employee ID
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Qualification
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Experience
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {teachers.data.map((teacher) => (
                                            <tr
                                                key={teacher.id}
                                                className="group transition hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {teacher.user
                                                            ?.profile_picture ? (
                                                            <img
                                                                src={`/storage/${teacher.user.profile_picture}`}
                                                                alt={
                                                                    teacher
                                                                        .user
                                                                        .name
                                                                }
                                                                className="h-11 w-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600 ring-4 ring-indigo-50/50">
                                                                {getInitials(
                                                                    teacher
                                                                        .user
                                                                        ?.name
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {
                                                                    teacher
                                                                        .user
                                                                        ?.name
                                                                }
                                                            </div>

                                                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                                                <AcademicCapIcon className="h-3.5 w-3.5" />
                                                                {teacher.specialization ||
                                                                    'No specialization'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                                                        {teacher.employee_id}
                                                    </code>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="space-y-1.5 text-sm text-slate-600">
                                                        {teacher.user?.email && (
                                                            <div className="flex items-center gap-1.5">
                                                                <EnvelopeIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                                                <span className="max-w-[220px] truncate">
                                                                    {
                                                                        teacher
                                                                            .user
                                                                            .email
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}

                                                        {teacher.user?.phone && (
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                                <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                                                {
                                                                    teacher
                                                                        .user
                                                                        .phone
                                                                }
                                                            </div>
                                                        )}

                                                        {!teacher.user?.email &&
                                                            !teacher.user
                                                                ?.phone && (
                                                                <span className="text-slate-400">
                                                                    —
                                                                </span>
                                                            )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {teacher.qualification ||
                                                        '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {teacher.experience_years
                                                            ? `${teacher.experience_years} years`
                                                            : '—'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            teacher.status
                                                        )}
                                                    >
                                                        {teacher.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1">
                                                        <Link
                                                            href={route(
                                                                'teachers.show',
                                                                teacher.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            title="View teacher"
                                                            aria-label="View teacher"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'teachers.edit',
                                                                teacher.id
                                                            )}
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Edit teacher"
                                                            aria-label="Edit teacher"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    teacher.id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                            title="Delete teacher"
                                                            aria-label="Delete teacher"
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
                                links={teachers.links}
                                from={teachers.from}
                                to={teachers.to}
                                total={teachers.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}