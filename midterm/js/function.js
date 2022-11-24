function save(valueName) {
  let transactionArr = JSON.parse(localStorage.getItem("transactionHistory"));
  const value = localStorage.getItem(valueName);
  let current = localStorage.getItem("current");
  if (valueName == "deposit") {
    current = parseFloat(current) + parseFloat(value);
    transactionArr.push([new Date().toString(), 0, value, current]);
  } else {
    current = parseFloat(current) - parseFloat(value);
    transactionArr.push([new Date().toString(), value, 0, current]);
  }
  //update transaction history
  localStorage.setItem("transactionHistory", JSON.stringify(transactionArr));
  //update balance
  localStorage.setItem("current", current);
}

function check(valueName) {
  //input value
  const p = document.querySelector("p");
  p.innerText += localStorage.getItem(valueName);
  if (valueName == "transfer") {
    const From = document.createElement("p");
    const To = document.createElement("p");
    From.innerText = `From ${localStorage.getItem("from")}`;
    To.innerText = `To ${localStorage.getItem("to")}`;
    p.insertAdjacentElement("afterend", To);
    p.insertAdjacentElement("afterend", From);
  } else {
    p.innerText += "?";
  }
}

const valueName = document.currentScript.getAttribute("valueName"); //deposit, withdraw or transfer
const useSave = document.currentScript.getAttribute("save");
const useCheck = document.currentScript.getAttribute("check");
if (useSave) {
  save(valueName);
}
if (useCheck) {
  check(valueName);
}
