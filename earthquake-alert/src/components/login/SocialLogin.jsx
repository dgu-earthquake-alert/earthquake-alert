import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Button } from "react-bootstrap";
import { is } from "date-fns/locale";
import SocialLoginModal from "../modal/SocialLoginModal";
import styles from "../../styles/login/login.module.css";
import login from "../../assets/icon/login.png";

const SocialLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clickGreeting, setClickGreeting] = useState(false);

  const isPC = useMediaQuery({
    query: "(min-width:820px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:819px)",
  });

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
    <div>
      {userInfo ? (
        <div>
          <div
            className={styles.nav_greeting}
            onClick={() => setClickGreeting((prev) => !prev)}
          >
            {isMobile ? (
              <img src={login} alt="login" width="35px" />
            ) : (
              `${userInfo.name}님`
            )}
          </div>
          {clickGreeting && (
            <div className={styles.modal_content}>
              <div className={styles.nav_modal_greeting}>
                {userInfo.name}님 환영합니다!
              </div>
              <div className={styles.nav_button_container}>
                <div className={styles.nav_logout} onClick={handleLogout}>
                  로그아웃
                </div>
                <div
                  className={styles.nav_withdrawal}
                  onClick={handleWithdrawal}
                >
                  회원탈퇴
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.nav_login} onClick={handleOpenModal}>
          {isMobile ? <img src={login} alt="login" width="35px" /> : "로그인"}
        </div>
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
