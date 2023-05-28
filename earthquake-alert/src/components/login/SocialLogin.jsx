import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import "../../styles/login/login.css"

const SocialLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleSocialLogin = () => {
    window.location.href = "http://localhost:8081/auth/authorize/google";
    //window.location.href = 'http://earthquake-alert.site/auth/authorize/google';
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.log('Error fetching user information');
        }
      } catch (error) {
        console.log('Error fetching user information', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className='login_box'>
      {userInfo ? (
        <div className='login_text'>
          {userInfo.name}님 환영합니다!
        </div>
      ) : (
        <Button variant="light" onClick={handleSocialLogin}>소셜 로그인</Button>
      )}
    </div>
  );
};

export default SocialLogin;
