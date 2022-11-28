import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import formatNum from "../../Format/Format";
import GiaoHangService from "../../services/GiaoHangService";
function Detail() {
  const location = useLocation();
  const detail = location.state.detail;

  console.log("detail: " , detail);
  var d = new Date(detail.NgayMua),
  dformat =
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours() - 7, d.getMinutes(), d.getSeconds()].join(":");

    const handleThanhCong = async () => {
      try {
        const res = await GiaoHangService.thanhCong(detail.IdHoaDon,detail);
      alert("Đã xác nhận giao hàng thành công!!!");  

      } catch (error) {}
    };
    const handleHuyDon = async () => {
      try {
        const res = await GiaoHangService.thatBai(detail.IdHoaDon,detail);
      alert("Đã xác nhận giao hàng không thành công");  

      } catch (error) {}
    };
  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Đơn Hàng</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 claassName="m-0 font-weight-bold text-primary">Mã đơn hàng: {detail.IdHoaDon}</h6>
          <button className="table-btn apply" onClick={handleThanhCong}>Giao Thành Công</button>
          <button className="table-btn cancel" onClick={handleHuyDon}>Giao Thất Bại</button>
        </div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Ngày lập: {dformat}</span>
          </div>
          <div className="detailSite-div">
            <span>Họ tên: {detail.TenKhachHang}</span>
          </div>
          <div className="detailSite-div">
            <span>Địa chỉ:  {detail.DiaChi}</span>
          </div>
          <div className="detailSite-div">
            <span>SĐT: {detail.SDT}</span>
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
                      >
                        
                      </th>
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
                        Đơn giá
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
                    </tr>
                  </thead>
                  <tbody>
                  {detail.CT.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="sorting_1">{i + 1}</td>
                          <td>{item.Ten}</td>
                          <td>{item.SoLuong}</td>
                          <td>{formatNum(item.DonGiaBan)}</td>
                          <td>{formatNum(item.Tong)}</td>
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
    </div>
  );
}

export default Detail;
