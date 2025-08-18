<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Public routes
 */
Route::controller(UserController::class)->group(function () {
    Route::post('login', 'login');
    Route::put('register', 'register');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('products', 'paginate');
    Route::get('product/details/{product}', 'getDetails');
    Route::post('product/search-suggestions', 'suggestions');
    Route::post('product/search', 'search');
});
//------------------------------------//

/**
 * Private routes
 */

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('logout', 'logout');
        Route::get('user/is-authenticated', 'getAuthenticatedUser');
        Route::get('wishlist/toggle/{product}', 'addOrDeleteWishlistItem');
        Route::get('wishlist/list', 'getUserWishlist');
    });
});
