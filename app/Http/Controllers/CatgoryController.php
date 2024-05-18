<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Catgory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CatgoryController extends Controller
{


    public function save(Request $request)
    {
        DB::beginTransaction();
        try {

            $cat = new Catgory();
            $cat->cat_name = $request->cat_name;
            if ($request->cat_parents) {
                $before = Catgory::where('cat_parents', $request->cat_parents)->first();
                if ($before) {
                    $last = Catgory::where('cat_parents', $request->cat_parents)->orderBy('cat_parents', 'desc')->first();
                    if ($last) {
                        $before->cat_parents = $last->cat_parents + 1;
                    }
                    $before->save();
                }
                $cat->cat_parents = $request->cat_parents;
            } else {
                $cat->cat_parents = 1;
            }

            $cat->cat_picture = '';
            $cat->cat_status = $request->cat_status;
            $cat->cat_detail = $request->cat_detail;
            $cat->save();

            DB::commit();

            return redirect('/catgory');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {

            if ($request->cat_parents) {
                $catbefore = Catgory::findOrFail($id);
                $parent = $catbefore->cat_parents;
                $catbe = Catgory::where('cat_parents', $parent)->first();
                $catbe->cat_parents = $catbefore->cat_parents;
                $catbe->save();
            }

            $cat = Catgory::find($id);
            $cat->cat_name = $request->cat_name;
            $cat->cat_parents = $request->cat_parents;
            $cat->cat_status = $request->cat_status;
            $cat->cat_detail = $request->cat_detail;
            $cat->save();
            DB::commit();
            return redirect('/catgory');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        $cat = Catgory::find($id);
        $cat->delete();
        return redirect('/catgory');
    }
}
