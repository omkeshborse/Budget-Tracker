const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

function generateTemplate(id, source, time, amount) {
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
    incomeList.innerHTML += generateTemplate(id, source, time, amount);
  } else {
    //add in expenseList
    expenseList.innerHTML += generateTemplate(id, source, time, amount);
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
  addTransactions(form.source.value, form.amount.value);
  form.reset();
});
