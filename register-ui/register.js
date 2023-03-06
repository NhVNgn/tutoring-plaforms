const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInputs = document.getElementsByName('role');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  // Get the selected role value from the radio buttons
  let roleValue = '';
  for (let i = 0; i < roleInputs.length; i++) {
    if (roleInputs[i].checked) {
      roleValue = roleInputs[i].value;
      break;
    }
  }

  // hash


  // Construct the request body, plain password is fine here since it will be encrypted with https
  const requestBody = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    role: roleValue
  };
  console.log(requestBody)


  // Send the POST request to the server
  // to be implemented
});