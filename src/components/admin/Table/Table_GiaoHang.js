import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import GiaoHangService from "../../../services/GiaoHangService";
import formatNum from "../../../Format/Format";

import cls from "classnames";
const PER_PAGE = 10;

function TableGiaoHang({donHang,setDonHang}) {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.floor(donHang.length / PER_PAGE) + 1;



  const [searchId, setSearchId] = useState("");

  const [searchDate, setSearchDate] = useState("");

  const [searchTime, setSearchTime] = useState("");

  const searchGiaoHang = async (data) => {
    try {
      const res = await GiaoHangService.timKiem(data);
      console.log(res);
      setDonHang(res.data); 
    } catch (error) {}
  };

  useEffect(() => {
    const id = setTimeout(() => {
      const data = {
        id: searchId || null,
        date: searchDate || null,
        time: searchTime || null,
      };
      const query = queryString.stringify(data);

      searchGiaoHang(query);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [searchId, searchDate, searchTime]);


  const handleReset = () => {
    setSearchId("");
    setSearchDate("");
    setSearchTime("");
  };
  // console.log("Every",donHang);
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Danh Sách</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div id="dataTable_filter" className="dataTables_filter">
                  <label>
                    Search Id:
                    <input
                      value={searchId}
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                  </label>
                </div>
                <div id="dataTable_filter" className="dataTables_filter">
                  <label>
                    Search Ngày:
                    <input
                      value={searchDate}
                      type="date"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                  </label>
                </div>
                <div id="dataTable_filter" className="dataTables_filter">
                  <label>
                    Search Giờ:
                    <input
                      value={searchTime}
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                      onChange={(e) => setSearchTime(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
                  <button
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    onClick={() => handleReset()}
                  >
                    <i className="fas  fa-sm text-white-50"></i>
                    Reset
                  </button>
                </div>
                
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <table
                  className="table table-bordered dataTable"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                  role="grid"
                  aria-describedby="dataTable_info"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting sorting_asc"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-sort="ascending"
                        aria-label="Name: activate to sort column descending"
                        style={{ width: 100 }}
                      >
                        Mã đơn hàng
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Position: activate to sort column ascending"
                        style={{ width: 120 }}
                      >
                        Ngày lập
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Office: activate to sort column ascending"
                        style={{ width: 200 }}
                      >
                        Địa chỉ
                      </th>

                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Start date: activate to sort column ascending"
                        style={{ width: 60 }}
                      >
                        Số lượng
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 144 }}
                      >
                        Tổng
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 160 }}
                      >
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {donHang?.slice(
                        (currentPage - 1) * 10,
                        (currentPage - 1) * 10 + 10
                      ).map((item, i) => {
                        var d = new Date(item.NgayMua),
                          dformat =
                            [
                              d.getDate(),
                              d.getMonth() + 1,
                              d.getFullYear(),
                            ].join("/") +
                            " " +
                            [
                              d.getHours() - 7,
                              d.getMinutes(),
                              d.getSeconds(),
                            ].join(":");

                      return (
                        <tr key={i}>
                          <td className="sorting_1">
                            <Link to={"./"+item.IdHoaDon} state={{ detail: item }}>{item.IdHoaDon}</Link>
                          </td>
                          <td>{dformat}</td>
                          <td>{item.DiaChi}</td> 
                          <td>{item.TongSL}</td>
                          <td>{formatNum(item.Tong)}</td>
                          <td>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div
                  className="dataTables_info"
                  id="dataTable_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 1 to 10 of {totalPage} entries
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="dataTable_paginate"
                >
                  <ul className="pagination">
                    <li
                      className="paginate_button page-item previous disabled"
                      id="dataTable_previous"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <a
                        href="#"
                        aria-controls="dataTable"
                        data-dt-idx={0}
                        tabIndex={0}
                        className="page-link"
                      >
                        Previous
                      </a>
                    </li>
                    {Array.from(new Array(totalPage)).map((number, index) => (
                      <li
                        className={cls("paginate_button page-item", {
                          active: index === currentPage - 1,
                        })}
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx={1}
                          tabIndex={0}
                          className="page-link"
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}

                    <li
                      className="paginate_button page-item next"
                      id="dataTable_next"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <a
                        href="#"
                        aria-controls="dataTable"
                        data-dt-idx={7}
                        tabIndex={0}
                        className="page-link"
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableGiaoHang;
