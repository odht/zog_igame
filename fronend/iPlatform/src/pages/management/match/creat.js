import React, { Component } from 'react';
import { Input,Form, DatePicker, Modal } from 'antd';
import moment from 'moment';
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
// const competitionType = ['车轮赛', '小组赛', '竞技赛', '团体赛', '友谊赛'];
// const integralWay = ['加分制', '减分制', '总分制', '不计分'];

export default class Pop extends Component {
    state = {
        edit: {},
        newOrEdit: false,   //false: new, true: edit
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.visible){
            if (!nextProps.edit['name']) {
                var edit = Object.assign({}, nextProps.edit)
                edit.start_time = timetrans();
                edit.over_time = timetrans();
                edit.signEndTime = timetrans();
                this.setState({ newOrEdit: false, edit: edit })
            } else {
                this.setState({ edit: Object.assign({}, nextProps.edit) ,newOrEdit: true});
            }
        }
    }
    nameChange(e) {
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.name = val;
            return { edit: copy }
        })
    }
    dateChange(dates, dateStrings) {
        this.setState((prestate, peops) => {
            var copy = Object.assign({}, prestate.edit);
            copy.start_time = dateStrings[0];
            copy.over_time = dateStrings[1];
            return { edit: copy }
        })
    }
    refereeChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.referee = val;
            return { edit: copy }
        })
    }
    signEndTimeChange(dates, dateStrings){
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.signEndTime = dateStrings;
            return { edit: copy }
        })
    }
    arbitratorChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.arbitrator = val;
            return { edit: copy }
        })
    }
    host_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.host_unit = val;
            return { edit: copy }
        })
    }
    undertaking_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.undertaking_unit = val;
            return { edit: copy }
        })
    }
    cooperating_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.cooperating_unit = val;
            return { edit: copy }
        })
    }
    submitHandle() {
        this.props.editChange(Object.assign({}, this.state.edit));
    }
    render() {
        const { visible } = this.props;
        // const [name, date, competition, integral] = ['name', 'date', 'competitionType', 'integralWay'];
        const {edit, newOrEdit} = this.state;
        console.log(edit)
        const dateFormat = 'YYYY-MM-DD';
        return (
            <Modal
                visible={visible}
                title="新建比赛"
                onCancel={this.props.changeVisible}
                cancelText='取消'
                onOk={this.submitHandle.bind(this)}
                okText='确认'>
                <Form
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <FormItem {...formItemLayout} label="比赛名称">
                        <Input
                            value={edit.name}
                            onChange={this.nameChange.bind(this)}>
                        </Input>
                    </FormItem>
                    <FormItem {...formItemLayout} label="比赛日程">
                        <DatePicker.RangePicker
                            value={[moment(edit.start_time, dateFormat), moment(edit.over_time, dateFormat)]}
                            onChange={this.dateChange.bind(this)} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="报名截止日期">
                        <DatePicker
                        value={moment(edit.signEndTime, dateFormat)}
                        onChange={this.signEndTimeChange.bind(this)}
                        />
                    </FormItem>
                    {
                        newOrEdit ?
                        <div>
                    <FormItem {...formItemLayout} label="裁判">
                        <Input
                            value={edit.referee}
                            onChange={this.refereeChange.bind(this)}
                        ></Input>
                    </FormItem>
                    <FormItem {...formItemLayout} label="仲裁">
                        <Input
                            value={edit.arbitrator}
                            onChange={this.arbitratorChange.bind(this)}
                        ></Input>
                    </FormItem>
                    <FormItem {...formItemLayout} label="举办方">
                        <Input
                            value={edit.host_unit}
                            onChange={this.host_unitChange.bind(this)}
                        ></Input>
                    </FormItem>
                    <FormItem {...formItemLayout} label="承办单位">
                        <Input
                            value={edit.undertaking_unit}
                            onChange={this.undertaking_unitChange.bind(this)}
                        ></Input>
                    </FormItem>
                    <FormItem {...formItemLayout} label="协办单位">
                        <Input
                            value={edit.cooperating_unit}
                            onChange={this.cooperating_unitChange.bind(this)}
                        ></Input>
                    </FormItem>
                    </div>
                    : null
                    }

                </Form>
            </Modal>
        )
    }
}
