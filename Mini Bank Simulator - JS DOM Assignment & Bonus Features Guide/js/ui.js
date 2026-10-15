function switchView(viewId) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
    sec.classList.add('hidden');
  });
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
}

function showError(formId, message) {
  const form = document.getElementById(formId);
  let errorEl = form.querySelector('.error-msg');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-msg';
    form.prepend(errorEl);
  }
  errorEl.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
}

function updateDashboardUI() {
  if (!currentUser) return;
  document.getElementById('display-name').textContent = currentUser.name;
  document.getElementById('display-email').textContent = currentUser.email;
  document.getElementById('display-account-id').textContent = currentUser.accountId;
  
  const formattedBalance = `₹${currentUser.balance.toFixed(2)}`;
  document.getElementById('display-balance').textContent = formattedBalance;
  document.getElementById('summary-current-balance').textContent = formattedBalance;
  
  calculateSummaries();
  renderTransactions();
}

function renderTransactions() {
  const listEl = document.getElementById('transactions-list');
  listEl.innerHTML = '';

  const userTransactions = allTransactions.filter(txn => txn.accountId === currentUser.accountId);

  if (userTransactions.length === 0) {
    listEl.innerHTML = `<li class="no-txn">No transactions yet.</li>`;
    return;
  }

  userTransactions.slice().reverse().forEach(txn => {
    const li = document.createElement('li');
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(txn.date));

    const isDeposit = txn.type === 'deposit';
    li.innerHTML = `
      <span>${formattedDate} (${txn.type.toUpperCase()})</span>
      <span class="${isDeposit ? 'text-deposit' : 'text-withdrawal'}">
        ${isDeposit ? '+' : '-'}₹${txn.amount.toFixed(2)}
      </span>
    `;
    listEl.appendChild(li);
  });
}

function calculateSummaries() {
  const userTransactions = allTransactions.filter(txn => txn.accountId === currentUser.accountId);

  const totalDeposited = userTransactions
    .filter(txn => txn.type === 'deposit')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalWithdrawn = userTransactions
    .filter(txn => txn.type === 'withdrawal')
    .reduce((sum, txn) => sum + txn.amount, 0);

  document.getElementById('summary-total-deposited').textContent = `₹${totalDeposited.toFixed(2)}`;
  document.getElementById('summary-total-withdrawn').textContent = `₹${totalWithdrawn.toFixed(2)}`;
}

// Navigation toggles between login and sign-up cards
document.getElementById('show-signup').addEventListener('click', (e) => {
  e.preventDefault();
  clearErrors();
  switchView('signup-page');
});

document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  clearErrors();
  switchView('login-page');
});