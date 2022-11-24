const Buttons = document.querySelectorAll(".number");
const EnterBtn = document.getElementById("enter");
const DelBtn = document.getElementById("del");
const HomeBtn = document.getElementById("Return");
const displayPin = document.querySelector("input");

let cnt = 5;
let pin = "";

/**input number */
function handleNumBtns(event) {
  if (pin.length < 4) {
    pin += event.target.innerText;
    displayPin.value = pin;
  }
}

/**go next page */
function handleEnterBtn(e) {
  const pinArr = JSON.parse(localStorage.getItem("pin"));
  const idx = localStorage.getItem("idx");
  //if correct pin, go next page
  if (pinArr.indexOf(pin) == idx) {
    window.location.href = "./home.html";
    return;
  }
  cnt -= 1;
  pin = "";
  displayPin.value = "";
  //if input is wrong, alert
  if (cnt > 0) {
    alert(`Incorrect PIN. You have ${cnt} attempts left`);
    return;
  }
  //if input is incorrect 5 times, return to first page
  alert(`Incorrect PIN 5 times\nReturn to the home screen`);
  cnt = 5;
  window.location.href = "../main.html";
}

/**delete number */
function handleDelBtn(e) {
  pin = pin.slice(0, -1);
  displayPin.value = pin;
}

/**event listeners */
Buttons.forEach((button) => {
  button.addEventListener("click", handleNumBtns);
});
EnterBtn.addEventListener("click", handleEnterBtn);
DelBtn.addEventListener("click", handleDelBtn);
