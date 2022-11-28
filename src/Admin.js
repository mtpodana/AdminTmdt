import Topnav from "./components/admin/Topnav";
import Sidebar from "./components/admin/Sidebar";
import ThongKePage from "./pages/admin/ThongKe";
import PhanLoaiPage from "./pages/admin/PhanLoai";
import HangPage from "./pages/admin/Hang";
import TheLoaiPage from "./pages/admin/TheLoai";
import DonHangPage from "./pages/admin/DonHang";
import GiaoHangPage from "./pages/admin/GiaoHang";
import KhachHangPage from "./pages/admin/KhachHang";
import SanPhamPage from "./pages/admin/SanPham";
import CuaHangPage from "./pages/admin/CuaHang";
import NhapKhoPage from "./pages/admin/NhapKho";
import DonHang_Detail from "./pages/admin/DonHang_Detail";
import GiaoHang_Detail from "./pages/admin/GiaoHang_Detail";
import SanPham_Detail from "./pages/admin/SanPham_Detail";
import KhachHang_Detail from "./pages/admin/KhachHang_Detail";
import NhapKho_Detail from "./pages/admin/NhapKho_Detail";
import './style/style.css'
import './components/admin/style.css'
import {Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
        <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div className="content">
            <Topnav></Topnav>
            <Routes>
              <Route path="/*">
                <Route index element={<ThongKePage />}></Route>
                <Route path="ThongKe" element={<ThongKePage />}></Route>
                <Route path="PhanLoai" element={<PhanLoaiPage />}></Route>
                <Route path="Hang" element={<HangPage />}></Route>
                <Route path="TheLoai" element={<TheLoaiPage />}></Route>
                <Route path="DonHang" element={<DonHangPage />}></Route>
                <Route path="GiaoHang" element={<GiaoHangPage />}></Route>
                <Route path="KhachHang" element={<KhachHangPage />}></Route>
                <Route path="SanPham" element={<SanPhamPage />}></Route>
                <Route path="CuaHang" element={<CuaHangPage />}></Route>
                <Route path="Nhap" element={<NhapKhoPage />}></Route>
              </Route>
              <Route path="/DonHang/:id" element={<DonHang_Detail />}></Route>
              <Route path="/GiaoHang/:id" element={<GiaoHang_Detail/>}></Route>
              <Route path="/SanPham/:id" element={<SanPham_Detail />}></Route>
              <Route
                path="/KhachHang/:id"
                element={<KhachHang_Detail />}
              ></Route>
              <Route path="/Nhap/:id" element={<NhapKho_Detail />}></Route>
            </Routes>
          </div>
        </div>
    </>
  );
}

export default App;
