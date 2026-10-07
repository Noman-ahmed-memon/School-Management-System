import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import {
    PrinterIcon,
    CheckCircleIcon,
    BanknotesIcon,
    UserCircleIcon,
    CalendarIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function Show({ auth, payroll }) {
    const employeeName =
        payroll.teacher?.user?.name ||
        payroll.staff?.user?.name ||
        'Unknown';
    const employeeEmail =
        payroll.teacher?.user?.email ||
        payroll.staff?.user?.email ||
        '—';
    const employeeType = payroll.teacher_id ? 'Teacher' : 'Staff';
    const employeeCode =
        payroll.teacher?.employee_id ||
        payroll.staff?.employee_id ||
        '—';

    const handlePrint = () => {
        window.print();
    };

    const handleApprove = () => {
        if (confirm('Approve this payroll?')) {
            router.post(route('payrolls.approve', payroll.id));
        }
    };

    const handleMarkPaid = () => {
        if (
            confirm(
                'Mark this payroll as paid? A payslip will be generated.'
            )
        ) {
            router.post(route('payrolls.mark-paid', payroll.id));
        }
    };

    const getStatusVariant = (status) => {
        const map = {
            draft: 'default',
            approved: 'info',
            paid: 'success',
        };
        return map[status] || 'default';
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Payroll - ${employeeName}`} />

            <div className="space-y-6">
                <PageHeader
                    title={`Payslip — ${MONTHS[payroll.month - 1]} ${payroll.year}`}
                    subtitle={`Payslip for ${employeeName}`}
                    breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        {
                            label: 'Payroll',
                            href: route('payrolls.index'),
                        },
                        { label: employeeName },
                    ]}
                    action={
                        <div className="flex gap-2 print:hidden">
                            {payroll.status === 'draft' && (
                                <Button onClick={handleApprove}>
                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                    Approve
                                </Button>
                            )}
                            {payroll.status === 'approved' && (
                                <Button onClick={handleMarkPaid}>
                                    <BanknotesIcon className="h-4 w-4 mr-2" />
                                    Mark as Paid
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                onClick={handlePrint}
                            >
                                <PrinterIcon className="h-4 w-4 mr-2" />
                                Print
                            </Button>
                        </div>
                    }
                />

                {/* Payslip Document */}
                <Card className="print:shadow-none print:border-0 overflow-hidden">
                    {/* Header */}
                    <div className="border-b-2 border-indigo-600 pb-4 mb-6 px-6 pt-6 bg-gradient-to-r from-slate-50 to-white">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200">
                                    <DocumentTextIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-slate-900">
                                        Payslip
                                    </h1>
                                    <p className="text-xs text-slate-500">
                                        {MONTHS[payroll.month - 1]}{' '}
                                        {payroll.year}
                                    </p>
                                </div>
                            </div>

                            <Badge
                                variant={getStatusVariant(
                                    payroll.status
                                )}
                            >
                                {payroll.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Employee Info */}
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                    Employee
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                        <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {employeeName}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {employeeEmail}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            ID: {employeeCode} •{' '}
                                            <span className="capitalize">
                                                {employeeType}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                    Period
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                                        <span>
                                            {MONTHS[payroll.month - 1]}{' '}
                                            {payroll.year}
                                        </span>
                                    </div>
                                    {payroll.payment_date && (
                                        <p className="text-xs text-slate-500">
                                            Paid on:{' '}
                                            {payroll.payment_date.split(
                                                'T'
                                            )[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Earnings Breakdown */}
                        <div className="border-t border-slate-200 pt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                Earnings
                            </h3>
                            <table className="min-w-full divide-y divide-slate-100">
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="py-2 text-sm text-slate-700">
                                            Basic Salary
                                        </td>
                                        <td className="py-2 text-right text-sm font-medium text-slate-800 tabular-nums">
                                            Rs.{' '}
                                            {Number(
                                                payroll.basic_salary
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                    {payroll.allowances &&
                                        Object.entries(
                                            payroll.allowances
                                        ).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="py-2 text-sm text-slate-700 capitalize">
                                                    {key.replace(
                                                        /_/g,
                                                        ' '
                                                    )}
                                                </td>
                                                <td className="py-2 text-right text-sm font-medium text-emerald-600 tabular-nums">
                                                    + Rs.{' '}
                                                    {Number(
                                                        value
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    {payroll.bonuses &&
                                        Object.entries(
                                            payroll.bonuses
                                        ).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="py-2 text-sm text-slate-700 capitalize">
                                                    {key.replace(
                                                        /_/g,
                                                        ' '
                                                    )}{' '}
                                                    (Bonus)
                                                </td>
                                                <td className="py-2 text-right text-sm font-medium text-emerald-600 tabular-nums">
                                                    + Rs.{' '}
                                                    {Number(
                                                        value
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    <tr className="bg-emerald-50/60">
                                        <td className="py-2.5 text-sm font-semibold text-slate-800">
                                            Total Earnings
                                        </td>
                                        <td className="py-2.5 text-right text-sm font-bold text-emerald-700 tabular-nums">
                                            Rs.{' '}
                                            {Number(
                                                payroll.total_earnings
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Deductions */}
                        <div className="border-t border-slate-200 pt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                Deductions
                            </h3>
                            <table className="min-w-full divide-y divide-slate-100">
                                <tbody className="divide-y divide-slate-100">
                                    {payroll.deductions &&
                                    Object.entries(
                                        payroll.deductions
                                    ).length > 0 ? (
                                        Object.entries(
                                            payroll.deductions
                                        ).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="py-2 text-sm text-slate-700 capitalize">
                                                    {key.replace(
                                                        /_/g,
                                                        ' '
                                                    )}
                                                </td>
                                                <td className="py-2 text-right text-sm font-medium text-red-600 tabular-nums">
                                                    - Rs.{' '}
                                                    {Number(
                                                        value
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="py-2 text-sm text-slate-500"
                                                colSpan={2}
                                            >
                                                No deductions
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="bg-red-50/60">
                                        <td className="py-2.5 text-sm font-semibold text-slate-800">
                                            Total Deductions
                                        </td>
                                        <td className="py-2.5 text-right text-sm font-bold text-red-700 tabular-nums">
                                            Rs.{' '}
                                            {Number(
                                                payroll.total_deductions
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Net Salary */}
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-6 text-center">
                            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                                Net Salary
                            </div>
                            <div className="text-4xl font-bold text-indigo-800 mt-1 tabular-nums">
                                Rs.{' '}
                                {Number(
                                    payroll.net_salary
                                ).toLocaleString()}
                            </div>
                        </div>
                    </CardBody>

                    {/* Footer */}
                    <div className="border-t border-slate-200 mt-6 pt-6 px-6 pb-6">
                        <div className="grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
                            <div>
                                <div className="border-t border-slate-300 pt-2 mt-8">
                                    Employee Signature
                                </div>
                            </div>
                            <div>
                                <div className="border-t border-slate-300 pt-2 mt-8">
                                    Authorized Signature
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end print:hidden">
                    <Button
                        variant="outline"
                        href={route('payrolls.index')}
                    >
                        Back to Payroll
                    </Button>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 1cm; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}