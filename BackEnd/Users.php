<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    include('App.php');

    $user = new Users();
    $FriendsReq = new FriendsRequests();

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "CreateAccount") {
        new Users($_POST['FirstName'], $_POST['LastName'], $_POST['Thel'], $_POST['Email'], $_POST['Password'],
            $_POST['Profile'], (bool) $_POST['Admin']);

        header("Content-Type: JSON");
        echo json_encode($user -> GetUserId($_POST['Email'], $_POST['Password']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetProfile") {
        header("Content-Type: JSON");
        echo json_encode($user -> GetProfile($_POST['id']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetUser") {
        header("Content-Type: JSON");
        echo json_encode($user -> GetUser($_POST['id']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Update_First_Last_Name") {
        $user -> setFirstName($_POST['UserId'], $_POST['FirstName']);
        $user -> setLastName($_POST['UserId'], $_POST['LastName']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Update_Email") {
        $user -> setEmail($_POST['UserId'], $_POST['Email']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Update_Thel") {
        $user -> setThel($_POST['UserId'], $_POST['Thel']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Update_Password") {
        $user -> setPassword($_POST['UserId'], $_POST['Password']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Update_Profile") {
        $user -> setProfile($_POST['UserId'], $_POST['Profile']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetUsersPost") {
        header("Content-Type: JSON");
        $data = [
            "FirstName" => $user -> GetUser($_POST['id'])["FirstName"],
            "LastName" => $user -> GetUser($_POST['id'])["LastName"],
            "Profile" => $user -> GetUser($_POST['id'])["Profile"]
        ];
        echo json_encode($data);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetSomeUsersData") {
        header("Content-Type: JSON");

        function Filter(array $arr) {
            return [
                'id' => $arr['id'],
                'FirstName' => $arr['FirstName'],
                'LastName' => $arr['LastName'],
                'Profile' => $arr['Profile']
            ];
        };

        echo json_encode(array_map('Filter', $user -> GetAllData()));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetFriendsRequests") {
        header("Content-Type: JSON");
        $requests = []; $usersArr = $FriendsReq -> GetFriendsRequests($_POST['UserId']);

        function Filter(array $arr) {
            return [
                'id' => $arr['id'],
                'FirstName' => $arr['FirstName'],
                'LastName' => $arr['LastName'],
                'Profile' => $arr['Profile']
            ];
        };

        foreach ($usersArr as $id) {
            array_push($requests, $user -> GetUser($id));
        };

        echo json_encode(array_map('Filter', $requests));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "EnterToAccount") {
        header("Content-Type: JSON");
        print json_encode($user -> GetUserId($_POST['Email'], $_POST['Password']));   
    }

?>