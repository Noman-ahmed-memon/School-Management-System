import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    UsersIcon,
    AcademicCapIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    CalendarIcon,
    CreditCardIcon,
    BookOpenIcon,
    TruckIcon,
    CogIcon,
    BriefcaseIcon,
    CubeIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import FlashMessage from '@/Components/ui/FlashMessage';

// =========================================================
// NAVIGATION
// =========================================================
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },

    {
        name: 'School',
        icon: BuildingOfficeIcon,
        permission: 'schools.view',
        children: [
            { name: 'Organizations', href: '/school/organizations', permission: 'organizations.view' },
            { name: 'Schools', href: '/school/schools', permission: 'schools.view' },
            { name: 'Campuses', href: '/school/campuses', permission: 'campuses.view' },
            { name: 'Academic Sessions', href: '/school/academic-sessions', permission: 'academic_sessions.view' },
            { name: 'Departments', href: '/school/departments', permission: 'departments.view' },
            { name: 'Standards', href: '/school/standards', permission: 'standards.view' },
            { name: 'Sections', href: '/school/sections', permission: 'sections.view' },
            { name: 'Subjects', href: '/school/subjects', permission: 'subjects.view' },
            { name: 'Standard Subjects', href: '/school/standard-subjects', permission: 'subjects.view' },
        ],
    },
    {
        name: 'Students',
        icon: UsersIcon,
        permission: 'students.view',
        children: [
            { name: 'All Students', href: '/students', permission: 'students.view' },
            { name: 'Guardians', href: '/guardians', permission: 'guardians.view' },
            { name: 'Attendance', href: '/attendance', permission: 'attendance.view' },
            { name: 'Mark Attendance', href: '/attendance/mark', permission: 'attendance.mark' },
        ],
    },
    {
        name: 'Teachers & Staff',
        icon: UserGroupIcon,
        permission: 'teachers.view',
        children: [
            { name: 'Teachers', href: '/teachers', permission: 'teachers.view' },
            { name: 'Staff', href: '/staff', permission: 'staff.view' },
            { name: 'Teacher Attendance', href: '/teacher-attendance', permission: 'attendance.view' },
        ],
    },
    {
        name: 'Academic',
        icon: CalendarIcon,
        permission: 'exams.view',
        children: [
            { name: 'Time Slots', href: '/time-slots', permission: 'timetable.view' },
            { name: 'Timetable', href: '/timetable', permission: 'timetable.view' },
            { name: 'Exam Types', href: '/exam-types', permission: 'exams.view' },
            { name: 'Exams', href: '/exams', permission: 'exams.view' },
            { name: 'Grading Systems', href: '/grading-systems', permission: 'results.view' },
        ],
    },
    {
        name: 'Finance',
        icon: CreditCardIcon,
        permission: 'fees.view',
        children: [
            { name: 'Fee Types', href: '/fee-types', permission: 'fees.view' },
            { name: 'Fee Structures', href: '/fee-structures', permission: 'fees.view' },
            { name: 'Fee Invoices', href: '/fee-invoices', permission: 'fees.view' },
            { name: 'Fee Payments', href: '/fee-payments', permission: 'fees.view' },
            { name: 'Scholarships', href: '/scholarships', permission: 'fees.view' },
        ],
    },
    {
        name: 'Library',
        icon: BookOpenIcon,
        permission: 'library.view',
        children: [
            { name: 'Books', href: '/books', permission: 'library.view' },
            { name: 'Book Categories', href: '/book-categories', permission: 'library.view' },
            { name: 'Transactions', href: '/library-transactions', permission: 'library.view' },
        ],
    },
    {
        name: 'Transport',
        icon: TruckIcon,
        permission: 'transport.view',
        children: [
            { name: 'Vehicles', href: '/vehicles', permission: 'transport.view' },
            { name: 'Routes', href: '/routes', permission: 'transport.view' },
            { name: 'Student Transport', href: '/student-transport', permission: 'transport.view' },
        ],
    },
    {
        name: 'Inventory',
        icon: CubeIcon,
        permission: 'inventory.view',
        children: [
            { name: 'Items', href: '/inventory-items', permission: 'inventory.view' },
            { name: 'Assets', href: '/assets', permission: 'inventory.view' },
        ],
    },
    {
        name: 'HR',
        icon: BriefcaseIcon,
        permission: 'hr.view',
        children: [
            { name: 'Leave Types', href: '/leave-types', permission: 'hr.leave' },
            { name: 'Leave Requests', href: '/leave-requests', permission: 'hr.leave' },
            { name: 'Payroll', href: '/payrolls', permission: 'hr.payroll' },
        ],
    },
    {
        name: 'Admin',
        icon: CogIcon,
        permission: 'users.view',
        children: [
            { name: 'Users', href: '/admin/users', permission: 'users.view' },
            { name: 'Roles', href: '/admin/roles', permission: 'users.roles' },
        ],
    },
];

// =========================================================
// LAYOUT
// =========================================================
export default function AuthenticatedLayout({ children, user: propUser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expanded, setExpanded] = useState(() => {
        const initial = {};
        navigation.forEach((item) => {
            if (item.children) {
                initial[item.name] = item.children.some(
                    (c) =>
                        typeof window !== 'undefined' &&
                        window.location.pathname.startsWith(c.href)
                );
            }
        });
        return initial;
    });

    const { url, props } = usePage();
    const user = propUser || props.auth?.user;
    const permissions = props.auth?.permissions || [];

    const can = (permission) => {
        if (!permission) return true;
        return permissions.includes(permission);
    };

    const visibleNav = navigation
        .map((item) => {
            if (item.children) {
                const visibleChildren = item.children.filter((c) =>
                    can(c.permission)
                );
                return { ...item, children: visibleChildren };
            }
            return item;
        })
        .filter((item) => {
            if (item.children) return item.children.length > 0;
            return can(item.permission);
        });

    const toggleExpand = (name) => {
        setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const isChildActive = (item) => {
        if (!item.children) return false;
        return item.children.some((c) => url.startsWith(c.href));
    };

    // =========================================================
    // SIDEBAR CONTENT
    // =========================================================
    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-slate-200">
            {/* Brand */}
            <div className="flex h-16 items-center gap-3 px-5 border-b border-slate-200 shrink-0">
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-sm shadow-indigo-200 shrink-0">
                    <svg
                        className="h-5 w-5 text-white"
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
                    </svg>
                    <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                    <div className="text-sm font-bold tracking-wide text-slate-800 truncate">
                        ACADEMIA
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400 truncate">
                        School Management
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                {visibleNav.map((item) => {
                    const isActive = url === item.href;
                    const childActive = isChildActive(item);

                    if (!item.children) {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <item.icon
                                    className={`h-4.5 w-4.5 shrink-0 ${
                                        isActive
                                            ? 'text-indigo-600'
                                            : 'text-slate-400 group-hover:text-slate-600'
                                    }`}
                                />
                                <span className="truncate">
                                    {item.name}
                                </span>
                                {isActive && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                )}
                            </Link>
                        );
                    }

                    return (
                        <div key={item.name}>
                            <button
                                onClick={() =>
                                    toggleExpand(item.name)
                                }
                                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                    childActive
                                        ? 'text-indigo-700 bg-indigo-50/60'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <span className="flex items-center gap-3 min-w-0">
                                    <item.icon
                                        className={`h-4.5 w-4.5 shrink-0 ${
                                            childActive
                                                ? 'text-indigo-600'
                                                : 'text-slate-400'
                                        }`}
                                    />
                                    <span className="truncate">
                                        {item.name}
                                    </span>
                                </span>
                                <ChevronRightIcon
                                    className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                                        expanded[item.name]
                                            ? 'rotate-90 text-indigo-500'
                                            : 'text-slate-400'
                                    }`}
                                />
                            </button>
                            {expanded[item.name] && (
                                <div className="ml-3.5 mt-1 mb-1 space-y-0.5 border-l border-slate-200 pl-3">
                                    {item.children.map((child) => {
                                        const childIsActive =
                                            url.startsWith(
                                                child.href
                                            );
                                        return (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`block rounded-md px-3 py-1.5 text-[13px] transition-all duration-150 ${
                                                    childIsActive
                                                        ? 'text-indigo-700 font-medium bg-indigo-50'
                                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                                }`}
                                            >
                                                {child.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* User Footer */}
            <div className="border-t border-slate-200 p-3 shrink-0">
                <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                        <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                            {user?.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate capitalize">
                            {user?.role?.replace('_', ' ')}
                        </p>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <ArrowRightOnRectangleIcon className="h-4.5 w-4.5" />
                    </Link>
                </div>
            </div>
        </div>
    );

    // =========================================================
    // MAIN LAYOUT
    // =========================================================
    return (
        <div className="min-h-screen bg-slate-50">
            <FlashMessage />

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 flex w-64 flex-col shadow-2xl">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 z-10 p-1.5 rounded-md text-slate-400 hover:bg-slate-100"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-30">
                <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile Header */}
                <header className="sticky top-0 z-40 bg-white border-b border-slate-200 lg:hidden">
                    <div className="flex h-16 items-center px-4 gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                        >
                            <Bars3Icon className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                                <svg
                                    className="h-4 w-4 text-white"
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
                                </svg>
                            </div>
                            <span className="text-sm font-bold tracking-wide text-slate-800">
                                ACADEMIA
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}