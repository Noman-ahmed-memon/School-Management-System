<?php

namespace App\Http\Controllers\Transport;

use App\Http\Controllers\Controller;
use App\Models\RouteStop;
use Illuminate\Http\Request;

class RouteStopController extends Controller
{
    public function store(Request $request)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'route_id' => ['required', 'exists:routes,id'],
            'stop_name' => ['required', 'string', 'max:150'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'stop_order' => ['required', 'integer', 'min:1'],
            'arrival_time' => ['required', 'date_format:H:i'],
        ]);

        RouteStop::create($validated);

        return back()->with('success', 'Stop added.');
    }

    public function update(Request $request, RouteStop $routeStop)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'stop_name' => ['required', 'string', 'max:150'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'stop_order' => ['required', 'integer', 'min:1'],
            'arrival_time' => ['required', 'date_format:H:i'],
        ]);

        $routeStop->update($validated);

        return back()->with('success', 'Stop updated.');
    }

    public function destroy(RouteStop $routeStop)
    {
        $this->authorizePermission('transport.manage');

        $routeStop->delete();

        return back()->with('success', 'Stop removed.');
    }

    public function reorder(Request $request)
    {
        $this->authorizePermission('transport.manage');

        $validated = $request->validate([
            'stop1_id' => ['required', 'exists:route_stops,id'],
            'stop1_order' => ['required', 'integer'],
            'stop2_id' => ['required', 'exists:route_stops,id'],
            'stop2_order' => ['required', 'integer'],
        ]);

        RouteStop::where('id', $validated['stop1_id'])
            ->update(['stop_order' => $validated['stop1_order']]);

        RouteStop::where('id', $validated['stop2_id'])
            ->update(['stop_order' => $validated['stop2_order']]);

        return back()->with('success', 'Stops reordered.');
    }
}