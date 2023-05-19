import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/rule/rule.css";

const SubPage2 = () => {
  return (
    <div className="main_text">
      <ol>
        <li className="ol">
          가족의 상황과 부상자를 살펴보고 즉시 구조 요청을 합니다.
        </li>
        <ul className="ul list-unstyled">
          <li className="ul">
            흔들림이 멈추면 함께 있는 가족끼리 부상이 없는지 집에 위험이 없는지
            확인합니다.
          </li>
          <li className="ul">
            부상자가 있으면 이웃과 서로 협력하여 응급처치하고 소방서(119) 등
            구조구급기관에 신고합니다.
          </li>
        </ul>
        <li className="ol">주변의 피해 상황에 따라 귀가 여부를 결정합니다.</li>
        <ul className="list-unstyled">
          <li className="ul">
            지진이 발생하면 라디오 및 주변에 있는 공공기관이 제공하는 정보에
            따라 행동하며, 귀가여부를 판단합니다.
          </li>
        </ul>
        <li className="ol">
          가정이나 사무실로 돌아간 후에는 안전에 유의하여 주변을 확인합니다.
        </li>
        <ul className="list-unstyled">
          <li className="ul">
            가정이나 사무실의 피해 상황을 확인하고, 안전이 의심된다면 전문가의
            확인을 받도록 합니다.
          </li>
          <li className="ul">
            옷장이나 사무실 보관함 등의 내용물이 쏟아져 내려 부상을 입을 수도
            있으므로 문을 열 때 주의합니다.
          </li>
        </ul>
        <li className="ol">올바른 정보를 항상 확인합니다.</li>
        <ul className="list-unstyled">
          <li className="ul">
            근거없는 유언비어에 유의하고, TV‧라디오나 공공기관에서 제공하는
            정보를 확인하여 지진 국민행동요령에 따릅니다.
          </li>
        </ul>
      </ol>
    </div>
  );
};

export default SubPage2;
