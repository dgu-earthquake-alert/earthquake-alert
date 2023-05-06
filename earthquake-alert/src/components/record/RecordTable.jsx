import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../../styles/shelter/shelter_table.css";

const RecordTable = ({ recordData = [] }) => {
  const itemsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(recordData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderTableRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = recordData.slice(startIndex, endIndex);

    return paginatedData.map((record, index) => (
      <tr className="tbody_black" key={"record" + index}>
        <td>{startIndex + index + 1}</td>
        <td>{record.REGDATE.substring(0, 10)}</td>
        <td>{record.LOCUS}</td>
        <td>{record.MAGNI}</td>
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
    <div className="table_wrapper">
      <Table style={{ width: "100%" }} striped bordered hover responsive>
        <thead>
          <tr className="bg_color_blue">
            <th
              className="thead_th"
              style={{ borderTopLeftRadius: "10px" }}
              scope="col"
            >
              연번
            </th>
            <th className="thead_th" scope="col">
              발생일자
            </th>
            <th className="thead_th" scope="col">
              위치
            </th>
            <th
              className="thead_th"
              style={{ borderTopRightRadius: "10px" }}
              scope="col"
            >
              규모
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </div>
  );
};

export default RecordTable;
