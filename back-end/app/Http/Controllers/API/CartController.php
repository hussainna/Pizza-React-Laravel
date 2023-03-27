<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Products;

class CartController extends Controller
{
    public function insert(Request $request)
    {
        $product_id=$request->product_id;
        $qty=$request->qty;
        $user_id=auth('sanctum')->user()->id;
        $productCheck=Products::where('id',$product_id)->first();
        if($productCheck)
        {
            if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
            {
                return response()->json([
                    'status'=>409,
                    'message'=>$productCheck->name.' already added to pizza',
                ]);
            }
            else
            {
                $cart=new Cart;
                $cart->product_id=$product_id;
                $cart->qty=$qty;
                $cart->user_id=$user_id;

                $cart->save();
                return response()->json([
                    'status'=>201,
                    'message'=>'Added To Cart'
                ]);
                
            }
        }
    }

    public function index()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cartItem=Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cartItem,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'you are not login'
            ]);
        }
    }
}
