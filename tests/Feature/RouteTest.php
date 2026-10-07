<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RouteTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
    }

    public function test_all_get_routes_return_non_500(): void
    {
        $user = User::where('email', 'superadmin@school.com')->firstOrFail();

        $routes = [
            '/dashboard',
            '/school/organizations',
            '/school/organizations/create',
            '/school/schools',
            '/school/schools/create',
            '/school/campuses',
            '/school/campuses/create',
            '/school/academic-sessions',
            '/school/academic-sessions/create',
            '/school/departments',
            '/school/departments/create',
            '/school/standards',
            '/school/standards/create',
            '/school/sections',
            '/school/sections/create',
            '/school/subjects',
            '/school/subjects/create',
            '/school/standard-subjects',
            '/school/standard-subjects/create',
            '/students',
            '/students/create',
            '/guardians',
            '/guardians/create',
            '/teachers',
            '/teachers/create',
            '/attendance',
            '/attendance/mark',
            '/time-slots',
            '/time-slots/create',
            '/timetable',
            '/exam-types',
            '/exam-types/create',
            '/exams',
            '/exams/create',
            '/grading-systems',
            '/fee-types',
            '/fee-types/create',
            '/fee-structures',
            '/fee-invoices',
            '/fee-invoices/create',
            '/fee-payments',
            '/fee-payments/create',
            '/books',
            '/books/create',
            '/book-categories',
            '/library-transactions',
            '/library-transactions/create',
            '/vehicles',
            '/vehicles/create',
            '/routes',
            '/inventory-items',
            '/inventory-items/create',
            '/staff',
            '/staff/create',
            '/leave-types',
            '/leave-requests',
            '/leave-requests/create',
            '/payrolls',
            '/admin/users',
            '/admin/users/create',
            '/admin/roles',
        ];

        $failures = [];

        foreach ($routes as $route) {
            try {
                $response = $this->actingAs($user)->get($route);

                if ($response->getStatusCode() === 500) {
                    $failures[] = "{$route} returned 500";
                }
            } catch (\Throwable $e) {
                // Only flag as failure if it's NOT a Vite/Inertia page missing error
                if (!str_contains($e->getMessage(), 'Vite') &&
                    !str_contains($e->getMessage(), 'manifest') &&
                    !str_contains($e->getMessage(), 'Page component')) {
                    $failures[] = "{$route} threw: " . $e->getMessage();
                }
            }
        }

        if (!empty($failures)) {
            $this->fail("Route failures:\n" . implode("\n", $failures));
        }

        $this->assertTrue(true);
    }

    public function test_organizations_page_loads(): void
    {
        $user = User::where('email', 'superadmin@school.com')->firstOrFail();

        $response = $this->actingAs($user)->get('/school/organizations');

        // Even if React page is missing, controller should not 500
        $this->assertNotEquals(500, $response->getStatusCode());
    }
}