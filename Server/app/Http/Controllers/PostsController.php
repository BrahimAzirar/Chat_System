<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

use App\Models\posts;
use App\Models\members;

class PostsController extends Controller
{
    public function GetallPostsData() {
        try {
            $posts = posts::all();
            return ['response' => $posts];
        } catch (Exception $e) {
            return ['err' => $e -> getMessage()];
        }
    }

    public function PostsUserData($UserId) {
        try {
            $member = members::where('UserId', $UserId)
                            -> select('FirstName', 'LastName', '_Profile')
                            -> get();

            return ['response' => $member[0]];
        } catch (Exception $e) {
            return ['err' => $e -> getMessage()];
        }
    }
}
