<?php

namespace App\Http\Controllers\Examination;

use App\Http\Controllers\Controller;
use App\Models\ExamType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamTypeController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('exams.view');

        // ===== SCOPE =====
        $query = ExamType::query();
        $this->scopeQuery($query);
        // =================

        $types = $query
            ->withCount('exams')
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Examination/ExamTypes/Index', [
            'types' => $types,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('exams.create');
        return Inertia::render('Examination/ExamTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('exams.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:exam_types,code'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        ExamType::create($validated);

        return $this->successRedirect('exam-types.index', 'Exam type created.');
    }

    public function edit(ExamType $examType)
    {
        $this->authorizePermission('exams.edit');
        return Inertia::render('Examination/ExamTypes/Edit', ['examType' => $examType]);
    }

    public function update(Request $request, ExamType $examType)
    {
        $this->authorizePermission('exams.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:exam_types,code,' . $examType->id],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $examType->update($validated);

        return $this->successRedirect('exam-types.index', 'Exam type updated.');
    }

    public function destroy(ExamType $examType)
    {
        $this->authorizePermission('exams.delete');

        if ($examType->exams()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete. Exam type is in use.']);
        }

        $examType->delete();
        return $this->successRedirect('exam-types.index', 'Exam type deleted.');
    }
}