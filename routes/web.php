<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CatgoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Catgory;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::group(['prefix' => 'catgory'], function () {
    Route::post('/save', [CatgoryController::class, 'save']);
    Route::get('/',function(){
        return Inertia::render('Catgory/Table',[
            'catgory' => Catgory::orderBy('cat_parents','asc')->get()
        ]);
    });
    Route::get('/add',function(){
        return Inertia::render('Catgory/Add',[
            'catgory' => Catgory::all()
            ]);
    });
    Route::get('/edit/{id}',function($id){
        return Inertia::render('Catgory/Edit',[
            'catgory' =>Catgory::find($id)
        ]);
    });
    Route::put('/update/{id}',[CatgoryController::class,'update']); 
    Route::delete('/delete/{id}',function($id){
        $cat = Catgory::find($id);
        $cat->delete();
        return redirect('/catgory');
    });
});




Route::group(["prefix" => "product"], function () { //สินค้า
   Route::get('/',[ProductController::class,'index']);
   Route::get('/add',function(){
       return Inertia::render('Product/Add',[
           'catgory' => Catgory::all()
       ]);
   });
   Route::get('/edit/{id}',function($id){
       return Inertia::render('Product/Edit',[
           'product' => Product::where ('id',$id)->with('catgorys','product_images')->first(),
           'catgory' => Catgory::all()
       ]);
   });
   Route::post('/save', [ProductController::class, 'save']);

   Route::post('/images/{id}',[ProductController::class,'updateImages']);

   Route::put('/edit/{id}',[ProductController::class,'edit']);

   Route::delete('/delete/{id}',[ProductController::class,'delete']);

});



Route::group(["prefix" => "banner"], function () { //รูปภาพสินค้า
    Route::get('/',[BannerController::class,'index']);  
    Route::get('/add',[BannerController::class,'add']);
    Route::get('/edit/{id}',[BannerController::class,'edit']);
    Route::post('/save',[BannerController::class,'save']);
    Route::put('/edit/{id}',[BannerController::class,'update']);
    Route::delete('/delete/{id}',[BannerController::class,'delete']);
});


// Route::put('/catgory/update/{id}',[CatgoryController::class,'update']);
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
