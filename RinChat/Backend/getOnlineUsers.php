<?php
function getOnlineUsersCount()
{

    include('dbConnection.php');
    $sql = "SELECT COUNT(DISTINCT uid) as count FROM online_users;";

    $result = $conn->query($sql);

    $resultsJSON = array();
    while ($db_field = mysqli_fetch_assoc($result)) {
        $resultsJSON[] = $db_field;
    }
    echo json_encode($resultsJSON);

    $conn->close();
}

getOnlineUsersCount();