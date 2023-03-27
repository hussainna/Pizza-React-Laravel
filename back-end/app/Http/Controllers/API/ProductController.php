<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function insert(Request $request)
    {
       
            $product=new Products;
            $product->name=$request->input('name');
            $product->description=$request->input('description');
            $product->price=$request->input('price');
            if($request->hasFile('image'))
            {
                $file=$request->file('image');
                $extension=$file->getClientOriginalExtension();
                $filename=time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $product->image='uploads/product/'.$filename;
            }

            $product->save();
            return response()->json([
                'status'=>200,
                'message'=>'the product item added successfully'
            ]);

    }

    public function index()
    {
        $product=Products::all();
        return response()->json([
            'status'=>200,
            'product'=>$product,
        ]);
    }

    public function delete($id)
    {
        $product=Products::find($id);
        $product->delete();
        return response()->json([
            'status'=>200,
            'message'=>'the product deleted',
        ]);
    }

   public function single($id)
   {
    $product=Products::find($id);
    return response()->json([
        'status'=>200,
        'product'=>$product,
    ]);
   }
}
