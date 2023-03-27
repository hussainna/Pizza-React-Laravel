<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;


class AdminController extends Controller
{
    public function users()
    {
        $user=User::all();
        return response()->json([
            'status'=>200,
            'user'=>$user,
        ]);
    }
}
