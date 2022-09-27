import { PlusOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React, { useState } from 'react'

function Upload(props) {
    props = props || {}
    const [file, setFile] = useState(props.value || null)


    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
      
        const isLt1M = file.size / 1024 / 1024 < 1;
      
        if (!isLt1M) {
            message.error('Image must smaller than 1MB!');
        }

        return isJpgOrPng&&isLt1M;
    }



    const onChange = (event)  => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]

            if (!beforeUpload(file)) {
                return
            }

            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                setFile(event.target.result)
                props.onChange && props.onChange(event.target.result)
            }
        }
        else {
            setFile(null)
            props.onChange && props.onChange(null)
        }
    }


    const contentStyle = {
        width: '100%', 
        height:'100%', 
        position: 'absolute', 
        pointerEvents:'none', 
        left: 0,
        top: 0,
        display:  'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const uploadButton = (
        <div style={contentStyle}>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <div
            style={{
                width: '100px', 
                height: '75px', 
                border: '1px solid #ebebeb',
                borderRadius: '5px',
                backgroundColor: '#fafafa',
                position: 'relative',
                overflow:  'hidden',
        }}>
            <input type='file' accept='image/png,image/jpg,image/jpeg' style={{width: '100%', height: '100%', opacity: 0}} onChange={onChange}></input>
            {
                file ? <img src={file}  style={contentStyle}/> : uploadButton
            }
        </div>
    )
}

export default Upload