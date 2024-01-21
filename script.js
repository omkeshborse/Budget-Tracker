const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

// calculation stats

function updateStatistics() {
  const updatedIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => (total += parseInt(transaction.amount)), 0);

  const updatedExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (total, transaction) => (total += Math.abs(parseInt(transaction.amount))),
      0
    );
  console.log(updatedIncome, updatedExpense);
  updatedBalance = updatedIncome - updatedExpense;
  balance.textContent = updatedBalance;
  income.textContent = updatedIncome;
  expense.textContent = updatedExpense;
}

function generateTemplate(id, source, amount, time) {
  return ` <li data-id="${id}">
                <p>
                  <span>${source}</span>
                  <span id="time">${time}</span>
                </p>
                  <span>$${Math.abs(amount)}</span>
                  <i class="bi bi-trash delete"></i>
            </li>`;
}

function addTransactionsDom(id, source, amount, time) {
  if (amount > 0) {
    //add in income list
    incomeList.innerHTML += generateTemplate(id, source, amount, time);
  } else {
    //add in expenseList
    expenseList.innerHTML += generateTemplate(id, source, amount, time);
  }
}

function addTransactions(source, amount) {
  const time = new Date();
  const transaction = {
    id: Math.round(Math.random() * 1000000),
    source: source, //note in es6 no need of source : source if key value var same give only key value but if not same then need to pass this value properly
    amount: amount, //note in es6 no need of source : source if key value var same give only key value but if not same then need to pass this value properly
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
  };
  console.log(transactions);
  transactions = [...transactions, transaction];
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionsDom(transaction.id, source, amount, transaction.time);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.source.value.trim() === "" || form.amount.value === "") {
  return alert("please add proper values!")
  }
  addTransactions(form.source.value.trim(), form.amount.value);
  updateStatistics();
  form.reset();
});

function getTransactions() {
  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      incomeList.innerHTML += generateTemplate(
        transaction.id,
        transaction.source,
        transaction.amount,
        transaction.time
      );
    } else {
      expenseList.innerHTML += generateTemplate(
        transaction.id,
        transaction.source,
        transaction.amount,
        transaction.time
      );
    }
  });
}

// delete transactions

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => {
    return transaction.id !== parseInt(id);
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTransaction(e.target.parentElement.dataset.id);
    updateStatistics();
  }
});
expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTransaction(e.target.parentElement.dataset.id);
    updateStatistics();
  }
});

function init() {
  updateStatistics();
  getTransactions();
}

init();
