<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiControllerTest extends TestCase
{

    use RefreshDatabase;

    private $products;

    protected function setUp(): void
    {
        parent::setUp();
        $this->products = Product::factory()
            ->count(12)
            ->create();
    }

    protected function tearDown(): void
    {
        $this->products->each->delete();
        parent::tearDown();
    }

    public function test_paginate_should_give_valid_pagination_json_structure()
    {

        $endPoint = "api/products";

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonStructure([
                "data" => [
                    "*" => [
                        "id",
                        "title",
                        "category",
                        "price",
                        "thumbnail"
                    ]
                ],
                "meta" => [
                    "current_page",
                    "last_page",
                    "per_page",
                    "total"
                ],
                "links" => [
                    "first",
                    "last",
                    "prev",
                    "next"
                ]
            ]);
    }

    public function test_getDetails_should_give_correct_product_resource()
    {
        $randomProduct = $this->products->random();

        $endPoint = "api/product/details/{$randomProduct->id}";

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertExactJson([
                'data' => [
                    'id' => $randomProduct->id,
                    'title' => $randomProduct->title,
                    'category' => $randomProduct->category,
                    'price' => number_format($randomProduct->price / 100, 2),
                    'quantity' => $randomProduct->quantity,
                    'media' => $randomProduct->productImages(),
                    'description' => $randomProduct->description
                ]
            ]);
    }

    public function test_getDetails_should_give_404_as_response_when_product_does_not_exist()
    {

        $existingIds = $this->products->pluck('id')->toArray();

        $randomId = rand(count($existingIds) + 1, count($existingIds) + 20);

        $endPoint = "api/product/details/{$randomId}";

        $this->getJson($endPoint)
            ->assertNotFound();
    }

    public function test_suggestions_should_give_valid_suggestions()
    {
        $productTitle = $this->products->random()->title;
        $searchQuery = substr($productTitle, 0, 2);
        $endPoint = 'api/product/search-suggestions';

        $payload = [
            'search_query' =>  $searchQuery
        ];

        $this->postJson($endPoint, $payload)
            ->assertSuccessful()
            ->assertJsonFragment([
                'title' => $productTitle
            ]);
    }

    public function test_search_should_give_valid_search_result()
    {
        $productTitle = $this->products->random()->title;
        $searchQuery = substr($productTitle, 0, 2);
        $endPoint = "api/product/search";


        $payload = [
            'search_query' =>  $searchQuery
        ];

        $this->postJson($endPoint, $payload)
            ->assertSuccessful()
            ->assertJsonFragment([
                'title' => $productTitle
            ]);
    }

    public function test_search_should_return_empty_collection_when_no_matching_products()
    {
        $nonExistingProductTitle = 'a non existing product title in database';
        $endPoint = "api/product/search";


        $payload = [
            'search_query' =>  $nonExistingProductTitle
        ];

        $this->postJson($endPoint, $payload)
            ->assertSuccessful()
            ->assertJsonFragment([
                'data' => []
            ]);
    }
}
