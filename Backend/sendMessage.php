<?php
if(isset($_POST["message"]) && isset($_POST["fromUserId"]) && isset($_POST["toUserId"])) {

$message = $_POST["message"];
$from = $_POST["fromUserId"];
$to = $_POST["toUserId"];

$responseObj = new stdClass();
$responseObj->response = "message sent successfully!";
$response = json_encode($responseObj);

echo $response;

} else {
    http_response_code(404);
}
?>