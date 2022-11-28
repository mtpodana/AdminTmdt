import { useEffect, useState } from "react";
import Table from "../../components/admin/Table/Table_KhachHang";
import KhachHangService from "../../services/KhachHangService";

function KhachHang() {
  const [userList, setUserList] = useState([]);

  const fetchKhachHang = async () => {
    try {
      const res = await KhachHangService.getKhachHang();
      console.log(res);
      setUserList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchKhachHang();
  }, []);
  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Khách hàng</h1>
      </div>
    <Table userList={userList} setUserList={setUserList} fetchKhachHang={fetchKhachHang}></Table>
  </div>
  );
}

export default KhachHang;
