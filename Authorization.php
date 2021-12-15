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
    <title>Авторизация</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <script src="js/script.js"></script>
  </head>
  <body class="authorization_body">
    <form class="authorization" action="inc/signin.php" method="post">

      <h1 class="authorization_title"> Авторизация </h1>

      <div class="authorization_div">
        <input class="authorization_input" name="login" placeholder="Логин">
      </div>

      <div class="authorization_div">
        <input id="password_input" name="password" class="authorization_input" 
          type="password" placeholder="Пароль">

          <label class="authorization_password">
            <input type="checkbox" class="authorization_password" 
            onclick="show_hide_password();"> Показать пароль
          </label>

      </div>

      <?php
          ini_set('display_errors','Off');
          if ($_SESSION['message'])
          {
            echo '<p class="authorization_msg">' . $_SESSION['message'] . ' </p>'; 
          }
          unset($_SESSION['message']);
        ?>

      <button type="submit">Войти</button>

      <a href="Registration.php" target="_self" class="authorization_regist"> 
        <p> У вас нет аккаунта? Регистрация </p>
      </a>

    </form>
  </body>
</html>
