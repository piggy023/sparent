import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/userSlice.js';
import API from '../../api';

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState()

    const rules = {
        username: [
            {
                required: true,
                message: 'Please input username!'
            }
        ],

        password: [
            {
                required: true,
                message: 'Please input password!'
            }
        ],

        email: [
            {
                required: true,
                message: 'Please input email!'
            },
            {
                type: 'email',
                message: 'Format error!'
            }
        ],

        city: [
            {
                required: true,
                message: 'Please input city!'
            }
        ],

        address: [
            {
                required: true,
                message: 'Please input address!'
            }
        ]
    }

    const onSubmitButtonClicked = (data) => {
        setLoading(true)
        API.signUp(data).then(user => {
            dispatch(login(user))
            navigate('/home')
        }).catch(error => {
            console.error(error)
            message.error(error.message || 'sign up fail')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='app'>
            <header className='app-header'>
                <div className='app-logo'></div>
            </header>

            <div className='login'>
                <Form className='login-form' layout='vertical' requiredMark={false} onFinish={onSubmitButtonClicked}>
                    <div className='login-form-title'>Sign Up</div>
                    <Form.Item name='username' label='Username' rules={rules.username}>
                        <Input placeholder='Enter your Username' />
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={rules.password}>
                        <Input.Password placeholder='Enter your password' />
                    </Form.Item>
                    <Form.Item name='email' label='Email' rules={rules.email}>
                        <Input placeholder='Enter your email' />
                    </Form.Item>
                    <Form.Item name='city' label='City' rules={rules.city}>
                        <Input placeholder='Enter your city' />
                    </Form.Item>
                    <Form.Item name='address' label='Address' rules={rules.address}>
                        <Input placeholder='Enter your address' />
                    </Form.Item>
                    <Form.Item>
                        <div className='login-form-label'></div>
                        <Button type='primary' htmlType='submit' loading={loading} className='login-form-button'>Create account</Button>
                    </Form.Item>
                    <Form.Item>
                        <div style={{textAlign: 'center'}}>Already have an account? <NavLink to='/login'>Login</NavLink></div>
                    </Form.Item>

                </Form>

            </div>
        </div>
    )

}
 
export default SignUp;