<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAcademicSessionRequest;
use App\Http\Requests\UpdateAcademicSessionRequest;
use App\Models\AcademicSession;
use App\Models\Campus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicSessionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('academic_sessions.view');

        // ===== SCOPE =====
        $query = AcademicSession::query();
        $this->scopeQuery($query);
        // =================

        $sessions = $query
            ->with(['campus:id,name'])
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->campus_id, fn($q, $id) => $q->where('campus_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->orderBy('start_date', 'desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/AcademicSessions/Index', [
            'sessions' => $sessions,
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'campus_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('academic_sessions.create');
        return Inertia::render('School/AcademicSessions/Create', [
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function store(StoreAcademicSessionRequest $request)
    {
        $data = $request->validated();

        if (!empty($data['is_current'])) {
            AcademicSession::where('campus_id', $data['campus_id'])
                ->update(['is_current' => false]);
        }

        AcademicSession::create($data);
        return $this->successRedirect('school.academic-sessions.index', 'Academic session created.');
    }

    public function show(AcademicSession $academicSession)
    {
        $this->authorizePermission('academic_sessions.view');

        $academicSession->loadCount([
            'studentAcademicRecords as student_academic_records_count' => function ($q) {
                $q->where('status', 'enrolled');
            },
            'exams',
            'feeStructures',
        ]);

        $academicSession->load('campus:id,name');

        return Inertia::render('School/AcademicSessions/Show', [
            'session' => $academicSession,
        ]);
    }

    public function edit(AcademicSession $academicSession)
    {
        $this->authorizePermission('academic_sessions.edit');
        return Inertia::render('School/AcademicSessions/Edit', [
            'session' => $academicSession,
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function update(UpdateAcademicSessionRequest $request, AcademicSession $academicSession)
    {
        $data = $request->validated();

        if (!empty($data['is_current'])) {
            AcademicSession::where('campus_id', $data['campus_id'])
                ->where('id', '!=', $academicSession->id)
                ->update(['is_current' => false]);
        }

        $academicSession->update($data);
        return $this->successRedirect('school.academic-sessions.index', 'Academic session updated.');
    }

    public function destroy(AcademicSession $academicSession)
    {
        $this->authorizePermission('academic_sessions.delete');

        if ($academicSession->studentAcademicRecords()->exists()) {
            return $this->errorRedirect('school.academic-sessions.index',
                'Cannot delete session with enrolled students.');
        }

        $academicSession->delete();
        return $this->successRedirect('school.academic-sessions.index', 'Academic session deleted.');
    }
}