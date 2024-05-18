<?php

namespace App\Http\Controllers;
use App\Models\Banner;
use Illuminate\Http\Request;
use  Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
class BannerController extends Controller
{
    public function index()
    {
        $banner = Banner::all();
        foreach($banner as $key=> $banners){
            $res[$key] = $banners;
            $res[$key]->banner_picture = asset('images/banner/'.$banners->banner_picture);
        }
        return Inertia::render('Banner/Table',[
            'banner' => $res
        ]);
    }

    public function add()
    {
        return Inertia::render('Banner/Add');
    }

    public function save(Request $request)
    {
        $banner = new Banner;
        $banner->banner_name = $request->banner_name;
        $banner->banner_status = $request->banner_status;
        if($request->hasFile('banner_picture')){

            $file = $request->file('banner_picture');
            $extension = $file->getClientOriginalExtension(); 
            $name = time() . '_' . uniqid() . '.' . $extension;
            $productDirectory = public_path('/images/banner/');
            // if (!file_exists($productDirectory)) {
            //     mkdir($productDirectory, 0777, true); 

            $destinationPath = $productDirectory;
            $file->move($destinationPath, $name);
            $banner->banner_picture = $name;
        }
        $banner->save();
        return redirect('/banner');
    }   
    public function edit($id)
    {
        $banner = Banner::find($id);
        $banner->banner_picture = asset('images/banner/'.$banner->banner_picture);
        return Inertia::render('Banner/Edit',[
            'banner' => $banner
        ]);
    }
    public function update(Request $request,$id)
    {
        $banner = Banner::find($id);
        $banner->banner_name = $request->banner_name;
        $banner->banner_status = $request->banner_status;
        $banner->save();
        return redirect('/banner');
    }
    public function delete($id)
    {
        $banner = Banner::find($id);

        $filePath = public_path('images/banner/'  . $banner->banner_picture);
        if (file_exists($filePath)) {
            unlink($filePath); 
        }
        $banner->delete();
        return redirect('/banner'); 
    }


    public function updateImages(Request $request, $id)
    {

        try {
            $res =[];
            $request->validate([
                'banner_picture' => 'required',
            ]);
            if ($request->hasFile('banner_picture')) {
                $images = $request->file('banner_picture');
                $data = [];
                    $extension = $images->getClientOriginalExtension(); // Get the original extension of the file
                    $name = time() . '_' . uniqid() . '.' . $extension;
                    $productDirectory = public_path('/images/banner/');

                    $destinationPath = $productDirectory;
                    $images->move($destinationPath, $name);

                    $productImage = Banner::find($id);
                    $productImage->banner_picture = $name;
                    $productImage->save();

                    $data = Banner::where('id', $id)->first();

                    $url = asset('images/banner/'.$data->banner_picture);

                    $res[0] = [
                        'banner_id' => $id,
                        'url' => $url
                    ];
                

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
            $image = Banner::findOrFail($id);
           
            // Delete the image file from the folder
            $filePath = public_path('images/banner/'  . $image->banner_picture);
            if (file_exists($filePath)) {
                unlink($filePath); 
            }
            $image->banner_picture = null;
            $image->save();
            return response()->json(['message' => 'success'])->setStatusCode(200);
        
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
