<?php
  require_once "../config.php";
  $connection = mysqli_connect($config['server'], $config['username'], $config['password'], $config['db_name']);
  mysqli_query($connection, "set names 'utf8'");

  function makeValidPassword($pass) {
    return hash('sha512', $pass . "Wvkp10NSfftI");
  }

  $space_pattern = "/[\s]/";
  $email_pattern = "/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/";
  $register_warning = false;

  $username = htmlspecialchars(mysqli_real_escape_string($connection, $_POST['username']));
  $login = htmlspecialchars(mysqli_real_escape_string($connection, $_POST['email']));
  $password = makeValidPassword($_POST['password']);
  $repeat_password = makeValidPassword($_POST['repeat-password']);

  if ( trim($username) === '' )
  {
    $register_warning = true;
    echo "username";
  }
  if ( !preg_match($email_pattern, $login) )
  {
    $register_warning = true;
    echo "mail";
  }
  if ( preg_match($space_pattern, $password) || trim($password) === '' )
  {
    $register_warning = true;
  }
  if ( $password != $repeat_password )
  {
    $register_warning = true;
  }

  if (!$register_warning)
  {
      $search_user = mysqli_query($connection, "SELECT * FROM `users`
                                                WHERE `login` = '$login'");

      if (mysqli_num_rows($search_user) != 0)
        echo false;
      else
      {
        $add_user = mysqli_query($connection,
                              "INSERT INTO `users` (`id`, `username`, `login`, `password`)
                               VALUES (NULL, '$username', '$login', '$password');");
        if ($add_user)
          echo true;
        else
          echo false;
      }
  }
  else
    echo false;


  mysqli_close($connection);
?>
