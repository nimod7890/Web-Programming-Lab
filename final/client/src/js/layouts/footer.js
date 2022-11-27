import React from "react";
import "../../scss/layouts/Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footerWrapper">
        <div className="copyright">
          <p>
            Copyright ⓒ 2022 Web Programming Lab, Sungkyunkwan University <br />
          </p>
        </div>
        <div className="snsLogo">
          <a
            className="github"
            target="_blank"
            href="https://github.com/nimod7890/Web-Programming-Lab/tree/main/final"
            rel="noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/github.png`}
              alt="github logo"
            />
          </a>
          <a
            className="instagram"
            target="_blank"
            href="https://www.instagram.com/nim_od/"
            rel="noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/instagram.png`}
              alt="intragram logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
