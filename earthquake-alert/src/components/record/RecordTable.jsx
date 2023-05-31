import React from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../../styles/table.css";

const RecordTable = ({ recordData = [], activePage, handlePageChange }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(recordData.length / itemsPerPage);

  const renderTableRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = recordData.slice(startIndex, endIndex);

    return paginatedData.map((record, index) => (
      <tr className="tbody_black" key={"record" + index}>
        <td>{startIndex + index + 1}</td>
        <td>{record.REGDATE.substring(0, 10)}</td>
        <td>{record.ORIGIN_AREA}</td>
        <td>{record.MAG}</td>
        <td>{record.NOTE1}</td>
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

    return <Pagination>{items}</Pagination>;
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
              style={{ borderTopLeftRadius: "10px", width: "60px" }}
              scope="col"
            >
              연번
            </th>
            <th style={{ width: "130px" }} className="thead_th" scope="col">
              발생일자
            </th>
            <th style={{ width: "150px" }} className="thead_th" scope="col">
              위치
            </th>
            <th style={{ width: "60px" }} className="thead_th" scope="col">
              규모
            </th>
            <th
              className="thead_th"
              style={{ borderTopRightRadius: "10px" }}
              scope="col"
            >
              비고
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
