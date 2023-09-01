<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\members;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Register(Request $req) : array {
        $member = new members();

        $member -> FirstName = $req -> input('FirstName');
        $member -> LastName = $req -> input('LastName');
        $member -> Email = $req -> input('Email');
        $member -> Thel = $req -> input('Thel');
        // $member -> _Password = Hash::make($req -> input('Password'));
        $member -> _Password = $req -> input('Password');

        $member -> save();

        $id = $member -> UserId;

        return ['response' => "/account/$id"];
    }

    public function Login(Request $req) {
        $email = $req -> input('Email');
        // $pass = Hash::make($req -> input('Password'));
        $pass = $req -> input('Password');

        $member = members::where('Email', $email)
                        -> where('_Password', $pass)
                        -> select('FirstName', 'LastName', 'Email', 'Thel', '_Profile', 'UserId')
                        -> get();

        if (count($member)) {
            // $req -> session() -> put('member', $member + ['isAuth' => true]);
            $id = $member[0]['UserId'];
            return ['response' => "/account/$id"];
        } else {
            return ["err" => "The email or password incorrect !!!"];
        };
    }
}
