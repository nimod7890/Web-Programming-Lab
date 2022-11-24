/**current balance value */
const p = document.querySelector("p");
p.innerText = `Current Balance: $${localStorage.getItem("current")}`;

/**set transaction history table */
const table = document.querySelector("table");
let colored = true;
const infoArr = JSON.parse(localStorage.getItem("transactionHistory"));
infoArr.forEach((element) => {
  //create row
  let row = table.insertRow();
  //create four column in row
  //Date, funds out, funds in, running balance
  for (let i = 0; i < 4; i++) {
    let column = row.insertCell(i);
    column.innerText = element[i];
    column.style.backgroundColor = colored ? "lightgray" : "whitesmoke";
  }
  //change color for each row
  colored = !colored;
});
