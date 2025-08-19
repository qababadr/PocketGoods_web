<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Wishlist;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->product = Product::factory()->create();
    }

    protected function tearDown(): void
    {
        $this->user->delete();
        parent::tearDown();
    }

    public function test_login_should_authenticate_user_by_providing_correct_credentials()
    {

        $endPoint = "api/login";

        $payload = [
            'email' => $this->user->email,
            'password' => 'password'
        ];

        $this->postJson($endPoint, $payload)
            ->assertSuccessful();
    }

    public function test_register_with_duplicate_email_should_give_validation_error()
    {
        $endPoint = "api/register";

        $payload = [
            'name' => $this->user->name,
            'email' => $this->user->email,
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ];

        $this->putJson($endPoint, $payload)
            ->assertBadRequest();
    }

    public function test_logout_should_signout_user()
    {
        $endPoint = 'api/logout';
        $isAuthenticatedEndPoint = 'api/user/is-authenticated';

        Sanctum::actingAs($this->user, ['*']);

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJson(['data' => true]);

        $this->assertCount(0, $this->user->tokens);

        $this->app->get('auth')->forgetGuards();

        $this->getJson($isAuthenticatedEndPoint)
            ->assertUnauthorized();
    }

    public function test_getAuthenticatedUser_should_get_authenticated_user()
    {
        $endPoint = 'api/user/is-authenticated';

        Sanctum::actingAs($this->user, ['*']);

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonFragment([
                'name' => $this->user->name
            ]);
    }

    public function test_addOrDeleteWishlistItem_should_add_product_to_wishlist()
    {
        $endPoint = "api/wishlist/toggle/{$this->product->id}";

        Sanctum::actingAs($this->user, ['*']);

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonFragment([
                'in_wishlist' => true
            ]);
    }

    public function test_addOrDeleteWishlistItem_should_remove_product_to_wishlist()
    {
        $endPoint = "api/wishlist/toggle/{$this->product->id}";

        $wishlistItem = Wishlist::create([
            'product_id' => $this->product->id,
            'user_id' => $this->user->id
        ]);

        Sanctum::actingAs($this->user, ['*']);

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonFragment([
                'in_wishlist' => false
            ]);

        $wishlistItem->delete();
    }

    public function test_getUserWishlist_should_get_authenticated_user_wishlist()
    {
        $endPoint = "api/wishlist/toggle/{$this->product->id}";

        Sanctum::actingAs($this->user, ['*']);

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonFragment([
                'in_wishlist' => true
            ]);

        $endPoint = "api/wishlist/list";

        $this->getJson($endPoint)
            ->assertSuccessful()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment([
                'title' => $this->product->title
            ]);
    }
}
