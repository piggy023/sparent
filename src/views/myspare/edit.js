import { Form, Input, InputNumber, Select, Radio, Button, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import API from '../../api';
import Upload from './upload';

const { TextArea } = Input;
const { Option } = Select;

function MySpareEdit() {
    const { state } = useLocation()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state.user)

    const categoryData = [
        { label: 'Bike', key: 'bike' },
        { label: 'Boat', key: 'boat' },
        { label: 'Fishing', key: 'fishing' },
        { label: 'Tent', key: 'tent' },
        { label: 'Truch', key: 'truch' },
        { label: 'RV', key: 'rv' }
    ]

    const rules = {
        name: [
            {
                required: true,
                message: 'Please input item name'
            }
        ],

        description: [
            {
                required: true,
                message: 'Please input description'
            },  
        ],

        rentprice:  [
            {
                required: true,
                message: 'Please input rent price'
            },  
        ],

        deposit: [
            {
                required: true,
                message: 'Please input deposit'
            },  
        ],       
        
        image: [
            {
                required: true,
                message: 'Please select photo'
            },  
        ],
    }

    const onSubmitButtonClicked = (data) => {
        setLoading(true)

        API.uploadFile(data.image).then( url => {
            if (id == 'new') {
                data.visible = true
            }
            data.image = url
            data.uid = user.uid
            data.email = user.email

            API.saveSpareItem(data, id == 'new' ? null : id).then(result => {
                message.success('save success')
                window.history.back() 
            }).catch(error => {
                console.error(error)
                message.error(error.message || 'save fail')
            }).finally(() => {
                setLoading(false)
            })

        }).catch(error => {
            console.error(error)
            message.error(error.message || 'save fail')
            setLoading(false)
        })
    }

    return (
        <Form initialValues={state ? state : {category: categoryData[0].key, unit: 'day', visible: true}}  className='app-myspare-form' colon={false} labelCol={{ span: 6}}  wrapperCol={{span: 18 }} requiredMark={false} onFinish={onSubmitButtonClicked}>
            <Form.Item label='Item name' name='name' rules={rules.name}>
                <Input placeholder='Enter item name' showCount maxLength={50} />
            </Form.Item>
            <Form.Item label='Description' name='description' rules={rules.description}>
                <TextArea  placeholder='Enter description' showCount maxLength={500}/>
            </Form.Item>          
             <Form.Item label='Category' name='category'>
                <Select>
                    {
                        categoryData.map(item => <Option value={item.key} key={item.key}>{item.label}</Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item label='Rent price' name='rentprice' rules={rules.rentprice} >
           
                <InputNumber prefix='$' addonAfter={ 
                    <Form.Item name='unit'>
                        <Select>
                            <Option value='day'> Day</Option>
                            <Option value='hour'> Hour</Option>
                        </Select>
                    </Form.Item>
                }  style={{width: '100%'}} placeholder='rent price' min={0}></InputNumber>
          
           
            </Form.Item>
            <Form.Item label='Deposit' name='deposit' rules={rules.deposit}>
                <InputNumber prefix='$' style={{width: '100%'}} placeholder='deposit' min={0} />
            </Form.Item>

            <Form.Item label='Photo' name='image' rules={rules.image}>
                <Upload></Upload>
            </Form.Item>

            {
                id !== 'new' && (
                <Form.Item label='Visible' name='visible'>
                    <Radio.Group>
                        <Radio value={true}> YES </Radio>
                        <Radio value={false}> NO </Radio>
                    </Radio.Group>
                </Form.Item>)
            }

            <Form.Item label=' '>
                <Button type='primary' htmlType='submit' loading={loading} style={{width: '100%'}}>Save</Button>
            </Form.Item>

        </Form>
    );
    
}
 
export default MySpareEdit;