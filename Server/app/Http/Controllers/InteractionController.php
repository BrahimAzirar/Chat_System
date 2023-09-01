<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

use App\Models\interaction;
use Illuminate\Support\Facades\DB;

class InteractionController extends Controller
{
    public function GetLikesDislikesPost($PostId) {
        try {
            function MAP ($arr, $callback) {
                $new_array = [];
                foreach ($arr as $value) {
                    array_push($new_array, $callback($value));
                };
                return $new_array;
            };

            $Likes = interaction::where('PostId', $PostId)
            -> where('InteractionType', 1)
            -> select('userId')
            -> get();

            $Dislikes = interaction::where('PostId', $PostId)
            -> where('InteractionType', 0)
            -> select('userId')
            -> get();

            $Likes = MAP($Likes, fn ($ele) => $ele['userId']);
            $Dislikes = MAP($Dislikes, fn ($ele) => $ele['userId']);

            return [
                'response' => ['Likes' => $Likes, 'Dislikes' => $Dislikes]
            ];
        } catch (Exception $e) {
            return ['err' => $e -> getMessage()];
        }
    }

    public function DeleteInteraction($PostId, $UserId) {
        try {
            DB::select("DELETE FROM Interactions WHERE PostId = $PostId AND UserId = $UserId");
        } catch (Exception $e) {
            return ['err' => $e -> getMessage()];
        }
    }
}
