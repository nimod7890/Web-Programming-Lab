import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/layouts/header.scss";
import Button from "./header/button";
import MenuGroup from "./header/MenuGroup";
import Menu from "./header/Menu";

const Header = () => {
  const [userName, setUserName] = useState("방문자");

  const navigate = useNavigate();
  function handleOnClick(classURL) {
    navigate(classURL);
  }
  var jbRandom = Math.random();
  var random_id = (Math.floor(jbRandom * 1000) % 658) + 10371;
  if (random_id === 0) random_id = 1;
  var project_src = "/project/" + random_id;
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };
  useEffect(() => {
    if (sessionStorage.getItem("login-name")) {
      setUserName(sessionStorage.getItem("login-name"));
    }
  }, []);

  return (
    <header className="header">
      <img
        src={`${process.env.PUBLIC_URL}/exhibition.png`}
        onClick={() => handleOnClick("/main")}
        alt=""
        className="headerLogo"
        id="DesktopLogo"
      />
      <div className="headerMenu">
        <Button
          className="button"
          onClick={handleToggle}
          id="ClassBtn"
          value="분반"
        >
          <div className={`classMenu ${isActive ? "onclick" : ""}`}>
            <MenuGroup className="leftMenu">
              <Menu value="DASF002I1" />
              <Menu value="DASF002I2" />
              <Menu value="DASF002I3" />
              <Menu value="DASF002I4" />
              <Menu value="DASF002I5" />
            </MenuGroup>
            <MenuGroup className="rightMenu">
              <Menu value="DASF002I6" />
              <Menu value="DASF002I7" />
              <Menu value="DASF002IF" />
              <Menu value="GEDT015I1" />
            </MenuGroup>
          </div>
        </Button>
        <Button
          id="TagBtn"
          onClick={() => handleOnClick("/tag")}
          value="해시태그"
        />
        <Button
          id="Awards"
          onClick={() => handleOnClick("/awards")}
          value="시상식"
        />
        <Button
          id="Explore"
          onClick={() => handleOnClick(project_src)}
          value="탐험하기"
        />
        {/*</a>*/}
      </div>
      <div className="headerWelcome">
        <p>
          <span id="user">{userName}</span>님,
          <span id="welcome">환영합니다!</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
