import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Upload, Icon } from 'antd'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 2 },
        sm: { span: 16 },
    },
};
export default ({ getFieldDecorator }) => {
    const onChange = () => { }
    const [imageUrl, setImgUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const handleChange = info => {
        const { file: { status } } = info;
        if (status === 'uploading') {
            setLoading(true)
        }
        if (status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setImgUrl(imageUrl)
                setLoading(false)
            })
        }
    }
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            {/* <div className="ant-upload-text">Upload</div> */}
        </div>
    );
    return (
        <>
            <Form.Item
                label="比赛名称"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        type: 'string', message: '',
                    }, {
                        required: true, message: '比赛名称不可缺少!',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item label="比赛时间" {...formItemLayout}>
                <RangePicker onChange={onChange} />
            </Form.Item>
            <Form.Item label="截止时间" {...formItemLayout}>
                <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="地点"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        type: 'string', message: '',
                    }, {
                        required: true, message: '地点不可缺少!',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item label="logo图片" {...formItemLayout}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    // className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <img style={{ width: 100, height: 100 }} src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
            </Form.Item>
        </>
    )
}