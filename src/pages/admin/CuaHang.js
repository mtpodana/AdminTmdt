import TTServices from "../../services/TTService";

import {useEffect,useState} from "react";
import { useForm } from "react-hook-form";
function CuaHang() {
  
  const [inforList,setInfoList]= useState([]);
  const [email,setEmail] = useState("");
  const [diachi,setDC] = useState("");
  const [sdt,setSDT] = useState("");
  const [tk,setTK] = useState("");
  const [nganhang,setNH] = useState("");
  const fetchTT= async () => {
    try {
      const res = await TTServices.getThongTin();
      console.log("Get thong tin",res);
      setInfoList(res.data[0]);
    } catch (error) {}
  };

  useEffect(()=> {
    fetchTT(); 
  },[]);
  useEffect(()=> {
    if(!inforList) return 
    setEmail(inforList.Mail)
    setDC(inforList.DiaChi)
    setSDT(inforList.SDT)
    setTK(inforList.TkNganHang)
    setNH(inforList.TenNganHang)
  },[inforList]);

  


  const  handleUpdate = async ()=>{
    const data={
      mail:email,
      diachi:diachi,
      sdt:sdt,
      tk:tk,
      nganhang:nganhang,
    }
    console.log(data);
    try {
      const res = await TTServices.postThongTin(data);
      console.log("Post Thong tin", res);
    } catch (error) {console.log(error);}
  } 

  return (
  <div className="container-fluid">
    <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
      <h1 className="h3 mb-0 text-gray-800">Giới thiệu cửa hàng</h1>
      
    </div>
    <div className="card shadow mb-4">
        <div className="card-header py-3">
        </div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Mail cửa hàng:</span>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Địa chỉ:</span>
            <input value={diachi} onChange={(e)=>setDC(e.target.value)} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Số điện thoại:</span>
            <input value={sdt} onChange={(e)=>setSDT(e.target.value)} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Số tài khoản:</span>
            <input value={tk} onChange={(e)=>setTK(e.target.value)} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Ngân hàng:</span>
            <input value={nganhang} onChange={(e)=>setNH(e.target.value)} type={"text"}></input>
          </div>
        </div>
      </div>
      <button className="form-input-btn"  onClick={handleUpdate}  >Cập nhật</button>
  </div>
  );
}
export default CuaHang;
