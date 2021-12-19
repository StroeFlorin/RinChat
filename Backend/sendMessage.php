<?php
function sendResponse($responseText)
{
    $responseObj = new stdClass();
    $responseObj->response = $responseText;
    $response = json_encode($responseObj);

    echo $response;
}

function insertIntoDB($message, $from, $to)
{
    include('dbConnection.php');

    $sql = "INSERT INTO message (from_id, to_id, text) VALUES ($from, $to, '$message')";

    if ($conn->query($sql) === TRUE) {
        sendResponse("Message sent successfully");
    } else {
        sendResponse($conn->error);
    }

    $conn->close();
}

if (isset($_POST["message"]) && isset($_POST["fromUserId"]) && isset($_POST["toUserId"])) {
    $message = $_POST["message"];
    $from = (int) $_POST["fromUserId"];
    $to = (int) $_POST["toUserId"];

    insertIntoDB($message, $from, $to);
} else {
    http_response_code(404);
}
