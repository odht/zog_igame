import React, { Component } from 'react';
import { Input, Form, DatePicker, Select, Modal } from 'antd';
import moment from 'moment';
import style from './form.css'
const FormItem = Form.Item
function timetrans() {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return Y + M + D
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
    style: {
        width: '300px'
    }
};
const zh_cnReg = /^[\u2E80-\u9FFF]{3,16}$/;
const normalUserReg = /^[a-z0-9_-]{3,16}$/;
const normalPasswordReg = /^[a-z0-9_-]{6,18}$/;
const emailReg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
const numberReg = /^[0-9]{1,16}$/;
export default class PopForm extends Component {
    state = {
        edit: {},//false: new, true: edit
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.setState({ edit: { ...nextProps.edit } });
        }
    }
    change(value, attr) {
        this.setState((preState, props) => {
            let edit = { ...preState.edit };
            if (Array.isArray(attr)) {
                attr.forEach((item, index) => {
                    edit[attr[index]] = value[index];
                })
            } else {
                edit[attr] = value;
            }
            return { ...preState, edit }
        })
    }
    onOk() {
        const { edit } = { ...this.state };
        const keyEdit = Object.keys(edit);
        let error;
        keyEdit.length > 0 ? error = keyEdit.every((item) => Boolean(edit[item])) : error = false;
        if(error){
            this.props.onOk(edit)
        }
    }
    render() {
        const { visible } = this.props;
        const { edit } = this.state;
        return (
            <Modal
                visible={visible}
                destroyOnClose={true}
                title={this.props.title}
                onCancel={this.props.onCancel ? this.props.onCancel.bind(this) : () => false}
                cancelText='取消'
                onOk={this.onOk.bind(this)}
                okText='确认'>
                <Form
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    {
                        this.props.list.map((item, index) => {
                            return (
                                <FormItem {...formItemLayout} label={item.label} key={index}>
                                    {item.render ? item.render() :
                                        item.input.type === "select" ?
                                            <SelectComponent
                                                options={item.input.data}
                                                edit={edit}
                                                attr={item.attribute}
                                                change={this.change.bind(this)}>
                                            </SelectComponent> :
                                            item.input.type === "date" ?
                                                <DateComponent
                                                    edit={edit}
                                                    attr={item.attribute}
                                                    change={this.change.bind(this)} /> :
                                                <InputComponent
                                                    edit={edit}
                                                    attr={item.attribute}
                                                    rule={item.input.rule}
                                                    shake={this.state.shake}
                                                    change={this.change.bind(this)}>
                                                </InputComponent>
                                    }
                                </FormItem>
                            )
                        })
                    }
                </Form>
            </Modal>
        )
    }
}
class InputComponent extends Component {
    state = {
        val: '',
        error: true,//true没错，false错了
    }
    valueChange(e) {
        var { error } = { ...this.state };
        const value = e.target.value;
        if (this.props.rule) {
            const typeValue = typeof this.props.rule;
            if (typeValue === "function") {
                error = this.props.rule(this.state.val);
            } else if (typeValue === "string") {
                switch (this.props.rule) {
                    case "zh-cn":
                        error = zh_cnReg.test(value);
                        break;
                    case "normal-user":
                        error = normalUserReg.test(value);
                        break;
                    case "normal-password":
                        error = normalPasswordReg.test(value);
                        break;
                    case "email":
                        error = emailReg.test(value);
                        break;
                    case "number":
                        error = numberReg.test(value);
                        break;
                    default:
                        break;
                }
            }
            error ? this.props.change(value, this.props.attr) : this.props.change("", this.props.attr);
        } else {
            this.props.change(value, this.props.attr);
        }
        this.setState({ val: value, error: error });
    }
    render() {
        const { edit, attr } = this.props;
        return (
            <>
                <Input
                    placeholder={edit[attr] ? edit[attr] : ""}
                    onChange={this.valueChange.bind(this)}>
                </Input>
                {this.state.error? null : <span
                    style={{ color: 'red', fontWeight: '100', position: 'absolute', right: '-40%' }}
                    className={style.shake}>
                    格式不正确
                    </span>}
            </>
        )
    }
}
class SelectComponent extends Component {
    valueChange(value) {
        this.props.change(value, this.props.attr);
    }
    render() {
        const { edit, attr } = this.props;
        return (
            <Select
                value={edit[attr] ? edit[attr] : ''}
                onSelect={this.valueChange.bind(this)}>
                {this.props.options.map((item, index) => {
                    return (
                        <Select.Option
                            key={index}
                            value={item}>
                            {item}
                        </Select.Option>
                    )
                })}
            </Select>
        )
    }
}
class DateComponent extends Component {
    valueChange(dates, dateString) {
        this.props.change(dateString, this.props.attr);
    }
    render() {
        let { edit, attr } = this.props;
        const isArray = Array.isArray(attr);
        var Date;
        var daterange;
        if (isArray) {
            attr.forEach((item) => {
                 edit[item] ? null : edit[item] = timetrans();
            })
            daterange = [moment(edit[attr[0]], 'YYYY-MM-DD'), moment(edit[attr[1]], 'YYYY-MM-DD')];
            Date = DatePicker.RangePicker;
        } else {
            edit[attr] ? null : edit[attr] = timetrans();
            daterange = moment(edit[attr], 'YYYY-MM-DD');
            Date = DatePicker;
        }
        return (
            <Date
                value={daterange}
                onChange={this.valueChange.bind(this)}>
            </Date>
        )
    }
}
