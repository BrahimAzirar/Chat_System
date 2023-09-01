<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\InteractionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);
Route::get("/member/getData/{userId}", [MembersController::class, 'GetMemberData']);
Route::get('/posts/getAllData', [PostsController::class, 'GetallPostsData']);
Route::get('/posts/userdata/{UserId}', [PostsController::class, 'PostsUserData']);
Route::get('/Interaction/LikesDislikes/{PostId}', [InteractionController::class, 'GetLikesDislikesPost']);
Route::delete('Interaction/DeleteInteraction/{PostId}/{UserId}', [InteractionController::class, 'DeleteInteraction']);
