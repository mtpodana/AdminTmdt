import axiosClient from "../axios"

class PhimService{
    static getPhim = ()=> axiosClient.get('/Phim/PhimAdmin')
    static postPhim = (data)=> axiosClient.post('/Phim/Create/CreatePhim',data)
    static getPhanLoai = ()=> axiosClient.get('/PhanLoai')

} 

export default PhimService