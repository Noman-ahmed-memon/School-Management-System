<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\Scholarship;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('fees.view');

        $scholarships = Scholarship::query()
            ->with('student:id,first_name,last_name,admission_number')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhereHas('student', fn($sub) =>
                      $sub->where('first_name', 'like', "%{$s}%")
                          ->orWhere('last_name', 'like', "%{$s}%")))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->type, fn($q, $t) => $q->where('type', $t))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Finance/Scholarships/Index', [
            'scholarships' => $scholarships,
            'filters' => $request->only(['search', 'status', 'type', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('fees.structure');

        return Inertia::render('Finance/Scholarships/Create', [
            'students' => Student::query()
                ->whereIn('status', ['active', 'enrolled', 'admitted'])
                ->select('id', 'first_name', 'last_name', 'admission_number')
                ->orderBy('first_name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'name' => ['required', 'string', 'max:150'],
            'amount' => ['required', 'numeric', 'min:0'],
            'type' => ['required', 'in:percentage,fixed'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        // Validate percentage
        if ($validated['type'] === 'percentage' && $validated['amount'] > 100) {
            return back()->withErrors(['amount' => 'Percentage cannot exceed 100%.']);
        }

        Scholarship::create($validated);

        return $this->successRedirect('scholarships.index', 'Scholarship created successfully.');
    }

    public function show(Scholarship $scholarship)
    {
        $this->authorizePermission('fees.view');

        $scholarship->load('student:id,first_name,last_name,admission_number');

        return Inertia::render('Finance/Scholarships/Show', [
            'scholarship' => $scholarship,
        ]);
    }

    public function edit(Scholarship $scholarship)
    {
        $this->authorizePermission('fees.structure');

        return Inertia::render('Finance/Scholarships/Edit', [
            'scholarship' => $scholarship,
        ]);
    }

    public function update(Request $request, Scholarship $scholarship)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'name' => ['required', 'string', 'max:150'],
            'amount' => ['required', 'numeric', 'min:0'],
            'type' => ['required', 'in:percentage,fixed'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        if ($validated['type'] === 'percentage' && $validated['amount'] > 100) {
            return back()->withErrors(['amount' => 'Percentage cannot exceed 100%.']);
        }

        $scholarship->update($validated);

        return $this->successRedirect('scholarships.index', 'Scholarship updated successfully.');
    }

    public function destroy(Scholarship $scholarship)
    {
        $this->authorizePermission('fees.structure');

        $scholarship->delete();

        return $this->successRedirect('scholarships.index', 'Scholarship deleted.');
    }
}