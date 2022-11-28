import { Link } from "react-router-dom";
import React, { useState } from "react";
import ImageFromFireBase from "./ImageFromFirebase";  
import SanPhamService from "../../../services/SanPhamService";


function TableThongKe({productList}) {

    // const fetchSp = async ()=>{
    //     try {
    //       if(search){
    //         const res = await  SanPhamService.search(search)
    //         console.log(res.data);
    //         setProductList(res.data)
    //       }else{
    //         fetchSanPham()
    //       }
          
    //     } catch (error) {
          
    //     }
    //   }
    //   useEffect(()=>{
    //     fetchSearch()
    //   },[search])


  // let a=new Date("2020-05-13T11:50:21.817Z");
console.log("list",productList);
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Top 10 sản phẩm bán chạy nhất</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            {/* <div className="row">
              <div className="col-sm-12 col-md-6">
                <div id="dataTable_filter" className="dataTables_filter">
                  <label>
                    Search:
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                    />
                  </label>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-sm-12">
                <table
                  className="table table-bordered dataTable"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                  role="grid"
                  aria-describedby="dataTable_info"
                  style={{ width: "90%" }}
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
                        style={{ width: 120 }}
                      >
                        Mã sản phẩm
                      </th>
                      <th
                        className="sorting sorting_asc"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-sort="ascending"
                        aria-label="Name: activate to sort column descending"
                        style={{ width: 120 }}
                      >
                        Hình ảnh
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Position: activate to sort column ascending"
                        style={{ width: 130 }}
                      >
                        Tên Sản Phẩm
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
                        Số lượng bán
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="dataTable"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Salary: activate to sort column ascending"
                        style={{ width: 144 }}
                      >
                        Số lượng tồn
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                  {productList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="sorting_1">
                              <Link
                                to={"./" + item.IdSanPham}
                                state={{ detail: item }}
                              >
                                {item.IdSanPham}
                              </Link>
                            </td>
                            <td>
                              {item&&<ImageFromFireBase id={item.IdSanPham} />}
                            </td>
                            <td>{item.Ten}</td>
                            <td>{item.SLBan}</td>
                            <td>{item.SoLuong}</td>
                          </tr>
                        );
                      })}
                    
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

export default TableThongKe;
