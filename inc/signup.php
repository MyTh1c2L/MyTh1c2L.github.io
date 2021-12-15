<?php

    session_start();
    require_once 'connect.php';

    $login = $_POST['login'];
    $password = $_POST['password'];
    $password_c = $_POST['password_confirm'];

    if ($password === $password_c)
    {
        $password = md5($password);

        mysqli_query($connect, "INSERT INTO `users` (`login`, `password`) VALUES ('$login', '$password')");
        mysqli_query($connect, "INSERT INTO `record` (`login`, `best`) VALUES ('$login', '0')");
        header('Location: ../Authorization.php');
    }
    else
    {
        $_SESSION['message'] = 'Пароли не совпадают';
        header('Location: ../Registration.php');
    }

