import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome - School Management System" />

            <div className="min-h-screen bg-[#07111f] text-white overflow-hidden relative">

                {/* =========================================================
                    BACKGROUND
                ========================================================== */}

                {/* Main atmospheric gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-72 -left-72 h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-3xl" />
                    <div className="absolute top-1/3 -right-72 h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-3xl" />
                    <div className="absolute -bottom-96 left-1/3 h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-3xl" />
                </div>

                {/* Subtle academic grid */}
                <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                        `,
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Decorative vertical glow */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-blue-400/10 to-transparent pointer-events-none" />

                {/* =========================================================
                    NAVIGATION
                ========================================================== */}

                <header className="relative z-20">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-5">

                        <nav className="
                            flex items-center justify-between
                            px-4 sm:px-6 py-3
                            rounded-2xl
                            border border-white/10
                            bg-white/[0.045]
                            backdrop-blur-xl
                            shadow-2xl shadow-black/20
                        ">

                            {/* Brand */}
                            <div className="flex items-center gap-3">

                                <div className="
                                    relative h-11 w-11
                                    rounded-xl
                                    bg-gradient-to-br from-blue-500 to-indigo-700
                                    flex items-center justify-center
                                    shadow-lg shadow-blue-900/30
                                ">
                                    <svg
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.7"
                                            d="M4 19.5A2.5 2.5 0 016.5 17H20"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.7"
                                            d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.7"
                                            d="M8 6h8M8 10h8M8 14h5"
                                        />
                                    </svg>

                                    <div className="
                                        absolute -top-1 -right-1
                                        h-2.5 w-2.5
                                        rounded-full
                                        bg-amber-400
                                        ring-4 ring-[#07111f]
                                    " />
                                </div>

                                <div>
                                    <div className="text-sm font-bold tracking-wide text-white">
                                        ACADEMIA
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                                        School Management
                                    </div>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-3">

                                <div className="
                                    hidden sm:flex
                                    items-center gap-2
                                    px-3 py-2
                                    rounded-lg
                                    border border-white/10
                                    bg-white/[0.03]
                                    text-xs text-slate-400
                                ">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    System Online
                                </div>

                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="
                                            inline-flex items-center gap-2
                                            rounded-xl
                                            bg-blue-600
                                            px-4 py-2.5
                                            text-sm font-semibold
                                            text-white
                                            shadow-lg shadow-blue-900/30
                                            transition-all duration-200
                                            hover:bg-blue-500
                                            hover:-translate-y-0.5
                                        "
                                    >
                                        Dashboard

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
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link
                                                href="/login"
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-xl
                                                    border border-white/10
                                                    bg-white/[0.05]
                                                    px-4 py-2.5
                                                    text-sm font-medium
                                                    text-slate-200
                                                    transition-all duration-200
                                                    hover:bg-white/10
                                                    hover:border-white/20
                                                "
                                            >
                                                Sign In
                                            </Link>
                                        )}

                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* =========================================================
                    HERO
                ========================================================== */}

                <main className="relative z-10">

                    <section className="max-w-7xl mx-auto px-5 sm:px-8">

                        <div className="
                            min-h-[calc(100vh-100px)]
                            flex items-center
                            py-16 sm:py-20 lg:py-24
                        ">

                            <div className="
                                w-full
                                grid
                                lg:grid-cols-[1.05fr_0.95fr]
                                gap-14
                                lg:gap-20
                                items-center
                            ">

                                {/* =================================================
                                    LEFT CONTENT
                                ================================================== */}

                                <div>

                                    {/* Eyebrow */}
                                    <div className="
                                        inline-flex items-center gap-3
                                        rounded-full
                                        border border-blue-400/20
                                        bg-blue-500/[0.07]
                                        px-4 py-2
                                        mb-7
                                    ">
                                        <span className="
                                            flex h-6 w-6 items-center justify-center
                                            rounded-full
                                            bg-blue-500/15
                                            text-blue-400
                                        ">
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.8"
                                                    d="M12 3l1.8 5.5H19l-4.2 3.3 1.6 5.4L12 14l-4.4 3.2 1.6-5.4L5 8.5h5.2L12 3z"
                                                />
                                            </svg>
                                        </span>

                                        <span className="
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-blue-300
                                        ">
                                            Next Generation Education Management
                                        </span>
                                    </div>

                                    {/* Main heading */}
                                    <h1 className="
                                        text-5xl
                                        sm:text-6xl
                                        lg:text-7xl
                                        font-bold
                                        tracking-[-0.04em]
                                        leading-[0.98]
                                        text-white
                                    ">
                                        Manage your school.
                                        <span className="
                                            block
                                            mt-3
                                            bg-gradient-to-r
                                            from-blue-300
                                            via-blue-400
                                            to-indigo-400
                                            bg-clip-text
                                            text-transparent
                                        ">
                                            Elevate education.
                                        </span>
                                    </h1>

                                    {/* Accent line */}
                                    <div className="flex items-center gap-3 mt-7 mb-6">
                                        <div className="h-px w-12 bg-amber-400" />
                                        <div className="h-1 w-1 rounded-full bg-amber-400" />
                                        <span className="
                                            text-[10px]
                                            uppercase
                                            tracking-[0.3em]
                                            text-amber-400/80
                                            font-semibold
                                        ">
                                            Academic Excellence
                                        </span>
                                    </div>

                                    <p className="
                                        max-w-2xl
                                        text-base
                                        sm:text-lg
                                        leading-8
                                        text-slate-400
                                    ">
                                        A unified platform designed to simplify
                                        academic administration, empower educators,
                                        and create a smarter experience for students
                                        and school communities.
                                    </p>

                                    {/* CTA */}
                                    <div className="
                                        flex flex-col
                                        sm:flex-row
                                        gap-3
                                        mt-9
                                    ">

                                        {auth?.user ? (
                                            <Link
                                                href="/dashboard"
                                                className="
                                                    group
                                                    inline-flex items-center justify-center gap-3
                                                    rounded-xl
                                                    bg-blue-600
                                                    px-7 py-4
                                                    text-sm font-semibold
                                                    text-white
                                                    shadow-xl shadow-blue-950/40
                                                    transition-all duration-300
                                                    hover:bg-blue-500
                                                    hover:-translate-y-1
                                                "
                                            >
                                                Enter Dashboard

                                                <span className="
                                                    flex h-6 w-6
                                                    items-center justify-center
                                                    rounded-full
                                                    bg-white/10
                                                    transition-transform
                                                    group-hover:translate-x-1
                                                ">
                                                    <svg
                                                        className="h-3.5 w-3.5"
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
                                                </span>
                                            </Link>
                                        ) : (
                                            <>
                                                {canLogin && (
                                                    <Link
                                                        href="/login"
                                                        className="
                                                            group
                                                            inline-flex items-center justify-center gap-3
                                                            rounded-xl
                                                            bg-blue-600
                                                            px-7 py-4
                                                            text-sm font-semibold
                                                            text-white
                                                            shadow-xl shadow-blue-950/40
                                                            transition-all duration-300
                                                            hover:bg-blue-500
                                                            hover:-translate-y-1
                                                        "
                                                    >
                                                        Sign In

                                                        <span className="
                                                            flex h-6 w-6
                                                            items-center justify-center
                                                            rounded-full
                                                            bg-white/10
                                                            transition-transform
                                                            group-hover:translate-x-1
                                                        ">
                                                            <svg
                                                                className="h-3.5 w-3.5"
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
                                                            </span>
                                                    </Link>
                                                )}

                                            </>
                                        )}
                                    </div>

                                    {/* Trust indicators */}
                                    <div className="
                                        flex flex-wrap
                                        items-center
                                        gap-x-6 gap-y-3
                                        mt-8
                                        text-xs
                                        text-slate-500
                                    ">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 text-emerald-400"
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
                                            Secure platform
                                        </div>

                                        <div className="h-1 w-1 rounded-full bg-slate-700" />

                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.8"
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2V7a8 8 0 10-16 0v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Role-based access
                                        </div>

                                        <div className="h-1 w-1 rounded-full bg-slate-700" />

                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 text-amber-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.8"
                                                    d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Always available
                                        </div>
                                    </div>
                                </div>

                                {/* =================================================
                                    RIGHT — PREMIUM SYSTEM PREVIEW
                                ================================================== */}

                                <div className="relative">

                                    {/* Outer glow */}
                                    <div className="
                                        absolute
                                        -inset-6
                                        rounded-[2rem]
                                        bg-blue-500/10
                                        blur-3xl
                                    " />

                                    <div className="
                                        relative
                                        rounded-[1.75rem]
                                        border border-white/10
                                        bg-[#0c1829]/90
                                        shadow-2xl
                                        shadow-black/50
                                        backdrop-blur-xl
                                        overflow-hidden
                                    ">

                                        {/* Browser top */}
                                        <div className="
                                            flex items-center justify-between
                                            px-5 py-4
                                            border-b border-white/[0.07]
                                        ">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                                            </div>

                                            <div className="
                                                rounded-md
                                                border border-white/[0.06]
                                                bg-white/[0.03]
                                                px-8 py-1.5
                                                text-[9px]
                                                text-slate-600
                                            ">
                                                academy.school/dashboard
                                            </div>

                                            <div className="h-5 w-5" />
                                        </div>

                                        {/* Dashboard preview */}
                                        <div className="p-5 sm:p-6">

                                            {/* Preview header */}
                                            <div className="flex items-center justify-between mb-6">

                                                <div>
                                                    <div className="
                                                        text-[9px]
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-blue-400
                                                        font-semibold
                                                    ">
                                                        Administration
                                                    </div>

                                                    <div className="
                                                        mt-1
                                                        text-xl
                                                        font-bold
                                                        text-white
                                                    ">
                                                        School Overview
                                                    </div>
                                                </div>

                                                <div className="
                                                    h-9 w-9
                                                    rounded-lg
                                                    border border-white/10
                                                    bg-white/[0.04]
                                                    flex items-center justify-center
                                                ">
                                                    <svg
                                                        className="h-4 w-4 text-slate-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.7"
                                                            d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-3 mb-4">

                                                <div className="
                                                    rounded-xl
                                                    border border-blue-400/10
                                                    bg-blue-500/[0.06]
                                                    p-4
                                                ">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] text-slate-500">
                                                            Students
                                                        </span>

                                                        <svg
                                                            className="h-3.5 w-3.5 text-blue-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.8"
                                                                d="M17 20h5v-2a4 4 0 00-5.8-3.6M9 20H4v-2a4 4 0 015.8-3.6M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="mt-2 text-lg font-bold">
                                                        1,284
                                                    </div>

                                                    <div className="mt-1 text-[8px] text-emerald-400">
                                                        +8.4% this month
                                                    </div>
                                                </div>

                                                <div className="
                                                    rounded-xl
                                                    border border-white/[0.07]
                                                    bg-white/[0.025]
                                                    p-4
                                                ">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] text-slate-500">
                                                            Teachers
                                                        </span>

                                                        <svg
                                                            className="h-3.5 w-3.5 text-indigo-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.8"
                                                                d="M12 14l9-5-9-5-9 5 9 5z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="mt-2 text-lg font-bold">
                                                        86
                                                    </div>

                                                    <div className="mt-1 text-[8px] text-slate-500">
                                                        Faculty members
                                                    </div>
                                                </div>

                                                <div className="
                                                    rounded-xl
                                                    border border-amber-400/10
                                                    bg-amber-400/[0.04]
                                                    p-4
                                                ">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] text-slate-500">
                                                            Attendance
                                                        </span>

                                                        <svg
                                                            className="h-3.5 w-3.5 text-amber-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.8"
                                                                d="M9 12l2 2 4-4m5.6-4.6a2 2 0 00-2.8 0L12 7.2 6.2 5.4a2 2 0 00-2.8 2.8L5.2 12l-1.8 5.8a2 2 0 002.8 2.8L12 18.8l5.8 1.8a2 2 0 002.8-2.8L18.8 12l1.8-5.8z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="mt-2 text-lg font-bold">
                                                        96.8%
                                                    </div>

                                                    <div className="mt-1 text-[8px] text-emerald-400">
                                                        Excellent
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Chart */}
                                            <div className="
                                                rounded-xl
                                                border border-white/[0.07]
                                                bg-white/[0.02]
                                                p-4
                                                mb-4
                                            ">

                                                <div className="flex justify-between items-center mb-4">
                                                    <div>
                                                        <div className="text-[9px] text-slate-500">
                                                            Academic Performance
                                                        </div>

                                                        <div className="text-sm font-semibold mt-1">
                                                            Overall Progress
                                                        </div>
                                                    </div>

                                                    <div className="
                                                        text-[8px]
                                                        text-emerald-400
                                                        rounded-md
                                                        bg-emerald-400/10
                                                        px-2 py-1
                                                    ">
                                                        +12.5%
                                                    </div>
                                                </div>

                                                {/* Fake chart */}
                                                <div className="h-28 relative">

                                                    <div className="
                                                        absolute inset-x-0 top-0
                                                        border-t border-white/[0.05]
                                                    " />

                                                    <div className="
                                                        absolute inset-x-0 top-1/2
                                                        border-t border-white/[0.05]
                                                    " />

                                                    <div className="
                                                        absolute inset-x-0 bottom-0
                                                        border-t border-white/[0.05]
                                                    " />

                                                    <svg
                                                        className="absolute inset-0 h-full w-full"
                                                        viewBox="0 0 500 120"
                                                        preserveAspectRatio="none"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M0 91 C45 77, 62 84, 100 67 C135 51, 150 70, 190 58 C230 46, 245 53, 285 37 C325 21, 345 38, 380 28 C420 17, 450 30, 500 12"
                                                            stroke="currentColor"
                                                            className="text-blue-400"
                                                            strokeWidth="3"
                                                        />

                                                        <path
                                                            d="M0 91 C45 77, 62 84, 100 67 C135 51, 150 70, 190 58 C230 46, 245 53, 285 37 C325 21, 345 38, 380 28 C420 17, 450 30, 500 12 L500 120 L0 120 Z"
                                                            fill="url(#chartGradient)"
                                                            opacity="0.12"
                                                        />

                                                        <defs>
                                                            <linearGradient
                                                                id="chartGradient"
                                                                x1="0"
                                                                y1="0"
                                                                x2="0"
                                                                y2="1"
                                                            >
                                                                <stop
                                                                    offset="0%"
                                                                    stopColor="#60a5fa"
                                                                />
                                                                <stop
                                                                    offset="100%"
                                                                    stopColor="#60a5fa"
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>

                                                    <div className="
                                                        absolute
                                                        right-[1%]
                                                        top-[4%]
                                                        h-2.5 w-2.5
                                                        rounded-full
                                                        bg-blue-400
                                                        ring-4 ring-blue-400/10
                                                    " />

                                                </div>

                                                <div className="
                                                    grid grid-cols-6
                                                    mt-2
                                                    text-[7px]
                                                    text-slate-600
                                                ">
                                                    <span>Jan</span>
                                                    <span>Feb</span>
                                                    <span>Mar</span>
                                                    <span>Apr</span>
                                                    <span>May</span>
                                                    <span>Jun</span>
                                                </div>

                                            </div>

                                            {/* Bottom activity */}
                                            <div className="grid grid-cols-2 gap-3">

                                                <div className="
                                                    rounded-xl
                                                    border border-white/[0.07]
                                                    bg-white/[0.02]
                                                    p-4
                                                ">
                                                    <div className="text-[9px] text-slate-500">
                                                        Recent Activity
                                                    </div>

                                                    <div className="mt-3 space-y-3">

                                                        <div className="flex items-center gap-2">
                                                            <div className="h-6 w-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                                                                <svg
                                                                    className="h-3 w-3 text-blue-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="1.8"
                                                                        d="M12 4v16m8-8H4"
                                                                    />
                                                                </svg>
                                                            </div>

                                                            <div>
                                                                <div className="text-[8px] text-slate-300">
                                                                    New student enrolled
                                                                </div>
                                                                <div className="text-[7px] text-slate-600">
                                                                    12 minutes ago
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <div className="h-6 w-6 rounded-md bg-amber-400/10 flex items-center justify-center">
                                                                <svg
                                                                    className="h-3 w-3 text-amber-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="1.8"
                                                                        d="M9 12l2 2 4-4"
                                                                    />
                                                                </svg>
                                                            </div>

                                                            <div>
                                                                <div className="text-[8px] text-slate-300">
                                                                    Exam results published
                                                                </div>
                                                                <div className="text-[7px] text-slate-600">
                                                                    38 minutes ago
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="
                                                    rounded-xl
                                                    border border-white/[0.07]
                                                    bg-white/[0.02]
                                                    p-4
                                                ">
                                                    <div className="text-[9px] text-slate-500">
                                                        Quick Overview
                                                    </div>

                                                    <div className="mt-3 flex items-center gap-4">

                                                        <div className="
                                                            h-14 w-14
                                                            rounded-full
                                                            border-[5px]
                                                            border-blue-500/20
                                                            border-t-blue-400
                                                            border-r-blue-400
                                                            flex items-center justify-center
                                                        ">
                                                            <span className="text-[10px] font-bold">
                                                                94%
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <div className="text-[8px] text-slate-300">
                                                                Academic Health
                                                            </div>

                                                            <div className="mt-1 text-[7px] text-emerald-400">
                                                                Excellent standing
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    {/* Floating academic badge */}
                                    <div className="
                                        absolute
                                        -bottom-5
                                        -left-5
                                        hidden sm:flex
                                        items-center gap-3
                                        rounded-2xl
                                        border border-white/10
                                        bg-[#101d30]/95
                                        backdrop-blur-xl
                                        px-4 py-3
                                        shadow-2xl
                                    ">
                                        <div className="
                                            h-9 w-9
                                            rounded-xl
                                            bg-amber-400/10
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-amber-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.6"
                                                    d="M12 3l2.3 5.2L20 10l-5.7 1.8L12 17l-2.3-5.2L4 10l5.7-1.8L12 3z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Built for
                                            </div>
                                            <div className="text-xs font-semibold text-white">
                                                Academic Excellence
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =========================================================
                        STATS / FEATURES
                    ========================================================== */}

                    <section className="
                        relative
                        border-t border-white/[0.06]
                        bg-white/[0.015]
                    ">

                        <div className="
                            max-w-7xl
                            mx-auto
                            px-5 sm:px-8
                            py-8
                        ">

                            <div className="
                                grid
                                grid-cols-2
                                lg:grid-cols-4
                                divide-x
                                divide-white/[0.07]
                            ">

                                {/* Module */}
                                <div className="px-4 sm:px-8 first:pl-0">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-blue-500/10
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v3H4zM13 15h7v3h-7z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-xl font-bold">
                                                16+
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Modules
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                {/* Roles */}
                                <div className="px-4 sm:px-8">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-indigo-500/10
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-indigo-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-xl font-bold">
                                                50+
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Roles & Permissions
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                {/* Responsive */}
                                <div className="px-4 sm:px-8">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-emerald-500/10
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-xl font-bold">
                                                100%
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Responsive
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                {/* Availability */}
                                <div className="px-4 sm:px-8 pr-0">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            h-10 w-10
                                            rounded-xl
                                            bg-amber-400/10
                                            flex items-center justify-center
                                        ">
                                            <svg
                                                className="h-5 w-5 text-amber-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-xl font-bold">
                                                24/7
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Availability
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                </main>

                {/* =========================================================
                    FOOTER ACCENT
                ========================================================== */}

                <div className="
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-500/30
                    to-transparent
                " />

            </div>
        </>
    );
}