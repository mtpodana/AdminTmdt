import axiosClient from "../axios"

class TheLoaiService{
    static getTheLoai = ()=> axiosClient.get('/TheLoai')
    static postTheLoai = (data) => axiosClient.post('/TheLoai/Create/CreateLoai',data)
} 

export default TheLoaiService