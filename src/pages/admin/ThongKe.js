import { useEffect, useState } from "react";
import Dashboard from "../../components/admin/Dashboard";
import queryString from "query-string";
import ThongKeService from "../../services/ThongKeService";
import HinhThucThanhToanService from "../../services/HinhThucThanhToan";
import Table from "../../components/admin/Table/Table_ThongKe";
import formatNum from "../../Format/Format";
import SanPhamService from "../../services/SanPhamService";
function ThongKe() {
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [type, setType] = useState(0);
  const [hinhThuc, setHinhThuc] = useState([]);
  const [searchTien, setSearchTien] = useState(0);
  const [thongKeThang, setThongKeThang] = useState(0);
  const [thongKeNgay, setThongKeNgay] = useState(0);
  const [num , setNum] = useState(0);
  const [hoaDon , setHoaDon] = useState(0);
  const [productList, setProductList] = useState([]);


  const fetchThanhToan = async () => {
    try {
      const res = await HinhThucThanhToanService.getHinhThuc();
      setHinhThuc(res.data);
      // console.log("HinhThuc:",hinhThuc);
    } catch (error) {}
  };
  const fetchThongKeThang = async () => {
    try {
      const res = await ThongKeService.getThongKeThang();
      // console.log("Thang",res.data);
      setThongKeThang(res.data[0])
      // console.log("HinhThuc:",hinhThuc);
    } catch (error) {}
  };
  const fetchThongKeNgay = async () => {
    try {
      const res = await ThongKeService.getThongKeNgay();
      // console.log("Ngay",res.data);
      setThongKeNgay(res.data[0])
      // console.log("HinhThuc:",hinhThuc);
    } catch (error) {}
  };
  const fetchDonHangChuaXuLy = async () => {
    try {
      const res = await ThongKeService.getDonHangChuaXuLy();
      // console.log("Num",res.data);
      setNum(res.data[0])
      // console.log("HinhThuc:",hinhThuc);
    } catch (error) {}
  };

  const fetchDonHangHomNay = async () => {
    try {
      const res = await ThongKeService.getDonHangHomNay();
      // console.log("HoaDon",res.data);
      setHoaDon(res.data[0])
      // console.log("HinhThuc:",hinhThuc);
    } catch (error) {}
  };
  const fetchThongKe = async (data) => {
    try {
      const res = await ThongKeService.getThongKe(data);
      // console.log("tong tien",res.data[0].Tong);
      // console.log("ok");
      setSearchTien(res.data[0])
    } catch (error) {}
  };

  const fetchSanPham = async () => {
    try {
      const res = await ThongKeService.getTop10();
      // console.log("sanphamtop10",res.data);
      setProductList(res.data);
    } catch (error) {}
  };
  // console.log("l",productList);
  useEffect(() => {
    const id = setTimeout(() => {
      const data = {
        fromDay: fromDay || null,
        toDay: toDay || null,
        type: type || null,
      };
      const query = queryString.stringify(data);
      // console.log(query);
      fetchThongKe(query);

    }, 1000);
    fetchThanhToan();
    fetchThongKeThang();
    fetchThongKeNgay();
    fetchDonHangChuaXuLy();
    fetchDonHangHomNay();
    fetchSanPham();
    return () => {
      clearTimeout(id);
    };
  }, [fromDay, toDay, type]);

  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Thống Kê</h1>
      </div>
      

      <div className="date_field" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div id="dataTable_filter" className="dataTables_filter" style={{marginRight: '50px'}}>
          <label>
            Từ Ngày:
            <input
              value={fromDay}
              type="date"
              className="form-control form-control-sm"
              aria-controls="dataTable"
              onChange={(e) => setFromDay(e.target.value)}
            />
          </label>
        </div>

        <div id="dataTable_filter" className="dataTables_filter">
          <label>
            Đến Ngày:
            <input
              value={toDay}
              type="date"
              className="form-control form-control-sm"
              aria-controls="dataTable"
              onChange={(e) => setToDay(e.target.value)}
            />
          </label>
        </div>
        
        <div>
          <select  onChange={(e)=>setType(e.target.value)}>
          {hinhThuc.map((item) => (
              <option key={item.IdHinhThuc} value={item.IdHinhThuc}>
                {item.TenHinhThuc}
              </option>
              ))}
          </select>
          
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Thu Nhập (Từ ngày đến ngày)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                   {searchTien.Tong ?  formatNum(searchTien.Tong): 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>
      
      <Dashboard thongKeThang={thongKeThang} thongKeNgay={thongKeNgay} num={num} hoaDon={hoaDon}></Dashboard>

      <hr></hr>
      <Table productList={productList}></Table>
    </div>
  );
}

export default ThongKe;
