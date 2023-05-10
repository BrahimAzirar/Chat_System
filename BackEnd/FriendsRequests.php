<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    include('App.php');

    $FriendsReq = new FriendsRequests();
    $Friends = new FriendsList();

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "AddRequest") {
        new FriendsRequests($_POST['UserId'], $_POST['FriendId'], $_POST['Date']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetMyRequests") {
        header("Content-Type: JSON");
        echo json_encode($FriendsReq -> GetRequestsByUser($_POST['UserId']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "AcceptingFriend") {
        FriendsRequests :: AcceptingFriend($_POST['UserId'], $_POST['FriendId']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "DisacceptingFriend") {
        $FriendsReq -> DeleteRequest($_POST['UserId'], $_POST['FriendId']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetFriends") {
        header("Content-Type: JSON");
        echo json_encode($Friends -> AcceptedFriends($_POST['UserId']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetUserFriend") {
        header("Content-Type: JSON");
        echo json_encode($Friends -> GetUserFirends($_POST['UserId']));
    }


?>