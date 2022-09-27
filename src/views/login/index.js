import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/userSlice.js';
import API from '../../api';

function Login () {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState()

    const rules = {
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
        password: [
            {
                required: true,
                message: 'Please input password!'
            } 
        ]
    }

    const onSubmitButtonClicked = (data) => {
        setLoading(true)
        API.signIn(data).then(user => {
            dispatch(login(user))
            navigate('/home')
        }).catch(error => {
            console.error(error)
            message.error(error.message || 'login fail')
        }).finally( () => {
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
                    <div className='login-form-title'>Login</div>
                    <Form.Item name='email' label='Email' rules={rules.email}>
                        <Input placeholder='Enter your email'/>
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={rules.password}>
                        <Input.Password placeholder='Enter your password' />
                    </Form.Item>
                    <Form.Item>
                        <div className='login-form-label'></div>
                        <Button type='primary' htmlType='submit' loading={loading} className='login-form-button'>Login</Button>
                    </Form.Item>
                    <Form.Item>
                        <div className='login-form-tip'>Not registered yet? <NavLink to='/signup'>Create an account</NavLink></div>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
    
}
 
export default Login;