import axiosClient from "../axios"

class HoaDonService{
    static getHoaDon = (type)=> axiosClient.get(`HoaDon/${type}`)
    static timKiem = (data)=> axiosClient.get(`HoaDon/SearchHoaDon?${data}`)
    static chapNhan = (id) =>axiosClient.post(`HoaDon/ChapNhanDonHang/${id}`)
    static huyDon = (id,data) =>axiosClient.post(`HoaDon/HuyDonHang/${id}`,data)
} 

export default HoaDonService