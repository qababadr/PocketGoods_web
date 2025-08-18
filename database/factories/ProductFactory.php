<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{

    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => fake()->unique()->words(3, true),
            "category" => fake()->randomElement(["Electronics", "Grocery", "Clothing"]),
            "price" => fake()->numberBetween(100, 1000),
            "quantity" => fake()->numberBetween(1, 100),
            "description" => fake()->sentence()
        ];
    }
}
