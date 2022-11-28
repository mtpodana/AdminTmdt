import Table from "../../components/admin/Table/Table_Nhap";
import Modal from "../../components/admin/Modal/Modal_AddPhieuNhap";
import React, { useEffect, useState} from "react";
import NhapHangService from "../../services/NhapHangService";

function NhapKho() {
    const [isOpen, setOpen] = useState(false);
    const [phieuNhap, setPhieuHang] = useState([]);

    const fetchPhieu = async()=>{
      try {
        const res = await NhapHangService.getNhapHang()
        setPhieuHang(res.data)
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      fetchPhieu()
    },[])

    return (
      <div className="container-fluid">
        <div className="mb-4 d-sm-flex align-items-center justify-content-between ">
          <h1 className="h3 mb-0 text-gray-800">Phiếu nhập</h1>
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  onClick={()=>setOpen(true)}
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Tạo phiếu
          </button>
        </div>
        <Table phieuNhap={phieuNhap} setPhieuNhap={setPhieuHang} ></Table>
        <Modal open={isOpen} close={()=>setOpen(false)}> </Modal>
    </div>
    );
  }
  
  export default NhapKho;