import React from "react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/rule/rule.css";
import { Routes, Route, Link } from "react-router-dom"; // 페이지 이동
import SubPage1 from "./SubPage1";
import SubPage2 from "./SubPage2";

const Rule = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = () => {
    setActiveButton("");
  };

  const handleSecondButtonClick = () => {
    setActiveButton("subpage1");
  };

  const handleThirdButtonClick = () => {
    setActiveButton("subpage2");
  };

  return (
    <>
      <Header />
      <main
        className="main"
        style={{
          width: "85vw",
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "80px",
        }}
      >
        <div className="main_title">지진, 이렇게 행동하세요.</div>
        <div className="btn_select_group">
          <Link
            to="/rule"
            className={`select_button ${
              activeButton === "" ? "color_blue" : "color_white"
            }`}
            onClick={handleButtonClick}
          >
            평소 대비
          </Link>
          <Link
            to="/rule/subpage1"
            className={`select_button ${
              activeButton === "subpage1" ? "color_blue" : "color_white"
            }`}
            onClick={handleSecondButtonClick}
          >
            지진 발생 시
          </Link>
          <Link
            to="/rule/subpage2"
            className={`select_button ${
              activeButton === "subpage2" ? "color_blue" : "color_white"
            }`}
            onClick={handleThirdButtonClick}
          >
            지진 발생 후
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="main_text">
                <ol>
                  <li className="ol">집 안에서의 안전을 확보합니다.</li>
                  <ul className="ul list-unstyled">
                    <li className="ul">
                      탁자 아래와 같이 집 안에서 대피할 수 있는 안전한 대피
                      공간을 미리 파악해 둡니다.
                    </li>
                    <li className="ul">
                      유리창이나 넘어지기 쉬운 가구 주변 등 위험한 위치를 확인해
                      두고 지진 발생 시 가까이 가지 않도록 합니다.
                    </li>
                    <li className="ul">
                      깨진 유리 등에 다치지 않도록 두꺼운 실내화를 준비해
                      둡니다.
                    </li>
                    <li className="ul">
                      화재를 일으킬 수 있는 난로나 위험물은 주의하여 관리합니다.
                    </li>
                  </ul>
                  <li className="ol">
                    집 안에서 떨어지기 쉬운 물건을 고정합니다.
                  </li>
                  <ul className="list-unstyled">
                    <li className="ul">
                      가구나 가전제품이 흔들릴 때 넘어지지 않도록 고정해 둡니다.
                    </li>
                    <li className="ul">
                      텔레비전, 꽃병 등 떨어질 수 있는 물건은 높은 곳에 두지
                      않도록 합니다.
                    </li>
                    <li className="ul">
                      그릇장 안의 물건들이 쏟아지지 않도록 문을 고정해 둡니다.
                    </li>
                    <li className="ul">
                      창문 등의 유리 부분은 필름을 붙여 유리가 파손되지 않도록
                      합니다.
                    </li>
                  </ul>
                  <li className="ol">집을 안전하게 관리합니다.</li>
                  <ul className="list-unstyled">
                    <li className="ul">가스 및 전기를 미리 점검합니다.</li>
                    <li className="ul">
                      건물이나 담장은 수시로 점검하고, 위험한 부분은 안전하게
                      수리합니다.
                    </li>
                    <li className="ul">
                      건물의 균열을 발견하면 전문가에게 문의하여 보수하고
                      보강합니다.
                    </li>
                  </ul>
                  <li className="ol">
                    평상시 가족회의를 통하여 위급한 상황에 대비합니다.
                  </li>
                  <ul className="list-unstyled">
                    <li className="ul">
                      가스 및 전기를 차단하는 방법을 알아 둡니다.
                    </li>
                    <li className="ul">
                      머물고 있는 곳 주위의 넓은 공간 등 대피할 수 있는 장소를
                      알아 둡니다.
                    </li>
                    <li className="ul">
                      비상시 가족과 만날 곳과 연락할 방법을 정해 둡니다.
                    </li>
                    <li className="ul">
                      응급처치하는 방법을 반복적으로 훈련하여 익혀 둡니다.
                    </li>
                  </ul>
                  <li className="ol">평소 비상용품을 잘 준비해 둡니다.</li>
                  <ul className="list-unstyled">
                    <li className="ul">
                      지진에 대비하여 비상용품을 준비해 두고, 보관 장소와
                      사용방법을 알아 둡니다.
                    </li>
                    <li className="ul">
                      지진 발생 시 화재가 발생할 수 있으니 소화기를 준비해 두고,
                      사용방법을 알아 둡니다.
                    </li>
                  </ul>
                </ol>
              </div>
            }
          />
          <Route path="/subpage1" element={<SubPage1 />} />
          <Route path="/subpage2" element={<SubPage2 />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default Rule;
