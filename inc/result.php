<?php

    session_start();
    require_once 'connect.php';

    $result = $_GET['result'];
    $login = $_SESSION['user'];

    $check = mysqli_query($connect, "SELECT * FROM `record` WHERE login = '$login'");

    if (mysqli_num_rows($check) > 0)
    {
        $record = mysqli_fetch_assoc($check);
        $oldresult = $record['best'];
        
        if ($oldresult < $result)
        {
            mysqli_query($connect, "UPDATE `record` SET `best`='$result' WHERE login = '$login'");
        }
    }