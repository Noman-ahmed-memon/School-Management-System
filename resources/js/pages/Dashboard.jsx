import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card, { CardHeader, CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    BuildingOfficeIcon,
    BuildingOffice2Icon,
    BuildingStorefrontIcon,
    UsersIcon,
    UserGroupIcon,
    UserCircleIcon,
    AcademicCapIcon,
    BanknotesIcon,
    BookOpenIcon,
    TruckIcon,
    CalendarIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
    MapIcon,
    ChartBarIcon,
    ArrowUpRightIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    ClockIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
    building: BuildingOfficeIcon,
    school: BuildingOffice2Icon,
    campus: BuildingStorefrontIcon,
    users: UsersIcon,
    students: UsersIcon,
    teachers: UserGroupIcon,
    staff: UserCircleIcon,
    guardians: UserGroupIcon,
    class: AcademicCapIcon,
    book: BookOpenIcon,
    truck: TruckIcon,
    calendar: CalendarIcon,
    check: CheckCircleIcon,
    alert: ExclamationTriangleIcon,
    money: BanknotesIcon,
    document: DocumentTextIcon,
    map: MapIcon,
    chart: ChartBarIcon,
};

function StatCard({ label, value, icon, isCurrency }) {
    const Icon = iconMap[icon] || ChartBarIcon;

    const displayValue = isCurrency
        ? `Rs. ${Number(value || 0).toLocaleString()}`
        : Number(value || 0).toLocaleString();

    return (
        <Card>
            <div className="group relative overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5">
                {/* Decorative accent */}
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-indigo-50 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 shadow-sm transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-100">
                        <Icon className="h-6 w-6 text-indigo-700" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="mb-1 truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {label}
                        </div>

                        <div className="truncate text-2xl font-bold tracking-tight text-slate-900">
                            {displayValue}
                        </div>
                    </div>
                </div>

                <div className="relative mt-4 h-px bg-slate-100">
                    <div className="h-px w-10 bg-indigo-600 transition-all duration-300 group-hover:w-16" />
                </div>
            </div>
        </Card>
    );
}

function StatCards({ cards }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((c, i) => (
                <StatCard key={i} {...c} />
            ))}
        </div>
    );
}

function SectionHeading({ eyebrow, title, icon: Icon }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            {Icon && (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                    <Icon className="h-5 w-5" />
                </div>
            )}

            <div>
                {eyebrow && (
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                        {eyebrow}
                    </div>
                )}

                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    {title}
                </h2>
            </div>
        </div>
    );
}

function FinanceCard({ title, value, positive }) {
    return (
        <Card>
            <div className="relative overflow-hidden p-6">
                <div
                    className={`absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full ${
                        positive ? 'bg-emerald-50' : 'bg-rose-50'
                    }`}
                />

                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                            {title}
                        </div>

                        <div
                            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
                                positive ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                        >
                            Rs. {Number(value || 0).toLocaleString()}
                        </div>
                    </div>

                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            positive
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-rose-50 text-rose-600'
                        }`}
                    >
                        {positive ? (
                            <CheckCircleIcon className="h-6 w-6" />
                        ) : (
                            <ExclamationTriangleIcon className="h-6 w-6" />
                        )}
                    </div>
                </div>

                <div
                    className={`mt-5 h-1 w-16 rounded-full ${
                        positive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                />
            </div>
        </Card>
    );
}

function ListRow({
    href,
    children,
    right,
    className = '',
}) {
    const content = (
        <div
            className={`group flex items-center justify-between gap-4 px-5 py-4 transition-all duration-200 hover:bg-slate-50 sm:px-6 ${className}`}
        >
            <div className="min-w-0 flex-1">{children}</div>

            {right && (
                <div className="shrink-0">
                    {right}
                </div>
            )}
        </div>
    );

    return href ? (
        <Link href={href} className="block">
            {content}
        </Link>
    ) : (
        content
    );
}

function ListCard({ title, icon: Icon, children }) {
    return (
        <Card className="overflow-hidden">
            <CardHeader
                title={
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                                <Icon className="h-5 w-5" />
                            </div>
                        )}

                        <span>{title}</span>
                    </div>
                }
            />

            <CardBody className="p-0">
                <div className="divide-y divide-slate-100">
                    {children}
                </div>
            </CardBody>
        </Card>
    );
}

export default function Dashboard({ user, stats, role }) {
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />

            <div className="space-y-7 pb-8">

                {/* =========================================================
                    WELCOME HEADER
                ========================================================= */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 px-6 py-7 shadow-sm sm:px-8 sm:py-8">
                    {/* Decorative elements */}
                    <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-20 -translate-y-20 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute right-16 top-12 h-32 w-32 rounded-full border border-white/5" />
                    <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-indigo-300" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">
                                    School Management System
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Welcome back, {user?.name}!
                            </h1>

                            <p className="mt-2 text-sm text-indigo-100/80">
                                <span className="font-semibold capitalize text-white/90">
                                    {user?.role_name || user?.role}
                                </span>

                                {user?.school_name && (
                                    <>
                                        <span className="mx-2 text-indigo-300">•</span>
                                        {user.school_name}
                                    </>
                                )}

                                {user?.campus_name && (
                                    <>
                                        <span className="mx-2 text-indigo-300">•</span>
                                        {user.campus_name}
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="hidden shrink-0 sm:block">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
                                <AcademicCapIcon className="h-7 w-7 text-indigo-100" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    PRIMARY STATISTICS
                ========================================================= */}
                {stats?.cards && <StatCards cards={stats.cards} />}

                {/* =========================================================
                    SECONDARY STATISTICS
                ========================================================= */}
                {stats?.secondary && (
                    <Card>
                        <CardHeader
                            title={
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                        <ChartBarIcon className="h-5 w-5" />
                                    </div>

                                    <span>More Statistics</span>
                                </div>
                            }
                        />

                        <CardBody>
                            <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
                                {stats.secondary.map((s, i) => (
                                    <div
                                        key={i}
                                        className="px-4 py-3 text-center first:pl-0 last:pr-0"
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            {s.label}
                                        </div>

                                        <div className="mt-1.5 text-xl font-bold text-slate-900">
                                            {Number(s.value || 0).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                )}

                {/* =========================================================
                    FINANCE
                ========================================================= */}
                {stats?.finance && (
                    <div>
                        <SectionHeading
                            eyebrow="Financial Overview"
                            title="Finance"
                            icon={BanknotesIcon}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FinanceCard
                                title="Collected This Month"
                                value={stats.finance.collected_this_month}
                                positive
                            />

                            <FinanceCard
                                title="Outstanding"
                                value={stats.finance.outstanding}
                                positive={false}
                            />
                        </div>
                    </div>
                )}

                {/* =========================================================
                    RECENT SCHOOLS
                ========================================================= */}
                {stats?.recent_schools && stats.recent_schools.length > 0 && (
                    <ListCard title="Recent Schools" icon={BuildingOffice2Icon}>
                        {stats.recent_schools.map((school) => (
                            <ListRow
                                key={school.id}
                                href={route('school.schools.show', school.id)}
                                right={
                                    <div className="flex items-center gap-2">
                                        <Badge variant="info">
                                            {school.code}
                                        </Badge>

                                        <ChevronRightIcon className="h-4 w-4 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </div>
                                }
                            >
                                <div className="font-semibold text-slate-900">
                                    {school.name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <BuildingOfficeIcon className="h-3.5 w-3.5" />
                                    <span>{school.organization?.name}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>{school.code}</span>
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    RECENT STUDENTS
                ========================================================= */}
                {stats?.recent_students && stats.recent_students.length > 0 && (
                    <ListCard title="Recent Students" icon={UsersIcon}>
                        {stats.recent_students.map((student) => (
                            <ListRow
                                key={student.id}
                                href={route('students.show', student.id)}
                                right={
                                    <div className="flex items-center gap-2">
                                        <Badge variant="success">
                                            Enrolled
                                        </Badge>

                                        <ChevronRightIcon className="h-4 w-4 text-slate-300" />
                                    </div>
                                }
                            >
                                <div className="font-semibold text-slate-900">
                                    {student.first_name} {student.last_name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <UserIcon className="h-3.5 w-3.5" />
                                    <span>{student.admission_number}</span>

                                    {student.campus?.name && (
                                        <>
                                            <span className="text-slate-300">•</span>
                                            <span>{student.campus.name}</span>
                                        </>
                                    )}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    ATTENDANCE
                ========================================================= */}
                {stats?.attendance && (
                    <Card>
                        <CardHeader
                            title={
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                                        <CalendarIcon className="h-5 w-5" />
                                    </div>

                                    <span>Today's Attendance</span>
                                </div>
                            }
                        />

                        <CardBody>
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-emerald-50 bg-white">
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-200" />

                                    <div className="text-center">
                                        <div className="text-2xl font-bold tracking-tight text-emerald-700">
                                            {stats.attendance.percentage}%
                                        </div>

                                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                            Attendance
                                        </div>
                                    </div>
                                </div>

                                <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-2">
                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                            <CheckCircleIcon className="h-4 w-4" />
                                            Present
                                        </div>

                                        <div className="mt-2 text-2xl font-bold text-slate-900">
                                            {stats.attendance.present}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <UsersIcon className="h-4 w-4" />
                                            Total Students
                                        </div>

                                        <div className="mt-2 text-2xl font-bold text-slate-900">
                                            {stats.attendance.total_students}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {/* =========================================================
                    RECENT TEACHERS
                ========================================================= */}
                {stats?.recent_teachers && stats.recent_teachers.length > 0 && (
                    <ListCard title="Recent Teachers" icon={UserGroupIcon}>
                        {stats.recent_teachers.map((teacher) => (
                            <ListRow
                                key={teacher.id}
                                href={route('teachers.show', teacher.id)}
                                right={
                                    <ChevronRightIcon className="h-4 w-4 text-slate-300" />
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {teacher.user?.name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <DocumentTextIcon className="h-3.5 w-3.5" />
                                    {teacher.employee_id}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    RECENT PAYMENTS
                ========================================================= */}
                {stats?.recent_payments && stats.recent_payments.length > 0 && (
                    <ListCard title="Recent Payments" icon={BanknotesIcon}>
                        {stats.recent_payments.map((payment) => (
                            <ListRow
                                key={payment.id}
                                right={
                                    <div className="text-right">
                                        <div className="font-bold text-emerald-700">
                                            Rs. {Number(payment.amount).toLocaleString()}
                                        </div>

                                        <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Paid
                                        </div>
                                    </div>
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {payment.student?.first_name} {payment.student?.last_name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <DocumentTextIcon className="h-3.5 w-3.5" />
                                    {payment.receipt_number}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    LIBRARY ACTIVITY
                ========================================================= */}
                {stats?.recent_transactions && stats.recent_transactions.length > 0 && (
                    <ListCard title="Recent Library Activity" icon={BookOpenIcon}>
                        {stats.recent_transactions.map((t) => (
                            <ListRow
                                key={t.id}
                                right={
                                    <Badge
                                        variant={
                                            t.status === 'returned'
                                                ? 'success'
                                                : 'warning'
                                        }
                                    >
                                        {t.status}
                                    </Badge>
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {t.book?.title}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <UserIcon className="h-3.5 w-3.5" />
                                    {t.student?.first_name} {t.student?.last_name}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    MY SUBJECTS
                ========================================================= */}
                {stats?.my_subjects && stats.my_subjects.length > 0 && (
                    <ListCard title="My Subjects" icon={AcademicCapIcon}>
                        {stats.my_subjects.map((s, i) => (
                            <ListRow
                                key={i}
                                right={
                                    <Badge variant="info">
                                        {s.standard}
                                    </Badge>
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {s.subject}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    CHILDREN
                ========================================================= */}
                {stats?.children && stats.children.length > 0 && (
                    <ListCard title="My Children" icon={UsersIcon}>
                        {stats.children.map((child) => (
                            <ListRow
                                key={child.id}
                                href={route('students.show', child.id)}
                                right={
                                    <ChevronRightIcon className="h-4 w-4 text-slate-300" />
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {child.name}
                                </div>

                                <div className="mt-1 text-xs text-slate-500">
                                    {child.admission_number}
                                    <span className="mx-1.5 text-slate-300">•</span>
                                    {child.standard}

                                    {child.section && (
                                        <>
                                            <span className="mx-1.5 text-slate-300">—</span>
                                            {child.section}
                                        </>
                                    )}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    RECENT RESULTS
                ========================================================= */}
                {stats?.recent_results && stats.recent_results.length > 0 && (
                    <ListCard title="Recent Results" icon={ChartBarIcon}>
                        {stats.recent_results.map((r) => (
                            <ListRow
                                key={r.id}
                                right={
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-slate-900">
                                                {Number(r.percentage).toFixed(1)}%
                                            </div>

                                            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                Score
                                            </div>
                                        </div>

                                        <Badge variant="info">
                                            {r.grade}
                                        </Badge>
                                    </div>
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {r.exam?.name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <DocumentTextIcon className="h-3.5 w-3.5" />
                                    Examination Result
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

                {/* =========================================================
                    RECENT ROUTES
                ========================================================= */}
                {stats?.recent_routes && stats.recent_routes.length > 0 && (
                    <ListCard title="Recent Routes" icon={TruckIcon}>
                        {stats.recent_routes.map((r) => (
                            <ListRow
                                key={r.id}
                                href={route('routes.show', r.id)}
                                right={
                                    <ChevronRightIcon className="h-4 w-4 text-slate-300" />
                                }
                            >
                                <div className="font-semibold text-sm text-slate-900">
                                    {r.name}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <MapIcon className="h-3.5 w-3.5" />
                                    {r.code}

                                    <span className="text-slate-300">•</span>

                                    <TruckIcon className="h-3.5 w-3.5" />
                                    Vehicle: {r.vehicle?.registration_number}
                                </div>
                            </ListRow>
                        ))}
                    </ListCard>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
