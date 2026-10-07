<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Models\Section;
use App\Models\Standard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('sections.view');

        // ===== SCOPE via standard =====
        $query = Section::query();
        $this->scopeQueryVia($query, 'standard');
        // ===============================

        $sections = $query
            ->with(['standard:id,name,code,campus_id'])
            ->withCount('studentAcademicRecords')
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Sections/Index', [
            'sections' => $sections,
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'code')->get(),
            'filters' => $request->only(['search', 'standard_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('sections.create');
        return Inertia::render('School/Sections/Create', [
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'code')->get(),
        ]);
    }

    public function store(StoreSectionRequest $request)
    {
        Section::create($request->validated());
        return $this->successRedirect('school.sections.index', 'Section created.');
    }

    public function show(Section $section)
    {
        $this->authorizePermission('sections.view');
        $section->load(['standard:id,name,code']);

        return Inertia::render('School/Sections/Show', ['section' => $section]);
    }

    public function edit(Section $section)
    {
        $this->authorizePermission('sections.edit');
        return Inertia::render('School/Sections/Edit', [
            'section' => $section,
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'code')->get(),
        ]);
    }

    public function update(UpdateSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return $this->successRedirect('school.sections.index', 'Section updated.');
    }

    public function destroy(Section $section)
    {
        $this->authorizePermission('sections.delete');

        if ($section->studentAcademicRecords()->exists()) {
            return $this->errorRedirect('school.sections.index',
                'Cannot delete section with enrolled students.');
        }

        $section->delete();
        return $this->successRedirect('school.sections.index', 'Section deleted.');
    }
}