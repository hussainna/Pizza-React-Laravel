<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;


class CheckoutController extends Controller
{
    public function place(Request $request)
    {
        $user_id=auth('sanctum')->user()->id;

        $order=new Order;
        $order->firstname=$request->firstname;
        $order->user_id=auth('sanctum')->user()->id;
        $order->lastname=$request->lastname;
        $order->phone=$request->phone;
        $order->email=$request->email;
        $order->city=$request->city;
        $order->address=$request->address;
        $order->state=$request->state;
        $order->zipcode=$request->zipcode;

        $order->payment_mode=$request->payment_mode;
        $order->payment_id=$request->payment_id;
        $order->tracking_no='fundaecom'.rand(1111,9999);
        $order->save();

        $cart=Cart::where('user_id',$user_id)->get();
        $OrderItems=[];
        foreach($cart as $item){
            $OrderItems[]=[
                'product_id'=>$item->product_id,
                'qty'=>$item->qty,
                'price'=>$item->products->price,

            ];
            $item->products->update([
                'qty'=>$item->products->qty - $item->product_qty
            ]);
        }
        $order->orderitems()->createMany($OrderItems);
        Cart::destroy($cart);
        return response()->json([
            'status'=>200,
            'message'=>'Order  Placed Success'
        ]);
    
    }
    public function index()
    {
        $order=Order::all();
        return response()->json([
            'status'=>200,
            'order'=>$order
        ]);
    }
}
