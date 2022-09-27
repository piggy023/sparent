import './myorder.css'

import { PageHeader } from 'antd';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import MyOrderDetail from './detail';
import MyOrderList from './list';

function MyOrder() {
    const location = useLocation()
    const onBack = /\/myorder(\/)?$/.test(location.pathname) ? null : () => window.history.back()

    return (
        <div className='app-myorder'>
            <PageHeader title='My Order' onBack={onBack}></PageHeader>
            <Routes>
                <Route path='/' element={<MyOrderList/>}></Route>
                <Route path='/:id' element={< MyOrderDetail/>}></Route>
            </Routes>
        </div>
    )
}
 
export default MyOrder;