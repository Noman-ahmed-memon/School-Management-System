<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Campus;
use App\Models\FeeInvoice;
use App\Models\FeePayment;
use App\Models\Guardian;
use App\Models\LibraryTransaction;
use App\Models\Organization;
use App\Models\ResultSummary;
use App\Models\Route as TransportRoute;
use App\Models\School;
use App\Models\Staff;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAttendance;
use App\Models\Teacher;
use App\Models\User;
use App\Models\Vehicle;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $role = $user->role;

        // Base user data (passed as `user` prop, not `auth`)
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $role,
            'role_name' => $user->role_name,
            'school_name' => $user->school?->name,
            'campus_name' => $user->campus?->name,
        ];

        // Build role-specific stats
        $stats = $this->buildStats($user, $role);

        return Inertia::render('Dashboard', [
            'user' => $userData,
            'stats' => $stats,
            'role' => $role,
        ]);
    }

    private function buildStats($user, string $role): array
    {
        switch ($role) {
            case 'super_admin':
                return $this->superAdminStats();
            case 'principal':
                return $this->principalStats($user);
            case 'vice_principal':
                return $this->vicePrincipalStats($user);
            case 'hr_manager':
                return $this->hrManagerStats($user);
            case 'receptionist':
                return $this->receptionistStats($user);
            case 'accountant':
                return $this->accountantStats($user);
            case 'librarian':
                return $this->librarianStats($user);
            case 'transport_manager':
                return $this->transportManagerStats($user);
            case 'teacher':
                return $this->teacherStats($user);
            case 'student':
                return $this->studentStats($user);
            case 'guardian':
                return $this->guardianStats($user);
            default:
                return ['type' => 'default'];
        }
    }

    /* ==================== SUPER ADMIN ==================== */
    private function superAdminStats(): array
    {
        return [
            'type' => 'super_admin',
            'cards' => [
                ['label' => 'Organizations', 'value' => Organization::count(), 'icon' => 'building'],
                ['label' => 'Schools', 'value' => School::count(), 'icon' => 'school'],
                ['label' => 'Campuses', 'value' => Campus::count(), 'icon' => 'campus'],
                ['label' => 'Total Users', 'value' => User::count(), 'icon' => 'users'],
            ],
            'secondary' => [
                ['label' => 'Students', 'value' => Student::count()],
                ['label' => 'Teachers', 'value' => Teacher::count()],
                ['label' => 'Staff', 'value' => Staff::count()],
                ['label' => 'Guardians', 'value' => Guardian::count()],
            ],
            'finance' => [
                'collected_this_month' => FeePayment::whereMonth('payment_date', now()->month)
                    ->whereYear('payment_date', now()->year)
                    ->where('status', 'completed')
                    ->sum('amount'),
                'outstanding' => FeeInvoice::whereIn('status', ['issued', 'partial_paid', 'overdue'])
                    ->sum('outstanding_amount'),
            ],
            'recent_schools' => School::with('organization:id,name')
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'code', 'organization_id']),
        ];
    }

    /* ==================== PRINCIPAL ==================== */
    private function principalStats($user): array
    {
        $campusIds = $user->accessible_campus_ids;

        return [
            'type' => 'principal',
            'cards' => [
                ['label' => 'Campuses', 'value' => count($campusIds), 'icon' => 'campus'],
                ['label' => 'Students', 'value' => Student::whereIn('campus_id', $campusIds)->count(), 'icon' => 'students'],
                ['label' => 'Teachers', 'value' => Teacher::whereHas('user', fn($q) => $q->whereIn('campus_id', $campusIds))->count(), 'icon' => 'teachers'],
                ['label' => 'Staff', 'value' => Staff::whereHas('user', fn($q) => $q->whereIn('campus_id', $campusIds))->count(), 'icon' => 'staff'],
            ],
            'secondary' => [
                ['label' => 'Guardians', 'value' => Guardian::whereHas('students', fn($q) => $q->whereIn('campus_id', $campusIds))->count()],
                ['label' => 'Standards', 'value' => Standard::whereIn('campus_id', $campusIds)->count()],
                ['label' => 'Books', 'value' => Book::whereIn('campus_id', $campusIds)->count()],
                ['label' => 'Vehicles', 'value' => Vehicle::whereIn('campus_id', $campusIds)->count()],
            ],
            'finance' => [
                'collected_this_month' => FeePayment::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                    ->whereMonth('payment_date', now()->month)
                    ->where('status', 'completed')
                    ->sum('amount'),
                'outstanding' => FeeInvoice::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                    ->whereIn('status', ['issued', 'partial_paid', 'overdue'])
                    ->sum('outstanding_amount'),
            ],
            'recent_students' => Student::whereIn('campus_id', $campusIds)
                ->with('campus:id,name')
                ->latest()
                ->limit(5)
                ->get(['id', 'first_name', 'last_name', 'admission_number', 'campus_id', 'created_at']),
        ];
    }

    /* ==================== VICE PRINCIPAL ==================== */
    private function vicePrincipalStats($user): array
    {
        $campusId = $user->campus_id;

        $totalStudents = Student::where('campus_id', $campusId)->count();
        $presentToday = StudentAttendance::whereHas('student', fn($q) => $q->where('campus_id', $campusId))
            ->whereDate('date', today())
            ->whereIn('status', ['present', 'late', 'half_day'])
            ->count();

        return [
            'type' => 'vice_principal',
            'cards' => [
                ['label' => 'Students', 'value' => $totalStudents, 'icon' => 'students'],
                ['label' => 'Teachers', 'value' => Teacher::whereHas('user', fn($q) => $q->where('campus_id', $campusId))->count(), 'icon' => 'teachers'],
                ['label' => 'Present Today', 'value' => $presentToday, 'icon' => 'check'],
                ['label' => 'Staff', 'value' => Staff::whereHas('user', fn($q) => $q->where('campus_id', $campusId))->count(), 'icon' => 'staff'],
            ],
            'attendance' => [
                'total_students' => $totalStudents,
                'present' => $presentToday,
                'percentage' => $totalStudents > 0 ? round(($presentToday / $totalStudents) * 100, 1) : 0,
            ],
            'recent_students' => Student::where('campus_id', $campusId)
                ->latest()
                ->limit(5)
                ->get(['id', 'first_name', 'last_name', 'admission_number', 'created_at']),
        ];
    }

    /* ==================== HR MANAGER ==================== */
    private function hrManagerStats($user): array
    {
        $campusId = $user->campus_id;

        return [
            'type' => 'hr_manager',
            'cards' => [
                ['label' => 'Teachers', 'value' => Teacher::whereHas('user', fn($q) => $q->where('campus_id', $campusId))->count(), 'icon' => 'teachers'],
                ['label' => 'Staff Members', 'value' => Staff::whereHas('user', fn($q) => $q->where('campus_id', $campusId))->count(), 'icon' => 'staff'],
                ['label' => 'Pending Leaves', 'value' => \App\Models\LeaveRequest::where('status', 'pending')
                    ->where(function ($q) use ($campusId) {
                        $q->whereHas('teacher.user', fn($qq) => $qq->where('campus_id', $campusId))
                          ->orWhereHas('staff.user', fn($qq) => $qq->where('campus_id', $campusId));
                    })->count(), 'icon' => 'calendar'],
                ['label' => 'Payrolls This Month', 'value' => \App\Models\Payroll::where('month', now()->month)
                    ->where('year', now()->year)
                    ->count(), 'icon' => 'money'],
            ],
            'recent_teachers' => Teacher::whereHas('user', fn($q) => $q->where('campus_id', $campusId))
                ->with('user:id,name')
                ->latest()
                ->limit(5)
                ->get(['id', 'user_id', 'employee_id', 'created_at']),
        ];
    }

    /* ==================== RECEPTIONIST ==================== */
    private function receptionistStats($user): array
    {
        $campusId = $user->campus_id;

        return [
            'type' => 'receptionist',
            'cards' => [
                ['label' => 'Total Students', 'value' => Student::where('campus_id', $campusId)->count(), 'icon' => 'students'],
                ['label' => 'Guardians', 'value' => Guardian::whereHas('students', fn($q) => $q->where('campus_id', $campusId))->count(), 'icon' => 'guardians'],
                ['label' => 'Enrolled Today', 'value' => Student::where('campus_id', $campusId)
                    ->whereDate('created_at', today())->count(), 'icon' => 'check'],
                ['label' => 'This Month', 'value' => Student::where('campus_id', $campusId)
                    ->whereMonth('created_at', now()->month)->count(), 'icon' => 'calendar'],
            ],
            'recent_students' => Student::where('campus_id', $campusId)
                ->latest()
                ->limit(5)
                ->get(['id', 'first_name', 'last_name', 'admission_number', 'created_at']),
        ];
    }

    /* ==================== ACCOUNTANT ==================== */
    private function accountantStats($user): array
    {
        $campusIds = $user->accessible_campus_ids;

        return [
            'type' => 'accountant',
            'cards' => [
                ['label' => 'Collected Today', 'value' => FeePayment::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                    ->whereDate('payment_date', today())
                    ->where('status', 'completed')
                    ->sum('amount'), 'icon' => 'money', 'is_currency' => true],
                ['label' => 'Collected This Month', 'value' => FeePayment::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                    ->whereMonth('payment_date', now()->month)
                    ->where('status', 'completed')
                    ->sum('amount'), 'icon' => 'money', 'is_currency' => true],
                ['label' => 'Outstanding', 'value' => FeeInvoice::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                    ->whereIn('status', ['issued', 'partial_paid', 'overdue'])
                    ->sum('outstanding_amount'), 'icon' => 'alert', 'is_currency' => true],
                ['label' => 'Invoices Issued', 'value' => FeeInvoice::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))->count(), 'icon' => 'document'],
            ],
            'recent_payments' => FeePayment::whereHas('student', fn($q) => $q->whereIn('campus_id', $campusIds))
                ->with('student:id,first_name,last_name,admission_number')
                ->latest()
                ->limit(5)
                ->get(['id', 'student_id', 'amount', 'payment_date', 'receipt_number']),
        ];
    }

    /* ==================== LIBRARIAN ==================== */
    private function librarianStats($user): array
    {
        $campusId = $user->campus_id;

        $totalBooks = Book::where('campus_id', $campusId)->sum('total_copies');
        $available = Book::where('campus_id', $campusId)->sum('available_copies');
        $issued = $totalBooks - $available;

        return [
            'type' => 'librarian',
            'cards' => [
                ['label' => 'Total Books', 'value' => $totalBooks, 'icon' => 'book'],
                ['label' => 'Available', 'value' => $available, 'icon' => 'check'],
                ['label' => 'Issued', 'value' => $issued, 'icon' => 'book'],
                ['label' => 'Overdue', 'value' => LibraryTransaction::whereHas('book', fn($q) => $q->where('campus_id', $campusId))
                    ->where('status', 'issued')
                    ->where('due_date', '<', today())
                    ->count(), 'icon' => 'alert'],
            ],
            'recent_transactions' => LibraryTransaction::whereHas('book', fn($q) => $q->where('campus_id', $campusId))
                ->with([
                    'book:id,title',
                    'student:id,first_name,last_name,admission_number',
                ])
                ->latest()
                ->limit(5)
                ->get(['id', 'book_id', 'student_id', 'issue_date', 'due_date', 'status']),
        ];
    }

    /* ==================== TRANSPORT MANAGER ==================== */
    private function transportManagerStats($user): array
    {
        $campusId = $user->campus_id;

        return [
            'type' => 'transport_manager',
            'cards' => [
                ['label' => 'Vehicles', 'value' => Vehicle::where('campus_id', $campusId)->count(), 'icon' => 'truck'],
                ['label' => 'Active Routes', 'value' => TransportRoute::where('campus_id', $campusId)->where('status', 'active')->count(), 'icon' => 'map'],
                ['label' => 'Students Using Transport', 'value' => \App\Models\StudentTransport::whereHas('student', fn($q) => $q->where('campus_id', $campusId))->where('status', 'active')->count(), 'icon' => 'students'],
                ['label' => 'Routes', 'value' => TransportRoute::where('campus_id', $campusId)->count(), 'icon' => 'map'],
            ],
            'recent_routes' => TransportRoute::where('campus_id', $campusId)
                ->with('vehicle:id,registration_number,model')
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'code', 'vehicle_id']),
        ];
    }

    /* ==================== TEACHER ==================== */
    private function teacherStats($user): array
    {
        $teacher = $user->teacher;

        if (!$teacher) {
            return ['type' => 'teacher', 'cards' => []];
        }

        $subjects = \App\Models\StandardSubject::where('teacher_id', $teacher->id)
            ->with(['standard:id,name', 'subject:id,name'])
            ->get();

        return [
            'type' => 'teacher',
            'cards' => [
                ['label' => 'My Classes', 'value' => $subjects->pluck('standard_id')->unique()->count(), 'icon' => 'class'],
                ['label' => 'My Subjects', 'value' => $subjects->pluck('subject_id')->unique()->count(), 'icon' => 'book'],
                ['label' => 'Students', 'value' => Student::where('campus_id', $user->campus_id)->count(), 'icon' => 'students'],
                ['label' => 'Today Attendance', 'value' => StudentAttendance::whereDate('date', today())->count(), 'icon' => 'check'],
            ],
            'my_subjects' => $subjects->map(fn($s) => [
                'standard' => $s->standard?->name,
                'subject' => $s->subject?->name,
            ])->values(),
        ];
    }

    /* ==================== STUDENT ==================== */
    private function studentStats($user): array
    {
        $student = $user->student;

        if (!$student) {
            return ['type' => 'student', 'cards' => []];
        }

        $totalAtt = StudentAttendance::where('student_id', $student->id)->count();
        $presentAtt = StudentAttendance::where('student_id', $student->id)
            ->whereIn('status', ['present', 'late', 'half_day'])
            ->count();
        $attendancePercentage = $totalAtt > 0 ? round(($presentAtt / $totalAtt) * 100, 1) : 0;

        $feeDue = FeeInvoice::where('student_id', $student->id)
            ->whereIn('status', ['issued', 'partial_paid', 'overdue'])
            ->sum('outstanding_amount');

        $booksIssued = LibraryTransaction::where('student_id', $student->id)
            ->where('status', 'issued')
            ->count();

        return [
            'type' => 'student',
            'cards' => [
                ['label' => 'Attendance', 'value' => $attendancePercentage . '%', 'icon' => 'check'],
                ['label' => 'Fee Due', 'value' => $feeDue, 'icon' => 'money', 'is_currency' => true],
                ['label' => 'Books Issued', 'value' => $booksIssued, 'icon' => 'book'],
                ['label' => 'Enrolled Since', 'value' => $student->admission_date?->format('M Y'), 'icon' => 'calendar'],
            ],
            'recent_results' => ResultSummary::where('student_id', $student->id)
                ->with('exam:id,name')
                ->latest()
                ->limit(3)
                ->get(['id', 'exam_id', 'percentage', 'grade', 'created_at']),
        ];
    }

    /* ==================== GUARDIAN ==================== */
    private function guardianStats($user): array
    {
        $guardian = $user->guardian;

        if (!$guardian) {
            return ['type' => 'guardian', 'cards' => []];
        }

        $children = $guardian->students()->with([
            'currentAcademicRecord.standard:id,name',
            'currentAcademicRecord.section:id,name',
        ])->get();

        return [
            'type' => 'guardian',
            'cards' => [
                ['label' => 'My Children', 'value' => $children->count(), 'icon' => 'students'],
                ['label' => 'Attendance', 'value' => $this->childrenAttendanceAvg($children), 'icon' => 'check'],
                ['label' => 'Fee Due', 'value' => $this->childrenFeeDue($children), 'icon' => 'money', 'is_currency' => true],
                ['label' => 'Results Published', 'value' => ResultSummary::whereIn('student_id', $children->pluck('id'))->count(), 'icon' => 'chart'],
            ],
            'children' => $children->map(fn($child) => [
                'id' => $child->id,
                'name' => $child->first_name . ' ' . $child->last_name,
                'admission_number' => $child->admission_number,
                'standard' => $child->currentAcademicRecord?->standard?->name,
                'section' => $child->currentAcademicRecord?->section?->name,
            ])->values(),
        ];
    }

    private function childrenAttendanceAvg($children): string
    {
        if ($children->isEmpty()) return '0%';

        $avg = 0;
        foreach ($children as $child) {
            $total = StudentAttendance::where('student_id', $child->id)->count();
            $present = StudentAttendance::where('student_id', $child->id)
                ->whereIn('status', ['present', 'late', 'half_day'])
                ->count();
            $avg += $total > 0 ? ($present / $total) * 100 : 0;
        }

        return round($avg / $children->count(), 1) . '%';
    }

    private function childrenFeeDue($children): float
    {
        if ($children->isEmpty()) return 0;

        return FeeInvoice::whereIn('student_id', $children->pluck('id'))
            ->whereIn('status', ['issued', 'partial_paid', 'overdue'])
            ->sum('outstanding_amount');
    }
}