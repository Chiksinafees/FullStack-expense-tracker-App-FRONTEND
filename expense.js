const inputExp = document.querySelector("#expense");
const inputDes = document.querySelector("#description");
const inputCat = document.querySelector("#category");
const expenseForm = document.querySelector("#expenseForm");

expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let obj = {
    expense: inputExp.value,
    description: inputDes.value,
    category: inputCat.value,
  };
  await axios
    .post("http://localhost:3001/Exp/insertExp", obj)
    .then((response) => {
      console.log(response.data);
      showUserOnScreen(response.data.newExpenseDetail);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something is Wrong!!</h4>";
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3001/Exp/getAllExp")
    .then((response) => {
      for (let i = 0; i < response.data.allExpense.length; i++) {
        showUserOnScreen(response.data.allExpense[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showUserOnScreen(user) {
  document.getElementById("expense").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  const parentNode = document.getElementById("output");
  const childHTML = `<li id=${user.id}>
  <div class="expense-info">${user.expense}</div>
  <div class="description-info">${user.description}</div>
  <div class="category-info">${user.category}</div>
  <div class="action-info">
    <button onclick=deleteExpense('${user.id}')>Delete</button>
    <button onclick=EditExpense('${user.id}','${user.expense}','${user.description}','${user.category}')>Edit</button>
  </div>
</li>`;
  parentNode.innerHTML += childHTML;
}

function deleteExpense(userId) {
  axios
    .delete(`http://localhost:3001/Exp/getAllExp/${userId}`)
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => {
      console.log(err);
    });
}

function EditExpense(userId, expensee, descriptionn, categoryy) {
  document.getElementById("expense").value = expensee;
  document.getElementById("description").value = descriptionn;
  document.getElementById("category").value = categoryy;
  deleteExpense(userId);
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("output");
  const childNodeToBeDel = document.getElementById(userId);
  if (childNodeToBeDel) {
    parentNode.removeChild(childNodeToBeDel);
  }
}
