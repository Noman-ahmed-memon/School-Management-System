<?php

namespace App\Http\Controllers\Academic;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Section;
use App\Models\Standard;
use App\Models\StandardSubject;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TimeSlot;
use App\Models\TimetableEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimetableController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('timetable.view');

        $standardId = $request->standard_id;
        $sectionId = $request->section_id;
        $sessionId = AcademicSession::where('campus_id', $this->getCampusId())
            ->where('is_current', true)
            ->value('id');

        // Always load time slots for the campus
        $timeSlots = TimeSlot::where('campus_id', $this->getCampusId())
            ->orderByRaw("FIELD(day_of_week, 'monday','tuesday','wednesday','thursday','friday','saturday','sunday')")
            ->orderBy('start_time')
            ->get();

        // Load entries ONLY when a class + session are selected
        // KEYED FLAT by time_slot_id so frontend can do entries[slot.id]
        $entries = collect();
        if ($standardId && $sectionId && $sessionId) {
            $entries = TimetableEntry::with([
                'subject:id,name,code',
                'teacher.user:id,name',
                'timeSlot',
            ])
                ->where('standard_id', $standardId)
                ->where('section_id', $sectionId)
                ->where('academic_session_id', $sessionId)
                ->get()
                ->keyBy('time_slot_id');   // ← FLAT keyed collection
        }

        return Inertia::render('Academic/Timetable/Index', [
            'entries' => $entries,
            'timeSlots' => $timeSlots,
            'standards' => Standard::where('status', 'active')->select('id', 'name', 'code')->get(),
            'sections' => Section::where('status', 'active')->select('id', 'name', 'standard_id')->get(),
            'subjects' => Subject::where('status', 'active')->select('id', 'name', 'code')->get(),
            'teachers' => Teacher::with('user:id,name')->where('status', 'active')->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->user->name ?? 'N/A',
            ]),
            'filters' => [
                'standard_id' => $standardId,
                'section_id' => $sectionId,
            ],
            'meta' => [
                'has_current_session' => (bool) $sessionId,
                'has_time_slots' => $timeSlots->count() > 0,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('timetable.create');

        $validated = $request->validate([
            'standard_id' => ['required', 'exists:standards,id'],
            'section_id' => ['required', 'exists:sections,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'teacher_id' => ['required', 'exists:teachers,id'],
            'time_slot_id' => ['required', 'exists:time_slots,id'],
            'room_number' => ['required', 'string', 'max:50'],
        ]);

        $sessionId = AcademicSession::where('campus_id', $this->getCampusId())
            ->where('is_current', true)
            ->value('id');

        if (!$sessionId) {
            return back()->withErrors(['error' => 'No active academic session.']);
        }

        // Conflict: teacher already booked in this time slot?
        $teacherConflict = TimetableEntry::where('teacher_id', $validated['teacher_id'])
            ->where('time_slot_id', $validated['time_slot_id'])
            ->where('academic_session_id', $sessionId)
            ->exists();

        if ($teacherConflict) {
            return back()->withErrors(['teacher_id' => 'This teacher is already booked for this time slot.']);
        }

        // Conflict: room already booked?
        $roomConflict = TimetableEntry::where('room_number', $validated['room_number'])
            ->where('time_slot_id', $validated['time_slot_id'])
            ->where('academic_session_id', $sessionId)
            ->exists();

        if ($roomConflict) {
            return back()->withErrors(['room_number' => 'This room is already booked.']);
        }

        // Conflict: standard/section already has entry?
        $sectionConflict = TimetableEntry::where('standard_id', $validated['standard_id'])
            ->where('section_id', $validated['section_id'])
            ->where('time_slot_id', $validated['time_slot_id'])
            ->where('academic_session_id', $sessionId)
            ->exists();

        if ($sectionConflict) {
            return back()->withErrors(['time_slot_id' => 'This class already has an entry in this slot.']);
        }

        TimetableEntry::create(array_merge($validated, [
            'academic_session_id' => $sessionId,
        ]));

        return back()->with('success', 'Timetable entry added.');
    }

    public function destroy(TimetableEntry $timetableEntry)
    {
        $this->authorizePermission('timetable.delete');
        $timetableEntry->delete();
        return back()->with('success', 'Entry deleted.');
    }
}