import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "../../logo.png";
import PhimService from "../../services/PhimService";
import HangService from "../../services/HangService";
import { useForm } from "react-hook-form";
import SanPhamService from "../../services/SanPhamService";
import uploadFile from "../../firebase";
import { storage } from "../../firebase/index";

import { listAll, ref, getDownloadURL, deleteObject } from "firebase/storage";

function Detail() {
  const location = useLocation();
  const detail = location.state.detail;
  const [newPictures, setNewPictures] = useState([]);
  // const [oldPictures, setOldPictures] = useState([]);

  const AnRef = useRef(null)

  const [imageList, setImageList] = useState([]);
  const [removeList, setRemoveList] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TenSp: detail.Ten,
      IdPhim: detail.IdPhim,
      IdHang: detail.IdHangSx,
      ChieuCao: detail.ChieuCao,
      ChieuDai: detail.ChieuDai,
      ChieuRong: detail.ChieuRong,
      TrongLuong: detail.TrongLuong,
      An: detail.An,
    },
  });
  const [phim, setPhim] = useState([]);
  const [hang, setHang] = useState([]);

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setNewPictures(() => [
          ...newPictures,
          { file: file, data: reader.result },
        ]);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onload = (e, name) => {
    fetch(e.target.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], name, blob);
        setImageList((pre) => [...pre, file]);
        console.log(file);
      });
  };

  const removeNewImage = (e, i, name) => {
    setNewPictures((pre) => [...pre.slice(i, 1)]);
  };

  const removeImage = (e, i, item) => {
    console.log(item, i);
    imageList.splice(i, 1);
    setImageList([...imageList]);
    setRemoveList((pre) => [...pre, item.name]);
  };

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

  const fetchImage = () => {
    listAll(ref(storage, `${detail.IdSanPham}`)).then((res) => {
      res.items.forEach((item) => {
        const name = item._location.path_;
        console.log("name", name);
        getDownloadURL(item).then((url) => {
          setImageList((pre) => {
            if (!pre.some((item) => item.url === url))
              return [...pre, { url, name }];
            return [...pre];
          });
        });
      });
    });
  };

  useEffect(() => {
    fetchPhim();
    fetchHang();
    fetchImage();
    console.log(detail);
    console.log(watch('IdHang'));
  }, []);

  const handleUpdate = async (data) => {
    const dataImage = {
      removeList,
      newPictures,
    };
    console.log("Data image", dataImage);

    const images = [...newPictures.map((img) => img.file)];

    listAll(ref(storage, `${detail.IdSanPham}`)).then(async (res) => {
      if (removeList.length !== 0) {
        for (let name of removeList) {
          console.log(name);
          const desertRef = ref(storage, `${name}`);
          await deleteObject(desertRef).catch((error) => {
            console.log("Loio", error);
          });
        }
        console.log("Da xoa");
      }
      // console.log("Images", images);
      let lastIndex = 0;
      if (imageList.length !== 0) {
        const name = imageList[imageList.length - 1].name;
        lastIndex = parseInt(name.substr(name.indexOf("/") + 1)) + 1;
      }

      for (let i = 0; i < images.length; i++) {
        await uploadFile(detail.IdSanPham, images[i], lastIndex + i);
      }

      setRemoveList([]);
      setNewPictures([]);
      fetchImage();
    });

    // console.log(formData);

    try {
      const res = await SanPhamService.UpdateSanPham(detail.IdSanPham, data);
      console.log(res);

    } catch (error) {}
  };

  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Sản Phẩm</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Mã sản phẩm: {detail.IdSanPham}
          </h6>

          <input
            id="An"
            ref={AnRef}
            type="checkbox"
            {...register("An")}
            value={"1"}
            hidden
          />
          {watch('An')==0&&<label
            htmlFor="An"
            style={{ padding: "5px 10px", marginTop: "5px" }}
            className="table-btn hide"
          >
            <i
              style={{ paddingRight: "5px" }}
              className="fa-sharp fa-solid fa-eye-slash"
            ></i>
            Ẩn
          </label>}
          {watch('An')==1&&<label
            htmlFor="An"
            style={{ padding: "5px 10px", marginTop: "5px",backgroundColor: "green" }}
            className="table-btn hide"
          >
            <i
              style={{ paddingRight: "5px",  }}
              className="fa-sharp fa-solid fa-eye-slash"
            ></i>
            Hien
          </label>}
        </div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Tên sản phẩm:</span>
            <input {...register("TenSp")} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Phim:</span>
            {phim.length!==0&&<select {...register("IdPhim")}>
              {phim.map((p) => (
                <option key={p.IdPhim} value={p.IdPhim}>
                  {p.TenPhim}
                </option>
              ))}
            </select>}
          </div>
          <div className="detailSite-div">
            <span>Hãng:</span>
            {hang.length!==0&&<select {...register("IdHang")}>
              {hang.map((p) => (
                <option key={p.IdHangSx} value={p.IdHangSx}>
                  {p.TenHang}
                </option>
              ))}
            </select>}
          </div>
          <div className="detailSite-div">
            <span>Cao:</span>
            <input
              {...register("ChieuCao")}
              style={{ width: "10%", marginRight: "10px" }}
              type={"text"}
            ></input>
            <span>Dài:</span>
            <input
              {...register("ChieuDai")}
              style={{ width: "10%", marginRight: "10px" }}
              type={"text"}
            ></input>
            <span>Rộng:</span>
            <input
              {...register("ChieuRong")}
              style={{ width: "10%" }}
              type={"text"}
            ></input>
          </div>
          <div className="detailSite-div">
            <span>Trọng lượng:</span>
            <input {...register("TrongLuong")} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <p>Hình ảnh:</p>
            {imageList?.map((item, i) => {
              return (
                <div className="detail-img" key={i}>
                  <img
                    src={item.url}
                    alt="item-img"
                    // onLoad={(e) => onload(e, item)}
                  ></img>
                  <button className="table-btn">
                    <i
                      style={{ padding: "5px" }}
                      onClick={(e) => {
                        removeImage(e, i, item);
                      }}
                      className="fas fa-solid fa-trash"
                    ></i>
                  </button>
                </div>
              );
            })}
            {newPictures.map((item, i) => {
              return (
                <div className="detail-img" key={i}>
                  <img src={item.data} alt="item-img"></img>
                  <button className="table-btn">
                    <i
                      style={{ padding: "5px" }}
                      onClick={(e) => {
                        removeNewImage(e, i);
                      }}
                      className="fas fa-solid fa-trash"
                    ></i>
                  </button>
                </div>
              );
            })}
            <label htmlFor="imageUpload" className="btn-addImg">
              +
            </label>
            <input
              value={""}
              onChange={(e) => {
                addImage(e);
              }}
              id="imageUpload"
              type={"file"}
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              hidden
            ></input>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit(handleUpdate)} className="form-input-btn">
        Cập nhật
      </button>
    </div>
  );
}

export default Detail;
