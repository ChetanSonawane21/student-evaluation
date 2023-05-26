// get references to HTML elements
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userTypeInput = document.getElementById('usertype');

// add event listener to form submit event
form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent form submission

  // create payload object
  const payload = {
    email: emailInput.value,
    password: passwordInput.value,
    role: userTypeInput.value
  };

  // make API call to login
  fetch('http://localhost:2050/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === true) {
      // login successful, redirect to appropriate dashboard page


      // setting cookie
      setCookie("userEmail", emailInput.value, 1);


      // redirecting
      if (userTypeInput.value === 'teacher') {
        window.location.href = 'teacher_dashboard.html';
      } else {
        window.location.href = 'student_dashboard.html';
      }
    } else {
      // login unsuccessful, display error message
      alert(data.message);
    }
  })
  .catch(error => console.error(error));
});


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function checkCookie() {
//   let user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }