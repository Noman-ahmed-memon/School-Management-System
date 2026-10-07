<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\FeeStructure;
use App\Models\FeeType;
use App\Models\Standard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeStructureController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('fees.view');

        // ===== SCOPE =====
        $query = FeeStructure::query();
        $this->scopeQuery($query);
        // =================

        $structures = $query
            ->with(['standard:id,name,code', 'feeType:id,name,code', 'academicSession:id,name'])
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->academic_session_id, fn($q, $id) => $q->where('academic_session_id', $id))
            ->paginate($request->per_page ?? 20)
            ->withQueryString();

        return Inertia::render('Finance/FeeStructures/Index', [
            'structures' => $structures,
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name', 'code')->get(),
            'feeTypes' => FeeType::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name', 'code')->get(),
            'academicSessions' => AcademicSession::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
            'filters' => $request->only(['standard_id', 'academic_session_id', 'per_page']),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'standard_id' => ['required'],
            'fee_type_id' => ['required', 'exists:fee_types,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'is_optional' => ['boolean'],
        ]);

        $campusId = $this->getCampusId();
        $applyToAll = $validated['standard_id'] === 'all';

        if ($applyToAll) {
            $standardIds = Standard::where('campus_id', $campusId)
                ->where('status', 'active')->pluck('id');

            $created = 0;
            $updated = 0;

            foreach ($standardIds as $standardId) {
                $existing = FeeStructure::where('standard_id', $standardId)
                    ->where('fee_type_id', $validated['fee_type_id'])
                    ->where('academic_session_id', $validated['academic_session_id'])
                    ->first();

                if ($existing) {
                    $existing->update([
                        'amount' => $validated['amount'],
                        'is_optional' => $validated['is_optional'] ?? false,
                    ]);
                    $updated++;
                } else {
                    FeeStructure::create([
                        'standard_id' => $standardId,
                        'fee_type_id' => $validated['fee_type_id'],
                        'academic_session_id' => $validated['academic_session_id'],
                        'amount' => $validated['amount'],
                        'is_optional' => $validated['is_optional'] ?? false,
                        'campus_id' => $campusId,
                    ]);
                    $created++;
                }
            }

            return back()->with('success', "Applied to all standards: {$created} created, {$updated} updated.");
        }

        $validated['campus_id'] = $campusId;

        FeeStructure::updateOrCreate(
            [
                'standard_id' => $validated['standard_id'],
                'fee_type_id' => $validated['fee_type_id'],
                'academic_session_id' => $validated['academic_session_id'],
            ],
            $validated
        );

        return back()->with('success', 'Fee structure saved.');
    }

    public function update(Request $request, FeeStructure $feeStructure)
    {
        $this->authorizePermission('fees.structure');

        $validated = $request->validate([
            'standard_id' => ['required', 'exists:standards,id'],
            'fee_type_id' => ['required', 'exists:fee_types,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'is_optional' => ['boolean'],
        ]);

        $validated['campus_id'] = $this->getCampusId();
        $feeStructure->update($validated);

        return $this->successRedirect('fee-structures.index', 'Fee structure updated.');
    }

    public function destroy(FeeStructure $feeStructure)
    {
        $this->authorizePermission('fees.structure');
        $feeStructure->delete();
        return back()->with('success', 'Fee structure deleted.');
    }
}