// Contact form validation (no backend, runs in the browser)

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successBox = document.getElementById("formSuccess");

// Simple email pattern: something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setValid(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
}

function checkName() {
  const ok = nameInput.value.trim().length >= 2;
  setValid(nameInput, ok);
  return ok;
}

function checkEmail() {
  const ok = emailPattern.test(emailInput.value.trim());
  setValid(emailInput, ok);
  return ok;
}

function checkMessage() {
  const ok = messageInput.value.trim().length >= 10;
  setValid(messageInput, ok);
  return ok;
}

// Check each field when the user leaves it
nameInput.addEventListener("blur", checkName);
emailInput.addEventListener("blur", checkEmail);
messageInput.addEventListener("blur", checkMessage);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successBox.classList.add("d-none");

  // Run all three checks so every error shows at once
  const nameOk = checkName();
  const emailOk = checkEmail();
  const messageOk = checkMessage();

  if (nameOk && emailOk && messageOk) {
    successBox.classList.remove("d-none");
    form.reset();
    [nameInput, emailInput, messageInput].forEach(function (input) {
      input.classList.remove("is-valid", "is-invalid");
    });
  }
});
