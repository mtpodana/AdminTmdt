import React, { useEffect,useState } from "react";
import { set } from "react-hook-form";
import {Link} from "react-router-dom";
import PhimService from "../../services/PhimService";

const PER_PAGE = 10;

function Detail({}) {
  const [phimList, setPhimList] = useState([]);
  const [loaiList, setLoaiList] = useState([]);
  const [phimNew, setPhimNew] = useState("");
  const [theloaiNew, setTheLoaiNew] = useState(1);
  const fetchPhim= async () => {
    try {
      const res = await PhimService.getPhim();
      console.log(res);
      setPhimList(res.data);
    
    } catch (error) {}
  };
  const fetchPhanLoai= async () => {
    try {
      const res = await PhimService.getPhanLoai();
      console.log(res);
      setLoaiList(res.data);
    } catch (error) {}
  };
  
  useEffect(()=>{
    fetchPhim()
    fetchPhanLoai()
  },[])

  const handleSubmit = async () => {
    const data = {
      TenPhim : phimNew,
      TheLoai : theloaiNew,
    }
    setPhimNew("")
    try {
      const res = await  PhimService.postPhim(data);
      console.log(res);
    } catch (error) {console.log(error);}
    fetchPhim()
  }

  return (
    <div className="container-fluid">
      <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
        <h1 className="h3 mb-0 text-gray-800">Phim</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3"></div>
        <div className="card-body detailSite">
          <div className="detailSite-div">
            <span>Tên Phim:</span>
            <input value={phimNew} onChange={(e)=>setPhimNew(e.target.value)} type={"text"}></input>
          </div>
          <div className="detailSite-div">
            <span>Thể Loại:</span>
            <select value={theloaiNew} onChange={(e)=>setTheLoaiNew(e.target.value)}>
              {loaiList.map((p) => (
                  <option key={p.Id} value={p.Id}>
                    {p.TenLoai}
                  </option>
                ))}
            </select>
          </div>
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
                        Tên phim
                      </th>

                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Start date: activate to sort column ascending"
                        style={{ width: 80 }}
                      >
                        Thể loại
                      </th>
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
                  {phimList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="sorting_1">
                            <Link 
                            to={"./"+item.IdPhim} 
                            state={{ detail: item }}>
                              {item.IdPhim}
                            </Link>
                            </td>
                            <td>{item.TenPhim}</td>
                            {/* <td>{item.MoTa}</td> */}
                            <td>{item.TenLoai}</td>
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
