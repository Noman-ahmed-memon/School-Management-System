import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BookOpenIcon,
    PencilIcon,
    UserIcon,
    CalendarIcon,
    BuildingLibraryIcon,
    HashtagIcon,
    MapPinIcon,
    ArchiveBoxIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Show({ auth, book }) {
    const getStatusVariant = (status) => {
        const map = {
            available: 'success',
            issued: 'warning',
            reserved: 'info',
        };

        return map[status] || 'default';
    };

    const handleIssueBook = () => {
        router.get(route('library-transactions.create'), {
            book_id: book.id,
        });
    };

    const totalCopies = Number(book.total_copies || 0);
    const availableCopies = Number(book.available_copies || 0);
    const issuedCopies = Math.max(0, totalCopies - availableCopies);

    const availabilityPercentage =
        totalCopies > 0
            ? Math.min(100, Math.round((availableCopies / totalCopies) * 100))
            : 0;

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={book.title} />

            <div className="space-y-6">

                {/* Header */}
                <PageHeader
                    title={book.title}
                    subtitle="Library catalog record"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Books', href: route('books.index') },
                        { label: book.title },
                    ]}
                    action={
                        <div className="flex flex-wrap gap-2">

                            {availableCopies > 0 && (
                                <Button onClick={handleIssueBook}>
                                    Issue Book
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                href={route('books.edit', book.id)}
                            >
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Edit
                            </Button>

                        </div>
                    }
                />

                {/* Hero Book Card */}
                <Card className="overflow-hidden">

                    <div className="bg-gradient-to-r from-slate-50 via-white to-indigo-50/40 p-6 sm:p-8">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                            <div className="h-24 w-24 flex-shrink-0 rounded-2xl border border-amber-200 bg-amber-50 flex items-center justify-center shadow-sm">
                                <BookOpenIcon className="h-12 w-12 text-amber-600" />
                            </div>

                            <div className="min-w-0">

                                <div className="flex flex-wrap items-center gap-2 mb-2">

                                    {book.category && (
                                        <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                                            {book.category.name}
                                        </span>
                                    )}

                                    <Badge variant={getStatusVariant(book.status)}>
                                        {book.status}
                                    </Badge>

                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                    {book.title}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {book.author}
                                    {book.publisher && (
                                        <>
                                            <span className="mx-2 text-slate-300">•</span>
                                            {book.publisher}
                                        </>
                                    )}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Metadata */}
                    <div className="border-t border-slate-100 px-6 py-5 sm:px-8">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <HashtagIcon className="h-4 w-4 text-slate-500" />
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                        ISBN
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-slate-800">
                                        {book.isbn}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <UserIcon className="h-4 w-4 text-slate-500" />
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                        Author
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-slate-800">
                                        {book.author}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <CalendarIcon className="h-4 w-4 text-slate-500" />
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                        Published
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-slate-800">
                                        {book.year || 'Not specified'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <BuildingLibraryIcon className="h-4 w-4 text-slate-500" />
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                        Edition
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-slate-800">
                                        {book.edition || 'Not specified'}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </Card>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Information */}
                    <Card className="lg:col-span-2 overflow-hidden">

                        <CardHeader
                            title="Book Information"
                            subtitle="Bibliographic and physical catalog details"
                        />

                        <CardBody className="space-y-6">

                            {/* Publication */}
                            <div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                                        <BookOpenIcon className="h-4 w-4 text-indigo-600" />
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-800">
                                        Publication Details
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Author
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">
                                            {book.author}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Publisher
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">
                                            {book.publisher || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Edition
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">
                                            {book.edition || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Publication Year
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">
                                            {book.year || '—'}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-100" />

                            {/* Identification */}
                            <div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                                        <HashtagIcon className="h-4 w-4 text-slate-600" />
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-800">
                                        Catalog Identification
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            ISBN
                                        </p>

                                        <code className="inline-block mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
                                            {book.isbn}
                                        </code>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Category
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-slate-800">
                                            {book.category?.name || '—'}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-100" />

                            {/* Location */}
                            <div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <MapPinIcon className="h-4 w-4 text-emerald-600" />
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-800">
                                        Physical Location
                                    </h3>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                                <MapPinIcon className="h-5 w-5 text-slate-500" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Shelf
                                                </p>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {book.shelf_location || 'Not assigned'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="hidden sm:block h-8 w-px bg-slate-200" />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Rack
                                            </p>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {book.rack_number || 'Not assigned'}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </CardBody>
                    </Card>

                    {/* Availability */}
                    <div className="space-y-6">

                        <Card className="overflow-hidden">

                            <CardHeader
                                title="Availability"
                                subtitle="Current inventory status"
                            />

                            <CardBody className="space-y-6">

                                <div className="text-center">

                                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-50 bg-white shadow-sm">

                                        <div>
                                            <div className="text-3xl font-bold text-emerald-600">
                                                {availableCopies}
                                            </div>

                                            <div className="text-[10px] uppercase tracking-wide text-slate-400">
                                                available
                                            </div>
                                        </div>

                                    </div>

                                    <p className="mt-3 text-xs text-slate-500">
                                        {availableCopies} of {totalCopies} copies currently available
                                    </p>

                                </div>

                                {/* Progress */}
                                <div>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-slate-500">
                                            Availability
                                        </span>

                                        <span className="text-xs font-semibold text-emerald-600">
                                            {availabilityPercentage}%
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-emerald-500 transition-all"
                                            style={{
                                                width: `${availabilityPercentage}%`,
                                            }}
                                        />
                                    </div>

                                </div>

                                {/* Stats */}
                                <div className="space-y-1 border-t border-slate-100 pt-4">

                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-slate-500">
                                            Total Copies
                                        </span>

                                        <span className="text-sm font-semibold text-slate-800">
                                            {totalCopies}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-slate-500">
                                            Available
                                        </span>

                                        <span className="text-sm font-semibold text-emerald-600">
                                            {availableCopies}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-slate-500">
                                            Issued
                                        </span>

                                        <span className="text-sm font-semibold text-orange-600">
                                            {issuedCopies}
                                        </span>
                                    </div>

                                </div>

                            </CardBody>
                        </Card>

                        {/* Quick Status */}
                        <Card>

                            <CardBody className="space-y-4">

                                <div className="flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Catalog Status
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Record is currently marked as
                                        </p>
                                    </div>

                                </div>

                                <Badge variant={getStatusVariant(book.status)}>
                                    {book.status}
                                </Badge>

                                {book.status === 'issued' && (
                                    <div className="flex items-start gap-2 rounded-lg bg-orange-50 border border-orange-100 p-3">
                                        <ClockIcon className="h-4 w-4 text-orange-500 mt-0.5" />
                                        <p className="text-xs leading-5 text-orange-700">
                                            All currently available copies may be unavailable
                                            for immediate issue depending on transaction status.
                                        </p>
                                    </div>
                                )}

                            </CardBody>

                        </Card>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}