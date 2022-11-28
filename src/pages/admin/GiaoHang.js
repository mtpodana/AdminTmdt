import { useEffect, useState } from "react";
import Table from "../../components/admin/Table/Table_GiaoHang";
import GiaoHangService from "../../services/GiaoHangService";
function GiaoHang() {

  const [donHang, setDonHang] = useState([])

  const fetchHoaDon = async()=>{
    try {
      const res = await GiaoHangService.getGiaoHang()
      console.log(res);
      setDonHang(res.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchHoaDon()
  },[])


  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Giao Hàng</h1>
      </div>
    <Table  donHang={donHang} setDonHang={setDonHang}></Table>
  </div>
  );
}

export default GiaoHang;
