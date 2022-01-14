<?php
function logUser($uid) {
    include('dbConnection.php');

// log user
    $sql = "INSERT INTO online_users (uid) VALUES ('$uid');";
    $conn->query($sql);

// delete older logs
    $sql = "DELETE FROM online_users WHERE date < (NOW() - INTERVAL 1 MINUTE);";
    $conn->query($sql);
}

function getFromDB($lastId)
{

    include('dbConnection.php');
    $sql = "SELECT message.id as 'id', message.from_id as 'from_id', message.text as 'text', message.date as 'date', user.phone_number as 'phone_number' FROM message, user where message.id > $lastId and message.from_id = user.uid order by message.id ";

    $result = $conn->query($sql);

    $resultsJSON = array();
    while ($db_field = mysqli_fetch_assoc($result)) {
        $resultsJSON[] = $db_field;
    }
    echo json_encode($resultsJSON);

    $conn->close();
}

if (isset($_GET["lastMessageId"]) && isset($_GET["uid"])) {
    $lastId = (int) $_GET["lastMessageId"];
    $uid = $_GET["uid"];
    getFromDB($lastId);
    logUser($uid);
} else {
    http_response_code(404);
}
