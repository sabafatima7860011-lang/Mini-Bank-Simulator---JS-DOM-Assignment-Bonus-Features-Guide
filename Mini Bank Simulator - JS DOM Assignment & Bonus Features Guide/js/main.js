let allUsers = [];
let allTransactions = [];
let currentUser = null;

function saveData() {
  localStorage.setItem('bank_users', JSON.stringify(allUsers));
  localStorage.setItem('bank_transactions', JSON.stringify(allTransactions));
}

function loadData() {
  const users = localStorage.getItem('bank_users');
  const transactions = localStorage.getItem('bank_transactions');

  if (users) allUsers = JSON.parse(users);
  if (transactions) allTransactions = JSON.parse(transactions);
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();

  const activeAccountId = localStorage.getItem('bank_active_user');
  if (activeAccountId) {
    currentUser = allUsers.find(u => u.accountId === activeAccountId);
    if (currentUser) {
      updateDashboardUI();
      switchView('dashboard');
    } else {
      switchView('login-page');
    }
  } else {
    switchView('login-page');
  }
});