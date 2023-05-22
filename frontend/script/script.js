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
