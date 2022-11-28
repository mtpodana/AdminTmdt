import axiosClient from "../axios"

class KhachHangService{
    static getKhachHang = ()=> axiosClient.get(`/KhachHang`)
    static getSearchKhach = (id)=> axiosClient.get(`/KhachHang/search/SearchKhachHang?${id}`)
    static UpdateKhachHang = (id, data)=> axiosClient.post(`/KhachHang/${id}`, data, {
    })
} 

export default KhachHangService