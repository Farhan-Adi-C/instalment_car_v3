<?php

namespace Database\Seeders;

use App\Models\Instalment;
use App\Models\Month;
use App\Models\Regional;
use App\Models\Society;
use App\Models\User;
use App\Models\Validation;
use App\Models\Validator;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Regional::create([
            "province" => "Jawa Tengah",
            "district" => "Semarang"
        ]);

        Society::create([
            "name" => "Farhan",
            "id_card_number" => "SomeText",
            "password" => Hash::make("password"),
            "born_date" => Date::now(),
            "gender" => "male",
            "address" => "sdfsdfsdf",
            "regional_id" => 1
        ]);

        Validator::create([
            "name" => "Juri-1"
        ]);

        Validation::create([
            "job" => "pengangguran",
            "job_description" => "info loker",
            "income" => 1000000,
            "reason_accepted" => "pengen gaji 3 digit",
            "society_id" => 1
        ]);

        Month::create([
            "month" => 12,
            "description" => "12 Month",
        ]);

        Month::create([
            "month" => 24,
            "description" => "24 Month",
        ]);

        Month::create([
            "month" => 36,
            "description" => "36 Month",
        ]);


       $instalment1 = Instalment::create([
            "car" => "Toyota 1945",
            "brand" => "Toyota",
            "price" => 900000000,
            "description" => "Gacor kang",
        ]);

       $instalment2 = Instalment::create([
            "car" => "Fortuner 1945",
            "brand" => "Fortuner",
            "price" => 2000000000,
            "description" => "Gacor King",
        ]);

        $instalment1->month()->attach([1,2]);
        $instalment2->month()->attach([1,3]);




    }
}
