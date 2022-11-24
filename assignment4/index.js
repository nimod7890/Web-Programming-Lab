$(document).ready(function () {
  /**Menu change */
  // - show each content div
  // - change css of each menu
  $("#loginSelector").click(() => {
    //show login content
    $("#loginSelector").addClass("btnOnClick");
    $("#loginContent").removeClass("hidden");
    //hide sign up content
    $("#signUpContent").addClass("hidden");
    $("#signUpComplete").addClass("hidden");
    $("#signUpSelector").removeClass("btnOnClick");
  });
  $("#signUpSelector").click(() => {
    $("#loginContent").addClass("hidden");
    $("#loginSelector").removeClass("btnOnClick");
    $("#signUpSelector").addClass("btnOnClick");
    //before sign up
    if (isValid.includes(false)) {
      $("#signUpContent").removeClass("hidden");
      $("#signUpComplete").addClass("hidden");
    } else {
      //after sign up
      $("#signUpContent").addClass("hidden");
      $("#signUpComplete").removeClass("hidden");
    }
  });

  /** Login form */
  // load input value
  const loginEmail = $("#loginEmail");
  const loginPassword = $("#loginPassword");

  // set handle functions
  function handleLoginEmail() {
    var loginEmailValue = loginEmail.val();
    //if value is not email(is invalid)
    if (!emailReg.test(loginEmailValue)) {
      loginEmail.addClass("required");
      $("#loginEmailAlert").removeClass("hidden");
      $("#loginEmailCheck").addClass("hidden");
      $("#loginEmailAlert").text("Your email address is invalid!");
    } else {
      //if value is vaild
      $("#loginEmailAlert").addClass("hidden");
      $("#loginEmailCheck").removeClass("hidden");
      loginEmail.removeClass("required");
    }
  }
  function handleLoginPassword() {
    //if value is empty
    if (!loginPassword.val()) {
      loginPassword.addClass("required");
      $("#loginPasswordAlert")
        .removeClass("hidden")
        .text("Please enter your password!");
    } else {
      //if value is not empty
      $("#loginPasswordAlert").addClass("hidden");
      loginPassword.removeClass("required");
    }
  }

  // set onChange event listener
  loginEmail.on("change keyup paste", handleLoginEmail);
  loginPassword.on("change keyup paste", handleLoginPassword);

  // set onClick event listener
  $("#loginBtn").click(function () {
    const inputEmail = loginEmail.val();
    const inputPW = loginPassword.val();
    //if value is empty
    if (!inputEmail) {
      loginEmail.addClass("required");
      $("#loginEmailAlert")
        .removeClass("hidden")
        .text("Please enter your email!");
    } else {
      handleLoginEmail();
    }
    handleLoginPassword();
    //get value from localstorage
    const userEmail = JSON.parse(localStorage.getItem("email"))[0];
    const userPW = JSON.parse(localStorage.getItem("pw"))[0];
    //if every value is valid
    if (inputEmail === userEmail && inputPW === userPW) {
      $("#loginComplete").removeClass("hidden");
      $("#loginContent").addClass("hidden");
      $(".btns").addClass("hidden");
    } else {
      //if input is invalid
      $("#loginH4").addClass("warning").text("Credential do not match");
    }
  });

  /** Sign up form */
  // set isValid array and idx
  const isValid = [false, false, false, false, false, false];
  const IS_FIRSTNAME_VALID = 0;
  const IS_LASTNAME_VALID = 1;
  const IS_RADIO_VALID = 2;
  const IS_SIGNUPEMAIL_VALID = 3;
  const IS_SIGNUPPW_VALID = 4;
  const IS_CONFIRMPW_VALID = 5;

  // load input value
  const firstName = $("#firstName");
  const lastName = $("#lastName");
  const radio = $("input:radio[name=radio]");
  const signUpEmail = $("#signUpEmail");
  const signUpPassword = $("#signUpPassword");
  const confirmPassword = $("#confirmPassword");

  // set reqExp value
  var engReg = new RegExp("^[A-Z][a-zA-Z]*$");
  var numReg = new RegExp("^[a-zA-Z0-9]+$");
  var capitalReg = new RegExp("^[a-z]*$");
  var specialReg = new RegExp("[^wsㄱ-힣]|[_]");
  var emailReg = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9.]+$");
  var pwReg = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$"
  );

  // set handle functions
  function handleFirstName() {
    var firstNameValue = firstName.val();
    //if value is valid
    if (engReg.test(firstNameValue)) {
      $("#firstNameAlert").addClass("hidden");
      $("#firstNameCheck").removeClass("hidden");
      firstName.removeClass("required");
      isValid[IS_FIRSTNAME_VALID] = true;
    } else {
      //if value is invalid
      isValid[IS_FIRSTNAME_VALID] = false;
      firstName.addClass("required");
      $("#firstNameAlert").removeClass("hidden");
      $("#firstNameCheck").addClass("hidden");
      if (numReg.test(firstNameValue)) {
        //if value contains numbers
        $("#firstNameAlert").text("First name cannot contain numbers!");
      } else if (capitalReg.test(firstNameValue)) {
        //if value is not start with capital letter
        $("#firstNameAlert").text(
          "First name should be start with a CAPITAL letter!"
        );
      } else if (!specialReg.test(firstNameValue)) {
        //if value contains special characters or korean
        $("#firstNameAlert").text(
          "First name cannot contain special characters or korean"
        );
      } else {
        $("#firstNameAlert").text("Something invalid value entered!");
      }
    }
  }
  function handleLastName() {
    var lastNameValue = lastName.val();
    //if value is valid
    if (engReg.test(lastNameValue)) {
      $("#lastNameAlert").addClass("hidden");
      $("#lastNameCheck").removeClass("hidden");
      lastName.removeClass("required");
      isValid[IS_LASTNAME_VALID] = true;
    } else {
      //if value is invalid
      isValid[IS_LASTNAME_VALID] = false;
      lastName.addClass("required");
      $("#lastNameAlert").removeClass("hidden");
      $("#lastNameCheck").addClass("hidden");
      if (numReg.test(lastNameValue)) {
        //if value contains numbers
        $("#lastNameAlert").text("Last name cannot contain numbers!");
      } else if (capitalReg.test(lastNameValue)) {
        //if value is not start with capital letter
        $("#lastNameAlert").text(
          "Last name should be start with a CAPITAL letter!"
        );
      } else if (!specialReg.test(lastNameValue)) {
        //if value contains special characters or korean
        $("#lastNameAlert").text(
          "Last name cannot contain special characters or korean!"
        );
      } else {
        $("#lastNameAlert").text("Something invalid value entered!");
      }
    }
  }
  function handleSignUpEmail() {
    var signUpEmailValue = signUpEmail.val();
    //if value is valid
    if (emailReg.test(signUpEmailValue)) {
      $("#signUpEmailAlert").addClass("hidden");
      $("#signUpEmailCheck").removeClass("hidden");
      signUpEmail.removeClass("required");
      isValid[IS_SIGNUPEMAIL_VALID] = true;
    } else {
      //if value is invalid
      isValid[IS_SIGNUPEMAIL_VALID] = false;
      signUpEmail.addClass("required");
      $("#signUpEmailAlert").removeClass("hidden");
      $("#signUpEmailCheck").addClass("hidden");
      $("#signUpEmailAlert").text("Your email address is invalid!");
    }
  }
  function handleSignUpPassword() {
    var signUpPasswordValue = signUpPassword.val();
    //if value is valid
    if (pwReg.test(signUpPasswordValue)) {
      $("#signUpPasswordAlert").addClass("hidden");
      $("#signUpPasswordCheck").removeClass("hidden");
      signUpPassword.removeClass("required");
      isValid[IS_SIGNUPPW_VALID] = true;
    } else {
      //if value is invalid
      isValid[IS_SIGNUPPW_VALID] = false;
      signUpPassword.addClass("required");
      $("#signUpPasswordAlert").removeClass("hidden");
      $("#signUpPasswordCheck").addClass("hidden");
      $("#signUpPasswordAlert").text(
        "Requirement: at least 6 characters, one capital letter, one lowercase letter, atleast one digit and one special charcter!"
      );
    }
  }
  function handleConfirmPassword() {
    //if value is invalid
    if (confirmPassword.val() == signUpPassword.val()) {
      $("#confirmPasswordAlert").addClass("hidden");
      $("#confirmPasswordCheck").removeClass("hidden");
      confirmPassword.removeClass("required");
      isValid[IS_CONFIRMPW_VALID] = true;
    } else {
      //if value is valid
      isValid[IS_CONFIRMPW_VALID] = false;
      confirmPassword.addClass("required");
      $("#confirmPasswordAlert").removeClass("hidden");
      $("#confirmPasswordCheck").addClass("hidden");
      $("#confirmPasswordAlert").text("Password does not match!");
    }
  }

  //set onChange event listener
  firstName.on("change keyup paste", handleFirstName);
  lastName.on("change keyup paste", handleLastName);
  radio.change(function () {
    $("#radioAlert").addClass("hidden");
    $("#radioCheck").removeClass("hidden");
    isValid[IS_RADIO_VALID] = true;
  });
  signUpEmail.on("change keyup paste", handleSignUpEmail);
  signUpPassword.on("change keyup paste", handleSignUpPassword);
  confirmPassword.on("change keyup paste", handleConfirmPassword);

  // set onClick event listener
  $("#signUpBtn").click(function () {
    //for firstname
    if (!firstName.val()) {
      //if value is empty
      firstName.addClass("required");
      $("#firstNameAlert")
        .removeClass("hidden")
        .text("Please enter your first name!");
      isValid[IS_FIRSTNAME_VALID] = false;
    } else {
      handleFirstName();
    }
    //for last name
    if (!lastName.val()) {
      //if value is empty
      lastName.addClass("required");
      $("#lastNameAlert")
        .removeClass("hidden")
        .text("Please enter your last name!");
      isValid[IS_LASTNAME_VALID] = false;
    } else {
      handleLastName();
    }
    //for gender
    if (radio.is(":checked")) {
      //if value is checked
      isValid[IS_RADIO_VALID] = true;
      $("#radioCheck").removeClass("hidden");
    } else {
      //if value is not checked
      $("#radioAlert").removeClass("hidden").text("Please select your gender!");
      isValid[IS_RADIO_VALID] = false;
    }
    //for email
    if (!signUpEmail.val()) {
      //if value is empty
      signUpEmail.addClass("required");
      $("#signUpEmailAlert")
        .removeClass("hidden")
        .text("Please enter your email!");
      isValid[IS_SIGNUPEMAIL_VALID] = false;
    } else {
      handleSignUpEmail();
    }
    //for email
    if (!signUpPassword.val()) {
      //if value is empty
      signUpPassword.addClass("required");
      $("#signUpPasswordAlert")
        .removeClass("hidden")
        .text("Please enter your password!");
      isValid[IS_SIGNUPPW_VALID] = false;
    } else {
      handleSignUpPassword();
    }
    //for confirm password
    if (!confirmPassword.val()) {
      //if value is empty
      confirmPassword.addClass("required");
      $("#confirmPasswordAlert")
        .removeClass("hidden")
        .text("Please re-enter your password!");
      isValid[IS_CONFIRMPW_VALID] = false;
    } else {
      handleConfirmPassword();
    }
    //if every value is valid
    if (!isValid.includes(false)) {
      //save in local storage
      localStorage.setItem("firstName", JSON.stringify([firstName.val()]));
      localStorage.setItem("lastName", JSON.stringify([lastName.val()]));
      localStorage.setItem(
        "gender",
        JSON.stringify([$("input[name=radio]:checked").val()])
      );
      localStorage.setItem("email", JSON.stringify([signUpEmail.val()]));
      localStorage.setItem("pw", JSON.stringify([signUpPassword.val()]));

      //show sign up complete page
      $("#signUpContent").addClass("hidden");
      $("#signUpComplete").removeClass("hidden");
    }
  });
});
