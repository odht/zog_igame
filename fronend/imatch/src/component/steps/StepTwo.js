import React, { useEffect, useState } from 'react';
import { Form, Input, Icon } from 'antd'


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
    return (
        <>
            <Form.Item
                label="主办单位"
                {...formItemLayout}
            >
                {getFieldDecorator('host-name', {
                    rules: [{
                        type: 'string', message: '',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="承办单位"
                {...formItemLayout}
            >
                {getFieldDecorator('host-name', {
                    rules: [{
                        type: 'string', message: '',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="联系人"
                {...formItemLayout}
            >
                {getFieldDecorator('host-name', {
                    rules: [{
                        type: 'string', message: '',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="备注"
                {...formItemLayout}
            >
                {getFieldDecorator('host-name', {
                    rules: [{
                        type: 'string', message: '',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>

        </>
    )
}