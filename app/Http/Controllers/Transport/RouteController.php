<?php

namespace App\Http\Controllers\Transport;

use App\Http\Controllers\Controller;
use App\Models\Route;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('transport.view');

        // ===== SCOPE =====
        $query = Route::query();
        $this->scopeQuery($query);
        // =================

        $routes = $query
            ->with('vehicle:id,registration_number,model')
            ->withCount('routeStops as stops_count')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Transport/Routes/Index', [
            'routes' => $routes,
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('transport.manage');

        return Inertia::render('Transport/Routes/Create', [
            'vehicles' => Vehicle::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'registration_number', 'model', 'capacity')
                ->orderBy('registration_number')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:routes,code'],
            'description' => ['nullable', 'string', 'max:500'],
            'start_time' => ['required'],
            'end_time' => ['required'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        Route::create($validated);

        return $this->successRedirect('routes.index', 'Route created successfully.');
    }

    public function show(Route $route)
    {
        $this->authorizePermission('transport.view');

        $route->load([
            'vehicle:id,registration_number,model,capacity,driver_name,driver_phone',
        ]);

        $stops = $route->routeStops()->orderBy('stop_order')->get();

        $routeArray = $route->toArray();
        $routeArray['stops'] = $stops;

        return Inertia::render('Transport/Routes/Show', [
            'route' => $routeArray,
        ]);
    }

    public function edit(Route $route)
    {
        $this->authorizePermission('transport.manage');

        return Inertia::render('Transport/Routes/Edit', [
            'route' => $route,
            'vehicles' => Vehicle::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'registration_number', 'model', 'capacity')
                ->orderBy('registration_number')
                ->get(),
        ]);
    }

    public function update(Request $request, Route $route)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:routes,code,' . $route->id],
            'description' => ['nullable', 'string', 'max:500'],
            'start_time' => ['required'],
            'end_time' => ['required'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $route->update($validated);

        return $this->successRedirect('routes.index', 'Route updated successfully.');
    }

    public function destroy(Route $route)
    {
        $this->authorizePermission('transport.manage');

        if ($route->studentTransport()->exists()) {
            return back()->withErrors([
                'error' => 'Cannot delete route with assigned students. Remove them first.',
            ]);
        }

        $route->routeStops()->delete();
        $route->delete();

        return $this->successRedirect('routes.index', 'Route deleted successfully.');
    }
}