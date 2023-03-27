<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\AdminController;



Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::get('all-products',[ProductController::class,'index']);
Route::get('single-pizza/{id}',[ProductController::class,'single']);


Route::group(['middleware' => ['auth:sanctum']],function(){

    Route::post('logout',[AuthController::class,'logout']);
    Route::post('insert-cart',[CartController::class,'insert']);
    Route::get('get-cart',[CartController::class,'index']);
    Route::post('place-order',[CheckoutController::class,'place']);

});

Route::group(['middleware' => ['auth:sanctum','isAdmin']],function(){

   Route::get('authcheck',function(){
      return response()->json([
        'status'=>200,
        'message'=>'you are admin'
      ]);
   });

   Route::post('insert-product',[ProductController::class,'insert']);
   Route::get('products',[ProductController::class,'index']);
   Route::post('delete-product/{id}',[ProductController::class,'delete']);
   Route::get('users',[AdminController::class,'users']);
   Route::get('orders',[CheckoutController::class,'index']);


   
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
