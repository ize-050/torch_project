


import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import ModalImage from "react-modal-image";
import Swal from 'sweetalert2'

const fixedImage = {
    width: '100px',
    height: '100px'
}
const ProductTable = ({ product }) => {
    useEffect(() => {
        console.log('catgory', product)
    }, [product])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2); // Change this to the desired number of items per page
    const [searchQuery, setSearchQuery] = useState('');
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredItems = product.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const slicedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(product.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">สินค้า</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">หน้าแรก</a></li>
                                    <li className="breadcrumb-item active">สินค้า</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="card-body">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button type="button" onClick={() => {
                                router.get('/product/add')
                            }} className="btn bg-blue-500 w-40 btn-primary mb-1 flex ">
                                <svg class="w-8     text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="pt-1">เพิ่มสินค้า</p>
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <label className="text-gray-700" htmlFor="searchQuery">ค้นหา</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <span className="text-black-700  text-sm">
                                    แสดงผล {indexOfFirstItem + 1} - {indexOfLastItem > product.length ? product.length : indexOfLastItem} จากทั้งหมด {product.length} รายการ
                                </span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table id="example1" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>รูปภาพ</th>
                                        <th>คำอธิบายย่อ</th>
                                        <th>ราคา</th>
                                        <th>สถานะ</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slicedItems.map((item, index) => (
                                        item.product_images_small = `${item.product_images}?w=100px&h=100px&fit=crop&auto=format&dpr=1`,
                                        console.log('item', item),
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.product_name}</td>
                                            <td align="center">

                                                <ModalImage
                                                    small={item.product_images_small}
                                                    large={item.product_images}
                                                    alt={item.product_title}
                                                    height={100}
                                                   className="rounded-lg w-[220px] h-[220px] object-cover"
                                                />

                                            </td>
                                            <td>{item.product_title}</td>

                                            <td>{item.product_price}</td>
                                            <td>
                                                {item.product_status == 1 ? <span className="badge bg-success">เปิดใช้งาน</span> : <span className="badge bg-danger">ปิดใช้งาน</span>}
                                            </td>
                                            <td >
                                                <button className="pr-2" onClick={() => {
                                                    router.get(`/product/edit/${item.id}`)

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

                                                            router.delete(`/product/delete/${item.id}`)
                                                        }
                                                    })

                                                }} ><i className="fas fa-trash text-red-500"></i></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination flex justify-between items-center mt-4">
                                <button
                                    className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    ก่อนหน้า
                                </button>
                                <span className="text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    ถัดไป
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductTable

