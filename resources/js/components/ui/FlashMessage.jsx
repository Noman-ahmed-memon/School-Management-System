import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else {
            setVisible(false);
        }

        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] max-w-sm animate-in fade-in slide-in-from-top-2">
            <div
                className={`flex items-start gap-3 rounded-lg shadow-lg p-4 border ${
                    type === 'success'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                }`}
            >
                {type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                ) : (
                    <XCircleIcon className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                    <p
                        className={`text-sm ${
                            type === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}
                    >
                        {message}
                    </p>
                </div>
                <button onClick={() => setVisible(false)} className="shrink-0">
                    <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        </div>
    );
}