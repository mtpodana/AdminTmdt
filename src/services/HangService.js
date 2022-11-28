import axiosClient from "../axios"

class HangService{
    static getHang = ()=> axiosClient.get('/Hang/get/GetHangAdmin')
    static postHang = (data) => axiosClient.post('/Hang/Create/CreateHang',data)
} 

export default HangService