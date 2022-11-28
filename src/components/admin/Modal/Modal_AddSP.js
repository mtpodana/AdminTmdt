import React, { useEffect, useState } from "react";
import "../style.css";
import logo from "../../../logo.png";
import { useForm } from "react-hook-form";
import PhimService from "../../../services/PhimService";
import HangService from "../../../services/HangService";
import SanPhamService from "../../../services/SanPhamService";
import uploadFile from "../../../firebase";

function Modal({ open, close , reload}) {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(logo);

  const [phim, setPhim] = useState([]);
  const [hang, setHang] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TenSp: "",
      IdPhim: "",
      IdHang: "",
      ChieuCao: "",
      ChieuDai: "",
      ChieuRong: "",
      TrongLuong: "",
    },
  });
  const fetchPhim = async () => {
    try {
      const res = await PhimService.getPhim();
      console.log(res);
      setPhim(res.data);
    } catch (error) {}
  };
  const fetchHang = async () => {
    try {
      const res = await HangService.getHang();
      console.log(res);
      setHang(res.data);
    } catch (error) {}
  };

  const changeImage = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  useEffect(()=>{
    fetchPhim()
    fetchHang()
  },[])

  const onSubmit = async(data) => {
    console.log(data);
    try {
      const res = await SanPhamService.CreateSanPham(data)
      console.log(res);
      const id = res.data
      console.log(id,picture);
      if(picture){
        await uploadFile(id,picture,0)
      }
      reload()

    } catch (error) {
      
    }


  };

  if (!open) return null;
  return (
    <div className="overplay">
      <div className="form">
        <div className="form-image">
          <img src={imgData}></img>
          <label htmlFor="imageUpload">Thêm ảnh</label>
          <input
            id="imageUpload"
            type={"file"}
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              changeImage(e);
            }}
          ></input>
        </div>
        <div className="form-infor">
          <button onClick={close} className="closeBtn">
            X
          </button>
          <h2>Thêm sản phẩm</h2>
          <form className="form-input" style={{ paddingLeft: "20px" }}>
            <div className="form-input-div">
              <label>Tên sản phẩm:</label>
              <input
                {...register("TenSp", {required: true})}
                id="TenSP"
                type="text"
                style={{ width: "80%" }}
              ></input>
              {errors.TenSp&&<span style={{display:'block'}}>Tên sản phẩm là bắt buộc</span>}
            </div>
            <div className="form-input-div">
              <label style={{ width: "50px" }}>Phim:</label>
              <select
                id="Phim"
                {...register("IdPhim")}
                style={{ marginRight: "17px", width: "250px" }}
              >
                {phim.map((p) => (
                  <option key={p.IdPhim} value={p.IdPhim}>
                    {p.TenPhim}
                  </option>
                ))}
              </select>
              <label style={{ width: "100px" }}>Trọng lượng:</label>
              <input
                id="TrongLuong"
                {...register("TrongLuong")}
                style={{ width: "240px" }}
              ></input>
            </div>
            <div className="form-input-div"></div>
            <div className="form-input-div">
              <label style={{ width: "50px" }}>Cao:</label>
              <input
                id="Cao"
                {...register("ChieuCao")}
                style={{ marginRight: "17px", width: "160px" }}
              ></input>
              <label style={{ width: "40px" }}>Dài:</label>
              <input
                id="Dai"
                {...register("ChieuDai")}
                style={{ marginRight: "17px", width: "160px" }}
              ></input>
              <label style={{ width: "52px" }}>Rộng:</label>
              <input
                id="Rong"
                {...register("ChieuRong")}
                style={{ width: "160px" }}
              ></input>
            </div>
            <div className="form-input-div ">
              <label style={{ width: "70px" }}>Hãng:</label>
              <select
                id="Hang"
                {...register("IdHang")}
                style={{ marginRight: "17px", width: "250px" }}
              >
                {hang.map((p) => (
                  <option key={p.IdHangSx} value={p.IdHangSx}>
                    {p.TenHang}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSubmit(onSubmit)} className="form-input-btn">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
