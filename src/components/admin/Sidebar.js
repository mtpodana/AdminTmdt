import logo from "../../logo.png";
import { Link } from "react-router-dom";
function Sidebar(props) {
  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-toggled");
    document.querySelector(".sidebar").classList.toggle("toggled");
    if (document.querySelector(".sidebar").classList.contains("toggled")) {
      document.querySelector(".sidebar .collapse").collapse("hide");
    }
  };
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <span className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <img src={logo} className="sidebar-logo" alt="logo"></img>
        </div>
        <div className="sidebar-brand-text mx-3">PHK Figure</div>
      </span>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link className="nav-link" to="ThongKe">
          <i className="fas fa-solid fa-chart-simple"></i>
          <span>Thống kê</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Heading */}
      <li className="nav-item active">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
          style={{cursor:"pointer"}}
        >
          <i className="fas fa-sharp fa-solid fa-scroll"></i>
          <span>Hóa đơn</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="DonHang">
              Đơn hàng
            </Link>
            <Link className="collapse-item" to="GiaoHang">
              Giao hàng
            </Link>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
          style={{cursor:"pointer"}}
        >
          <i className="fas fa-duotone fa-film"></i>
          <span>Phân loại</span>
        </a>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="PhanLoai">
              Phim
            </Link>
            <Link className="collapse-item" to="TheLoai">
              Thể loại
            </Link>
            <Link className="collapse-item" to="Hang">
              Hãng
            </Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider my-0" />
      {/* Heading */}
      <li className="nav-item active">
        <Link className="nav-link" to="SanPham">
          <i className="fas fa-boxes"></i>
          <span>Sản phẩm</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      {/* Heading */}
      <li className="nav-item active">
        <Link className="nav-link" to="KhachHang">
          <i className="fas fa-users"></i>
          <span>Khách hàng</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      {/* Heading */}
      <li className="nav-item active">
        <Link className="nav-link" to="CuaHang">
          <i className="fas fa-store"></i>
          <span>Giới thiệu cửa hàng</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      {/* Heading */}
      <li className="nav-item active">
        <Link className="nav-link" to="Nhap">
          <i className="fas fa-solid fa-box-open"></i>
          <span>Nhập kho </span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={toggleSidebar}
        />
      </div>
    </ul>
  );
}

export default Sidebar;
