import './main.css';

import React from 'react';
import { Routes, Route, NavLink, Navigate} from 'react-router-dom';
import { Avatar, Divider, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../home/home';
import MySpare from '../myspare/myspare';
import MyOrder from '../myorder/myorder';
import { logout } from '../../store/userSlice';
import API from '../../api';


function Main() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const navs = [
        { label: 'Home', key: 'home' },
        { label: 'My Spare', key: 'myspare' },
        { label: 'My Order', key: 'myorder' },
    ]

    const onLogoutButtonClicked = () => {
        dispatch(logout())
        
        API.signOut()
    }

    if (user == null) {
        return (<Navigate to='/login'></Navigate>)
    }

    const dropdown = (
        <div className='app-dropdown-overlay'>
            <div>{user.username}</div>
            <Divider></Divider>
            <NavLink to={'/login'} onClick={onLogoutButtonClicked}>Logout</NavLink>
        </div>
    )
    
    return (
        <div className='app'>
            <header className='app-header'>
                <div className='app-logo'></div>
                <nav className='app-nav'>
                    {
                        navs.map(item => <NavLink className={({isActive}) => (isActive ? 'on ' : '').concat('app-nav-item')} key={item.key} to={item.key}>{item.label}</NavLink>)
                    }
                </nav>
                <div className='app-search'>
                    <Dropdown className='app-dropdown' trigger={'click'} arrow overlay={dropdown}>
                        <Avatar size={34} style={{textTransform: 'capitalize'}}>{user.username.substr(0, 1)}</Avatar>
                    </Dropdown>
                </div>
            </header>
            <div className='app-body'>
                <Routes>
                    <Route path='home/*' element={<Home/>}></Route>
                    <Route path='myspare/*' element={<MySpare/>}></Route>
                    <Route path='myorder/*' element={<MyOrder/>}></Route>
                    <Route path='*' element={<Navigate to='/404' replace/>}></Route>
                </Routes>
            </div>

            <footer className='app-footer'>Copyright sparent.com 2022</footer>
        </div>
    );
   
}
 
export default Main;