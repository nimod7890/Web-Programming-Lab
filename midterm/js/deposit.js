let Buttons = document.querySelectorAll(".number");
let EnterBtn = document.getElementById("enter");
let DelBtn = document.getElementById("del");
let DotBtn = document.getElementById("dot");
let displayDeposit = document.querySelector("input");

let deposit = "";

/**input number */
function handleNumBtns(event) {
  const value = event.target.innerText; //number value
  if (deposit.length == 0) {
    if (value == ".") {
      //if first input is dot, add '0' -> '0.'
      deposit += "0";
    } else if (value == "0") {
      //if first input is '0', change only display value 
      displayDeposit.value = "0";
      return;
    }
  }
  deposit += value;
  displayDeposit.value = deposit;
}

/**set deposit and go next page*/
function handleEnterBtn(e) {
  //if 0 do not run enter button
  if (deposit == 0) {
    return;
  }
  //if last character is '.', then delete
  if (deposit.slice(-1) == ".") {
    deposit = deposit.slice(0, -1);
  }
  localStorage.setItem("deposit", deposit);
  window.location.href = "deposit-check.html";
}

/**if use dot button, make disabled */
function handleDotBtn(e) {
  e.target.disabled = true;
}

/** delete number*/
function handleDelBtn(e) {
  const last = deposit.slice(-1);
  deposit = deposit.slice(0, -1);
  displayDeposit.value = deposit;
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
