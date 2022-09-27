import './myspare.css'

import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import MySpareEdit from './edit';
import MySpareList from './list';

function MySpare() {
    const navigate = useNavigate()
    const location = useLocation()
    const onBack = /\/myspare(\/)?$/.test(location.pathname) ? null : () => window.history.back()

    const onNewItemButtonClicked = () => {  
        navigate('new')
    }

    return (
        <div className='app-myspare'>
            <PageHeader title='My Spare' onBack={onBack}>
                {
                    !onBack && <Button className='app-myspare-add' type='primary' icon={<PlusOutlined />} onClick={onNewItemButtonClicked}>New Item</Button>
                }
            </PageHeader>
            <Routes>
                <Route path='/' element={<MySpareList/>}></Route>
                <Route path='/:id' element={< MySpareEdit/>}></Route>
            </Routes>
        </div>
    )
   
}
 
export default MySpare;