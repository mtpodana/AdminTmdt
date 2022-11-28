import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import cls from "classnames";
import axiosClient from "../../../axios";
import KhachHangService from "../../../services/KhachHangService";
import queryString from "query-string";


const PER_PAGE = 10;

function TableKhachHang({userList, setUserList, fetchKhachHang}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);
  const totalPage = Math.floor(userList.length / PER_PAGE) + 1;

  const fetchSearchKhachHang = async(data)=>{
    try {
      const res = await  KhachHangService.getSearchKhach(data)
      console.log(res);
      setUserList(res.data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchKhachHang()
  },[])

  useEffect(()=>{
    const id = setTimeout(() => {
      const data={
        id: search||null,
      }
      const query = queryString.stringify(data);

      fetchSearchKhachHang(query);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  },[search])


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
                    Search:
                    <input
                      value={search}
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                      onChange={(e)=>setSearch(e.target.value)}
                    />
                  </label>
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
                        style={{ width: 80 }}
                      >
                        Mã KH
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Position: activate to sort column ascending"
                        style={{ width: 100 }}
                      >
                        Tên KH
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Office: activate to sort column ascending"
                        style={{ width: 100 }}
                      >
                        Tên tài khoản
                      </th>

                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Start date: activate to sort column ascending"
                        style={{ width: 80 }}
                      >
                        Ngày sinh
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 50 }}
                      >
                        Điểm
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* khachHang.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="sorting_1">
                            <Link to={"./"+item.MaKhachHang} state={{ detail: item }}>{item.MaKhachHang}</Link>
                          </td>
                          <td>{item.HoTen}</td>
                          <td>{item.TaiKhoan}</td>
                          <td>{item.NgaySinh}</td>
                          <td>{item.Diem}</td>
                        </tr>
                      );
                    }) */}
                    {userList
                      ?.slice(
                        (currentPage - 1) * 10,
                        (currentPage - 1) * 10 + 10
                      )
                      .map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="sorting_1">
                            <Link 
                            to={"./"+item.IdTaiKhoan} 
                            state={{ detail: item }}>
                              {item.IdTaiKhoan}
                            </Link>
                          </td>
                            <td>{item.TenKhachHang}</td>
                            <td>{item.TenDangNhap}</td>
                            <td>{new Date(item.NgaySinh).toLocaleDateString()}</td>
                            <td>{item.DiemThuong}</td>
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
                ></div>
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

export default TableKhachHang;
