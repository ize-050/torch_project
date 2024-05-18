<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CatgoryController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    //     return $request->user();
    // });

    Route::group(['middleware' => 'cors'], function () {
    Route::get('getallMenuProducts', [CatgoryController::class, 'getallMenuProducts']);

    Route::get('getAllproductByid/{id}', [ProductController::class, 'getAllproductByid']);

    Route::get('getAllproduct', [ProductController::class, 'getAllproduct']);

    Route::get('getProductDetail/{id}', [ProductController::class, 'getProductDetail']);

    Route::post('product/images/{id}', [ProductController::class, 'updateImages']);

    Route::delete('product/images/{id}', [ProductController::class, 'deleteImages']);

    Route::post('banner/images/{id}', [BannerController::class, 'updateImages']);

    Route::delete('banner/images/{id}', [BannerController::class, 'deleteImages']);
    });