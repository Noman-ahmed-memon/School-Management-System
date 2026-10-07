<?php

namespace App\Http\Controllers\Academic;

use App\Http\Controllers\Controller;
use App\Models\TimeSlot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimeSlotController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('timetable.view');

        // ===== SCOPE =====
        $query = TimeSlot::query();
        $this->scopeQuery($query);
        // =================

        $slots = $query
            ->when($request->day_of_week, fn($q, $d) => $q->where('day_of_week', $d))
            ->orderByRaw("FIELD(day_of_week, 'monday','tuesday','wednesday','thursday','friday','saturday','sunday')")
            ->orderBy('start_time')
            ->paginate($request->per_page ?? 50);

        return Inertia::render('Academic/TimeSlots/Index', [
            'slots' => $slots,
            'filters' => $request->only(['day_of_week', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('timetable.create');
        return Inertia::render('Academic/TimeSlots/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('timetable.create');

        $validated = $request->validate([
            'day_of_week' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        TimeSlot::create($validated);

        return $this->successRedirect('time-slots.index', 'Time slot created.');
    }

    public function edit(TimeSlot $timeSlot)
    {
        $this->authorizePermission('timetable.edit');
        return Inertia::render('Academic/TimeSlots/Edit', ['slot' => $timeSlot]);
    }

    public function update(Request $request, TimeSlot $timeSlot)
    {
        $this->authorizePermission('timetable.edit');

        $validated = $request->validate([
            'day_of_week' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'],
            'start_time' => ['required'],
            'end_time' => ['required', 'after:start_time'],
        ]);

        $timeSlot->update($validated);

        return $this->successRedirect('time-slots.index', 'Time slot updated.');
    }

    public function destroy(TimeSlot $timeSlot)
    {
        $this->authorizePermission('timetable.delete');

        if ($timeSlot->timetableEntries()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete time slot in use.']);
        }

        $timeSlot->delete();
        return $this->successRedirect('time-slots.index', 'Time slot deleted.');
    }
}