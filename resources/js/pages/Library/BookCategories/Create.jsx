import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardFooter } from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import {
    FolderIcon,
    InformationCircleIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('book-categories.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Create Book Category" />

            <div className="max-w-3xl mx-auto space-y-6">

                <PageHeader
                    title="Create Book Category"
                    subtitle="Create a category to organize books within the school library."
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Book Categories', href: route('book-categories.index') },
                        { label: 'Create' },
                    ]}
                />

                {/* Library Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-800 px-6 py-6 shadow-lg">
                    <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-blue-400/10 blur-2xl" />

                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                            <FolderIcon className="h-6 w-6 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-blue-200">
                                Library Management
                            </p>
                            <h2 className="mt-0.5 text-lg font-semibold text-white">
                                Add a new book category
                            </h2>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card className="overflow-hidden border border-slate-200/80 shadow-sm">

                        <CardBody className="p-6 sm:p-8">

                            <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                                </div>

                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        Category Information
                                    </h3>
                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Define how this group of books should appear in the library.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <Input
                                    label="Category Name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={errors.name}
                                    placeholder="e.g. Science, Fiction, Reference"
                                />

                                <div className="relative">
                                    <Input
                                        label="Code"
                                        required
                                        value={data.code}
                                        onChange={(e) =>
                                            setData(
                                                'code',
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        error={errors.code}
                                        placeholder="e.g. SCI, FIC"
                                    />

                                    <div className="pointer-events-none absolute right-3 top-[34px]">
                                        <TagIcon className="h-5 w-5 text-slate-300" />
                                    </div>
                                </div>

                                <Textarea
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    error={errors.description}
                                    rows={4}
                                    placeholder="Briefly describe this book category..."
                                />

                            </div>
                        </CardBody>

                        <CardFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
                            <div className="flex w-full items-center justify-end gap-3">

                                <Button
                                    variant="outline"
                                    href={route('book-categories.index')}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Creating...'
                                        : 'Create Category'}
                                </Button>

                            </div>
                        </CardFooter>

                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}