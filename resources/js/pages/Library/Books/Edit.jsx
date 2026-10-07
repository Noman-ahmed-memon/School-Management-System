import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import {
    BookOpenIcon,
    ArchiveBoxIcon,
    InformationCircleIcon,
    MapPinIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ auth, book, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: book.title || '',
        isbn: book.isbn || '',
        author: book.author || '',
        publisher: book.publisher || '',
        edition: book.edition || '',
        year: book.year || '',
        category_id: book.category_id || '',
        total_copies: book.total_copies || 1,
        shelf_location: book.shelf_location || '',
        rack_number: book.rack_number || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.update', book.id));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Edit ${book.title}`} />

            <div className="max-w-5xl mx-auto space-y-6">

                <PageHeader
                    title="Edit Book"
                    subtitle={`Update catalog information for ${book.title}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Books', href: route('books.index') },
                        { label: book.title },
                        { label: 'Edit' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">

                    {/* Book Information */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Bibliographic Information"
                            subtitle="Update the academic and publication details"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-6">

                            <div className="flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                                    01
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Book Identity
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Core catalog information
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <Input
                                        label="Book Title"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        error={errors.title}
                                    />
                                </div>

                                <Input
                                    label="ISBN"
                                    required
                                    value={data.isbn}
                                    onChange={(e) => setData('isbn', e.target.value)}
                                    error={errors.isbn}
                                />

                                <Select
                                    label="Category"
                                    required
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    error={errors.category_id}
                                    placeholder="Select Category"
                                    options={(categories || []).map((c) => ({
                                        value: c.id,
                                        label: c.name,
                                    }))}
                                />
                            </div>

                            <div className="pt-5 border-t border-slate-100">

                                <div className="flex items-center gap-3 mb-5">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                                        02
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Publication Details
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Author and publishing information
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Input
                                        label="Author"
                                        required
                                        value={data.author}
                                        onChange={(e) => setData('author', e.target.value)}
                                        error={errors.author}
                                    />

                                    <Input
                                        label="Publisher"
                                        value={data.publisher}
                                        onChange={(e) => setData('publisher', e.target.value)}
                                        error={errors.publisher}
                                    />

                                    <Input
                                        label="Edition"
                                        value={data.edition}
                                        onChange={(e) => setData('edition', e.target.value)}
                                        error={errors.edition}
                                    />

                                    <Input
                                        label="Publication Year"
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        error={errors.year}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <InformationCircleIcon className="h-5 w-5 flex-shrink-0 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-indigo-900">
                                        Editing catalog data
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-indigo-700">
                                        Changes to title, ISBN, author, or category will update
                                        the library record associated with this book.
                                    </p>
                                </div>
                            </div>

                        </CardBody>
                    </Card>

                    {/* Inventory */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Library Inventory"
                            subtitle="Manage copies and physical storage information"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                    <ArchiveBoxIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-6">

                            <div className="flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                                    03
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Inventory & Location
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Update physical library information
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                <Input
                                    label="Total Copies"
                                    type="number"
                                    min="1"
                                    required
                                    value={data.total_copies}
                                    onChange={(e) => setData('total_copies', e.target.value)}
                                    error={errors.total_copies}
                                    hint={`Currently available: ${book.available_copies ?? 0}`}
                                />

                                <Input
                                    label="Shelf Location"
                                    value={data.shelf_location}
                                    onChange={(e) => setData('shelf_location', e.target.value)}
                                    error={errors.shelf_location}
                                />

                                <Input
                                    label="Rack Number"
                                    value={data.rack_number}
                                    onChange={(e) => setData('rack_number', e.target.value)}
                                    error={errors.rack_number}
                                />

                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 text-slate-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Current Library Placement
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {book.shelf_location || book.rack_number
                                                ? `Shelf ${book.shelf_location || '—'}${book.rack_number ? ` • Rack ${book.rack_number}` : ''}`
                                                : 'No physical location has been assigned yet.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </CardBody>

                        <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-50/70 border-t border-slate-100">

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <PencilSquareIcon className="h-4 w-4" />
                                Changes will update this catalog record
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    href={route('books.index')}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating Book...' : 'Update Book'}
                                </Button>
                            </div>

                        </CardFooter>
                    </Card>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}