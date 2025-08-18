<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
}
