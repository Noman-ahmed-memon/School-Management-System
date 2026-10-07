import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function PageHeader({ title, subtitle, action, breadcrumbs = [] }) {
    return (
        <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
                {breadcrumbs.length > 0 && (
                    <nav className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center">
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-gray-700">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-700">{crumb.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && (
                                    <ChevronRightIcon className="h-4 w-4 mx-1" />
                                )}
                            </span>
                        ))}
                    </nav>
                )}
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}