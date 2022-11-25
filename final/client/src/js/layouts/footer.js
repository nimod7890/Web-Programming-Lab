import React from "react";
import "../../css/layouts/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footerWrapper">
        <div className="copyright">
          <p>
            Copyright ⓒ 2022 Learning Fair, Sungkyunkwan University <br />
            데이터사이언스교육센터(
            <a target="_blank" href="http://dsedu.skku.edu" rel="noreferrer">
              dsedu.skku.edu
            </a>
            )
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
