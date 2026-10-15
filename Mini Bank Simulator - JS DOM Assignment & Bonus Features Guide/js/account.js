document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById('signup-name').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (!name || !username || !email || !password || !confirmPassword) {
    showError('signup-form', 'All fields are required.');
    return;
  }

  if (password !== confirmPassword) {
    showError('signup-form', 'Passwords do not match.');
    return;
  }

  const existingUser = allUsers.find(u => u.username === username || u.email === email);
  if (existingUser) {
    showError('signup-form', 'Username or Email is already registered.');
    return;
  }

  const newUser = {
    accountId: "ACC-" + Math.floor(Math.random() * 9000 + 1000),
    name,
    username,
    email,
    password,
    balance: 0
  };

  allUsers.push(newUser);
  saveData();
  document.getElementById('signup-form').reset();
  switchView('login-page');
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const identity = document.getElementById('login-identity').value.trim();
  const password = document.getElementById('login-password').value;

  const foundUser = allUsers.find(u => (u.email === identity || u.username === identity) && u.password === password);

  if (!foundUser) {
    showError('login-form', 'Invalid email/username or password.');
    return;
  }

  currentUser = foundUser;
  localStorage.setItem('bank_active_user', currentUser.accountId);
  
  updateDashboardUI();
  document.getElementById('login-form').reset();
  switchView('dashboard');
});

document.getElementById('close-account-btn').addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('bank_active_user');
  switchView('login-page');
});