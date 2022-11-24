/**init local storage */

//account array
localStorage.setItem(
  "accountList",
  JSON.stringify(["1234567890123456", "1111111111111111"])
);
//pin array
localStorage.setItem("pin", JSON.stringify(["1234", "1111"]));
//balance
localStorage.setItem("current", 2000);
//transaction history
localStorage.setItem(
  "transactionHistory",
  JSON.stringify([
    [new Date().toString(), 0, 0, localStorage.getItem("current")]
  ])
);
