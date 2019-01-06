var globeX;
var globeY;
var globeCount = false;
var login_warning = false;
var register_warning = false;
var register_width;
var register_exit_width;
var register_pos;

$(function () {
	drawStars();
	getBackgroundColor();
	$('#start-button').click(startLearning);
	$('#modal-overlay').click(backToMainPage);
	register_width = $('#register').width();
	register_exit_width = $('#register-exit').width();

	$(window).on("resize", drawStars);

	$('#start-button').on("mouseover", function () {
		$('#start-button-background').addClass('start-button-background__active');
	});

	$('#start-button').on("mouseout", function () {
		$('#start-button-background').removeClass('start-button-background__active');
	});

	$('#header-logo > img').click(checkLanguages);

	$('body').mouseup(function (e) {
		if ( $("#languagages-list").css('display') != 'none' && $('#languagages-list-container').css('opacity') == 1 )
			if ($("#languagages-list").has(e.target).length === 0)
			{
				$('#languagages-list').css({
					'box-shadow': '0 0 50px rgba(0,0,0,0)',
				});
				$('#languagages-list-container').animate({
					'opacity': '0'
				}, 500);
				setTimeout(function () {
					$("#languagages-list-background-ripple").animate({
						'top': $('#languagages-list').height()/2+$('.check-languages-point').height()/2+'px',
						'left': $('#languagages-list').width()/2+$('.check-languages-point').width()/2+'px',
						'width': 0+'px',
						'height': 0+'px',
					}, 500);
					setTimeout(function () {
						$('#languagages-list').hide();
						$('.check-languages-point').animate({
							'left': globeX-$('.check-languages-point').width()/2+'px',
							'top': globeY-$('.check-languages-point').height()/2+'px'
						}, 500);
						setTimeout(function () {
							$('.check-languages-point').remove();
						}, 600);
					}, 500);


				}, 500);
			}
	});

	$('#login-password, #login-email').on('input', function ()
	{
		var space_pattern = /[\s]/;
		var email_pattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
		login_warning = false;
		if ( !email_pattern.test($('#login-email').val()) )
		{
			login_warning = true;
		}
		if ( space_pattern.test($('#login-password').val()) || $("#login-password").val() == "")
		{
			login_warning = true;
		}
		if (!login_warning)
		{
			$('#login-accept').addClass("login-accept__active");
		}
		else
		{
			$('#login-accept').removeClass("login-accept__active");
		}
	});
	$('#login-password, #login-email').trigger("input");

	$('#login-accept').click(function () {
		if ( $(this).hasClass("login-accept__active") )
		{
			$.ajax({
				url: "subprograms/login-check-user.php",
				type: "POST",
				data: ({
					'email': $('#login-email').val(),
					'password': $('#login-password').val(),
				}),
				success: function (data) {
					loginButtonAnim(data);
				}
			});
		}
	});

	$('#register').click(function () {
		if ( $(this).width() == 100 )
		{
			if (register_pos == null)
				register_pos = $('#register').offset();
			$('#login').animate({
				'opacity': '0.5',
				'width': $('#login').width()-40 + 'px',
				'height': $('#login').height()-40 + 'px',
				'margin-top': '-80px',
			}, 500);

			// $('#register').toggleClass('register-active');

			$('#register').animate({
				'left': '30%',
				'top': '20%',
				'width': '40%',
				'height': '60%',
				'border-radius': '5px',
			}, 500);

			$('#register').css({
				'cursor': 'default'
			});

			$('#register-exit').animate({
				'top': '10px',
				'right': '10px',
			}, 500);
			$('#register-exit').css({
				'transform': 'rotate(45deg)'
			});
			setTimeout(function () {
				$('#register div, #register span, #register button').fadeIn(500);
			}, 500);

		}
	});

	$('#register-exit').click(function () {
		if ( $('#register').width() != 100 )
		{
			$('#register div, #register span, #register button').fadeOut(300);
			setTimeout(function () {
				$('#register-exit').animate({
					'top': register_width/2 - register_exit_width/2 + 'px',
					'right': register_width/2 - register_exit_width/2 + 'px',
				}, 500);
				// $('#register').toggleClass('register-active');

				$('#register').animate({
					'left': register_pos['left'] + 'px',
					'top': register_pos['top'] + 'px',
					'width': '100px',
					'height': '100px',
					'border-radius': '100%',
				}, 500);

				$('#register').css({
					'cursor': 'pointer'
				});

				$('#register-exit').css({
					'transform': 'rotate(0deg)',
					'width': '42px',
					'height': '42px'
				});

				$('#login').animate({
					'opacity': '1',
					'width': $('#login').width()+40 + 'px',
					'height': $('#login').height()+40 + 'px',
					'margin-top': '0px',
				}, 500);
			}, 500);
		}
	});

	$('#register-username, #register-email, #register-password, #register-repeat-password').on('input', function () {
		var space_pattern = /[\s]/;
		var email_pattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
		register_warning = false;
		if ( $.trim($('#register-username').val()) == '' )
		{
			register_warning = true;
		}
		if ( !email_pattern.test($('#register-email').val()) )
		{
			register_warning = true;
		}
		if ( space_pattern.test($('#register-password').val()) || $("#register-password").val() == "" )
		{
			register_warning = true;
		}
		if ( $('#register-password').val() != $('#register-repeat-password').val() )
		{
			register_warning = true;
		}
		if (!register_warning)
		{
			$('#register-accept').addClass("register-accept__active");
		}
		else
		{
			$('#register-accept').removeClass("register-accept__active");
		}
	});
	$('#register-username, #register-email, #register-password, #register-repeat-password').trigger("input");

	$('#register-accept').click(function () {
		if ( $(this).hasClass("register-accept__active") )
		{
			$.ajax({
				url: "subprograms/register.php",
				type: "POST",
				data: ({
					'username': $('#register-username').val(),
					'email':		$('#register-email').val(),
					'password':	$('#register-password').val(),
					'repeat-password':	$('#register-repeat-password').val(),
				}),
				success: function (data) {
					registerButtonAnim(data);
				}
			});
		}
	});
});

function drawStars() {
	var starsCount = 500;
	var minR = 1;
	var maxR = 2;
	var Pi = Math.PI;
	var h = $(window).height(),
		w = $(window).width();
	var canvas = document.getElementById('stars-background')
		ctx = canvas.getContext('2d');

	canvas.width = w;
	canvas.height = h;

	for (var i = 0; i < starsCount; i++)
	{
		var randX = Math.floor(Math.random() * w);
		var randY = Math.floor(Math.random() * h);
		var randR = Math.floor(Math.random() * (maxR-minR+1) + minR);
		if (w <= 450)
			randR /= 2;

		ctx.beginPath();
		ctx.lineWidth = "0";
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.arc(randX, randY, randR, 0, Pi*2, true);
		ctx.stroke();
		ctx.fill();
	}
}

function getBackgroundColor() {
	var date = new Date();
	if (date.getHours() >= 7 && date.getHours() <= 17)
	{
		$('#header').css({
			"background-image": "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
		});
	}
	else if ((date.getHours() >= 5 && date.getHours() <= 6) ||
			 (date.getHours() >= 18 && date.getHours() <= 21))
	{
		$('#header').css({
			"background-image": "linear-gradient(to top, darkblue 0%, #000 100%)"
		});
	}
	else
	{
		$('#header').css({
			"background-image": "linear-gradient(to top, #191919 0%, #000 100%)"
		});
	}

	setInterval(getBackgroundColor, 100000);
}

function checkLanguages(e) {
	if ( $('.check-languages-point').length != 0 )
		return 0;

	if ( $('#languagages-list').css('display') == 'none' )
	{
		globeX = e.pageX,
		globeY = e.pageY;
	}
	var h = $(window).height(),
		w = $(window).width();
	var d = 30;
	if ($('.check-languages-point').length == 0) {
		$('body').append("<div class='check-languages-point'></div>");
		$('.check-languages-point').css({
			'width': d+'px',
			'height': d+'px',
			'top': globeY-d/2+'px',
			'left': globeX-d/2+'px',
		});
		$('.check-languages-point').animate({
			'left': w/2+'px',
			'top': h/2+'px'
		}, 500);
		setTimeout(function () {
			let d = Math.ceil(Math.sqrt(Math.pow($('#languagages-list').width(),2) +
				Math.pow($('#languagages-list').height(),2)));
			$('#languagages-list').show();
			if ( !globeCount )
				$("#languagages-list-background-ripple").css({
					'top': $('#languagages-list').height()/2-$('.check-languages-point').height()/2+'px',
					'left': $('#languagages-list').width()/2-$('.check-languages-point').width()/2+'px',
				});
			else
				$("#languagages-list-background-ripple").css({
					'top': $('#languagages-list').height()/2+$('.check-languages-point').height()/2+'px',
					'left': $('#languagages-list').width()/2+$('.check-languages-point').width()/2+'px',
				});
			$("#languagages-list-background-ripple").animate({
				'top': $('#languagages-list').height()/2-d/2+'px',
				'left': $('#languagages-list').width()/2-d/2+'px',
				'width': d+'px',
				'height': d+'px',
			}, 500);
			setTimeout(function () {
				$('#languagages-list').css({
					'box-shadow': '0 0 50px rgba(0,0,0,0.5)',
				});
				$('#languagages-list-container').animate({
					'opacity': '1'
				}, 500);
			}, 500);
			globeCount = true;
		}, 500);
	}
}

function startLearning() {
	var num = 15;
	var h = $(window).height(),
			w = $(window).width();
	var d = Math.max(w, h)/2;
	for (var i = 0; i < num; i++)
	{
		$('body').append("<div class='bubble'></div>");
		$('.bubble').eq(i).css({
			'top': Math.floor(Math.random() * h)-d/2+'px',
			'left': Math.floor(Math.random() * w)-d/2+'px',
			'transition-delay': Math.random() + 's',
		});
	}

	$('.bubble').css({
		'width': d+'px',
		'height': d+'px',
	});
	setTimeout(function () {
		$('#modal-background').fadeIn(1000);
		setTimeout(function () {
			$('#modal-background').css({
				'display': 'flex'
			});
			$('#login').animate({
				'opacity': '1'
			}, 1000);
			setTimeout(function () {
				$('#register').animate({
					'opacity': '1'
				}, 500);
			}, 200);
		}, 900);
	}, 900);
}

function backToMainPage() {
	if ($('#register').width() == 100)
	{
		$('#register').animate({
			'opacity': '0'
		}, 500);
		setTimeout(function () {
			$('#modal-background').css({
				'display': 'flex'
			});
			$('#login').animate({
				'opacity': '0'
			}, 1000);

			setTimeout(function () {
				$('#modal-background').fadeOut(1000);
				setTimeout(function () {
					$('.bubble').css({
						'width': '1px',
						'height': '1px'
					});
					$('.bubble').on('transitionend', function () {
						$(this).remove();
					});
				}, 0);
			}, 900);
		}, 0);
	}
	else
	{
		$('#register-exit').trigger('click');
	}
}

function loginButtonAnim(x) {
	var w = $('#login-accept').width();
	var h = $('#login-accept').height();
	var d = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

	if (x)
		$('#login-accept-ripple > i').text("done");
	else
		$('#login-accept-ripple > i').text("clear");

	if ( $('#login-accept-ripple').width() == 0)
	{
		$('#login-accept-ripple').css({
			'top': h/2+'px',
			'left': w/2+'px'
		});
		$('#login-accept-ripple').animate({
			'left': 	0-d/2+w/2+'px',
			'top': 		0-d/2+h/2+'px',
			'width': 	d+'px',
			'height': d+'px',
		}, 500);

		if (!x)
			setTimeout(function () {
				$('#login-accept-ripple').animate({
					'left': 	w/2+'px',
					'top': 		h/2+'px',
					'width': 	0+'px',
					'height': 0+'px',
				}, 500);
			}, 1000);
	}
}

function registerButtonAnim(x) {
	var w = $('#register-accept').width();
	var h = $('#register-accept').height();
	var d = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

	if (x)
		$('#register-accept-ripple > i').text("done");
	else
		$('#register-accept-ripple > i').text("clear");

	if ( $('#register-accept-ripple').width() == 0)
	{
		$('#register-accept-ripple').css({
			'top': h/2+'px',
			'left': w/2+'px'
		});
		$('#register-accept-ripple').animate({
			'left': 	0-d/2+w/2+'px',
			'top': 		0-d/2+h/2+'px',
			'width': 	d+'px',
			'height': d+'px',
		}, 500);

		if (!x)
			setTimeout(function () {
				$('#register-accept-ripple').animate({
					'left': 	w/2+'px',
					'top': 		h/2+'px',
					'width': 	0+'px',
					'height': 0+'px',
				}, 500);
			}, 1000);
	}
}

function setDay() {
	$('#header').css({
		"background-image": "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
	});
}
