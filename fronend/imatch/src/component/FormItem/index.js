import React, { Component, useEffect, useState, useRef } from 'react';
import { Input, Transfer, Button, Table } from 'antd'
import router from 'umi/router';
import StepContent from '@/component/steps'
import { parseNotes } from '@/utils/tools'
import DateArrange from './dateArrange'
export { DateArrange }
export class MyInput extends React.Component {
    onChange = (index, e) => {
        const val = e.target.value
        let { onChange, value } = this.props;
        console.log(value);
        if (!value) {
            value = '~'
        }
        const x = value.split('~')
        x[index] = val;
        if (index === 0) {
            x.splice(1, 0, '~')
        } else {
            x[1] = '~'
        }
        console.log(x, index);
        onChange(x.reduce((pre, cur) => {
            return pre + cur
        }, ''));
    };
    render() {
        const { value = '~' } = this.props;
        return (
            < Input.Group compact>
                <Input value={value.split('~')[0]} style={{ width: 100, textAlign: 'center' }} onChange={this.onChange.bind(this, 0)} placeholder="Minimum" />
                <Input
                    style={{
                        width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
                    }}
                    placeholder="~"
                    disabled
                />
                <Input value={value.split('~')[1]} onChange={this.onChange.bind(this, 2)} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
            </Input.Group>
        );
    }
}
