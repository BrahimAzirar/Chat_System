<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    include('App.php');

    $chat = new Chat();

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetMessages") {
        header("Content-Type: JSON");
        echo json_encode([
            'User' => $chat -> GetMessages($_POST['UserId'], $_POST['FriendId']),
            'Target' => $chat -> GetMessages($_POST['FriendId'], $_POST['UserId'])
        ]);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "SendMessage") {
        new Chat($_POST['from'], $_POST['friend'], $_POST['mess'], $_POST['date']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "LastMessage") {
        header("Content-Type: JSON");
        $User = $chat -> LastMessage($_POST['UserId'], $_POST['FriendId']);
        $Friend = $chat -> LastMessage($_POST['FriendId'], $_POST['UserId']);

        if (count($User) > 0 && count($Friend) > 0) {
            if ($User['date'] > $Friend['date']) {
                echo json_encode($User['mess']);
            } else {
                echo json_encode($Friend['mess']);
            };
        }

        elseif (count($User) > 0 && count($Friend) === 0) {
            echo json_encode($User['mess']);
        }

        elseif (count($Friend) > 0 && count($User) === 0) {
            echo json_encode($Friend['mess']);
        }
    }

?>