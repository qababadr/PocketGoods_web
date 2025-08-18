<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProductResource;
use App\Http\Resources\WishlistResource;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                "data" => null,
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                "error_message" => __('auth.failed')
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken($user->name)->plainTextToken;

        $user->load('wishlist.product');

        return response([
            "data" => [
                'user' => new UserResource($user),
                'token' => $token
            ]
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $validatedData['password'] = Hash::make($validatedData['password']);

            $user = User::create($validatedData);

            event(new Registered($user));

            return response()->json([
                "data" => __('auth.registered')
            ], Response::HTTP_CREATED);
        } catch (QueryException $exp) {
            return response()->json([
                "error_message" => __('errors.register_error')
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (Exception $exp) {
            return response()->json([
                "error_message" => __('errors.unexpected_error')
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAuthenticatedUser(Request $request)
    {
        $user = $request->user();

        if ($user === null) {
            return response()->json([
                "data" => null
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user->load('wishlist.product');

        return response([
            "data" => new UserResource($user)
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                $user->tokens()->delete();

                try {
                    $request->session()->invalidate();
                    $request->session()->regenerate();
                } catch (Exception $exp) {
                    Log::error("Session logout failed: {$exp->getMessage()}");
                }

                return response()->json([
                    "data" => true
                ], Response::HTTP_OK);
            }
        } catch (Exception $exp) {
            return response()->json([
                "error_message" => __("errors.logout_error")
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function addOrDeleteWishlistItem(Product $product)
    {
        try {
            $user = auth()->user();

            $productInWishlist = $user->wishlistItem($product->id)
                ->first();

            if ($productInWishlist == null) {
                $wishlistItem = Wishlist::create([
                    'product_id',
                    'user_id'
                ]);

                return response([
                    'data' => [
                        'wishlist_itemL_id' => $wishlistItem->id,
                        'in_wishlist' => true,
                        'product' => new ProductResource($product)
                    ]
                ], Response::HTTP_OK);
            } else {
                Wishlist::where('product_id', $product->id)
                    ->where('user_id', $user->id)
                    ->delete();

                return response([
                    'data' => [
                        'wishlist_itemL_id' => -1,
                        'in_wishlist' => false,
                        'product' => null
                    ]
                ], Response::HTTP_OK);
            }
        } catch (Exception $exp) {
            return response([
                'error_message' => __('errors.unexpected_error')
            ], Response::HTTP_OK);
        }
    }

    public function getUserWishlist()
    {
        $user = Auth::user();

        $wishlist = $user->wishlist()
            ->with('product.media')
            ->orderBy('created_at', 'desc')
            ->get();

        return WishlistResource::collection($wishlist);
    }
}
