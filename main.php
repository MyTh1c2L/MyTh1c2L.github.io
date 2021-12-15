<?php
  session_start();
  ini_set('display_errors','Off');

  if (!$_SESSION['user'])
  {
    header('Location: ../Authorization.php');
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Игра</title>
    <link href="css/Main_style.css" rel="stylesheet" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  </head>
  <body>
    <form>
      <div class="top">
        <ul class="top_ul">
          <li class="top_li" id="login">
            <a>Логин: <?= $_SESSION['user'] ?> </a>
          </li>
          <li class="top_li" id="exit">
            <a class="top_a" href="inc/logout.php">Выход</a>
          </li>
        </ul>
      </div>

      <div class="main">

        <div class="left" style="float: left;">
          <h1>ТАБЛИЦА ЛИДЕРОВ</h1>
          <table align="center">
            <thead>
              <tr>
                <th>Никнейм</th>
                <th>Лучший результат</th>
              </tr>
            </thead>
            <tbody>
              <?php
                require_once 'inc/connect.php';
                $recordsSQL = mysqli_query($connect, "SELECT * FROM `record` ORDER BY `record`.`best` DESC LIMIT 0, 5");
              
                if (mysqli_num_rows($recordsSQL) > 0)
                {
                  $records = mysqli_fetch_all($recordsSQL);
                  foreach ($records as $row) {
              ?>

              <tr>
                <td><?php echo $row[0] ?></td>
                <td><?php echo $row[1] ?></td>
              </tr>

              <?php }} ?>

            </tbody>
          </table>
        </div>

        <div class ="center">
          <canvas id="canvas"></canvas>
          <script src="js/Snake.js"></script>
        </div>

        <div class="right" style="float: right;">
          <h1>ТЕКУЩИЙ РЕЗУЛЬТАТ</h1>
          <table class="result" align="center">
            <thead>
              <th>Очки</th>
            </thead>
            <tbody>
              <tr>
                <td id="result">0</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </form>
  </body>
</html>