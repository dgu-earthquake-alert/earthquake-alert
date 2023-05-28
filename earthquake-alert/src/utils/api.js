import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://openapi.seoul.go.kr:8088/";
const GO_API_KEY = process.env.REACT_APP_GO_API_KEY; // 공공데이터포털 API 키
const GO_BASE_URL = "http://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg";
/*
 * 브라우저 렌더링 성능상 fetch 다 나누는게 좋을것 같아 이름 변경 했습니다.
 * 별 fetchShelterData -> fetchMapPlaceData
 * 수빈 fetchShelterData -> fetchShelterTableData, fetchRecordData -> fetchRecordTableData
 * 제 생각에 소연님의 map에서는 indoorData는 가져오지 않는 것이 좋아보입니다. 왜냐하면 지진이 실제 발생했을 때 사람들을 실내구호소로 대피시킬 수는 없을 것 같아요.
 * 옥외대피소만 표시해주시면 될 것 같고 이를 새로 api.js에 추가해주시면 될것같습니다.
 */
// 옥외대피소 API: outdoorResponse, 실내구호소 API: indoorResponse
export const fetchMapPlaceData = async () => {
  try {
    const outdoorResponse = await axios.get(
      `${BASE_URL}${API_KEY}/json/TlEtqkP/1/1000/`
    );
    const outdoorData = outdoorResponse.data;

    const indoorResponse = await axios.get(
      `${BASE_URL}${API_KEY}/json/TlInetqkP/1/1000/`
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
      alert(
        `API 요청 중 문제가 발생했습니다: ${outdoorData.TlEtqkP.RESULT.MESSAGE}`
      );
    }
  } catch (error) {
    console.error(error.message);
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
  }
};

export const fetchShelterTableData = async (gu, dong) => {
  try {
    const response = await axios.get(
      //"http://openapi.seoul.go.kr:8088/66524245416c736239334a75697446/json/TlEtqkP/1/1000/"
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
    console.error(error.message);
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
    return [];
  }
};

export const fetchRecordTableData = async (si, startDate, endDate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_KEY}/json/TbEqkKenvinfo/1/1000/`
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
      alert(
        `API 요청 중 문제가 발생했습니다: ${data.TbEqkKenvinfo.RESULT.MESSAGE}`
      );
      return [];
    }
  } catch (error) {
    console.error(error.message);
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
    return [];
  }
};

export const fetchEarthquakeData = async () => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const toTmFc = formatDate(today);
    const fromTmFc = formatDate(yesterday);

    const encodedApiKey = encodeURIComponent(GO_API_KEY);
    const url = `${GO_BASE_URL}?serviceKey=${encodedApiKey}&dataType=JSON&fromTmFc=${fromTmFc}&toTmFc=${toTmFc}`;

    const earthquakeResponse = await axios.get(url);
    const earthquakeData = earthquakeResponse.data;

    if (!earthquakeData || !earthquakeData.response || !earthquakeData.response.body || !earthquakeData.response.body.items || !earthquakeData.response.body.items.item) {
      return { message: "저장된 데이터가 없습니다." };
    }

    const items = earthquakeData.response.body.items.item;

    const filteredItems = items.filter(item => item.fcTp === 3); // 국내지진만 필터링

    const earthquakeInfo = {
      loc: filteredItems[0].loc,
      lat: parseFloat(filteredItems[0].lat),
      lng: parseFloat(filteredItems[0].lon),
      mt: filteredItems[0].mt,
    };

    return earthquakeInfo;

  } catch (error) {
    console.error(error.message);
    alert(`API 요청 중 에러가 발생했습니다: ${error.message}`);
  }
  
};