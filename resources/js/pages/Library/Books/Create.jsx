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
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        isbn: '',
        author: '',
        publisher: '',
        edition: '',
        year: '',
        category_id: '',
        total_copies: 1,
        shelf_location: '',
        rack_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Add Book" />

            <div className="max-w-5xl mx-auto space-y-6">

                {/* Page Header */}
                <PageHeader
                    title="Add Book"
                    subtitle="Register a new title in the institutional library catalog"
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Books', href: route('books.index') },
                        { label: 'Add Book' },
                    ]}
                />

                <form onSubmit={submit} className="space-y-6">

                    {/* Bibliographic Information */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Bibliographic Information"
                            subtitle="Enter the academic and publication details of the book"
                            icon={
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                            }
                        />

                        <CardBody className="space-y-6">

                            {/* Section Label */}
                            <div className="flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                                    01
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Book Identity
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Core identification information
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
                                        placeholder="e.g. Introduction to Physics"
                                    />
                                </div>

                                <Input
                                    label="ISBN"
                                    required
                                    value={data.isbn}
                                    onChange={(e) => setData('isbn', e.target.value)}
                                    error={errors.isbn}
                                    placeholder="e.g. 978-3-16-148410-0"
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

                            {/* Publication */}
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
                                        placeholder="e.g. Halliday, Resnick & Walker"
                                    />

                                    <Input
                                        label="Publisher"
                                        value={data.publisher}
                                        onChange={(e) => setData('publisher', e.target.value)}
                                        error={errors.publisher}
                                        placeholder="e.g. Wiley"
                                    />

                                    <Input
                                        label="Edition"
                                        value={data.edition}
                                        onChange={(e) => setData('edition', e.target.value)}
                                        error={errors.edition}
                                        placeholder="e.g. 3rd Edition"
                                    />

                                    <Input
                                        label="Publication Year"
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        error={errors.year}
                                        placeholder="e.g. 2026"
                                    />
                                </div>
                            </div>

                            {/* Information Note */}
                            <div className="flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <InformationCircleIcon className="h-5 w-5 flex-shrink-0 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-indigo-900">
                                        Cataloging note
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-indigo-700">
                                        Use the official title and ISBN information so that
                                        library staff can identify and manage the book accurately.
                                    </p>
                                </div>
                            </div>

                        </CardBody>
                    </Card>

                    {/* Inventory */}
                    <Card className="overflow-hidden">
                        <CardHeader
                            title="Library Inventory"
                            subtitle="Configure the physical availability and location of this title"
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
                                        Inventory Placement
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Define copies and physical storage location
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
                                    placeholder="1"
                                />

                                <Input
                                    label="Shelf Location"
                                    value={data.shelf_location}
                                    onChange={(e) => setData('shelf_location', e.target.value)}
                                    error={errors.shelf_location}
                                    placeholder="e.g. A-03"
                                />

                                <Input
                                    label="Rack Number"
                                    value={data.rack_number}
                                    onChange={(e) => setData('rack_number', e.target.value)}
                                    error={errors.rack_number}
                                    placeholder="e.g. Rack 04"
                                />
                            </div>

                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 text-slate-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Physical Location
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Shelf and rack information helps students and
                                            library staff locate physical copies quickly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </CardBody>

                        <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-50/70 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                                Required fields must be completed
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
                                    {processing ? 'Adding Book...' : 'Add Book'}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}