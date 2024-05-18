import { useEffect, useState, React } from "react"
import { useForm, Controller } from "react-hook-form"
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 450,
    height: 250,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    position: 'relative',
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export default function Edit({banner}) {
    const { handleSubmit, setValue, control, formState: { errors }, } = useForm()
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: async acceptedFiles => {

            const formData = new FormData();
        
            formData.append('banner_picture', acceptedFiles[0]);
            try {
                const response = await axios.post('http://testtourchpro.com/api/banner/images/' + banner.id, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const url = response.data[0].url;
                console.log('url', url)
                const banner_id = response.data[0].banner_id;

                const updatedFiles = [...files];
                updatedFiles.splice(0, 1, { url, banner_id });
            
                // Set the state with the new array
                setFiles(updatedFiles);

            } catch (error) {
                console.error('Error uploading images:', error);
            }
            // setFiles(acceptedFiles.map(file => Object.assign(file, {
            //     preview: URL.createObjectURL(file)
            // })));
        }
    });


   
        const handleDelete = async (index, banner_id) => {
            try {
                const response = await axios.delete('http://testtourchpro.com/api/banner/images/' + banner_id, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const newFiles = files.filter((item, i) => item.banner_id !== banner_id);
                setFiles(newFiles);
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        };
    

    const handleFileUpload = async (event) => {
        const formData = new FormData();
        formData.append('product_images', event.target.files);
        try {
            const response = await axios.post('/product/images/' + product.id, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            files.push(response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    useEffect(() => {
        console.log('banner', banner)
        setValue('banner_name', banner.banner_name)
        setValue('banner_status', banner.banner_status)
        const url = banner.banner_picture
         setFiles(files => [...files, { url, banner_id: banner.id }]);
    },[banner])

    const thumbs = files.map(file => (
        <div style={thumb} key={file.id}>
            <div style={thumbInner}>
                <img
                    src={file.url}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.url) }}
                />
                <button
                    type="button"
                    onClick={() => handleDelete(file.id, file.banner_id)} 
                    className="absolute top-0 right-0 p-1 bg-gray-800 rounded-full text-white text-xs"
                    style={{ zIndex: 1 }}
                >
                    X
                </button>
            
            </div>
        </div>
    ));



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
                router.put(`/banner/edit/`+ banner.id, data)
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
                                <h1 className="m-0">แก้ไขรูปBanner</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">หน้าแรก</a></li>
                                    <li className="breadcrumb-item active">แก้ไขรูปBanner</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-lg  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" gap-6 mb-6 md:grid-cols-1 flex flex-col flex-1  p-3">
                        <div>
                                <label for="banner_name" className="block mb-2 text-sm font-medium text-gray-900">คำอธิบายรูปภาพ</label>
                                <Controller
                                 control={control}
                                name="banner_name"
                                rules={{
                                        required: true,
                                 }}                              
                                render={({ field: { onChange, onBlur, value, referrors  }
                                , fieldState: { errors }
                                }) => (
                                <input type="text" id="banner_name" value={value} className={`border  border-gray-300  text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 
                                 ${errors ? 'border border-red-500' : ''}`}                            
                                     onChange={onChange} placeholder="กรุณารอกชื่ออธิบายรูปภาพ"  />
                                    )}
                                />
                                 {errors.banner_name && <p className="text-red-500">กรุณากรอกข้อมูล</p>}
                            </div>

                            <div>
                                <label for="banner_picture" className="block mb-2 text-sm font-medium text-gray-900 ">รูปBanner</label>
                                <Controller
                                    control={control}
                                    name="banner_picture"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <section className="container">
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div class="relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                                                    <input type="file" class="absolute inset-0 w-full h-full opacity-0 z-50" />
                                                    <div class="text-center">
                                                        <img class="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" /> 
                                                        <h3 class="mt-2 text-sm font-medium text-gray-900">
                                                            <label for="file-upload" class="relative cursor-pointer">
                                                                <span>Drag and drop</span>
                                                                <span class="text-indigo-600"> or browse</span>
                                                                <span>to upload</span>
                                                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                                            </label>
                                                        </h3>
                                                        <p class="mt-1 text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 3MB
                                                        </p>
                                                    </div>

                                                    <img src="" class="mt-4 mx-auto h-[500] hidden" id="preview" />
                                                </div>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>
                                    )} />
                            </div>

                            <div>
                                <label for="banner_status" className="block mb-2 text-sm font-medium text-gray-900 ">เปิด/ปิด</label>
                                <Controller
                                    control={control}
                                    name="banner_status"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <select value={value} onChange={onChange} className="w-full border border-gray-300  text-black-500 text-sm rounded-lg">
                                            <option value="">{"<--กรุณาเลือก-->"}</option>
                                            <option value="1">เปิดใช้งาน</option>
                                            <option value="0">ปิดใช้งาน</option>
                                        </select>
                                    )}
                                />
                            </div>

                        </div>
                        <div className="my-8 p-3">
                            <button type="submit" className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">บันทึกข้อมูล</button>
                            <button type="button" onClick={() => {
                                router.get(`/banner`)
                            }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">ยกเลิก</button>
                        </div>
                    </form >
                </div >

            </div >
        </>
    )

}
