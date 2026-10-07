<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampusRequest;
use App\Http\Requests\UpdateCampusRequest;
use App\Models\Campus;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CampusController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('campuses.view');

        // ===== SCOPE =====
        $query = Campus::query();
        $this->scopeQuery($query);
        // =================

        $campuses = $query
            ->with(['school:id,name'])
            ->withCount(['students', 'users'])
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->school_id, fn($q, $id) => $q->where('school_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Campuses/Index', [
            'campuses' => $campuses,
            'schools' => School::whereIn('id', $this->getAccessibleSchoolIds())
                ->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'school_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('campuses.create');

        return Inertia::render('School/Campuses/Create', [
            'schools' => School::whereIn('id', $this->getAccessibleSchoolIds())
                ->where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

    public function store(StoreCampusRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            // Extract VP fields
            $vpName = $data['vp_name'];
            $vpEmail = $data['vp_email'];
            $vpPassword = $data['vp_password'];
            $vpPhone = $data['vp_phone'] ?? null;
            unset($data['vp_name'], $data['vp_email'], $data['vp_password'], $data['vp_phone']);

            // Create campus
            $campus = Campus::create($data);

            // Create VP user
            $vp = User::create([
                'name' => $vpName,
                'email' => $vpEmail,
                'password' => Hash::make($vpPassword),
                'role' => 'vice_principal',
                'school_id' => $campus->school_id,
                'campus_id' => $campus->id,
                'phone' => $vpPhone,
                'status' => 'active',
            ]);
            $vp->assignRole('vice_principal');

            // Link VP to campus
            $campus->update(['vice_principal_id' => $vp->id]);
        });

        return $this->successRedirect('school.campuses.index', 'Campus and Vice Principal created successfully.');
    }

    public function show(Campus $campus)
    {
        $this->authorizePermission('campuses.view');

        // Access check
        if (!$this->isSuperAdmin()
            && !in_array($campus->id, $this->getAccessibleCampusIds())) {
            abort(403);
        }

        $campus->load([
            'school:id,name',
            'academicSessions' => fn($q) => $q->orderBy('start_date', 'desc')->limit(5),
        ]);

        $vp = User::role('vice_principal')
            ->where('campus_id', $campus->id)
            ->select('id', 'name', 'email', 'phone', 'status')
            ->first();

        return Inertia::render('School/Campuses/Show', [
            'campus' => $campus,
            'vp' => $vp,
            'stats' => [
                'students' => $campus->students()->count(),
                'teachers' => $campus->users()->where('role', 'teacher')->count(),
                'standards' => $campus->standards()->count(),
                'subjects' => $campus->subjects()->count(),
            ],
        ]);
    }

    public function edit(Campus $campus)
    {
        $this->authorizePermission('campuses.edit');

        $vp = User::role('vice_principal')
            ->where('campus_id', $campus->id)
            ->select('id', 'name', 'email', 'phone')
            ->first();

        return Inertia::render('School/Campuses/Edit', [
            'campus' => $campus,
            'vp' => $vp,
            'schools' => School::whereIn('id', $this->getAccessibleSchoolIds())
                ->where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

        public function update(UpdateCampusRequest $request, Campus $campus)
        {
            DB::transaction(function () use ($request, $campus) {
                $data = $request->validated();

                // Extract VP fields
                $vpId = $data['vp_id'] ?? null;
                $vpName = $data['vp_name'];
                $vpEmail = $data['vp_email'];
                $vpPassword = $data['vp_password'] ?? null;
                $vpPhone = $data['vp_phone'] ?? null;
                unset(
                    $data['vp_id'],
                    $data['vp_name'],
                    $data['vp_email'],
                    $data['vp_password'],
                    $data['vp_phone']
                );

                // Update campus
                $campus->update($data);

                // Update or create VP
                if ($vpId) {
                    $vp = User::find($vpId);
                    if ($vp) {
                        $updateData = [
                            'name' => $vpName,
                            'email' => $vpEmail,
                            'phone' => $vpPhone,
                        ];
                        if ($vpPassword) {
                            $updateData['password'] = Hash::make($vpPassword);
                        }
                        $vp->update($updateData);
                    }
                } else {
                    // No VP exists — create one
                    $vp = User::create([
                        'name' => $vpName,
                        'email' => $vpEmail,
                        'password' => Hash::make($vpPassword ?? 'password123'),
                        'role' => 'vice_principal',
                        'school_id' => $campus->school_id,
                        'campus_id' => $campus->id,
                        'phone' => $vpPhone,
                        'status' => 'active',
                    ]);
                    $vp->assignRole('vice_principal');

                    $campus->update(['vice_principal_id' => $vp->id]);
                }
            });

            return $this->successRedirect('school.campuses.index', 'Campus updated successfully.');
        }

    public function destroy(Campus $campus)
    {
        $this->authorizePermission('campuses.delete');

        if ($campus->students()->exists() || $campus->users()->exists()) {
            return $this->errorRedirect('school.campuses.index',
                'Cannot delete campus with existing students or users.');
        }

        $campus->delete();
        return $this->successRedirect('school.campuses.index', 'Campus deleted successfully.');
    }
}