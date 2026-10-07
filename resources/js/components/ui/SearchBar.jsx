import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search...',
    onClear,
    children,
    onSubmit,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px] relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            {children}
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Search
            </button>
            {onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                    Clear
                </button>
            )}
        </form>
    );
}