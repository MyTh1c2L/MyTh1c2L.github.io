<?php
  session_start();
  ini_set('display_errors','Off');

  if ($_SESSION['user'])
  {
    header('Location: ../main.php');
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Регистрация</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
  </head>
  <body class="authorization_body">
    <form class="authorization" action="inc/signup.php" method="post">

        <h1 class="authorization_title"> Регистрация </h1>

        <div class="authorization_div">
          <input class="authorization_input" name="login" placeholder="Логин">
        </div>
  
        <div class="authorization_div">
          <input id="password_input" name="password" class="authorization_input" 
            type="password" placeholder="Пароль">
        </div>

        <div class="authorization_div">
          <input id="password_input" name="password_confirm"  class="authorization_input" 
            type="password" placeholder="Повторите пароль">
        </div>

        <?php
          ini_set('display_errors','Off');
          if ($_SESSION['message'])
          {
            echo '<p class="authorization_msg">' . $_SESSION['message'] . ' </p>'; 
          }
          unset($_SESSION['message']);
        ?>

        <button type="submit">Зарегистрироваться</button>

        <a href="Authorization.php" target="_self" class="authorization_regist"> 
          <p> Войти в существующий аккаунт </p>
        </a>

    </form>
  </body>
</html>