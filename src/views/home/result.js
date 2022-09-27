import React from 'react';
import { Result, Descriptions} from 'antd';
import { useLocation } from 'react-router-dom';

function OrderResult() {

    const { state } = useLocation()

    return (
        <Result
            status='success'
            title='Successfully'
            subTitle={'Your order has been sent to the owner:' +state.owner.email}
            extra={
                <Descriptions column={1} style={{width: '300px'}}>
                    <Descriptions.Item label='Order No'>{state.id}</Descriptions.Item>
                    <Descriptions.Item label='Item'>{state.name}</Descriptions.Item>
                    <Descriptions.Item label='Begin date'>{state.begindate}</Descriptions.Item>
                    <Descriptions.Item label='End date'>{state.enddate}</Descriptions.Item>
                    <Descriptions.Item label='Total price'>${state.rentprice * state.days + state.deposit}</Descriptions.Item>
                </Descriptions>
            }
        />
    );
}
 
export default OrderResult;