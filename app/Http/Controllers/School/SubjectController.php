<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('subjects.view');

        // ===== SCOPE =====
        $query = Subject::query();
        $this->scopeQuery($query);
        // =================

        $subjects = $query
            ->with('campus:id,name')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->type, fn($q, $t) => $q->where('type', $t))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Subjects/Index', [
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'type', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('subjects.create');
        return Inertia::render('School/Subjects/Create');
    }

    public function store(StoreSubjectRequest $request)
    {
        $data = $request->validated();
        $data['campus_id'] = $this->getCampusId();
        Subject::create($data);
        return $this->successRedirect('school.subjects.index', 'Subject created.');
    }

    public function show(Subject $subject)
    {
        $this->authorizePermission('subjects.view');
        $subject->load('campus:id,name');

        return Inertia::render('School/Subjects/Show', ['subject' => $subject]);
    }

    public function edit(Subject $subject)
    {
        $this->authorizePermission('subjects.edit');
        return Inertia::render('School/Subjects/Edit', ['subject' => $subject]);
    }

    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $subject->update($request->validated());
        return $this->successRedirect('school.subjects.index', 'Subject updated.');
    }

    public function destroy(Subject $subject)
    {
        $this->authorizePermission('subjects.delete');

        if ($subject->standardSubjects()->exists()) {
            return $this->errorRedirect('school.subjects.index',
                'Cannot delete subject assigned to standards.');
        }

        $subject->delete();
        return $this->successRedirect('school.subjects.index', 'Subject deleted.');
    }
}