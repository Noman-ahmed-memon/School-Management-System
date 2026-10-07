export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ title, subtitle, action }) {
    return (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

export function CardBody({ children, className = '' }) {
    return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
            {children}
        </div>
    );
}