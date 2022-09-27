import { DatePicker, Form, InputNumber, Button, Descriptions, Divider, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';


function HomeDetail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [owner, setOwner] = useState({})
    const [loading, setLoading] = useState()
    const [disabled, setDisabled] = useState(true)
    const { user } = useSelector(state => state.user)
    
    const rules = {
        begindate: [
            {
                required: true,
                message: 'Please select date'
            }
        ],

        days: [
            {
                required: true,
                message: 'Please input days'
            },  
        ]
    }

    const onSubmitButtonClicked = (form) => {
        setLoading(true)
        const date = form.begindate
        const order = {
            uid: user.uid,
            sid: id,
            begindate: date.format('YYYY-MM-DD'),
            enddate: date.add(form.days, 'days').format('YYYY-MM-DD'),
            days: form.days,
            rentprice: data.rentprice,
            deposit: data.deposit,
            name: data.name,
            owner: owner
        }

        API.addOrder(order).then( result => {
            order.id = result.id
            navigate('../result', {replace: true, state: order})
        }).catch(error => {
            console.error(error)
            message.error(error.message || 'submit fail')
        }).finally( () => {
            setLoading(false)
        })
    }

    useEffect(()  => {
        API.getSpare(id).then(data => {
            setData(data)

            API.getUser(data.uid).then(user => {
                setOwner(user)
                setDisabled(false)
            })
        })
    },[])

    return (
        <div className='app-home-wrapper'>
            <div className='app-home-detail'>
                <div className='app-home-detail-image' style={{backgroundImage: 'url('+data.image+')'}}></div>
                <div className='app-home-detail-title'>{data.name}</div>
                <div className='app-home-detail-description'>{data.description}</div>
            </div>
            <div className='app-home-order'>
                <Descriptions column={1}>
                    <Descriptions.Item label='Owner'>{owner.username}</Descriptions.Item>
                    <Descriptions.Item label='Address'>{owner.address}</Descriptions.Item>
                    <Descriptions.Item label='City'>{owner.city}</Descriptions.Item>
                    <Descriptions.Item label='Rent'>${data.rentprice}/{data.unit}</Descriptions.Item>
                    <Descriptions.Item label='Deposit'>${data.deposit}</Descriptions.Item>
                </Descriptions>
                <Divider dashed></Divider>
                <Form layout='vertical' requiredMark={false} onFinish={onSubmitButtonClicked} >
                    <Form.Item name='begindate' label='Choose the begining date' rules={rules.begindate}>
                        <DatePicker format='YYYY-MM-DD' style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item name='days' label='How many days you wan to rent' rules={rules.days}>
                        <InputNumber placeholder='days you wan to rent' min={1} style={{width: '100%'}} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' disabled={disabled} loading={loading} className='login-form-button' >Order</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
    
}
 
export default HomeDetail;