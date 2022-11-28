import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../logo.png";

import cls from "classnames";
import { storage } from "../../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import ImageFromFireBase from "./ImageFromFirebase";
import SanPhamService from "../../../services/SanPhamService";

const PER_PAGE = 10;

function TableSanPham({ productList, setProductList,fetchSanPham }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("")

  const totalPage = Math.floor(productList.length / PER_PAGE) + 1;

  const fetchSearch = async ()=>{
    try {
      if(search){
        const res = await  SanPhamService.search(search)
        console.log(res.data);
        setProductList(res.data)
      }else{
        fetchSanPham()
      }
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchSearch()
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
                      onChange={(e)=>setSearch(e.target.value)}
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
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
                        Mã SP
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
                        Hình ảnh
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Office: activate to sort column ascending"
                        style={{ width: 150 }}
                      >
                        Tên SP
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
                        Phân Loại
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 100 }}
                      >
                        Số lượng
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {productList
                      ?.slice(
                        (currentPage - 1) * 10,
                        (currentPage - 1) * 10 + 10
                      )
                      .map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="sorting_1">
                              <Link
                                to={"./" + item.IdSanPham}
                                state={{ detail: item }}
                              >
                                {item.IdSanPham}
                              </Link>
                            </td>
                            <td>
                              {item&&<ImageFromFireBase id={item.IdSanPham} />}
                            </td>
                            <td>{item.Ten}</td>
                            <td>{item.TenLoai}</td>
                            <td>{item.SoLuong}</td>
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
                      className="paginate_button page-item previous"
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

export default TableSanPham;
