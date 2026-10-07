import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import {
    MagnifyingGlassIcon,
    BookOpenIcon,
    UserCircleIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({
    auth,
    books = [],
    students = [],
    preselectedBookId = null,
}) {
    const [bookSearch, setBookSearch] = useState('');
    const [studentSearch, setStudentSearch] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        book_id: preselectedBookId || '',
        student_id: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString().split('T')[0],
    });

    const filteredBooks = useMemo(() => {
        const available = books.filter(
            (b) => b.available_copies > 0
        );

        if (!bookSearch) return available.slice(0, 20);

        const term = bookSearch.toLowerCase();

        return available.filter(
            (b) =>
                b.title.toLowerCase().includes(term) ||
                b.author.toLowerCase().includes(term) ||
                b.isbn.toLowerCase().includes(term)
        );
    }, [books, bookSearch]);

    const filteredStudents = useMemo(() => {
        if (!studentSearch) return students.slice(0, 20);

        const term = studentSearch.toLowerCase();

        return students.filter((s) => {
            const fullName =
                `${s.first_name} ${s.last_name}`.toLowerCase();

            const admNum =
                (s.admission_number || '').toLowerCase();

            return (
                fullName.includes(term) ||
                admNum.includes(term)
            );
        });
    }, [students, studentSearch]);

    const selectedBook = books.find(
        (b) => b.id == data.book_id
    );

    const selectedStudent = students.find(
        (s) => s.id == data.student_id
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('library-transactions.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Issue Book" />

            <div className="max-w-5xl mx-auto space-y-6">

                <PageHeader
                    title="Issue Book"
                    subtitle="Create a new library borrowing transaction"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Library Transactions',
                            href: route('library-transactions.index'),
                        },
                        { label: 'Issue Book' },
                    ]}
                />

                {/* Process Indicator */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">

                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                                01
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Select Book
                                </p>
                                <p className="text-xs text-slate-500">
                                    Choose an available title
                                </p>
                            </div>
                        </div>

                        <ArrowRightIcon className="hidden sm:block h-4 w-4 text-slate-300" />

                        <div className="flex items-center gap-3">
                            <div
                                className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${
                                    data.book_id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                02
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Select Student
                                </p>
                                <p className="text-xs text-slate-500">
                                    Assign the borrower
                                </p>
                            </div>
                        </div>

                        <ArrowRightIcon className="hidden sm:block h-4 w-4 text-slate-300" />

                        <div className="flex items-center gap-3">
                            <div
                                className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${
                                    data.book_id && data.student_id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                03
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Set Due Date
                                </p>
                                <p className="text-xs text-slate-500">
                                    Define borrowing period
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">

                    {/* BOOK */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Select Book"
                            subtitle="Choose an available book from the library catalog"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                                    <BookOpenIcon className="h-5 w-5 text-amber-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">

                            <div className="relative">
                                <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    value={bookSearch}
                                    onChange={(e) =>
                                        setBookSearch(e.target.value)
                                    }
                                    placeholder="Search by title, author or ISBN..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {!data.book_id ? (
                                <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">

                                    <div className="px-4 py-3 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Available Books
                                    </div>

                                    <div className="max-h-80 overflow-y-auto">

                                        {filteredBooks.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <BookOpenIcon className="h-8 w-8 mx-auto text-slate-300" />
                                                <p className="mt-2 text-sm font-medium text-slate-600">
                                                    No books available
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Try another search term.
                                                </p>
                                            </div>
                                        ) : (
                                            filteredBooks.map((book) => (
                                                <button
                                                    key={book.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            'book_id',
                                                            book.id
                                                        )
                                                    }
                                                    className="w-full text-left px-4 py-3.5 hover:bg-indigo-50/60 transition group"
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div className="h-11 w-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                                                            <BookOpenIcon className="h-5 w-5 text-amber-600" />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-semibold text-slate-900 truncate">
                                                                {book.title}
                                                            </div>

                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                {book.author}
                                                                <span className="mx-1.5 text-slate-300">
                                                                    •
                                                                </span>
                                                                ISBN: {book.isbn}
                                                            </div>
                                                        </div>

                                                        <div className="text-right shrink-0">
                                                            <div className="text-xs font-semibold text-emerald-600">
                                                                {book.available_copies}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                available
                                                            </div>
                                                        </div>

                                                    </div>
                                                </button>
                                            ))
                                        )}

                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className="h-12 w-12 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                                                <BookOpenIcon className="h-6 w-6 text-indigo-600" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">
                                                    {selectedBook?.title}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {selectedBook?.author}
                                                </p>

                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="text-xs font-medium text-emerald-600">
                                                        {selectedBook?.available_copies} available
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData('book_id', '')
                                            }
                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline shrink-0"
                                        >
                                            Change
                                        </button>

                                    </div>
                                </div>
                            )}

                            {errors.book_id && (
                                <p className="text-sm text-red-600">
                                    {errors.book_id}
                                </p>
                            )}

                        </CardBody>
                    </Card>

                    {/* STUDENT */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Select Student"
                            subtitle="Choose the student who will borrow the book"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">

                            <div className="relative">
                                <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    value={studentSearch}
                                    onChange={(e) =>
                                        setStudentSearch(e.target.value)
                                    }
                                    placeholder="Search by name or admission number..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {!data.student_id ? (
                                <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">

                                    <div className="px-4 py-3 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Students
                                    </div>

                                    <div className="max-h-80 overflow-y-auto">

                                        {filteredStudents.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <UserCircleIcon className="h-8 w-8 mx-auto text-slate-300" />
                                                <p className="mt-2 text-sm font-medium text-slate-600">
                                                    No students found
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Try another search term.
                                                </p>
                                            </div>
                                        ) : (
                                            filteredStudents.map((student) => (
                                                <button
                                                    key={student.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            'student_id',
                                                            student.id
                                                        )
                                                    }
                                                    className="w-full text-left px-4 py-3.5 hover:bg-indigo-50/60 transition"
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                                            <UserCircleIcon className="h-6 w-6 text-slate-500" />
                                                        </div>

                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">
                                                                {student.first_name}{' '}
                                                                {student.last_name}
                                                            </div>

                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                {student.admission_number}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </button>
                                            ))
                                        )}

                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-12 w-12 rounded-full bg-white border border-indigo-100 flex items-center justify-center">
                                                <UserCircleIcon className="h-7 w-7 text-indigo-600" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {selectedStudent?.first_name}{' '}
                                                    {selectedStudent?.last_name}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {selectedStudent?.admission_number}
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData('student_id', '')
                                            }
                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                        >
                                            Change
                                        </button>

                                    </div>
                                </div>
                            )}

                            {errors.student_id && (
                                <p className="text-sm text-red-600">
                                    {errors.student_id}
                                </p>
                            )}

                        </CardBody>
                    </Card>

                    {/* DATES */}
                    <Card className="overflow-hidden">

                        <CardHeader
                            title="Loan Period"
                            subtitle="Define when the book is issued and when it should be returned"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                    <CalendarDaysIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-5">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <Input
                                    label="Issue Date"
                                    type="date"
                                    required
                                    value={data.issue_date}
                                    onChange={(e) =>
                                        setData(
                                            'issue_date',
                                            e.target.value
                                        )
                                    }
                                    error={errors.issue_date}
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
                                    hint="Default borrowing period: 14 days"
                                />

                            </div>

                            <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                                <InformationCircleIcon className="h-5 w-5 text-blue-600 shrink-0" />

                                <div>
                                    <p className="text-sm font-medium text-blue-900">
                                        Lending policy
                                    </p>

                                    <p className="text-xs text-blue-700 mt-1 leading-5">
                                        Make sure the selected student and book
                                        information is correct before creating
                                        the transaction.
                                    </p>
                                </div>
                            </div>

                        </CardBody>

                        <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-50/70">

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                                Ready to issue when all selections are complete
                            </div>

                            <div className="flex justify-end gap-3">

                                <Button
                                    variant="outline"
                                    href={route(
                                        'library-transactions.index'
                                    )}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    <BookOpenIcon className="h-4 w-4 mr-2" />
                                    {processing
                                        ? 'Issuing...'
                                        : 'Issue Book'}
                                </Button>

                            </div>

                        </CardFooter>
                    </Card>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}