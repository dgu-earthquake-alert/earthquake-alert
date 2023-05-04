import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://openapi.seoul.go.kr:8088/";
//옥외대피소 API
export const fetchShelterData = async (gu, dong) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_KEY}/json/TlEtqkP/1/1000/`
    );
    const data = response.data;

    if (data.TlEtqkP.RESULT && data.TlEtqkP.RESULT.CODE === "INFO-000") {
      const filteredData = data.TlEtqkP.row.filter((shelter) => {
        const inSelectedGu = gu === "-" || gu === shelter.SGG_NM;

        let substringAddress = shelter.LOC_SFPR_A.substring(8); //includes 함수 효율을 위해 10번째 문자부터 반환합니다.

        const inSelectedDong = dong === "-" || substringAddress.includes(dong);
        return inSelectedGu && inSelectedDong;
      });
      return filteredData;
    } else {
      alert(`API 요청 중 문제가 발생했습니다: ${data.TlEtqkP.RESULT.MESSAGE}`);
      return [];
    }
  } catch (error) {
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
    return [];
  }
};
