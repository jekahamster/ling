<?php
  require_once "../config.php";
  $connection = mysqli_connect($config['server'], $config['username'], $config['password'], $config['db_name']);
  mysqli_query($connection, "set names 'utf8'");

  function makeValidPassword($pass) {
    return hash('sha512', $pass . "Wvkp10NSfftI");
  }

  $login = mysqli_real_escape_string($connection, $_POST['email']);
  $password = makeValidPassword($_POST['password']);

  $search_user = mysqli_query($connection, "SELECT * FROM `users`
                                            WHERE `login` = '$login'
                                            AND `password` = '$password';");

  if ( mysqli_num_rows($search_user) != 0 )
  {
    setcookie("ling-login", $login);
    setcookie("ling-password", $password);
    echo true;
  }
  else
  {
    echo false;
  }
  mysqli_close($connection);
?>
