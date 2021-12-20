<?php
function getFromDB($lastId, $from, $to)
{
    include('dbConnection.php');

    $sql = "SELECT * FROM message where (from_id = $from or from_id = $to) and (to_id = $from or to_id = $to) and id > $lastId order by id";

    $result = $conn->query($sql);

    $resultsJSON = array();
    while ($db_field = mysqli_fetch_assoc($result)) {
        $resultsJSON[] = $db_field;
    }
    echo json_encode($resultsJSON);

    $conn->close();
}

if (isset($_GET["fromUserId"]) && isset($_GET["toUserId"]) && isset($_GET["lastMessageId"])) {
    $lastId = (int) $_GET["lastMessageId"];
    $from = (int) $_GET["fromUserId"];
    $to = (int) $_GET["toUserId"];

    getFromDB($lastId, $from, $to);
} else {
    http_response_code(404);
}
