<?php

namespace App\Http\Controllers\Transport;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('transport.view');

        // ===== SCOPE =====
        $query = Vehicle::query();
        $this->scopeQuery($query);
        // =================

        $vehicles = $query
            ->when($request->search, fn($q, $s) =>
                $q->where('registration_number', 'like', "%{$s}%")
                  ->orWhere('model', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Transport/Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('transport.manage');
        return Inertia::render('Transport/Vehicles/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'registration_number' => ['required', 'string', 'max:50', 'unique:vehicles,registration_number'],
            'model' => ['required', 'string', 'max:100'],
            'capacity' => ['required', 'integer', 'min:1'],
            'driver_name' => ['required', 'string', 'max:100'],
            'driver_phone' => ['required', 'string', 'max:20'],
            'driver_license' => ['nullable', 'string', 'max:50'],
            'insurance_details' => ['nullable', 'string', 'max:500'],
            'maintenance_date' => ['nullable', 'date'],
            'status' => ['required', 'in:active,inactive,maintenance'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        Vehicle::create($validated);

        return $this->successRedirect('vehicles.index', 'Vehicle added.');
    }

    public function show(Vehicle $vehicle)
    {
        $this->authorizePermission('transport.view');

        $routes = \App\Models\Route::where('vehicle_id', $vehicle->id)
            ->select('id', 'name', 'code')
            ->get();

        return Inertia::render('Transport/Vehicles/Show', [
            'vehicle' => $vehicle,
            'routes' => $routes,
        ]);
    }

    public function edit(Vehicle $vehicle)
    {
        $this->authorizePermission('transport.manage');
        return Inertia::render('Transport/Vehicles/Edit', ['vehicle' => $vehicle]);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'registration_number' => ['required', 'string', 'max:50', 'unique:vehicles,registration_number,' . $vehicle->id],
            'model' => ['required', 'string', 'max:100'],
            'capacity' => ['required', 'integer'],
            'driver_name' => ['required', 'string', 'max:100'],
            'driver_phone' => ['required', 'string', 'max:20'],
            'driver_license' => ['nullable', 'string'],
            'insurance_details' => ['nullable', 'string'],
            'maintenance_date' => ['nullable', 'date'],
            'status' => ['required', 'in:active,inactive,maintenance'],
        ]);

        $vehicle->update($validated);

        return $this->successRedirect('vehicles.index', 'Vehicle updated.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $this->authorizePermission('transport.manage');

        if ($vehicle->routes()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete vehicle assigned to routes.']);
        }

        $vehicle->delete();
        return $this->successRedirect('vehicles.index', 'Vehicle deleted.');
    }
}