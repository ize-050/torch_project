import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
export default function Add() {
    const { handleSubmit,setValue,control , formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        Swal.fire({
            title: 'บันทึกข้อมูล',
            text: "คุณต้องการบันทึกข้อมูลหรือไม่",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึกข้อมูล',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/catgory/save`, data)
            }
          })
     
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">หมวดสินค้า</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">หน้าแรก</a></li>
                                    <li className="breadcrumb-item active">หมวดสินค้า</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2  p-3">
                            <div>
                                <label for="cat_name" className="block mb-2 text-sm font-medium text-gray-900">ชื่อหมวดหมู่</label>
                                <Controller
                                 control={control}
                                name="cat_name"
                                rules={{
                                        required: true,
                                 }}                              
                                render={({ field: { onChange, onBlur, value, referrors  }
                                , fieldState: { errors }
                                }) => (
                                <input type="text" id="cat_name" value={value} className={`border  border-gray-300  text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 
                                 ${errors ? 'border border-red-500' : ''}`}                            
                                     onChange={onChange} placeholder="กรุณารอกชื่อ"  />
                                    )}
                                />
                                 {errors.cat_name && <p className="text-red-500">กรุณากรอกข้อมูล</p>}
                            </div>
                            <div>
                                <label for="cat_parents" class="block mb-2 text-sm font-medium text-gray-90">ลำดับ</label>
                                <Controller
                                    control={control}
                                    name="cat_parents"
                                    rules={{
                                        required: true,
                                      }}                              
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <input type="number"  value={value} id="cat_parent" className="border border-gray-300  text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChange} placeholder="กรุณากรอกลำดับ (เป็นตัวเลข)" />
                                    )}
                                />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-90">รายละเอียด</label>
                                <Controller
                                    control={control}
                                    name="cat_detail"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <textarea onChange={onChange} value={value} className="border  border-gray-300 text-black-500 text-sm rounded-lg forcus:ring-blue-500 w-full">
                                            {value}
                                        </textarea>
                                    )}
                                />
                            </div>
                            <div>
                                <label for="cat_status" className="block mb-2 text-sm font-medium text-gray-900 ">เปิด/ปิด</label>
                                <Controller
                                    control={control}
                                    name="cat_status"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                  <select value={value}   onChange={onChange} className="w-full border border-gray-300  text-black-500 text-sm rounded-lg">
                                    <option value="เปิดใช้งาน">{"<--กรุณาเลือก-->"}</option>
                                    <option value="1">เปิดใช้งาน</option>
                                    <option value="0">ปิดใช้งาน</option>
                                 </select>
                                    )}  
                                />  
                            </div>
                        </div>
                        <div className="my-8 p-3">
                            <button type="submit" className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">บันทึกข้อมูล</button>
                            <button type="button"  onClick={()=>{
                                router.get(`/catgory`)
                            }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">ยกเลิก</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )

}
