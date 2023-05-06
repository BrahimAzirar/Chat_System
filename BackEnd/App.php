<?php

    class Users {
        private $conn;
        private string $FirstName;
        private string $LastName;
        private string $Thel;
        private string $Email;
        private string $Password;
        private string $Profile;
        private bool $Admin;

        public function __construct(string $FirstName = null, string $LastName = null, string $Thel = null,
            string $Email = null, string $Password = null, string $Profile = null, bool $Admin = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($FirstName && $LastName && $Thel && $Email && $Password && $Profile && $Admin) {
                $this -> FirstName  = $FirstName;
                $this -> LastName  = $LastName;
                $this -> Thel  = $Thel;
                $this -> Email  = $Email;
                $this -> Password  = $Password;
                $this -> Profile  = $Profile;
                $this -> Admin  = $Admin;

                $insert = $this->conn->prepare("INSERT INTO Users(FirstName, LastName, Thel,
                    Email, _Password, _Profile, _Admin) VALUE(?, ?, ?, ?, ?, ?, ?)");

                $insert -> execute([
                    $this -> FirstName, $this -> LastName, $this -> Thel, $this -> Email,
                    $this -> Password, $this -> Profile, $this -> Admin
                ]);
            }
        }

        public function GetUser(int $id)
        {
            $response = [];
            $user = $this -> conn -> prepare("SELECT * FROM Users WHERE UserId = $id");
            $user -> execute();

            foreach ($user as $item) {
                array_push($response, [
                    "id" => $item["UserId"],
                    "FirstName" => $item["FirstName"],
                    "LastName" => $item["LastName"],
                    "Thel" => $item["Thel"],
                    "Email" => $item["Email"],
                    "Password" => $item["_Password"],
                    "Profile" => $item["_Profile"],
                    "Admin" => $item["_Admin"],
                ]);
            };

            return $response[0];
        }

        public function GetUserId(string $Email, string $Password)
        {
            $userId = null;
            $id = $this -> conn -> prepare("SELECT UserId FROM Users WHERE Email = '$Email' AND _Password = '$Password'");
            $id -> execute();

            foreach ($id as $item) {
                $userId = $item['UserId'];
            };

            return $userId;
        }

        public function GetProfile(int $id)
        {
            $response = null;
            $profile = $this -> conn -> prepare("SELECT _Profile FROM Users WHERE UserId = $id");
            $profile -> execute();

            foreach ($profile as $item) {
                $response = $item['_Profile'];
            };

            return $response;
        }

        public function GetAllData()
        {
            $response = [];
            $data = $this -> conn -> prepare("SELECT * FROM Users");
            $data -> execute();

            foreach ($data as $item) {
                array_push($response, [
                    "id" => $item["UserId"],
                    "FirstName" => $item["FirstName"],
                    "LastName" => $item["LastName"],
                    "Thel" => $item["Thel"],
                    "Email" => $item["Email"],
                    "Password" => $item["_Password"],
                    "Profile" => $item["_Profile"],
                    "Admin" => $item["_Admin"],
                ]);
            };

            return $response;
        }

        public function setFirstName(int $id, string $FirstName)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET FirstName = ? WHERE UserId = $id");
            $update -> execute([$FirstName]);
        }

        public function setLastName(int $id, string $LastName)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET LastName = ? WHERE UserId = $id");
            $update -> execute([$LastName]);
        }

        public function setThel(int $id, string $Thel)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET Thel = ? WHERE UserId = $id");
            $update -> execute([$Thel]);
        }

        public function setEmail(int $id, string $Email)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET Email = ? WHERE UserId = $id");
            $update -> execute([$Email]);
        }

        public function setPassword(int $id, string $Password)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET _Password = ? WHERE UserId = $id");
            $update -> execute([$Password]);
        }

        public function setProfile(int $id, string $Profile)
        {
            $update = $this -> conn -> prepare("UPDATE Users SET _Profile = ? WHERE UserId = $id");
            $update -> execute([$Profile]);
        }
    }

    class Posts {
        private $conn;
        public int $id;
        private int $UserId;
        private string $PostArticale;
        private string $PostData;
        private string $PostDate;

        public function __construct(int $UserId = null, string $PostArticale = null,
            string $PostData = null, string $PostDate = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($UserId && $PostArticale && $PostData && $PostDate) {
                $this -> UserId = $UserId;
                $this -> PostArticale = $PostArticale;
                $this -> PostData = $PostData;
                $this -> PostDate = $PostDate;

                $post = $this -> conn -> prepare("INSERT INTO Posts(UserId, PostActicle, PostData,
                    PostDate) VALUE(?, ?, ?, ?)");
                $post -> execute([$this -> UserId, $this -> PostArticale, $this -> PostData, $this -> PostDate]);

                $this -> id = $this -> GetPostId($this -> UserId, $this -> PostArticale, $this -> PostData, $this -> PostDate);
            };
        }

        public function GetPostId(int $UserId, string $PostArticle, string $PostData, string $PostDate)
        {
            $response = null;
            $id = $this -> conn -> prepare("SELECT PostId FROM Posts WHERE UserId = $UserId AND PostActicle = '$PostArticle' AND
                PostData = '$PostData' AND PostDate = '$PostDate'");

            $id -> execute();

            foreach ($id as $item) {
                $response = $item['PostId'];
            };

            return $response;
        }

        public function GetPost(int $id)
        {
            $response = [];
            $post = $this -> conn -> prepare("SELECT * FROM Posts WHERE PostId = $id");
            $post -> execute();

            foreach ($post as $item) {
                array_push($response, [
                    'id' => $item['PostId'],
                    'UserId' => $item['UserId'],
                    'PostActicle' => $item['PostActicle'],
                    'PostData' => $item['PostData'],
                    'PostDate' => $item['PostDate']
                ]);
            };

            return $response;
        }

        public function GetAllPosts()
        {
            $response = [];
            $posts = $this -> conn -> prepare("SELECT * FROM Posts");
            $posts -> execute();

            foreach ($posts as $item) {
                array_push($response, [
                    'id' => $item['PostId'],
                    'UserId' => $item['UserId'],
                    'PostActicle' => $item['PostActicle'],
                    'PostData' => $item['PostData'],
                    'PostDate' => $item['PostDate']
                ]);
            };

            return $response;
        }
    }

    class Interaction {
        private $conn;
        private int $PostId;
        private int $UserId;
        private string $InteractionType;

        function __construct(int $PostId = null, int $UserId = null, string $InteractionType = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($PostId && $UserId && $InteractionType) {
                $this -> PostId = $PostId;
                $this -> UserId = $UserId;
                $this -> InteractionType = $InteractionType;

                $insert = $this -> conn -> prepare("INSERT INTO Interaction VALUE(?, ?, ?)");
                $insert -> execute([$this -> PostId, $this -> UserId, $this -> InteractionType]);
            }
        }

        public function SetInteractionType(int $PostId, int $UserId, string $InteractionType)
        {
            $update = $this -> conn -> prepare("UPDATE Interaction SET InteractionType = '$InteractionType'
                WHERE PostId = $PostId AND UserId = $UserId");

            $update -> execute();
        }

        public function DeleteInteractionType(int $PostId, int $UserId)
        {
            $delete = $this -> conn -> prepare("DELETE FROM Interaction WHERE PostId = $PostId
                AND UserId = $UserId");
            $delete -> execute();
        }

        public function GetLikesAndDislikess(int $PostId)
        {
            $response = ['Likes' => [], 'Dislikes' => []];
            $Likes = $this -> conn -> prepare("SELECT UserId FROM Interaction WHERE InteractionType = 'Like' and PostId = $PostId");
            $Dislikes = $this -> conn -> prepare("SELECT UserId FROM Interaction WHERE InteractionType = 'Dislike' and PostId = $PostId");

            $Likes -> execute(); $Dislikes -> execute();

            foreach ($Likes as $item) {
                array_push($response['Likes'], $item['UserId']);
            };

            foreach ($Dislikes as $item) {
                array_push($response['Dislikes'], $item['UserId']);
            };

            return $response;
        }
    }

    class Comment {
        private $conn;
        private int $PostId;
        private int $UserId;
        private string $Comment;

        function __construct(int $PostId = null, int $UserId = null, string $Comment = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($PostId && $UserId && $Comment) {
                $this -> PostId = $PostId;
                $this -> UserId = $UserId;
                $this -> Comment = $Comment;

                $comment = $this -> conn -> prepare("INSERT INTO Comments VALUE(?, ?, ?)");
                $comment -> execute([$this -> PostId, $this -> UserId, $this -> Comment]);
            }
        }

        public function GetPostComments(int $PostIs)
        {
            $response = [];
            $comments = $this -> conn -> prepare("SELECT * FROM Comments WHERE PostId = $PostIs");
            $comments -> execute();

            foreach ($comments as $item) {
                array_push($response, [
                    'post' => $item['PostId'],
                    'target' => $item['UserId'],
                    'comment' => $item['_Comment'],
                ]);
            };

            return $response;
        }
    }

    class FriendsRequests {
        private $conn;
        private int $UserId;
        private int $FriendId;
        private string $RequestDate;

        function __construct(int $UserId = null, int $FriendId = null, string $RequestDate = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($UserId && $FriendId && $RequestDate) {
                $this -> UserId = $UserId;
                $this -> FriendId = $FriendId;
                $this -> RequestDate = $RequestDate;

                $req = $this -> conn -> prepare("INSERT INTO FriendsRequests VALUE(?, ?, ?)");
                $req -> execute([$this -> UserId, $this -> FriendId, $this -> RequestDate]);
            };
        }

        public function GetRequestsByUser(int $id)
        {
            $response = [];
            $req = $this -> conn -> prepare("SELECT * FROM FriendsRequests WHERE UserId = $id");
            $req -> execute();

            foreach ($req as $item) {
                array_push($response, [
                    'UserId' => $item['UserId'],
                    'FriendId' => $item['FriendId'],
                    'Date' => $item['RequestDate']
                ]);
            };

            return $response;
        }

        public function GetFriendsRequests(int $id)
        {
            $response = [];
            $req = $this -> conn -> prepare("SELECT UserId FROM FriendsRequests WHERE FriendId = $id");
            $req -> execute();

            foreach ($req as $item) {
                array_push($response, $item['UserId']);
            };

            return $response;
        }

        public static function AcceptingFriend (int $UserId, int $FriendId) {
            $conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");
            $transaction = $conn -> prepare("CALL AcceptingFriend($UserId, $FriendId)");
            $transaction -> execute();
        }

        public function DeleteRequest(int $UserId, int $FriendId)
        {
            $delete = $this -> conn -> prepare("DELETE FROM FriendsRequests WHERE UserId = $UserId AND FriendId = $FriendId");
            $delete -> execute();
        }
    }

    class FriendsList {
        private $conn;
        private int $UserId;
        private int $FriendId;

        function __construct(int $UserId = null, int $FriendId = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($UserId && $FriendId) {
                $this -> UserId = $UserId;
                $this -> FriendId = $FriendId;

                $addFriend = $this -> conn -> prepare("INSERT INTO FriendsList VALUE(?, ?)");
                $addFriend -> execute([$this -> UserId, $this -> FriendId]);
            };
        }

        public function AcceptedFriends(int $UserId)
        {
            $response = [];
            $Friends = $this -> conn -> prepare("SELECT FriendId FROM FriendsList WHERE UserId = $UserId");
            $Friends -> execute();

            foreach ($Friends as $id) {
                array_push($response, $id['FriendId']);
            };

            return $response;
        }
    }

    class Chat {
        private $conn;
        private int $UserId;
        private int $FriendId;
        private string $Message;
        private string $MessageDate;

        function __construct(int $UserId = null, int $FriendId = null, string $Message = null, string $MessageDate = null)
        {
            $this -> conn = new PDO("mysql:host=localhost:3306;dbname=ChatSystem;", "root", "26022002");

            if ($UserId && $FriendId && $Message && $MessageDate) {
                $this -> UserId = $UserId;
                $this -> FriendId = $FriendId;
                $this -> Message = $Message;
                $this -> MessageDate = $MessageDate;

                $chat = $this -> conn -> prepare("INSERT INTO Chat VALUE(?, ?, ?, ?)");
                $chat -> execute([$this -> UserId, $this -> FriendId, $this -> Message, $this -> MessageDate]);
            };
        }

        public function GetMessages(int $UserId, int $FriendId)
        {
            $response = [];
            $messages = $this -> conn -> prepare("SELECT Message, MessageDate FROM Chat
                WHERE UserId = $UserId AND FriendId = $FriendId");

            $messages -> execute();

            foreach ($messages as $mess) {
                array_push($response, [
                    'from' => $UserId,
                    'mess' => $mess['Message'],
                    'date' => $mess['MessageDate']
                ]);
            };

            return $response;
        }

        public function LastMessage(int $userId, int $friendId)
        {
            $response = [];
            $lastMess = $this -> conn -> prepare("SELECT Message, MessageDate FROM Chat WHERE MessageDate IN 
                (SELECT max(MessageDate) FROM Chat WHERE UserId = $userId AND FriendId = $friendId)");

            $lastMess -> execute();

            foreach ($lastMess as $mess) {
                array_push($response, [
                    'mess' => $mess['Message'],
                    'date' => $mess['MessageDate']
                ]);
            };

            return (count($response) > 0 ? $response[0] : []);
        }
    }

?>