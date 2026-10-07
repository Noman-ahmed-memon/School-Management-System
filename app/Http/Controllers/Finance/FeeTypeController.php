<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeTypeController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('fees.view');

        // ===== SCOPE =====
        $query = FeeType::query();
        $this->scopeQuery($query);
        // =================

        $types = $query
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Finance/FeeTypes/Index', [
            'types' => $types,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('fees.structure');
        return Inertia::render('Finance/FeeTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_recurring' => ['boolean'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        FeeType::create($validated);

        return $this->successRedirect('fee-types.index', 'Fee type created.');
    }

    public function edit(FeeType $feeType)
    {
        $this->authorizePermission('fees.structure');
        return Inertia::render('Finance/FeeTypes/Edit', ['feeType' => $feeType]);
    }

    public function update(Request $request, FeeType $feeType)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_recurring' => ['boolean'],
        ]);

        $feeType->update($validated);

        return $this->successRedirect('fee-types.index', 'Fee type updated.');
    }

    public function destroy(FeeType $feeType)
    {
        $this->authorizePermission('fees.structure');
        $feeType->delete();
        return $this->successRedirect('fee-types.index', 'Fee type deleted.');
    }
}