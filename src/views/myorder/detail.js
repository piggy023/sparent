import React from 'react';
import { Descriptions,  Divider } from 'antd';
import { useLocation } from 'react-router-dom';

function MyOrderDetail() {

    const { state } = useLocation()

    return (
        <div className='app-myorder-detail'>
            <div> Your order has been sent to the owner: {state.owner.email}</div>
            <Divider dashed></Divider>
            <Descriptions  column={1}>
                <Descriptions.Item label='Order No'>{state.id}</Descriptions.Item>
                <Descriptions.Item label='Item'>{state.name}</Descriptions.Item>
                <Descriptions.Item label='Begin date'>{state.begindate}</Descriptions.Item>
                <Descriptions.Item label='End date'>{state.enddate}</Descriptions.Item>
                <Descriptions.Item label='Total price'>${state.rentprice * state.days + state.deposit}</Descriptions.Item>
            </Descriptions>
        </div>

    );
    
}
 
export default MyOrderDetail;