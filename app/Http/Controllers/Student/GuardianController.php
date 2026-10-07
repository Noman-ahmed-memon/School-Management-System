<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGuardianRequest;
use App\Http\Requests\UpdateGuardianRequest;
use App\Models\Campus;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class GuardianController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('guardians.view');

        // ===== SCOPE via students =====
        $query = Guardian::query();
        $this->scopeQueryVia($query, 'students');
        // ==============================

        $guardians = $query
            ->with(['user:id,name,email', 'students:id,first_name,last_name,admission_number'])
            ->when($request->search, fn($q, $s) =>
                $q->where('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%"))
            ->when($request->relation, fn($q, $r) => $q->where('relation', $r))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Student/Guardians/Index', [
            'guardians' => $guardians,
            'filters' => $request->only(['search', 'relation', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('guardians.create');

        return Inertia::render('Student/Guardians/Create', [
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')
                ->get(),
            'students' => Student::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'first_name', 'last_name', 'admission_number', 'campus_id')
                ->get(),
        ]);
    }

    public function store(StoreGuardianRequest $request)
    {
        $campusId = $request->campus_id ?: $this->getCampusId();

        if (!$campusId || !in_array((int) $campusId, $this->getAccessibleCampusIds())) {
            return back()->withErrors(['campus_id' => 'Please select a valid campus.']);
        }

        $schoolId = Campus::find($campusId)?->school_id;

        DB::transaction(function () use ($request, $campusId, $schoolId) {
            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'guardian',
                'phone' => $request->phone,
                'campus_id' => $campusId,
                'school_id' => $schoolId,
                'status' => 'active',
            ]);
            $user->assignRole('guardian');

            Guardian::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'occupation' => $request->occupation,
                'relation' => $request->relation,
            ]);
        });

        return $this->successRedirect('guardians.index', 'Guardian created.');
    }

    public function show(Guardian $guardian)
    {
        $this->authorizePermission('guardians.view');

        $guardian->load([
            'user:id,name,email',
            'students' => fn($q) => $q->with([
                'currentAcademicRecord.standard:id,name',
            ]),
        ]);

        return Inertia::render('Student/Guardians/Show', [
            'guardian' => $guardian,
        ]);
    }

    public function edit(Guardian $guardian)
    {
        $this->authorizePermission('guardians.edit');
        $guardian->load('user');

        return Inertia::render('Student/Guardians/Edit', [
            'guardian' => $guardian,
        ]);
    }

    public function update(UpdateGuardianRequest $request, Guardian $guardian)
    {
        DB::transaction(function () use ($request, $guardian) {
            $guardian->update($request->validated());
            $guardian->user->update([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);
        });

        return $this->successRedirect('guardians.index', 'Guardian updated.');
    }

    public function destroy(Guardian $guardian)
    {
        $this->authorizePermission('guardians.delete');

        DB::transaction(function () use ($guardian) {
            $userId = $guardian->user_id;
            $guardian->delete();
            User::where('id', $userId)->delete();
        });

        return $this->successRedirect('guardians.index', 'Guardian deleted.');
    }
}