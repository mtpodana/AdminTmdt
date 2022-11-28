import axiosClient from "../axios"

class ThongKeService{
    static getThongKe = (data)=> axiosClient.get(`/ThongKe?${data}`)
    static getThongKeThang = ()=> axiosClient.get(`ThongKe/ThongKeThang`)
    static getThongKeNgay = ()=> axiosClient.get(`ThongKe/ThongKeNgay`)
    static getDonHangChuaXuLy = ()=> axiosClient.get(`ThongKe/DonHangChuaXuLy`)
    static getDonHangHomNay= ()=> axiosClient.get(`ThongKe/DonHangHomNay`)
    static getTop10= ()=> axiosClient.get(`ThongKe/Top10`)
} 

export default ThongKeService