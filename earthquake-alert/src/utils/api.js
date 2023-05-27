import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

//const BASE_URL = "http://openapi.seoul.go.kr:8088/";

//배포
const BASE_URL = "https://server.earthquake-alert.site/api/";
//const BASE_URL = "http://localhost:8081/api/";
// 옥외대피소 API: outdoorResponse, 실내구호소 API: indoorResponse

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키를 요청에 포함합니다.
});

export const sendTokenToServer = (token) => {
  apiClient
    .post("register-token", {
      fcmtoken: token,
    })
    //.then((response) => {
    //  alert(JSON.stringify(response.data));
    //})
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx의 범위를 벗어나는 상태 코드를 반환
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    });
};

export const fetchMapPlaceData = async () => {
  try {
    const outdoorResponse = await apiClient.get(
      `${API_KEY}/json/TlEtqkP/1/1000/`
    );
    const outdoorData = outdoorResponse.data;

    const indoorResponse = await apiClient.get(
      `${API_KEY}/json/TlInetqkP/1/1000/`
    );
    const indoorData = indoorResponse.data;

    // console.log(outdoorData);
    // console.log(indoorData);

    if (
      outdoorData.TlEtqkP.RESULT &&
      outdoorData.TlEtqkP.RESULT.CODE === "INFO-000"
    ) {
      const outdoorShelterData = outdoorData.TlEtqkP.row.map((shelter) => ({
        name: shelter.EQUP_NM,
        lat: parseFloat(shelter.YCORD),
        lng: parseFloat(shelter.XCORD),
      }));

      // console.log(outdoorShelterData);

      let combinedShelterData = outdoorShelterData;

      if (
        indoorData.TlInetqkP.RESULT &&
        indoorData.TlInetqkP.RESULT.CODE === "INFO-000"
      ) {
        const indoorShelterData = indoorData.TlInetqkP.row.map((shelter) => ({
          name: shelter.EQUP_NM,
          lat: parseFloat(shelter.YCORD),
          lng: parseFloat(shelter.XCORD),
        }));

        // console.log(indoorShelterData);

        combinedShelterData = [...combinedShelterData, ...indoorShelterData];
      }

      return combinedShelterData;
    } else {
      console.error(
        `API 요청 중 문제가 발생했습니다: ${outdoorData.TlEtqkP.RESULT.MESSAGE}`
      );
    }
  } catch (error) {
    console.error(`API 요청 중 문제가 발생했습니다: ${error.message}`);
  }
};

export const fetchShelterTableData = async (gu, dong) => {
  try {
    const response = await apiClient.get(
      //"http://openapi.seoul.go.kr:8088/66524245416c736239334a75697446/json/TlEtqkP/1/1000/"
      `${API_KEY}/json/TlEtqkP/1/1000/`
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
      console.error(
        `API 요청 중 문제가 발생했습니다: ${data.TlEtqkP.RESULT.MESSAGE}`
      );
      return [];
    }
  } catch (error) {
    console.error(`API 요청 중 문제가 발생했습니다: ${error.message}`);
    return [];
  }
};

export const fetchRecordTableData = async (si, startDate, endDate) => {
  try {
    const response = await apiClient.get(
      `${API_KEY}/json/TbEqkKenvinfo/1/1000/`
    );
    const data = response.data;
    if (
      data.TbEqkKenvinfo.RESULT &&
      data.TbEqkKenvinfo.RESULT.CODE === "INFO-000"
    ) {
      const filteredData = data.TbEqkKenvinfo.row.filter((record) => {
        const regDateString = record.REGDATE; //발생일자
        const dateStringOnly = regDateString.split(" ")[0]; //날짜정보만 가져옴 ("날짜 시간")

        const recordDate = new Date(dateStringOnly);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // startDate와 endDate 사이에 있는 row들만 조회합니다.
        const isInDateRange = recordDate >= start && recordDate <= end;

        // 국외 발생한 지진을 제외하고 필터링합니다.
        const isDomestic = record.DITC_NM !== "국외지진";

        const isNotNorthKorea = record.ORIGIN_AREA.substring(0, 2) !== "북한";

        // SiDropdown에서 선택한 시에 해당하는 row들만 조회합니다.
        const isSelectedSi = si === "-" || record.ORIGIN_AREA.startsWith(si);

        return isInDateRange && isDomestic && isNotNorthKorea && isSelectedSi;
      });
      return filteredData;
    } else {
      console.error(
        `API 요청 중 문제가 발생했습니다: ${data.TbEqkKenvinfo.RESULT.MESSAGE}`
      );
      return [];
    }
  } catch (error) {
    console.error(`API 요청 중 에러가 발생했습니다: ${error.message}`);
    return [];
  }
};
