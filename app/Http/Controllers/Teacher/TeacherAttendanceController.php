<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\TeacherAttendance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherAttendanceController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('attendance.view');

        $attendances = TeacherAttendance::query()
            ->with('teacher.user:id,name,email')
            ->when($request->date, fn($q, $d) => $q->whereDate('date', $d))
            ->when($request->teacher_id, fn($q, $id) => $q->where('teacher_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->orderBy('date', 'desc')
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Teacher/Attendances/Index', [
            'attendances' => $attendances,
            'teachers' => Teacher::with('user:id,name')->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->user->name ?? 'N/A',
            ]),
            'filters' => $request->only(['date', 'teacher_id', 'status', 'per_page']),
        ]);
    }

    public function mark(Request $request)
    {
        $this->authorizePermission('attendance.mark');

        $date = $request->date ?? now()->toDateString();
        $teachers = Teacher::with('user:id,name,email')->get();

        $existing = TeacherAttendance::whereDate('date', $date)
            ->get()
            ->keyBy('teacher_id');

        return Inertia::render('Teacher/Attendances/Mark', [
            'teachers' => $teachers,
            'existing' => $existing,
            'date' => $date,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('attendance.mark');

        $validated = $request->validate([
            'date' => ['required', 'date'],
            'attendances' => ['required', 'array'],
            'attendances.*.teacher_id' => ['required', 'exists:teachers,id'],
            'attendances.*.status' => ['required', 'in:present,absent,late,leave,early_departure'],
            'attendances.*.check_in_time' => ['nullable'],
            'attendances.*.check_out_time' => ['nullable'],
            'attendances.*.remark' => ['nullable', 'string'],
        ]);

        foreach ($validated['attendances'] as $att) {
            TeacherAttendance::updateOrCreate(
                [
                    'teacher_id' => $att['teacher_id'],
                    'date' => $validated['date'],
                ],
                [
                    'status' => $att['status'],
                    'check_in_time' => $att['check_in_time'] ?? null,
                    'check_out_time' => $att['check_out_time'] ?? null,
                    'remark' => $att['remark'] ?? null,
                ]
            );
        }

        return back()->with('success', 'Teacher attendance saved.');
    }
}