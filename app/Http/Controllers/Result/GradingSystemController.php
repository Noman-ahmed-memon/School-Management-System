<?php

namespace App\Http\Controllers\Result;

use App\Http\Controllers\Controller;
use App\Models\GradingSystem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradingSystemController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('results.view');

        // ===== SCOPE =====
        $query = GradingSystem::query();
        $this->scopeQuery($query);
        // =================

        $grades = $query
            ->orderByDesc('min_percentage')
            ->paginate($request->per_page ?? 50);

        return Inertia::render('Result/GradingSystems/Index', ['grades' => $grades]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('results.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'grade' => ['required', 'string', 'max:10'],
            'min_percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'max_percentage' => ['required', 'numeric', 'min:0', 'max:100', 'gt:min_percentage'],
            'points' => ['required', 'numeric', 'min:0', 'max:10'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        GradingSystem::create($validated);

        return back()->with('success', 'Grade added.');
    }

    public function update(Request $request, GradingSystem $gradingSystem)
    {
        $this->authorizePermission('results.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'grade' => ['required', 'string', 'max:10'],
            'min_percentage' => ['required', 'numeric'],
            'max_percentage' => ['required', 'numeric'],
            'points' => ['required', 'numeric'],
            'description' => ['nullable', 'string'],
        ]);

        $gradingSystem->update($validated);

        return back()->with('success', 'Grade updated.');
    }

    public function destroy(GradingSystem $gradingSystem)
    {
        $this->authorizePermission('results.manage');
        $gradingSystem->delete();
        return back()->with('success', 'Grade deleted.');
    }
}