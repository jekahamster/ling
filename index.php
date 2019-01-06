<?php
	require_once "config.php";
	$connection = mysqli_connect($config['server'], $config['username'], $config['password'], $config['db_name']);
	mysqli_query($connection, "set names 'utf8'");
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $config['title']; ?></title>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale = 1">
	<link rel="shortcut icon" href=<?php echo $config['icon']; ?> type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="libs/wow/animate.min.css">
	<link rel="stylesheet" href="libs/mdl/icon.css">
	<!-- <link rel="stylesheet" href="libs/mdl/material.indigo-pink.min.css"> -->
	<link rel="stylesheet" href="libs/materialize/materialize.css">
	<script type="text/javascript" src="libs/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="libs/jquery-ui.min.js"></script>
	<!-- <script defer src="libs/mdl/material.min.js"></script> -->
	<script type="text/javascript" src="libs/wow/wow.min.js"></script>
	<script type="text/javascript" src="main.js"></script>
  <script type="text/javascript">new WOW().init();</script>
  <script src="libs/materialize/materialize.min.js"></script>
</head>
<body>
	<div id='header'>
		<div id='stars-background-container'>
			<canvas id='stars-background'></canvas>
		</div>
		<div id='header-container'>
			<div id='header-logo'>
				Переглянути мови:<br>
				<img src="image/globe-icon1.png">
			</div>
			<div id='header-card'>
				<span id='header-text'>linguist</span>
				<button id='start-button'>
					<div id='start-button-background'></div>
					<span>Розпочати</span>
				</button>
			</div>
		</div>
	</div>
	<div id='languagages-list'>
		<div id='languagages-list-background-ripple'></div>
		<div id='languagages-list-container'>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
			<div>asd</div>
		</div>
	</div>
	<div id='modal-background'>
		<div id="login">
			<span>LOGIN</span>
			<div class="input-field">
				<input id="login-email" type="text">
				<label for="login-email">Email...</label>
			</div>
			<div class="input-field">
        <input id="login-password" type="password">
        <label for="login-password">Password...</label>
      </div>
		 	<button id='login-accept'>OK
				<div id='login-accept-ripple'>
					<i class="material-icons"></i>
				</div>
		 	</button>
		</div>
		<div id='register'>
			<i class="material-icons" id="register-exit">add</i>
			<span>REGISTER</span>
			<div class="input-field">
				<input id="register-username" type="text">
				<label for="register-username">Username...</label>
			</div>
			<div class="input-field">
				<input id="register-email" type="text">
				<label for="register-email">Email...</label>
			</div>
			<div class="input-field">
        <input id="register-password" type="password">
        <label for="register-password">Password...</label>
      </div>
			<div class="input-field">
        <input id="register-repeat-password" type="password">
        <label for="register-repeat-password">Password...</label>
      </div>
		 	<button id='register-accept'>OK
				<div id='register-accept-ripple'>
					<i class="material-icons"></i>
				</div>
		 	</button>
		</div>
	</div>
</body>
</html>
<?php mysqli_close($connection); ?>
