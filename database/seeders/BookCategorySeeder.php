<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\BookCategory;
use App\Models\Book;
use Illuminate\Database\Seeder;

class BookCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Science', 'code' => 'SCI'],
            ['name' => 'Mathematics', 'code' => 'MATH'],
            ['name' => 'Literature', 'code' => 'LIT'],
            ['name' => 'History', 'code' => 'HIST'],
        ];

        foreach (Campus::all() as $campus) {
            foreach ($categories as $c) {
                $cat = BookCategory::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $campus->code . '-' . $c['code'],
                    ],
                    [
                        'name' => $c['name'],
                        'description' => $c['name'] . ' books',
                    ]
                );

                // Add a sample book per category
                Book::firstOrCreate(
                    ['isbn' => $campus->code . '-' . $c['code'] . '-001'],
                    [
                        'campus_id' => $campus->id,
                        'category_id' => $cat->id,
                        'title' => $c['name'] . ' Book 1',
                        'author' => 'Author ' . rand(1, 100),
                        'publisher' => 'Oxford Press',
                        'year' => 2020,
                        'total_copies' => 10,
                        'available_copies' => 10,
                        'shelf_location' => 'A-1',
                        'status' => 'available',
                    ]
                );
            }
        }

        $this->command->info('✅ Book categories and sample books seeded.');
    }
}