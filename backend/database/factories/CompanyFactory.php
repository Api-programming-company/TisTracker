<?php

namespace Database\Factories;
use App\Models\AcademicPeriod;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'long_name' => $this->faker->company(),
            'short_name' => $this->faker->companySuffix(),
            'email' => $this->faker->unique()->safeEmail(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'academic_period_id' => AcademicPeriod::factory(), // Asigna un periodo académico válido
        ];
    }
}
