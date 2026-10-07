import { Link } from '@inertiajs/react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    className = '',
    onClick,
    ...props
}) {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:   'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
        danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success:   'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        outline:   'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
        ghost:     'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}