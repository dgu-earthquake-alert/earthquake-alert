import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://openapi.seoul.go.kr:8088/";

// 옥외대피소 API: outdoorResponse, 실내구호소 API: indoorResponse
export const fetchShelterData = async () => {
  try {
    const outdoorResponse = await axios.get(`${BASE_URL}${API_KEY}/json/TlEtqkP/1/1000/`);
    const outdoorData = outdoorResponse.data;

    const indoorResponse = await axios.get(`${BASE_URL}${API_KEY}/json/TlInetqkP/1/1000/`);
    const indoorData = indoorResponse.data;

    console.log(outdoorData);
    console.log(indoorData);

    if (outdoorData.TlEtqkP.RESULT && outdoorData.TlEtqkP.RESULT.CODE === "INFO-000") {
      const outdoorShelterData = outdoorData.TlEtqkP.row.map((shelter) => ({
        name: shelter.EQUP_NM,
        lat: parseFloat(shelter.YCORD),
        lng: parseFloat(shelter.XCORD)
      }));

      console.log(outdoorShelterData);

      let combinedShelterData = outdoorShelterData;

      if (indoorData.TlInetqkP.RESULT && indoorData.TlInetqkP.RESULT.CODE === "INFO-000") {
        const indoorShelterData = indoorData.TlInetqkP.row.map((shelter) => ({
          name: shelter.EQUP_NM,
          lat: parseFloat(shelter.YCORD),
          lng: parseFloat(shelter.XCORD)
        }));

        console.log(indoorShelterData);

        combinedShelterData = [...combinedShelterData, ...indoorShelterData];
      }

      return combinedShelterData;
    } else {
      alert(`API 요청 중 문제가 발생했습니다: ${outdoorData.TlEtqkP.RESULT.MESSAGE}`);
      return [];
    }
  } catch (error) {
    console.error(error.message);
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
    return [];
  }
};
