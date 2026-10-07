<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSchoolRequest;
use App\Http\Requests\UpdateSchoolRequest;
use App\Models\Organization;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('schools.view');

        $schools = School::query()
            ->with(['organization:id,name'])
            ->withCount('campuses')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->organization_id, fn($q, $id) => $q->where('organization_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Schools/Index', [
            'schools' => $schools,
            'organizations' => Organization::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'organization_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('schools.create');

        return Inertia::render('School/Schools/Create', [
            'organizations' => Organization::where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

    public function store(StoreSchoolRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            // Extract principal fields before creating school
            $principalName = $data['principal_name'];
            $principalEmail = $data['principal_email'];
            $principalPassword = $data['principal_password'];
            $principalPhone = $data['principal_phone'] ?? null;
            unset(
                $data['principal_name'],
                $data['principal_email'],
                $data['principal_password'],
                $data['principal_phone']
            );

            // Handle logo
            if ($request->hasFile('logo')) {
                $data['logo'] = $request->file('logo')->store('schools/logos', 'public');
            }

            // Create school
            $school = School::create($data);

            // Create principal user
            $principal = User::create([
                'name' => $principalName,
                'email' => $principalEmail,
                'password' => Hash::make($principalPassword),
                'role' => 'principal',
                'school_id' => $school->id,
                'campus_id' => null,
                'phone' => $principalPhone,
                'status' => 'active',
            ]);
            $principal->assignRole('principal');
        });

        return $this->successRedirect('school.schools.index', 'School and Principal created successfully.');
    }

    public function show(School $school)
    {
        $this->authorizePermission('schools.view');

        $school->load(['organization:id,name', 'campuses']);

        $principal = User::role('principal')
            ->where('school_id', $school->id)
            ->select('id', 'name', 'email', 'phone', 'status')
            ->first();

        return Inertia::render('School/Schools/Show', [
            'school' => $school,
            'principal' => $principal,
        ]);
    }

    public function edit(School $school)
    {
        $this->authorizePermission('schools.edit');

        $principal = User::role('principal')
            ->where('school_id', $school->id)
            ->select('id', 'name', 'email', 'phone')
            ->first();

        return Inertia::render('School/Schools/Edit', [
            'school' => $school,
            'principal' => $principal,
            'organizations' => Organization::where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

       public function update(UpdateSchoolRequest $request, School $school)
        {
            DB::transaction(function () use ($request, $school) {
                $data = $request->validated();

                // Extract principal fields
                $principalId = $data['principal_id'] ?? null;
                $principalName = $data['principal_name'];
                $principalEmail = $data['principal_email'];
                $principalPassword = $data['principal_password'] ?? null;
                $principalPhone = $data['principal_phone'] ?? null;
                unset(
                    $data['principal_id'],
                    $data['principal_name'],
                    $data['principal_email'],
                    $data['principal_password'],
                    $data['principal_phone']
                );

                // Handle logo
                if ($request->hasFile('logo')) {
                    if ($school->logo) Storage::disk('public')->delete($school->logo);
                    $data['logo'] = $request->file('logo')->store('schools/logos', 'public');
                }

                // Update school
                $school->update($data);

                // Update or create principal
                if ($principalId) {
                    $principal = User::find($principalId);
                    if ($principal) {
                        $updateData = [
                            'name' => $principalName,
                            'email' => $principalEmail,
                            'phone' => $principalPhone,
                        ];
                        if ($principalPassword) {
                            $updateData['password'] = Hash::make($principalPassword);
                        }
                        $principal->update($updateData);
                    }
                } else {
                    // No principal exists — create one
                    $principal = User::create([
                        'name' => $principalName,
                        'email' => $principalEmail,
                        'password' => Hash::make($principalPassword ?? 'password123'),
                        'role' => 'principal',
                        'school_id' => $school->id,
                        'campus_id' => null,
                        'phone' => $principalPhone,
                        'status' => 'active',
                    ]);
                    $principal->assignRole('principal');
                }
            });

            return $this->successRedirect('school.schools.index', 'School updated successfully.');
        }

    public function destroy(School $school)
    {
        $this->authorizePermission('schools.delete');

        if ($school->campuses()->exists()) {
            return $this->errorRedirect('school.schools.index',
                'Cannot delete school with existing campuses.');
        }

        if ($school->logo) Storage::disk('public')->delete($school->logo);
        $school->delete();

        return $this->successRedirect('school.schools.index', 'School deleted successfully.');
    }
}