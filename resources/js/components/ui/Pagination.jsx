import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{from}</span> to{' '}
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{total}</span> results
            </div>
            <div className="flex space-x-1">
                {links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url || '#'}
                        preserveScroll
                        className={`px-3 py-1 text-sm rounded-md ${
                            link.active
                                ? 'bg-indigo-600 text-white'
                                : link.url
                                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}