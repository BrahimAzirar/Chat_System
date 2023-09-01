<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\members;
use Exception;

class MembersController extends Controller
{
    public function GetMemberData($userId) {
        try {
            $member = members::where('UserId', $userId)
                        -> select('FirstName', 'LastName', 'Email', 'Thel', '_Profile', 'UserId')
                        -> get();

            return ['response' => $member[0]];
        } catch (Exception $e) {
            return ["err" => $e->getMessage()];
        }
    }
}
