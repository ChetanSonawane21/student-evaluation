const registrationForm = document.querySelector('#registration-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const userTypeInput = document.querySelector('#usertype');

registrationForm.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent form submission

  // create payload object
  const payload = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    role: userTypeInput.value
  };

  // make API call to register user
  fetch('http://localhost:2050/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === true) {
      // registration successful, redirect to appropriate dashboard page
      if (userTypeInput.value === 'teacher') {
        window.location.href = 'index.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      // registration unsuccessful, display error message
      alert(data.message);
    }
  })
  .catch(error => console.error(error));
});
