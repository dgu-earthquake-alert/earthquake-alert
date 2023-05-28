import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/login/login.css";
import { is } from "date-fns/locale";
import SocialLoginModal from "../modal/SocialLoginModal";

const SocialLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSocialLogin = () => {
    window.location.href = "http://localhost:8081/auth/authorize/google";
    //window.location.href = 'http://earthquake-alert.site/auth/authorize/google';
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.log("Error fetching user information");
        }
      } catch (error) {
        console.log("Error fetching user information", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleWithdrawal = () => {
    const confirmWithdrawal = window.confirm("정말 탈퇴하시겠습니까?");

    if (confirmWithdrawal) {
      fetch("http://localhost:8081/api/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("token");
            setUserInfo(null);
            window.location.reload();
          } else {
            console.log(response.text);
          }
        })
        .catch((error) => {
          console.log("Error deleting user information", error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    window.location.reload();
  };

  return (
    <div className="login_box">
      {userInfo ? (
        <div className="login_text">
          {userInfo.name}님 환영합니다!
          <Button variant="light" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button variant="secondary" onClick={handleWithdrawal}>
            회원탈퇴
          </Button>
        </div>
      ) : (
        <Button variant="light" onClick={handleOpenModal}>
          소셜 로그인
        </Button>
      )}
      {showModal && (
        <SocialLoginModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SocialLogin;
