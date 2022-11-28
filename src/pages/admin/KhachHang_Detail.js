import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import KhachHangService from "../../services/KhachHangService";





function Detail() {
  const location = useLocation();

  const detail = location.state.detail;
  // console.log("detail: " , detail);
  const AnRef = useRef(null)
  // console.log(detail);
  
  const showPassword = () => {
    const password = document.querySelector("#password");
    if (password.getAttribute("type") === "text") {
      password.setAttribute("type", "password");
      return;
    }
    password.setAttribute("type", "text");
  };
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      IdTaiKhoan: detail.IdTaiKhoan,
      TenTk: detail.TenDangNhap,
      MatKhau: detail.MatKhau,
      Ten: detail.TenKhachHang,
      Diem: detail.DiemThuong,
      KhoaTk: detail.TrangThai,
      ChucVu: detail.ChucVu,
      Email: detail.Email,
      NgaySinh: detail.NgaySinh,
    },
  });

  var date = new Date(detail.NgaySinh).toISOString().substring(0, 10);
  
  const handleUpdate = async(data)=>{
    try {
      const res = await KhachHangService.UpdateKhachHang(detail.IdTaiKhoan, data);
      // console.log(detail.IdTaiKhoan);
      // console.log("data",data);

    } catch (error) {}

  }
  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Khách Hàng</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Mã khách hàng:  {detail.IdTaiKhoan}</h6>
          
          {/* <button
            style={{ padding: "5px 10px", marginTop: "5px" }}
            className="table-btn hide"
          >
            <i style={{ paddingRight: "5px" }} className="fa-solid fa-lock"></i>
            Khoá
          </button> */}

          <input
            id="KhoaTk"
            ref={AnRef}
            type="checkbox"
            {...register("KhoaTk")}
            value={"1"}
            hidden
          />

          {watch('KhoaTk')==0&&<label
            htmlFor="KhoaTk"
            style={{ padding: "5px 10px", marginTop: "5px" }}
            className="table-btn hide"
          >
            <i
              style={{ paddingRight: "5px" }}
              className="fa-sharp fa-solid fa-lock"
            ></i>
            Khóa
          </label>}
          {watch('KhoaTk')==1&&<label
            htmlFor="KhoaTk"
            style={{ padding: "5px 10px", marginTop: "5px",backgroundColor: "green" }}
            className="table-btn hide"
          >
            <i
              style={{ paddingRight: "5px",  }}
              className="fa-sharp fa-solid fa-lock"
            ></i>
            Bỏ khóa
          </label>}

        </div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Tên khách hàng:</span>
            <input {...register("Ten")} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Tên tài khoản:</span>
            <input {...register("TenTk")} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Mật khẩu:</span>
            <input
              id="password"
              type={"password"}
              {...register("MatKhau")}
            ></input>
            <button>
              <i
                onClickCapture={() => {
                  showPassword();
                }}
                className="fa-solid fa-eye"
              ></i>
            </button>
          </div>
          <div className="detailSite-div">
            <span>Ngày sinh:</span>
            <input  value={date} type={"date"} style={{width:"30%"}}></input>

            <span style={{marginLeft:"20px"}}>Email:</span>
            <input {...register("Email")} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span >Điểm thưởng:</span>
            <input disabled {...register("Diem")} type={"text"} style={{width:"30%"}}></input>

            <span>Vai trò:</span>
            <select {...register("ChucVu")} type={"text"} >
              <option key={1} value={1}>Quản trị viên</option>
              <option key={2} value={2}>Khách hàng</option>
            </select>
          </div>
          <div className="detailSite-div">
            <p>Địa chỉ:</p>
            {detail.address.map((item, i) => {
              return (
                <div>
                  <span>{i + 1}.</span>
                  <span>Địa chỉ</span>
                  <input style={{width:"400px"}} type={"text"} value={item.DiaChi}></input>
                  <span>SĐT</span>
                  <input style={{width:"200px"}} type={"text"} value={item.SDT}></input>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit(handleUpdate)} className="form-input-btn">Cập nhật</button>
    </div>
  );
}

export default Detail;
