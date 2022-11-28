import axiosClient from "../axios"

class GiaoHangService{
    static getGiaoHang = ()=> axiosClient.get(`GiaoHang/`)
    static timKiem = (data)=> axiosClient.get(`GiaoHang/SearchGiaoHang?${data}`)
    static thanhCong = (id,data)=> axiosClient.post(`GiaoHang/GiaoThanhCong/${id}`,data)
    static thatBai = (id,data)=> axiosClient.post(`GiaoHang/GiaoThatBai/${id}`,data)

}  

export default GiaoHangService