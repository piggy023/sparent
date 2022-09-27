import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import API from '../../api';

function MyOrderList() {
    const { user } = useSelector(state => state.user)
    const [ list, setList] = useState([])

    const columns = [
        {
            title: 'Order No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Begin date',
            dataIndex: 'begindate',
            key: 'begindate',
        },
        {
            title: 'End date',
            dataIndex: 'enddate',
            key: 'enddate',
        },
        {
            title: 'Total price',
            dataIndex: 'rentprice',
            key: 'price',
            render: (price, item) => <div>${item.rentprice * item.days + item.deposit}</div>
        },
        {
              title: 'Detail',
              dataIndex: 'id',
              key: 'detail',
              render: (id, item) => <NavLink to={id} state={item} >view</NavLink>
        },
    ]

    useEffect(() => {
        API.getMyOrders(user.uid).then( data => {
            setList(data)
        })
    }, [])



    return ( <Table 
                columns={columns} 
                dataSource={list} 
                rowKey={item => {return item.id}} 
                scroll={{ y: 500 }}
                // pagination={{ position: ['bottomleft'] }} 
                pagination={{ position: ['none'] }} 
            />);
    
}
 
export default MyOrderList