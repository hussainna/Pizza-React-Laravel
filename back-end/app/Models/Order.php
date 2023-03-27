<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;
class Order extends Model
{
    use HasFactory;
    protected $table='orders';
    protected $fillable=[
        'firstname',
        'lastname',
        'email',
        'address',
        'state',
        'phone',
        'city',
        'zipcode',
        'payment_id',
        'payment_mode',
        'tracking_no',
        'status',
        'remark',

    ];

    public function orderitems(){
        return $this->hasMany(OrderItem::class,'order_id','id');
    }
}
