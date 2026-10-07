<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStandardRequest;
use App\Http\Requests\UpdateStandardRequest;
use App\Models\Standard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandardController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('standards.view');

        // ===== SCOPE =====
        $query = Standard::query();
        $this->scopeQuery($query);
        // =================

        $standards = $query
            ->with('campus:id,name')
            ->withCount(['sections', 'standardSubjects', 'studentAcademicRecords'])
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->campus_id, fn($q, $id) => $q->where('campus_id', $id))
            ->orderBy('order')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Standards/Index', [
            'standards' => $standards,
            'filters' => $request->only(['search', 'status', 'campus_id', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('standards.create');
        return Inertia::render('School/Standards/Create');
    }

    public function store(StoreStandardRequest $request)
    {
        $data = $request->validated();
        $data['campus_id'] = $this->getCampusId();
        $data['order'] = $data['order'] ?? (Standard::where('campus_id', $this->getCampusId())->max('order') + 1);

        Standard::create($data);

        return $this->successRedirect('school.standards.index', 'Standard created successfully.');
    }

    public function show(Standard $standard)
    {
        $this->authorizePermission('standards.view');

        $standard->load([
            'campus:id,name',
            'sections' => fn($q) => $q->where('status', 'active')->orderBy('name'),
        ]);

        return Inertia::render('School/Standards/Show', [
            'standard' => $standard,
            'stats' => [
                'sections_count' => $standard->sections()->count(),
                'subjects_count' => $standard->standardSubjects()->count(),
                'students_count' => $standard->studentAcademicRecords()->count(),
            ],
        ]);
    }

    public function edit(Standard $standard)
    {
        $this->authorizePermission('standards.edit');
        return Inertia::render('School/Standards/Edit', [
            'standard' => $standard,
        ]);
    }

    public function update(UpdateStandardRequest $request, Standard $standard)
    {
        $standard->update($request->validated());
        return $this->successRedirect('school.standards.index', 'Standard updated successfully.');
    }

    public function destroy(Standard $standard)
    {
        $this->authorizePermission('standards.delete');

        if ($standard->studentAcademicRecords()->exists()) {
            return $this->errorRedirect('school.standards.index',
                'Cannot delete. There are students enrolled in this standard.');
        }

        $standard->delete();
        return $this->successRedirect('school.standards.index', 'Standard deleted successfully.');
    }

    public function toggleStatus(Standard $standard)
    {
        $this->authorizePermission('standards.edit');
        $standard->update([
            'status' => $standard->status === 'active' ? 'inactive' : 'active'
        ]);
        return back()->with('success', 'Standard status updated.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->authorizePermission('standards.delete');

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:standards,id'],
        ]);

        Standard::whereIn('id', $request->ids)->delete();

        return $this->successRedirect('school.standards.index', 'Standards deleted successfully.');
    }
}