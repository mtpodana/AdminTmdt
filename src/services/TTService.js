import axiosClient from "../axios";

class TTService{
    static postThongTin = (data) => axiosClient.post('/ThongTinCuaHang/CapNhat',data)
    static getThongTin = () => axiosClient.get('/ThongTinCuaHang')
}

export default TTService