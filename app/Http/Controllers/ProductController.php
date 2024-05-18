<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Catgory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::with('catgorys')->get();
        foreach ($product as $key => $products) {
            $res[$key] = $products;
            $product_image = ProductImage::where('product_id', $products->id)->first();
            $res[$key]['product_images'] = asset('images/product/' . $products->id . '/' . $product_image->image_names);
        }
        
        return Inertia::render('Product/Table', [
            'product' => $res
        ]);
    }

    public function save(Request $request)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                'cat_id' => 'required',
                'product_name' => 'required',
                'product_title' => 'required',
                'product_detail' => 'required',
                'product_price' => 'required',
                'product_status' => 'required',
                'product_images' => 'required',
            ]);

            $product = new Product;
            $product->cat_id = $request->cat_id;
            $product->product_name = $request->product_name;
            $product->product_title = $request->product_title;
            $product->product_detail = $request->product_detail;
            $product->product_price = $request->product_price;
            $product->product_status = $request->product_status;
            $product->save();

            if ($request->hasFile('product_images')) {
                $images = $request->file('product_images');

                foreach ($images as $image) {
                    $extension = $image->getClientOriginalExtension(); // Get the original extension of the file
                    $name = time() . '_' . uniqid() . '.' . $extension;
                    $productDirectory = public_path('/images/product/') . $product->id;
                    if (!file_exists($productDirectory)) {
                        mkdir($productDirectory, 0777, true); // Create the directory recursively
                    }

                    $destinationPath = $productDirectory;
                    $image->move($destinationPath, $name);

                    $productImage = new ProductImage;
                    $productImage->product_id = $product->id;
                    $productImage->image_names = $name;
                    $productImage->save();
                }
            }
            Db::commit();


            return redirect('/product');
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return Redirect::back()->with('error', $e->getMessage());
        }
    }


    public function edit(Request $request,$id){
        try{

            $request->validate([
                'cat_id' => 'required',
                'product_name' => 'required',
                'product_title' => 'required',
                'product_detail' => 'required',
                'product_price' => 'required',
                'product_status' => 'required'
            ]);

            $product = Product::findOrFail($id);
            $product->cat_id = $request->cat_id;
            $product->product_name = $request->product_name;
            $product->product_title = $request->product_title;
            $product->product_detail = $request->product_detail;
            $product->product_price = $request->product_price;
            $product->product_status = $request->product_status;
            $product->save();

            return redirect('/product');
        }
        catch(\Exception $e){
            throw $e;
        }
    }

    public function updateImages(Request $request, $id)
    {

        try {
            $res =[];
            $request->validate([
                'product_images' => 'required',
            ]);
            if ($request->hasFile('product_images')) {
                $images = $request->file('product_images');
                $data = [];
                foreach ($images as $index => $image) {
                    $extension = $image->getClientOriginalExtension(); // Get the original extension of the file
                    $name = time() . '_' . uniqid() . '.' . $extension;
                    $productDirectory = public_path('/images/product/') . $id;
                    if (!file_exists($productDirectory)) {
                        mkdir($productDirectory, 0777, true); // Create the directory recursively
                    }

                    $destinationPath = $productDirectory;
                    $image->move($destinationPath, $name);

                    $productImage = new ProductImage;
                    $productImage->product_id = $id;
                    $productImage->image_names = $name;
                    $productImage->save();

                    $data = ProductImage::where('id', $productImage->id)->first();

                    $url = asset("/images/product/" . $id . "/" . $data->image_names);

                    $res[$index] = [
                        'image_id' => $data->id,
                        'url' => $url
                    ];
                }

            }


            return response()->json($res);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function deleteImages($id)
    {
        try {
    
            // Find the image entry in the database
            $image = ProductImage::findOrFail($id);
            // Delete the image file from the folder
            $filePath = public_path('images/product/' . $image->product_id . '/' . $image->image_names);
            if (file_exists($filePath)) {
                unlink($filePath); 
            $image->delete();
            return response()->json(['message' => 'success'])->setStatusCode(200);
        } 
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            
            $product_image = ProductImage::where('product_id', $id)->get();
            foreach ($product_image as $image) {
                $filePath = public_path('images/product/' . $id . '/' . $image->image_names);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                $image->delete();
            }
            $product = Product::findOrFail($id);
            $product->delete();


            $directoryPath = public_path('images/product/' . $id);
            if (file_exists($directoryPath)) {
                $this->deleteDirectory($directoryPath); // Call function to delete directory recursively
            }

            DB::commit();
            return redirect('/product');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    // Function to recursively delete directory and its contents
private function deleteDirectory($directory)
{
    if (!file_exists($directory)) {
        return; // Directory does not exist
    }

    $files = array_diff(scandir($directory), array('.', '..'));
    foreach ($files as $file) {
        $path = $directory . '/' . $file;
        if (is_dir($path)) {
            $this->deleteDirectory($path); // Recursively delete subdirectories
        } else {
            unlink($path); // Delete individual file
        }
    }

    rmdir($directory); // Delete the empty directory
}
}


