const Buttons = document.querySelectorAll(".number");
const EnterBtn = document.getElementById("Enter");
const Imgs = document.querySelectorAll(".img");
const displayWithdraw = document.querySelector("input");
const Maxi = document.getElementById("maxi");

let withdraw = 0;

/**write current balance */
const current = localStorage.getItem("current");
Maxi.innerText += current;

const MAX_ALERT = `Cannot exceed current balance($${current})`;

/**get quick value and go next page*/
function handleQuickLinkBtns(event) {
  //get value
  const value = event.target.innerText;
  //cannot exceed current balance
  if (parseFloat(value) > parseFloat(current)) {
    alert(MAX_ALERT);
    return;
  }
  localStorage.setItem("withdraw", event.target.innerText);
  window.location.href = "withdraw-check.html";
}

/**input number */
function handleImgBtns(event) {
  //get value
  withdraw += parseInt(event.target.id);
  //if minus, make 0
  if (withdraw < 0) {
    withdraw = 0;
    displayWithdraw.value = withdraw;
  }
  //if over current balance, switch to current
  if (withdraw > current) {
    alert(MAX_ALERT);
    withdraw = parseFloat(current);
  }
  displayWithdraw.value = withdraw;
}

/**set withdraw and go next page */
function handleEnterBtn(e) {
  if (withdraw > 0) {
    localStorage.setItem("withdraw", withdraw);
    window.location.href = "withdraw-check.html";
  }
  //if 0, do not anything
}

/**event listeners */
Buttons.forEach((button) => {
  button.addEventListener("click", handleQuickLinkBtns);
});
Imgs.forEach((img) => {
  img.addEventListener("click", handleImgBtns);
});
EnterBtn.addEventListener("click", handleEnterBtn);
