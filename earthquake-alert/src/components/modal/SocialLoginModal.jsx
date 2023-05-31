import React, { useState, useEffect } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import googleIcon from "../../assets/icon/google.png";
import kakaoIcon from "../../assets/icon/kakao.png";
import naverIcon from "../../assets/icon/naver.png";

const SocialLoginModal = ({ showModal, handleCloseModal }) => {
  const handleGoogleLogin = () => {
    //window.location.href = "http://localhost:8081/auth/authorize/google";
    window.location.href =
      "https://server.earthquake-alert.site/auth/authorize/google";
  };

  const handleKakaoLogin = () => {
    //window.location.href = "http://localhost:8081/auth/authorize/kakao";
    window.location.href =
      "https://server.earthquake-alert.site/auth/authorize/kakao";
  };

  const handleNaverLogin = () => {
    //window.location.href = "http://localhost:8081/auth/authorize/naver";
    window.location.href =
      "https://server.earthquake-alert.site/auth/authorize/naver";
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>소셜 로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>소셜 로그인을 통해 즐겨찾기 서비스를 이용해 보세요.</p>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={handleGoogleLogin}
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              style={{
                marginRight: "3%",
                width: "7%",
              }}
            />
            Google로 시작하기
          </Button>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#FEE500",
              borderColor: "#FEE500",
              color: "#000000",
              margin: "1% 0",
            }}
            onClick={handleKakaoLogin}
          >
            <img
              src={kakaoIcon}
              alt="Kakao Icon"
              style={{
                marginRight: "3%",
                width: "7%",
              }}
            />
            카카오로 시작하기
          </Button>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#2DB400",
              borderColor: "#2DB400",
            }}
            onClick={handleNaverLogin}
          >
            <img
              src={naverIcon}
              alt="Naver Icon"
              style={{
                marginRight: "3%",
                width: "7%",
              }}
            />
            네이버로 시작하기
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SocialLoginModal;
