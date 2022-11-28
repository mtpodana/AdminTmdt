import axiosClient from "../axios"

class NhapHangService{
    static getNhapHang = ()=> axiosClient.get('/NhapHang')
    static getSearchNhapHang = (id)=> axiosClient.get(`/NhapHang/search/SearchPhieuNhap?${id}`)
    static createPhieuNhap =(data)=> axiosClient.post('/NhapHang/CreatePhieuNhap',data)
} 
export default NhapHangService