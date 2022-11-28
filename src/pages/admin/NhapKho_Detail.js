import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import formatNum from "../../Format/Format";
function Detail() {
  const location = useLocation();
  const detail = location.state.detail;

  var date = new Date(detail.NgayNhap).toISOString().substring(0, 10);
  const minusQuantity = (e, i) => {
    let num = Number(e.target.nextElementSibling.innerText);
    if (num === 1) return;
    e.target.nextElementSibling.innerHTML = num - 1;
    detail.Details[i].SL = num - 1;
  };
  const bonusQuantity = (e, i) => {
    let num = Number(e.target.previousElementSibling.innerText);
    e.target.previousElementSibling.innerHTML = num + 1;
    detail.Details[i].SL = num + 1;
  };
  const removeItem = (e, i) => {
    e.target.parentNode.parentNode.remove();
    detail.Details.splice(i, 1);
  };
  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Phiếu Nhập Kho</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Mã phiếu: {detail.MaPhieu}
          </h6>
        </div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Ngày nhập:</span>
            <input
              type={"date"}
              value={date}
              onChange={(e) => console.log(e.target.value)}
            ></input>
          </div>
          <div className="detailSite-div">
            <p>Chi tiết:</p>
          </div>
          <div className="table-responsive">
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
                        style={{ width: 120 }}
                      >STT</th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Position: activate to sort column ascending"
                        style={{ width: 135 }}
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
                        Số lượng
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
                        Giá nhập
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 100 }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.Details?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{item.Ten}</td>
                          <td>
                            <i
                              onClick={(e) => minusQuantity(e, i)}
                              className="fa-solid fa-minus minus-btn"
                            ></i>
                            <span>{item.SoLuong}</span>
                            <i
                              onClick={(e) => bonusQuantity(e, i)}
                              className="fa-solid fa-plus plus-btn"
                            ></i>
                          </td>
                          <td>{formatNum(item.DonGiaNhap)}</td>
                          <td>
                            <i
                              onClick={(e) => removeItem(e, i)}
                              className="fas fa-solid fa-trash"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="form-input-btn">Cập nhật</button> */}
    </div>
  );
}

export default Detail;
