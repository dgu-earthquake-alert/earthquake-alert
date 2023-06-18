import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/error/error.css";
import errorIcon from "../assets/icon/error.png";
import lostIcon from "../assets/icon/lost.png";

const Error = () => {
  return (
    <>
      <div className="img_wrraper">
        <img src={errorIcon} alt="error" width="500px" />
        {/* <img src={lostIcon} alt="error" width="350px" /> */}
      </div>
      <div>
        <p className="error_text">잘못된 주소입니다.</p>
        <p className="error_text">다시 한번 확인해 주세요!</p>
        <Link to="/" className="select_button">
          홈으로 돌아가기
        </Link>
      </div>
    </>
  );
};

export default Error;
