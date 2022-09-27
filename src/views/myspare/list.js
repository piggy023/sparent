import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import API from '../../api';

function MySpareList()  {
    const { user } = useSelector(state => state.user)
    const [ list, setList] = useState([])

    const columns = [
        {
            title: 'Pic',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <div className='app-myspare-list-img' style={{backgroundImage: 'url('+image+')'}}></div> 
        },
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            render: () => <div>0</div>
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
            render: () => <div>0</div>
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            key: 'edit',
            render: (id, item) => <NavLink to={id} state={item}>edit</NavLink>
        }
    ]

    useEffect(() => {
        API.getMySpares(user.uid).then( data => {
            setList(data)
        })
    }, [])

    return ( <Table
                columns={columns} 
                dataSource={list} 
                rowKey={item => {return item.id}} 
                // pagination={{ position: ['bottomleft'] }} 
                pagination={{ position: ['none'] }} 
                scroll={{ y: 500 }}
            />);
    
}
 
export default MySpareList;