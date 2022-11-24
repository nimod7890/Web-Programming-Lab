const Buttons = document.querySelectorAll(".number");
const EnterBtn = document.getElementById("enter");
const DelBtn = document.getElementById("del");
const DotBtn = document.getElementById("dot");
const From = document.getElementById("from");
const To = document.getElementById("to");
const displayTransfer = document.querySelector("input");
const Maxi = document.getElementById("maxi");
let transfer = "";

/**input current value */
const current = parseFloat(localStorage.getItem("current"));
Maxi.innerText += current;
displayTransfer.placeholder = "$" + current;

/**add 'from' account list(always only my account) */
const accounts = JSON.parse(localStorage.getItem("accountList"));
const myAccount = localStorage.getItem("myAccount");
const myAccountOption = document.createElement("option");
myAccountOption.value = myAccount;
myAccountOption.text = myAccount;
From.appendChild(myAccountOption);

/**add 'to' account list */
accounts.forEach((account) => {
  if (account != myAccount) {
    const option = document.createElement("option");
    option.value = account;
    option.text = account;
    To.appendChild(option);
  }
});

/**input number */
function handleNumBtns(event) {
  const value = event.target.innerText;
  if (transfer.length == 0) {
    //if first input is dot, add '0'
    if (value == ".") {
      transfer += "0";
    } else if (value == "0") {
      //if first input is '0', change only display value
      displayTransfer.value = "0";
      return;
    }
  }
  transfer += value;
  //cannot exceed current balance
  if (parseFloat(transfer) > current) {
    alert(`Cannot exceed maximum value($${current})`);
    transfer = current.toString();
  }
  displayTransfer.value = transfer;
}

/**set transfer and go next page */
function handleEnterBtn() {
  //if 0, do not transfer
  if (transfer == 0) {
    return;
  }
  //if From or To is not selected,  do not transfer
  if (From.value.length != 16 || To.value.length != 16) {
    return;
  }
  //if last charactor is '.', then delete
  if (transfer.slice(-1) == ".") {
    transfer = transfer.slice(0, -1);
  }
  localStorage.setItem("transfer", transfer);
  localStorage.setItem("from", From.value);
  localStorage.setItem("to", To.value);
  window.location.href = "transfer-check.html";
}

/**if use dot button, make disabled */
function handleDotBtn(e) {
  e.target.disabled = true;
}

/** delete number*/
function handleDelBtn() {
  const last = transfer.slice(-1);
  transfer = transfer.slice(0, -1);
  displayTransfer.value = transfer;
  //if dot deleted, switch 'disabled' false
  if (last == ".") {
    DotBtn.disabled = false;
  }
}

/**event listeners */
Buttons.forEach((button) => {
  button.addEventListener("click", handleNumBtns);
});
EnterBtn.addEventListener("click", handleEnterBtn);
DotBtn.addEventListener("click", handleDotBtn);
DelBtn.addEventListener("click", handleDelBtn);
