let Buttons = document.querySelectorAll(".number");
let EnterBtn = document.getElementById("enter");
let DelBtn = document.getElementById("del");
let displayAccount = document.querySelector("input");

let account = ""; //bank account

/**input number */
function handleNumBtns(event) {
  if (account.length < 16) {
    account += event.target.innerText;
    displayAccount.value = account;
  }
}

/**set idx and go next page */
function handleEnterBtn(e) {
  const arr = JSON.parse(localStorage.getItem("accountList"));
  const idx = arr.indexOf(account);
  if (idx != -1) {
    localStorage.setItem("idx", idx);
    localStorage.setItem("myAccount", account);
    window.location.href = "./html/pin.html";
    return;
  }
  alert("That account number does not exist!");
}

//delete last number
function handleDelBtn(e) {
  account = account.slice(0, -1);
  displayAccount.value = account;
}

Buttons.forEach((button) => {
  button.addEventListener("click", handleNumBtns);
});
EnterBtn.addEventListener("click", handleEnterBtn);
DelBtn.addEventListener("click", handleDelBtn);
