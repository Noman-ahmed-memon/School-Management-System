<?php

namespace App\Http\Controllers\Transport;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Route as TransportRoute;
use App\Models\RouteStop;
use App\Models\Student;
use App\Models\StudentTransport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentTransportController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('transport.view');

        $assignments = StudentTransport::query()
            ->with([
                'student:id,first_name,last_name,admission_number',
                'route:id,name,code',
                'pickupStop:id,stop_name',
                'dropoffStop:id,stop_name',
                'academicSession:id,name',
            ])
            ->when($request->search, fn($q, $s) =>
                $q->whereHas('student', fn($sub) =>
                    $sub->where('first_name', 'like', "%{$s}%")
                        ->orWhere('last_name', 'like', "%{$s}%")
                        ->orWhere('admission_number', 'like', "%{$s}%")))
            ->when($request->route_id, fn($q, $id) => $q->where('route_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Transport/StudentTransport/Index', [
            'assignments' => $assignments,
            'routes' => TransportRoute::when($this->getCampusId(), fn($q, $id) => $q->where('campus_id', $id))
                ->select('id', 'name', 'code')
                ->get(),
            'filters' => $request->only(['search', 'route_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('transport.assign');

        return Inertia::render('Transport/StudentTransport/Create', [
            'students' => Student::query()
                ->whereIn('status', ['active', 'enrolled', 'admitted'])
                ->select('id', 'first_name', 'last_name', 'admission_number')
                ->orderBy('first_name')
                ->limit(500)
                ->get(),
            'routes' => TransportRoute::when($this->getCampusId(), fn($q, $id) => $q->where('campus_id', $id))
                ->where('status', 'active')
                ->select('id', 'name', 'code')
                ->get(),
            'academicSessions' => AcademicSession::where('status', 'active')
                ->select('id', 'name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('transport.assign');

        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'route_id' => ['required', 'exists:routes,id'],
            'pickup_stop_id' => ['required', 'exists:route_stops,id'],
            'dropoff_stop_id' => ['required', 'exists:route_stops,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        StudentTransport::create($validated);

        return $this->successRedirect('student-transport.index', 'Student assigned to route.');
    }

    public function destroy(StudentTransport $studentTransport)
    {
        $this->authorizePermission('transport.assign');

        $studentTransport->delete();

        return $this->successRedirect('student-transport.index', 'Assignment removed.');
    }
}