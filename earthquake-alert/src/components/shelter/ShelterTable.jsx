import React from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../../styles/table.css";

const ShelterTable = ({ shelterData, activePage, handlePageChange }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(shelterData.length / itemsPerPage);

  const renderTableRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = shelterData.slice(startIndex, endIndex);
    //예상수용인원 계산 면적(평수) * 안전계수(대부분 오픈된 장소이므로 0.8) / 인당 사용 가능 평수(1평, 여유있게 1.5평으로 해도 되겠습니다.)
    return paginatedData.map((shelter, index) => (
      <tr className="tbody_black" key={"shelter" + index}>
        <td>{startIndex + index + 1}</td>
        <td>{shelter.EQUP_NM}</td>
        <td>{shelter.LOC_SFPR_A}</td>
        <td>{parseInt(shelter.SECT_EQUP).toLocaleString()}</td>
        <td>{parseInt(shelter.SECT_EQUP * 0.8).toLocaleString()}명</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    let items = [];
    const startPage = Math.max(1, activePage - 1);
    const endPage = Math.min(totalPages, activePage + 1);

    items.push(
      <Pagination.First
        key="first"
        disabled={activePage === 1}
        onClick={() => handlePageChange(1)}
      />
    );

    items.push(
      <Pagination.Prev
        key="prev"
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      />
    );

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={"Pagination_Item" + number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(activePage + 1)}
      />
    );

    items.push(
      <Pagination.Last
        key="last"
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      />
    );

    return <Pagination className="font_color_blue">{items}</Pagination>;
  };

  return (
    <div className="table_wrapper" style={{ marginBottom: "80px" }}>
      <Table
        style={{ width: "85vw", maxWidth: "900px", textAlign: "center" }}
        striped
        bordered
        hover
        responsive
      >
        <thead>
          <tr className="bg_color_blue">
            <th
              className="thead_th"
              style={{
                borderTopLeftRadius: "10px",
                width: "60px",
              }}
              scope="col"
            >
              연번
            </th>
            <th style={{ width: "235px" }} className="thead_th" scope="col">
              시설명
            </th>
            <th style={{ width: "330px" }} className="thead_th" scope="col">
              상세주소
            </th>
            <th style={{ width: "95px" }} className="thead_th" scope="col">
              면적
            </th>
            <th
              className="thead_th"
              scope="col"
              style={{
                borderTopRightRadius: "10px",
              }}
            >
              예상대피가능인원
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </div>
  );
};

export default ShelterTable;
