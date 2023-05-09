import { districtData } from "../utils/districtData";
import { useState } from "react";
import "../styles/App.css";

const DistrictSelector = ({ map }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districtData[0]);
  const [selectedDong, setSelectedDong] = useState(selectedDistrict.dong[0]);

  const handleDistrictChange = (event) => {
    const district = districtData.find((d) => d.name === event.target.value);
    setSelectedDistrict(district);
    setSelectedDong(district.dong[0]);
    map.setCenter({ lat: district.lat, lng: district.lng });
  };

  const handleDongChange = (event) => {
    const dongName = event.target.value;
    const dong = selectedDistrict.dong.find((d) => d.name === dongName);
    setSelectedDong(dong);
    map.setCenter({ lat: dong.lat, lng: dong.lng });
  };

  return (
    <div style={{ marginBottom: "5px" }}>
      <select
        className="btn btn-secondary dropdown-toggle color_blue"
        style={{ marginRight: "5px" }}
        onChange={handleDistrictChange}
      >
        {districtData.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
      <select
        className="btn btn-secondary dropdown-toggle color_blue"
        onChange={handleDongChange}
      >
        {selectedDistrict.dong.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;
