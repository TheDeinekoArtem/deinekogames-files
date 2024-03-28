var pwd = document.getElementById('pwd');
var eye = document.getElementById('eye');

eye.addEventListener('click',togglePass);

function togglePass(){

   eye.classList.toggle('active');

   (pwd.type == 'password') ? pwd.type = 'text' : pwd.type = 'password';
}


$('#nmberone').click(function() {
    $('#mainCoantiner, #formBg').removeClass('mystyleSec');
  $('#mainCoantiner, #formBg').removeClass('mystylethird');
  event.stopPropagation();
});



$('#nmbertwo').click(function() {
   $('#mainCoantiner, #formBg').removeClass('mystylethird');
    $('#mainCoantiner, #formBg').addClass('mystyleSec');
  event.stopPropagation();
});


$('#numberthree').click(function() {
   /* $('#catbox').removeClass('cat2');*/
    $('#mainCoantiner, #formBg').addClass('mystylethird');
  event.stopPropagation();
});

// Form Validation

function checkStuff(event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    var nickname = document.form1.nickname.value.trim();
    var email = document.form1.email.value.trim();
    var password = document.form1.password1.value; // Убедитесь, что здесь используются правильные имена
    var confirm_password = document.form1.password2.value;
    var msg = document.getElementById('msg');

    // Проверка никнейма на наличие только цифр
    if (/^\d+$/.test(nickname)) {
        msg.style.display = 'block';
        msg.innerHTML = "Никнейм не может состоять только из цифр.";
        return;
    }

    // Проверка длины пароля
    if (password.length < 8) {
        msg.style.display = 'block';
        msg.innerHTML = "Пароль должен быть не менее 8 символов.";
        return;
    }

    // Проверка совпадения паролей
    if (password !== confirm_password) {
        msg.style.display = 'block';
        msg.innerHTML = "Пароли не совпадают.";
        return;
    }

    // Проверка включения email в пароль
    if (password.includes(email)) {
        msg.style.display = 'block';
        msg.innerHTML = "Пароль не должен содержать вашу почту.";
        return;
    }

    // Если все проверки пройдены, отправляем форму через JavaScript или восстанавливаем стандартное поведение
    document.form1.submit();
}

// ParticlesJS

// ParticlesJS Config.
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "top",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});