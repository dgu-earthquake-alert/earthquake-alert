import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../styles/shelter_table.css";

const ShelterTable = ({ shelterData }) => {
  const itemsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(shelterData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderTableRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = shelterData.slice(startIndex, endIndex);

    return paginatedData.map((shelter, index) => (
      <tr className="tbody_black" key={"shelter" + index}>
        <td>{startIndex + index + 1}</td>
        <td>{shelter.EQUP_NM}</td>
        <td>{shelter.LOC_SFPR_A}</td>
        <td>{shelter.SECT_EQUP}</td>
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
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="bg_color_blue">
            <th
              className="thead_th"
              style={{
                borderTopLeftRadius: "10px",
              }}
              scope="col"
            >
              연번
            </th>
            <th className="thead_th" scope="col">
              시설명
            </th>
            <th className="thead_th" scope="col">
              상세주소
            </th>
            <th
              className="thead_th"
              style={{
                borderTopRightRadius: "10px",
              }}
              scope="col"
            >
              면적
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
