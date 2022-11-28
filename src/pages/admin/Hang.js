import React, { useEffect,useState } from "react";
import { set } from "react-hook-form";
import {Link} from "react-router-dom";
import HangService from "../../services/HangService";

const PER_PAGE = 10;

function Detail({}) {
  const [hangList, setHangList] = useState([]);
  // const [loaiList, setLoaiList] = useState([]);
  const [tenHang, setTenHang] = useState("");
  // const [theloaiNew, setTheLoaiNew] = useState(1);
  const fetchHang= async () => {
    try {
      const res = await HangService.getHang();
      console.log(res);
      setHangList(res.data);
    
    } catch (error) {}
  };
  // const fetchPhanLoai= async () => {
  //   try {
  //     const res = await PhimService.getPhanLoai();
  //     console.log(res);
  //     setLoaiList(res.data);
  //   } catch (error) {}
  // };
  
  useEffect(()=>{
    fetchHang()
  },[])

  const handleSubmit = async () => {
    const data = {
      TenHang : tenHang,
    }
    setTenHang("")
    try {
      const res = await HangService.postHang(data);
      console.log(data);
    } catch (error) {console.log(error);}
    fetchHang()
  }

  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Hãng</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3"></div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Tên Hãng:</span>
            <input value={tenHang} onChange={(e)=>setTenHang(e.target.value)} type={"text"}></input>
          </div>
          {/* <div className="detailSite-div">
            <span>Thể Loại:</span>
            <select value={theloaiNew} onChange={(e)=>setTheLoaiNew(e.target.value)}>
              {loaiList.map((p) => (
                  <option key={p.Id} value={p.Id}>
                    {p.TenLoai}
                  </option>
                ))}
            </select>
          </div> */}
          <button onClick={handleSubmit} className="form-input-btn" style={{ marginBottom: "10px" }}>
            Thêm
          </button>
          <div className="table-responsive">
            <div className="row">
              <div className="col-sm-12">
                <table
                  className="table table-bordered dataTable"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                  role="grid"
                  aria-describedby="dataTable_info"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting sorting_asc"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-sort="ascending"
                        aria-label="Name: activate to sort column descending"
                        style={{ width: 60 }}
                      >
                        ID
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Position: activate to sort column ascending"
                        style={{ width: 135 }}
                      >
                        Tên hãng
                      </th>

                      {/* <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Start date: activate to sort column ascending"
                        style={{ width: 80 }}
                      >
                        Thể loại
                      </th> */}
                      {/* <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 100 }}
                      ></th> */}
                    </tr>
                  </thead>
                  <tbody>
                  {hangList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="sorting_1">
                            <Link 
                            to={"./"+item.IdHangSx} 
                            state={{ detail: item }}>
                              {item.IdHangSx}
                            </Link>
                            </td>
                            <td>{item.TenHang}</td>
                            {/* <td>{item.MoTa}</td> */}
                            {/* <td>{item.TenLoai}</td> */}
                          </tr>
                        );
                      })}
                    {/* <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <i
                          onClick={(e) => removeItem(e)}
                          className="fas fa-solid fa-trash"
                        ></i>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
