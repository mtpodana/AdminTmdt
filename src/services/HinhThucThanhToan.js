import axiosClient from "../axios"

class HinhThucThanhToanService{
    static getHinhThuc = ()=> axiosClient.get('/HinhThucThanhToan')
} 

export default HinhThucThanhToanService