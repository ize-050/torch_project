import React from 'react';

import { router } from "@inertiajs/react"

const Menu = () => {
    return (
        <>
            <aside className="main-sidebar flex flex-col flex-1 h-screen sidebar-dark-primary elevation-4">
                <a href="/" className="brand-link">
                    {/* <Image src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8"> */}
                    <span className="brand-text font-weight-light">TorchProduct</span>
                </a>
                <div className="sidebar">

                    <div className="form-inline">
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-header">หมวดหน้าแรก</li>

                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                 onClick={()=>{
                                    router.get('/banner')
                                 }}
                                className="nav-link">
                                    <i className="nav-icon fas fa-image"></i>
                                    <p>
                                        Banner(รูปภาพSlider  )

                                    </p>
                                </a>
                            </li>


                            <li className="nav-header">หมวดสินค้า</li>
                            <li className="nav-item">
                                <a href="javascript:void(0)" onClick={() => {
                                    router.get('/catgory')
                                }} className="nav-link">
                                    <i className="nav-icon fa fa-list"></i>
                                    <p>
                                        หมวดหมู่สินค้า
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:void(0)" onClick={()=>{
                                    router.get('/product')
                                }} className="nav-link">
                                    <i className="nav-icon fa fa-book"></i>
        
                                    <p>
                                        สินค้า
                                        <span className="badge badge-info right">2</span>
                                    </p>
                                </a>
                            </li>

                            <li className="nav-header">ติดต่อเรา</li>
                            <li className="nav-item">
                                <a href="pages/calendar.html" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt"></i>
                                    <p>
                                        ข้อมูลเกี่ยวกับเรา
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Menu;