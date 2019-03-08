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
                label="裁判"
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
                label="仲裁"
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