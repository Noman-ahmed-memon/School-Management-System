<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('organizations.view');

        $organizations = Organization::query()
            ->withCount(['schools'])
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Organizations/Index', [
            'organizations' => $organizations,
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('organizations.create');
        return Inertia::render('School/Organizations/Create');
    }

    public function store(StoreOrganizationRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('organizations/logos', 'public');
        }

        Organization::create($data);

        return $this->successRedirect('school.organizations.index', 'Organization created successfully.');
    }

    public function show(Organization $organization)
    {
        $this->authorizePermission('organizations.view');

        $organization->load(['schools' => fn($q) => $q->withCount('campuses')]);

        return Inertia::render('School/Organizations/Show', [
            'organization' => $organization,
        ]);
    }

    public function edit(Organization $organization)
    {
        $this->authorizePermission('organizations.edit');
        return Inertia::render('School/Organizations/Edit', [
            'organization' => $organization,
        ]);
    }

    public function update(UpdateOrganizationRequest $request, Organization $organization)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            if ($organization->logo) {
                Storage::disk('public')->delete($organization->logo);
            }
            $data['logo'] = $request->file('logo')->store('organizations/logos', 'public');
        }

        $organization->update($data);

        return $this->successRedirect('school.organizations.index', 'Organization updated successfully.');
    }

    public function destroy(Organization $organization)
    {
        $this->authorizePermission('organizations.delete');

        if ($organization->schools()->exists()) {
            return $this->errorRedirect('school.organizations.index',
                'Cannot delete organization with existing schools.');
        }

        if ($organization->logo) {
            Storage::disk('public')->delete($organization->logo);
        }

        $organization->delete();

        return $this->successRedirect('school.organizations.index', 'Organization deleted successfully.');
    }

    public function toggleStatus(Organization $organization)
    {
        $this->authorizePermission('organizations.edit');
        $organization->update([
            'status' => $organization->status === 'active' ? 'inactive' : 'active'
        ]);
        return back()->with('success', 'Status updated.');
    }
}