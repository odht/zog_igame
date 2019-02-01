import React from 'react'
import { lookup, fuzzyQuery } from '@/utils/tools';
import odoo from '../../../odoo-rpc/odoo';
export default (WrapTableForm) => {
    return class newTable extends React.Component {
        state = {
            dataSource: [],
            selectedRowKeys: [],    //删除选中的key
            visible: false,         //弹出表单
            edit: {},               //新建或编辑
            searchData: [],
        }
        componentDidMount() {//初始化
            const { dispatch } = this.props;
            const model = this.props.model;
            this.getdata();
            // dispatch({
            //     type: this.props.model + '/init'
            // })
        }
        getdata = async () => {//获取数据
            const { model, fields, domain = [['id', '>=', '0']] } = this.props;
            console.log(odoo);
            const dataSource = await odoo.env(model).search_read(domain, fields)
            console.log(dataSource);
            if (model === 'og.game') {
                dataSource.forEach((item, index) => {
                    dataSource[index] = this.parseNotes(item)
                })
            }
            this.setState({
                dataSource: dataSource
            })
        }
        updateData = () => {
            const { model, fields,domain } = this.props
            const cls = odoo.env(model);
            const newDataSource = cls.view(Object.values(cls._records).map(item => item.id)).look(fields)
            if (model === 'og.game') {
                newDataSource.forEach((item, index) => {
                    newDataSource[index] = this.parseNotes(item)
                })
            }
            this.setState({
                dataSource: newDataSource
            })
        }
        handleDelete = async (id) => {//单项删除
            const { model } = this.props
            const cls = odoo.env(model);
            await cls.unlink(id)
            this.updateData();

        }
        onSelectChange = (selectedRowKeys, selectedRows) => {//自身state
            this.setState({
                selectedRowKeys: selectedRowKeys
            })
            // this.props.dispatch({
            //     type: this.props.model + '/saveSelectedRowKeys',
            //     selectedRowKeys
            // })
        }
        handleRemove() {//批量删除
            // const { selectedRowKeys: ids } = this.props[this.props.model]
            // const { dispatch } = this.props;
            // dispatch({
            //     type: this.props.model + '/moreDelete',
            //     payload: { ids: ids }
            // })
        }
        changeVisible = () => {//自身state
            this.setState((state, props) => {
                return { ...state, visible: !state.visible, edit: {} }
            })
            // this.props.dispatch({
            //     type: this.props.model + '/changeVisible'
            // })
        }
        editBool = (record) => {//自身state
            this.setState((state, props) => {
                return { ...state, visible: !state.visible, edit: record }
            })
        }
        parseNotes = (data) => {
            if (data.host) {
                const { host, unit, referee, arbitration, concet, phone, endtime } = data
                const obj = {
                    host,
                    unit,
                    referee,
                    arbitration,
                    concet,
                    phone,
                    endtime,
                }
                data.notes = JSON.stringify(obj)
                Object.keys(obj).every((item) => {
                    delete data[item]
                })
                return data
            } else {
                const jsonString = data.notes;
                console.log(jsonString);
                const note = JSON.parse(jsonString);
                console.log(note);
                return { ...data, ...note }
            }
        }
        editChange = async (newEdit) => {//新建或编辑
            const { dataSource } = this.state;
            const { model, fields,createArgs,valueChange } = this.props;
            console.log(newEdit);
            if (model === 'og.game') {
                newEdit = this.parseNotes(newEdit)
            }
            console.log(newEdit);
            const index = dataSource.findIndex(item => newEdit.id === item.id);
            const cls = odoo.env(model)
            let result
            if(valueChange){
                newEdit=valueChange(newEdit,this.state.dataSource)
            }
            console.log(index);
            if (index > -1) {
                result = await cls.write(newEdit.id, newEdit)
            } else {
                if(createArgs){
                    newEdit=createArgs(newEdit,this.state.dataSource)
                }
                result = await cls.create(newEdit)
                console.log(result);
            }
            this.getdata()
            this.setState((state, props) => {
                return {
                    ...state,
                    visible: !state.visible,
                    edit: {},
                }
            })
        }
        getIds = (value) => {//获取查询的id等
            // const data = this.props.odooData[this.props.dataModel] || {};
            // const originIds = Object.keys(data) || [];
            // const dataSource = lookup(originIds, data);
            // const newid = value ? dataSource.map((item, index) => {
            //     let id = fuzzyQuery(item, value);;
            //     return id || null
            // }) : originIds
            // const newids = newid.filter((item) => Boolean(item));
            // const newData = lookup(newids, data)
            // return { newids, dataSource, originIds, newData }
        }
        searchValueChange = (value) => {//自身state
            // const { newData } = this.getIds(value)
            // const searchData = newData.map((item) => item[this.props.search])
            // this.props.dispatch({
            //     type: this.props.model + '/searchData',
            //     searchData
            // })
        }
        search = (value) => {//.ant-select-dropdown-hidden控制是否显示，login数据模型
            // const { newids } = this.getIds(value)
            // this.props.dispatch({
            //     type: this.props.dataModel + '/save',
            //     payload: { ids: newids }
            // })
        }
        render() {
            const methods = {
                handleDelete: this.handleDelete,
                onSelectChange: this.onSelectChange,
                handleRemove: this.handleRemove,
                changeVisible: this.changeVisible,
                editBool: this.editBool,
                editChange: this.editChange,
                searchValueChange: this.searchValueChange,
                search: this.search,
                getdata: this.getdata,
            }
            console.log(this.state);
            return (
                <WrapTableForm {...this.props} {...methods} {...this.state} />
            )
        }
    }
}

