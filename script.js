// script.js

function checkPasswordStrength() {
  var password = document.getElementById('passwordInput').value;
  var username = document.getElementById('usernameInput').value;
  var strengthFeedback = document.getElementById('passwordStrengthFeedback');
  var strengthRating = '';
  var suggestions = [];
 

  // Length Check
  if (password.length >= 8 && password.length <= 12) {
      strengthRating = 'Moderate';
  } else if (password.length > 12) {
      strengthRating = 'Strong';
  } else {
      strengthRating = 'Weak';
      suggestions.push('Use a password between 8 and 12 characters long.');
  }

  // Complexity Check
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasNumbers = /\d/.test(password);
  var hasSpecialChars = /\W/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars)) {
      strengthRating = 'Weak';
      suggestions.push('Include uppercase letters, lowercase letters, numbers, and special characters.');
  }

  // Username Check (only if username is not empty)
  if (username.trim() !== '') {
      if (password.toLowerCase().includes(username.toLowerCase())) {
          strengthRating = 'Weak';
          suggestions.push('Avoid using parts of your username in the password.');
      }
  }

  // Sequential Characters Check
  if (/(.)\1{2,}/.test(password)) {
      strengthRating = 'Weak';
      suggestions.push('Avoid sequential characters or keyboard patterns in the password.');
  }

  // Provide Feedback
  strengthFeedback.innerHTML = `<strong>Password Strength:</strong> ${strengthRating}<br>`;

  if (suggestions.length > 0) {
      strengthFeedback.innerHTML += `<strong>Suggestions:</strong> ${suggestions.join(' ')}<br>`;
  }
}
// script.js

function generatePassphrase() {
    console.log('Fetching passphrase...');
    fetch('/generate_passphrase')
        .then(response => response.text())
        .then(passphrase => {
            console.log('Passphrase fetched:', passphrase);
            document.getElementById('passwordInput').value = passphrase;
        })
        .catch(error => {
            console.error('Error fetching passphrase:', error);
        });
}
function displayCommonPasswordMessage(password) {
    var commonPasswordMessage = document.getElementById('commonPasswordMessage');
    if (isCommonPassword(password)) {
        commonPasswordMessage.innerHTML = 'This password is commonly used and easily guessable.';
    } else {
        commonPasswordMessage.innerHTML = '';
    }
}

