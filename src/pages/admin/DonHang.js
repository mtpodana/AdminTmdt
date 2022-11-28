import { useEffect, useState } from "react";
import Table from "../../components/admin/Table/Table_DonHang";
import HoaDonService from "../../services/HoaDonService";
function DonHang() {
  const [type, setType] = useState(1)
  const [donHang, setDonHang] = useState([])

  // const fetchHoaDon = async()=>{
  //   try {
  //     const res = await HoaDonService.getHoaDon(type)
  //     console.log(res);
  //     setDonHang(res.data)
  //   } catch (error) {
      
  //   }
  // }
  // useEffect(()=>{
  //   fetchHoaDon()
  // },[type])

  
 
  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Đơn Hàng</h1>
      </div>
    <Table type={type} setType={setType} donHang={donHang} setDonHang={setDonHang} ></Table>
  </div>
  );
}

export default DonHang;
