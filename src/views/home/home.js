import './home.css';

import React from 'react';
import { PageHeader } from 'antd';
import { Route, Routes, useLocation } from 'react-router-dom';

import HomeDetail from './detail';
import HomeList from './list';
import OrderResult from './result';

function Home() {
    const location = useLocation()
    const onBack = /\/home(\/)?$/.test(location.pathname) ? null : () => window.history.back()

    return (
        <div className='app-home'>
            <PageHeader title='Home' onBack={onBack}></PageHeader>
            <Routes>
                <Route path='/' element={<HomeList/>}></Route>
                <Route path='/result' element={<OrderResult/>}></Route>
                <Route path='/:id' element={< HomeDetail/>}></Route>
            </Routes>
        </div>
    )
}
 
export default Home;
