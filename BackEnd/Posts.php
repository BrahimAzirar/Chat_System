<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    include('App.php');

    $post = new Posts();
    $react = new Interaction();
    $comment = new Comment();

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "AddPost") {
        header("Content-Type: JSON");
        $post = new Posts($_POST['UserId'], $_POST['PostArticle'], $_POST['PostData'], $_POST['PostDate']);
        echo json_encode($post -> GetPost($post -> id)[0]);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetAllPosts") {
        header("Content-Type: JSON");
        echo json_encode($post -> GetAllPosts());
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "ReactWithPost") {
        new Interaction($_POST['PostId'], $_POST['UserId'], $_POST['InteractionType']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "changingInteraction") {
        $react -> SetInteractionType($_POST['PostId'], $_POST['UserId'], $_POST['InteractionType']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "DeleteInteraction") {
        $react -> DeleteInteractionType($_POST['PostId'], $_POST['UserId']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "Likes&Dislikes") {
        header("Content-Type: JSON");
        echo json_encode($react -> GetLikesAndDislikess($_POST['PostId']));
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "AddComment") {
        new Comment($_POST['PostId'], $_POST['UserId'], $_POST['Comment']);
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['type'] === "GetComments") {
        header("Content-Type: JSON");
        echo json_encode($comment -> GetPostComments($_POST['PostId']));
    }

?>