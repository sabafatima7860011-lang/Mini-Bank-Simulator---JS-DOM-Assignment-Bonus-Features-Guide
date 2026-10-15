document.getElementById('deposit-btn').addEventListener('click', () => {
  const amountInput = document.getElementById('deposit-amount');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid deposit amount greater than zero.');
    return;
  }

  currentUser.balance += amount;

  const newTxn = {
    transactionId: "TXN-" + Math.floor(Math.random() * 90000 + 10000),
    accountId: currentUser.accountId,
    type: "deposit",
    amount: amount,
    date: new Date().toISOString()
  };

  allTransactions.push(newTxn);
  saveData();
  updateDashboardUI();
  amountInput.value = '';
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
  const amountInput = document.getElementById('withdraw-amount');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid withdrawal amount greater than zero.');
    return;
  }

  if (amount > currentUser.balance) {
    alert('Insufficient funds for this withdrawal.');
    return;
  }

  currentUser.balance -= amount;

  const newTxn = {
    transactionId: "TXN-" + Math.floor(Math.random() * 90000 + 10000),
    accountId: currentUser.accountId,
    type: "withdrawal",
    amount: amount,
    date: new Date().toISOString()
  };

  allTransactions.push(newTxn);
  saveData();
  updateDashboardUI();
  amountInput.value = '';
});