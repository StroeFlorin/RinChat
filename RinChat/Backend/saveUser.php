<?php
function sendResponse($responseText)
{
    $responseObj = new stdClass();
    $responseObj->response = $responseText;
    $response = json_encode($responseObj);

    echo $response;
}

function insertIntoDB($uid, $phoneNumber)
{
    include('dbConnection.php');

    $sql = "INSERT INTO user (uid, phone_number) VALUES ('$uid', '$phoneNumber')";

    if ($conn->query($sql) === TRUE) {
        sendResponse("User saved!");
    } else {
        sendResponse($conn->error);
    }

    $conn->close();
}

if (isset($_POST["uid"]) && isset($_POST["phoneNumber"])) {
    $uid = $_POST["uid"];
    $phoneNumber = $_POST["phoneNumber"];
    insertIntoDB($uid, $phoneNumber);
} else {
    http_response_code(404);
}
