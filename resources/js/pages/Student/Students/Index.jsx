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
    UsersIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    AcademicCapIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, students, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [gender, setGender] = useState(filters?.gender || '');

    const handleSearch = () => {
        router.get(
            route('students.index'),
            {
                search,
                status,
                gender,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        setGender('');
        router.get(route('students.index'));
    };

    const handleDelete = (id) => {
        if (
            confirm(
                'Delete this student? This will also delete their user account.'
            )
        ) {
            router.delete(route('students.destroy', id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            active: 'success',
            enrolled: 'success',
            application: 'warning',
            admitted: 'info',
            graduated: 'primary',
            transferred: 'warning',
            dropped: 'danger',
            promoted: 'info',
        };

        return map[status] || 'default';
    };

    const getInitials = (student) => {
        return `${student.first_name?.[0] || ''}${
            student.last_name?.[0] || ''
        }`.toUpperCase();
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Students" />

            <div className="space-y-6">
                <PageHeader
                    title="Students"
                    subtitle="Manage all student records"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Students' },
                    ]}
                    action={
                        <Button href={route('students.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Student
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
                            placeholder="Search by name or admission #..."
                        >
                            <select
                                value={gender}
                                onChange={(e) =>
                                    setGender(e.target.value)
                                }
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="application">
                                    Application
                                </option>
                                <option value="admitted">Admitted</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="active">Active</option>
                                <option value="promoted">Promoted</option>
                                <option value="graduated">
                                    Graduated
                                </option>
                                <option value="transferred">
                                    Transferred
                                </option>
                                <option value="dropped">Dropped</option>
                            </select>
                        </SearchBar>
                    </div>

                    {students.data.length === 0 ? (
                        <EmptyState
                            icon={<UsersIcon />}
                            title="No students found"
                            description="Get started by adding your first student."
                            action={
                                <Button
                                    href={route('students.create')}
                                >
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Student
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
                                                Student
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Admission #
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Class
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Guardian
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="whitespace-nowrap px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {students.data.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {student.student_photo ? (
                                                            <img
                                                                src={`/storage/${student.student_photo}`}
                                                                alt={
                                                                    student.first_name
                                                                }
                                                                className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-white shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700 ring-4 ring-indigo-50">
                                                                {getInitials(
                                                                    student
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm font-semibold text-slate-900">
                                                                {
                                                                    student.first_name
                                                                }{' '}
                                                                {
                                                                    student.last_name
                                                                }
                                                            </div>

                                                            <div className="mt-0.5 text-xs capitalize text-slate-500">
                                                                {
                                                                    student.gender
                                                                }{' '}
                                                                •{' '}
                                                                {
                                                                    student.date_of_birth?.split(
                                                                        'T'
                                                                    )[0]
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <code className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                        {
                                                            student.admission_number
                                                        }
                                                    </code>

                                                    {student.roll_number && (
                                                        <div className="mt-2 text-xs text-slate-500">
                                                            Roll:{' '}
                                                            {
                                                                student.roll_number
                                                            }
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student
                                                        .current_academic_record
                                                        ?.standard ? (
                                                        <div>
                                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                                <AcademicCapIcon className="h-4 w-4 text-indigo-500" />
                                                                {
                                                                    student
                                                                        .current_academic_record
                                                                        .standard
                                                                        .name
                                                                }
                                                            </div>

                                                            {student
                                                                .current_academic_record
                                                                .section && (
                                                                <div className="ml-6 mt-0.5 text-xs text-slate-500">
                                                                    {
                                                                        student
                                                                            .current_academic_record
                                                                            .section
                                                                            .name
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                                                            Not enrolled
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {student.guardians &&
                                                    student.guardians.length >
                                                        0
                                                        ? `${student.guardians[0].first_name} ${student.guardians[0].last_name}`
                                                        : '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            student.status
                                                        )}
                                                    >
                                                        {student.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Link
                                                            href={route(
                                                                'students.show',
                                                                student.id
                                                            )}
                                                            aria-label={`View ${student.first_name} ${student.last_name}`}
                                                            title="View"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'students.edit',
                                                                student.id
                                                            )}
                                                            aria-label={`Edit ${student.first_name} ${student.last_name}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    student.id
                                                                )
                                                            }
                                                            aria-label={`Delete ${student.first_name} ${student.last_name}`}
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
                                links={students.links}
                                from={students.from}
                                to={students.to}
                                total={students.total}
                            />
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}