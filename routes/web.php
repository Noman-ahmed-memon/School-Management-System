<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controllers
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\School\{
    OrganizationController, SchoolController, CampusController,
    AcademicSessionController, DepartmentController, StandardController,
    SectionController, SubjectController, StandardSubjectController
};
use App\Http\Controllers\Student\{
    StudentController, GuardianController, StudentGuardianController,
    StudentAcademicRecordController, StudentDocumentController,
    StudentAttendanceController
};
use App\Http\Controllers\Teacher\{TeacherController, TeacherAttendanceController};
use App\Http\Controllers\Academic\{TimeSlotController, TimetableController};
use App\Http\Controllers\Examination\{ExamTypeController, ExamController};
use App\Http\Controllers\Result\{GradingSystemController, ResultController};
use App\Http\Controllers\Finance\{
    FeeTypeController, FeeStructureController, FeeInvoiceController,
    FeePaymentController, ScholarshipController
};
use App\Http\Controllers\Library\{
    BookCategoryController, BookController, LibraryTransactionController
};
use App\Http\Controllers\Transport\{
    VehicleController, RouteController, RouteStopController, StudentTransportController
};
use App\Http\Controllers\Health\{
    HealthRecordController, HealthCheckupController, VaccinationController
};
use App\Http\Controllers\Inventory\{
    InventoryItemController, InventoryTransactionController, AssetController
};
use App\Http\Controllers\HR\{
    StaffController, LeaveTypeController, LeaveRequestController, PayrollController
};
use App\Http\Controllers\Admin\{UserController, RoleController, PermissionController};

// Welcome
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'auth' => ['user' => auth()->user()],
    ]);
});

// Authenticated
Route::middleware(['auth', 'verified', 'campus.access'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ==================== SCHOOL MODULE ====================
    Route::prefix('school')->name('school.')->group(function () {

        // Organizations
        Route::resource('organizations', OrganizationController::class);
        Route::patch('organizations/{organization}/toggle-status', [OrganizationController::class, 'toggleStatus'])
            ->name('organizations.toggle-status');

        // Schools
        Route::resource('schools', SchoolController::class);

        // Campuses
        Route::resource('campuses', CampusController::class);

        // Academic Sessions
        Route::resource('academic-sessions', AcademicSessionController::class);

        // Departments
        Route::resource('departments', DepartmentController::class);

        // Standards
        Route::resource('standards', StandardController::class);
        Route::patch('standards/{standard}/toggle-status', [StandardController::class, 'toggleStatus'])
            ->name('standards.toggle-status');
        Route::post('standards/bulk-destroy', [StandardController::class, 'bulkDestroy'])
            ->name('standards.bulk-destroy');

        // Sections
        Route::resource('sections', SectionController::class);

        // Subjects
        Route::resource('subjects', SubjectController::class);

        // Standard Subjects
        Route::resource('standard-subjects', StandardSubjectController::class)
            ->only(['index', 'create', 'store', 'destroy']);
    });

    // ==================== STUDENT MODULE ====================
    Route::prefix('students')->name('students.')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('index');
        Route::get('/create', [StudentController::class, 'create'])->name('create');
        Route::post('/', [StudentController::class, 'store'])->name('store');
        Route::get('/{student}', [StudentController::class, 'show'])->name('show');
        Route::get('/{student}/edit', [StudentController::class, 'edit'])->name('edit');
        Route::put('/{student}', [StudentController::class, 'update'])->name('update');
        Route::delete('/{student}', [StudentController::class, 'destroy'])->name('destroy');

        // Documents
        Route::post('/{student}/documents', [StudentDocumentController::class, 'store'])
            ->name('documents.store');
        Route::delete('/documents/{document}', [StudentDocumentController::class, 'destroy'])
            ->name('documents.destroy');

        // Academic Records
        Route::get('/{student}/academic-records', [StudentAcademicRecordController::class, 'index'])
            ->name('academic-records.index');
        Route::get('/{student}/academic-records/create', [StudentAcademicRecordController::class, 'create'])
            ->name('academic-records.create');
        Route::post('/{student}/academic-records', [StudentAcademicRecordController::class, 'store'])
            ->name('academic-records.store');
        Route::put('/academic-records/{record}', [StudentAcademicRecordController::class, 'update'])
            ->name('academic-records.update');
        Route::delete('/academic-records/{record}', [StudentAcademicRecordController::class, 'destroy'])
            ->name('academic-records.destroy');
    });

    // Guardians
    Route::resource('guardians', GuardianController::class);

    // Student-Guardian linking
    Route::post('student-guardians', [StudentGuardianController::class, 'store'])
        ->name('student-guardians.store');
    Route::delete('student-guardians/{studentGuardian}', [StudentGuardianController::class, 'destroy'])
        ->name('student-guardians.destroy');
    Route::patch('student-guardians/{studentGuardian}/set-primary', [StudentGuardianController::class, 'setPrimary'])
        ->name('student-guardians.set-primary');

    // Student Attendance
    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/', [StudentAttendanceController::class, 'index'])->name('index');
        Route::get('/mark', [StudentAttendanceController::class, 'mark'])->name('mark');
        Route::post('/', [StudentAttendanceController::class, 'store'])->name('store');
        Route::get('/report', [StudentAttendanceController::class, 'report'])->name('report');
        Route::delete('/{attendance}', [StudentAttendanceController::class, 'destroy'])->name('destroy');
    });

    // ==================== TEACHER MODULE ====================
    Route::resource('teachers', TeacherController::class);

    Route::prefix('teacher-attendance')->name('teacher-attendance.')->group(function () {
        Route::get('/', [TeacherAttendanceController::class, 'index'])->name('index');
        Route::get('/mark', [TeacherAttendanceController::class, 'mark'])->name('mark');
        Route::post('/', [TeacherAttendanceController::class, 'store'])->name('store');
    });

    // ==================== ACADEMIC MODULE ====================
    Route::resource('time-slots', TimeSlotController::class);

    Route::prefix('timetable')->name('timetable.')->group(function () {
        Route::get('/', [TimetableController::class, 'index'])->name('index');
        Route::post('/', [TimetableController::class, 'store'])->name('store');
        Route::delete('/{timetableEntry}', [TimetableController::class, 'destroy'])->name('destroy');
    });

    // ==================== EXAMINATION MODULE ====================
    Route::resource('exam-types', ExamTypeController::class);
    Route::resource('exams', ExamController::class);

    // ==================== RESULT MODULE ====================
    Route::resource('grading-systems', GradingSystemController::class)
        ->except(['create', 'show', 'edit']);

    Route::prefix('results')->name('results.')->group(function () {
        Route::get('/', [ResultController::class, 'index'])->name('index');
        Route::get('/exam/{exam}', [ResultController::class, 'show'])->name('show');
        Route::get('/exam/{exam}/marks-entry', [ResultController::class, 'marksEntry'])->name('marks-entry');
        Route::post('/exam/{exam}/save-marks', [ResultController::class, 'saveMarks'])->name('save-marks');
        Route::post('/exam/{exam}/publish', [ResultController::class, 'publish'])->name('publish');
        Route::get('/student/{student}/exam/{exam}/report-card', [ResultController::class, 'reportCard'])->name('report-card');
    });

    // ==================== FINANCE MODULE ====================
    Route::resource('fee-types', FeeTypeController::class);
    Route::resource('fee-structures', FeeStructureController::class)
        ->except(['create', 'show', 'edit']);
    Route::resource('fee-invoices', FeeInvoiceController::class)
        ->except(['edit', 'update']);
    Route::post('fee-invoices/bulk-generate', [FeeInvoiceController::class, 'bulkGenerate'])
        ->name('fee-invoices.bulk-generate');

    Route::resource('fee-payments', FeePaymentController::class)
        ->except(['edit', 'update']);
    Route::post('fee-payments/{feePayment}/refund', [FeePaymentController::class, 'refund'])
        ->name('fee-payments.refund');

    Route::resource('scholarships', ScholarshipController::class);

    // ==================== LIBRARY MODULE ====================
    Route::resource('book-categories', BookCategoryController::class);
    Route::resource('books', BookController::class);

    Route::prefix('library-transactions')->name('library-transactions.')->group(function () {
        Route::get('/', [LibraryTransactionController::class, 'index'])->name('index');
        Route::get('/create', [LibraryTransactionController::class, 'create'])->name('create');
        Route::post('/', [LibraryTransactionController::class, 'store'])->name('store');
        Route::post('/{libraryTransaction}/return', [LibraryTransactionController::class, 'returnBook'])
            ->name('return');
        Route::post('/{libraryTransaction}/renew', [LibraryTransactionController::class, 'renew'])
            ->name('renew');
        Route::delete('/{libraryTransaction}', [LibraryTransactionController::class, 'destroy'])
            ->name('destroy');
    });

    // ==================== TRANSPORT MODULE ====================
    Route::resource('vehicles', VehicleController::class);
    Route::resource('routes', RouteController::class);
    Route::resource('student-transport', StudentTransportController::class);

    // Route Stops (nested under routes)
    Route::prefix('route-stops')->name('route-stops.')->group(function () {
        Route::post('/reorder', [RouteStopController::class, 'reorder'])->name('reorder');   // ← MUST be before /{routeStop}
        Route::post('/', [RouteStopController::class, 'store'])->name('store');
        Route::put('/{routeStop}', [RouteStopController::class, 'update'])->name('update');
        Route::delete('/{routeStop}', [RouteStopController::class, 'destroy'])->name('destroy');
    });

    // API endpoint for stops (used by Student Transport create form)
    Route::get('api/routes/{route}/stops', function (\App\Models\Route $route) {
        return response()->json([
            'stops' => $route->routeStops()->orderBy('stop_order')->get(['id', 'stop_name', 'arrival_time', 'stop_order']),
        ]);
    })->middleware(['auth'])->name('api.routes.stops');

    // ==================== HEALTH MODULE ====================
    Route::resource('health-records', HealthRecordController::class);
    Route::resource('health-checkups', HealthCheckupController::class);
    Route::resource('vaccinations', VaccinationController::class);

    // ==================== INVENTORY MODULE ====================
    Route::resource('inventory-items', InventoryItemController::class);
    Route::post('inventory-items/{inventoryItem}/transaction', [InventoryItemController::class, 'storeTransaction'])
        ->name('inventory-items.transaction');
    Route::resource('inventory-transactions', InventoryTransactionController::class)
        ->only(['index', 'show']);
    Route::resource('assets', AssetController::class);

    // ==================== HR MODULE ====================
    Route::resource('staff', StaffController::class);
    Route::resource('leave-types', LeaveTypeController::class);

    Route::prefix('leave-requests')->name('leave-requests.')->group(function () {
        Route::get('/', [LeaveRequestController::class, 'index'])->name('index');
        Route::get('/create', [LeaveRequestController::class, 'create'])->name('create');
        Route::post('/', [LeaveRequestController::class, 'store'])->name('store');
        Route::post('/{leaveRequest}/approve', [LeaveRequestController::class, 'approve'])->name('approve');
        Route::post('/{leaveRequest}/reject', [LeaveRequestController::class, 'reject'])->name('reject');
        Route::delete('/{leaveRequest}', [LeaveRequestController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('payrolls')->name('payrolls.')->group(function () {
        Route::get('/', [PayrollController::class, 'index'])->name('index');
        Route::post('/generate', [PayrollController::class, 'generate'])->name('generate');
        Route::get('/{payroll}', [PayrollController::class, 'show'])->name('show');
        Route::post('/{payroll}/approve', [PayrollController::class, 'approve'])->name('approve');
        Route::post('/{payroll}/mark-paid', [PayrollController::class, 'markPaid'])->name('mark-paid');
        Route::delete('/{payroll}', [PayrollController::class, 'destroy'])->name('destroy');
    });

    // ==================== ADMIN MODULE ====================
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])
            ->name('users.reset-password');

        Route::resource('roles', RoleController::class)->only(['index', 'show']);
        Route::post('roles/{role}/permissions', [RoleController::class, 'updatePermissions'])
            ->name('roles.update-permissions');

        Route::resource('permissions', PermissionController::class);
    });
});

require __DIR__.'/auth.php';