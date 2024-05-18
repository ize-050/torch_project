
import { router } from "@inertiajs/react"
import { useEffect } from "react"

import Swal from 'sweetalert2'

import ModalImage from "react-modal-image";
const BannerTable = ({ banner }) => {
    useEffect(() => {
        console.log('banner', banner)
    }, [banner])
    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Banner</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">หน้าแรก</a></li>
                                    <li className="breadcrumb-item active">Banner</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="card-body">
                    <div className="col-md-12 d-flex justify-content-end">
                            <button type="button"  onClick={()=>{
                                router.get('/banner/add')
                            }} className="btn bg-blue-500 w-40 btn-primary mb-1 flex ">
                                <svg class="w-8     text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="pt-1">เพิ่มรูปBanner</p>
                            </button>
                        </div>

                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อรูป</th>
                                    <th>รูป</th>
                                    <th>วันที่สร้าง</th>
                                    <th>วันที่แก้ไข</th>
                                    <th>สถานะ</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banner.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.banner_name}</td>
                                        <td>
                                            
                                         
                                                <ModalImage
                                                    small={item.banner_picture}
                                                    large={item.banner_picture}
                                                    alt={item.banner_name}
                                                    height={100}
                                                   className="rounded-lg w-[300px] h-[150px] "
                                                />
                                            </td>
                                       
                                        <td>{item.created_at}</td>
                                        <td>{item.updated_at}</td>
                                        <td>
                                            {item.banner_status == 1 ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>}
                                        </td>
                                        <td >
                                            <button className="pr-2" onClick={()=>{
                                                router.get(`/banner/edit/${item.id}`)
                                            
                                            }} ><i className="fas fa-eye"></i></button>
                                           <a onClick={() => {
                                                Swal.fire({
                                                    title: 'ลบข้อมูล',
                                                    text: "คุณต้องการลบข้อมูลหรือไม่",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'ลบข้อมูล',
                                                    cancelButtonText: 'ยกเลิก'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        router.delete(`/banner/delete/${item.id}`)
                                                    }
                                                })

                                            }} ><i className="fas fa-trash text-red-500"></i></a>
                                        </td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default BannerTable

