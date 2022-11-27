import "../scss/Login.css";
import Radio from "./Login/Radio";
import RadioGroup from "./Login/RadioGroup";
import { useState } from "react";
import InputTextGroup from "./Login/InputTextGroup";
import InputText from "./Login/InputText";
import { useNavigate } from "react-router-dom";

function Login() {
  const [radioValue, setRadioValue] = useState("재학생");
  const [isShow, setShow] = useState(true);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  //if '재학생' radio button onclick
  function onClickStudent() {
    setShow(true);
    setName("");
    setStudentId("");
    setMajor("");
  }
  //if '외부인' radio button onclick
  function onClickOther() {
    setShow(false);
    setName("");
    setStudentId("");
    setMajor("");
  }

  //input user info
  const handleName = ({ target: { value } }) => setName(value);
  const handleStudentId = ({ target: { value } }) => setStudentId(value);
  const handleMajor = ({ target: { value } }) => setMajor(value);

  //check value and move to main page
  const navigate = useNavigate();
  function handleLoginBtn() {
    if (name.length < 2) {
      alert("이름을 정확히 입력해주세요!");
      setName("");
      return;
    }
    if (radioValue === "재학생") {
      if (studentId.length !== 10 || isNaN(studentId)) {
        alert("학번을 정확히 입력해주세요!");
        setStudentId("");
        return;
      }
      if (major.length < 2) {
        alert("학과를 정확히 입력해주세요!");
        setMajor("");
        return;
      }
    } else {
      setStudentId(0);
      setMajor(radioValue);
    }
    sessionStorage.setItem("login-name", name);
    navigate("/main");
  }

  return (
    <div className="Login">
      <center>
        <div className="loginHeader">
          <p>2022 SKKU Fall semester</p>
          <p>Project Exhibition</p>
        </div>
        <div className="loginBody">
          <div className="loginBody-top">
            <div className="logoText">
              <p>web programming lab</p>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/skku.png`}
              className="logoImg"
              alt="skku.png"
            />
          </div>
          <div className="loginBody-middle">
            <form>
              <RadioGroup value={radioValue} onChange={setRadioValue}>
                <Radio
                  id="radioStudent"
                  value="재학생"
                  onClick={onClickStudent}
                />
                <Radio id="radioOther" value="외부인" onClick={onClickOther} />
              </RadioGroup>
              <InputTextGroup className="inputText" show={isShow}>
                {isShow && (
                  <InputText
                    id="inputStudent"
                    nameValue={name}
                    onNameChange={handleName}
                    studentIdValue={studentId}
                    onStudentIdChange={handleStudentId}
                    majorValue={major}
                    onMajorChange={handleMajor}
                  />
                )}
                {!isShow && (
                  <InputText
                    id="inputOther"
                    nameValue={name}
                    onNameChange={handleName}
                  />
                )}
              </InputTextGroup>
            </form>
          </div>
          <div className="loginBody-base">
            <p>final project</p>
          </div>
        </div>
        <div className="loginButton" type="submit" onClick={handleLoginBtn}>
          <span>enter</span>
          <div className="dot"></div>
        </div>
      </center>
    </div>
  );
}

export default Login;
