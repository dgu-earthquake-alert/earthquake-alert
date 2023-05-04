// src/components/ShelterTable.jsx
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

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

    return paginatedData.map((shelter) => (
      <tr key={shelter.SN}>
        <td>{shelter.SN}</td>
        <td>{shelter.FCLTY_NM}</td>
        <td>{shelter.DTL_ADRES}</td>
        <td>{shelter.AREA}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>연번</th>
            <th>시설명</th>
            <th>상세주소</th>
            <th>면적</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </div>
  );
};

export default ShelterTable;
