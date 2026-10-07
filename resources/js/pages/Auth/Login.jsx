import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="relative">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="text-center mb-8">

                    <div className="
                        mx-auto mb-5
                        h-14 w-14
                        rounded-2xl
                        bg-gradient-to-br from-blue-600 to-indigo-700
                        flex items-center justify-center
                        shadow-lg shadow-blue-900/20
                    ">
                        <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.6"
                                d="M4 19.5A2.5 2.5 0 016.5 17H20"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.6"
                                d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.6"
                                d="M8 6h8M8 10h8M8 14h5"
                            />
                        </svg>
                    </div>

                    <div className="
                        text-[10px]
                        uppercase
                        tracking-[0.28em]
                        font-semibold
                        text-blue-600
                    ">
                        Academic Administration
                    </div>

                    <h1 className="
                        mt-2
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Welcome back
                    </h1>

                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">
                        Sign in to access your school management portal.
                    </p>

                </div>

                {/* =====================================================
                    STATUS MESSAGE
                ====================================================== */}

                {status && (
                    <div className="
                        mb-5
                        flex items-center gap-3
                        rounded-xl
                        border border-emerald-200
                        bg-emerald-50
                        px-4 py-3
                        text-sm
                        font-medium
                        text-emerald-700
                    ">
                        <div className="
                            h-7 w-7
                            shrink-0
                            rounded-lg
                            bg-emerald-100
                            flex items-center justify-center
                        ">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        {status}
                    </div>
                )}

                {/* =====================================================
                    FORM
                ====================================================== */}

                <form onSubmit={submit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email address"
                            className="!text-sm !font-semibold !text-slate-700"
                        />

                        <div className="relative mt-2">

                            <div className="
                                pointer-events-none
                                absolute inset-y-0 left-0
                                flex items-center
                                pl-3.5
                            ">
                                <svg
                                    className="h-5 w-5 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                    />
                                </svg>
                            </div>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="
                                    !mt-0
                                    !block
                                    !w-full
                                    !rounded-xl
                                    !border-slate-200
                                    !bg-slate-50
                                    !py-3
                                    !pl-11
                                    !pr-4
                                    !text-sm
                                    !text-slate-900
                                    placeholder:!text-slate-400
                                    focus:!border-blue-500
                                    focus:!ring-blue-500/20
                                    focus:!bg-white
                                    transition-all
                                "
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="Enter your email address"
                            />
                        </div>

                        <InputError
                            message={errors.email}
                            className="mt-2"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="!text-sm !font-semibold !text-slate-700"
                        />

                        <div className="relative mt-2">

                            <div className="
                                pointer-events-none
                                absolute inset-y-0 left-0
                                flex items-center
                                pl-3.5
                            ">
                                <svg
                                    className="h-5 w-5 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M8 7V5a4 4 0 118 0v2"
                                    />
                                </svg>
                            </div>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="
                                    !mt-0
                                    !block
                                    !w-full
                                    !rounded-xl
                                    !border-slate-200
                                    !bg-slate-50
                                    !py-3
                                    !pl-11
                                    !pr-4
                                    !text-sm
                                    !text-slate-900
                                    placeholder:!text-slate-400
                                    focus:!border-blue-500
                                    focus:!ring-blue-500/20
                                    focus:!bg-white
                                    transition-all
                                "
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Enter your password"
                            />
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember / Forgot */}
                    <div className="flex items-center justify-between">

                        <label className="flex items-center cursor-pointer group">

                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="
                                    !rounded-md
                                    !border-slate-300
                                    text-blue-600
                                    focus:ring-blue-500/20
                                "
                            />

                            <span className="
                                ms-2
                                text-sm
                                text-slate-500
                                group-hover:text-slate-700
                                transition-colors
                            ">
                                Remember me
                            </span>

                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="
                                    text-sm
                                    font-semibold
                                    text-blue-600
                                    hover:text-blue-700
                                    transition-colors
                                "
                            >
                                Forgot password?
                            </Link>
                        )}

                    </div>

                    {/* Submit */}
                    <PrimaryButton
                        className="
                            !mt-6
                            !w-full
                            !justify-center
                            !rounded-xl
                            !bg-blue-600
                            !px-5
                            !py-3.5
                            !text-sm
                            !font-semibold
                            !shadow-lg
                            !shadow-blue-900/20
                            hover:!bg-blue-500
                            hover:!-translate-y-0.5
                            focus:!ring-blue-500/30
                            transition-all
                            duration-200
                        "
                        disabled={processing}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {processing ? 'Signing in...' : 'Sign in to portal'}

                            {!processing && (
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            )}
                        </span>
                    </PrimaryButton>

                </form>

                {/* Security footer */}
                <div className="
                    mt-7
                    pt-5
                    border-t border-slate-100
                    flex items-center justify-center gap-2
                    text-[11px]
                    text-slate-400
                ">
                    <svg
                        className="h-3.5 w-3.5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3l7 4v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V7l7-4z"
                        />
                    </svg>

                    Secure school management portal
                </div>

            </div>
        </GuestLayout>
    );
}