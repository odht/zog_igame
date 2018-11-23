import React from 'react'
import { lookup, fuzzyQuery } from '@/utils/tools';
import ogGameGroups from '../../../pages/team/models/ogGameGroups';
export default (WrapTableForm) => {
    return class newTable extends React.Component {
        state={
            dataSource:{},
            selectedRowKeys: [],    //删除选中的key
            visible: false,         //弹出表单
            edit: {},               //新建或编辑
            searchData: [],
        }
        componentDidMount() {//初始化
            const { dispatch } = this.props;
            const model = this.props.model;
            dispatch({
                type: this.props.model + '/init'
            })
        }
        getdata = () => {//获取数据
            const { ids } = this.props[this.props.dataModel];
            const data = this.props.odooData[this.props.dataModel];
            const dataSource = lookup(ids, data);
            return dataSource
        }

        handleDelete = (id) => {//单项删除
            this.props.dispatch({
                type: this.props.model + '/unlink',
                payload: { id: id }
            })
        }
        onSelectChange = (selectedRowKeys, selectedRows) => {//自身state
            this.setState({
                selectedRowKeys:selectedRowKeys
            })
            // this.props.dispatch({
            //     type: this.props.model + '/saveSelectedRowKeys',
            //     selectedRowKeys
            // })
        }
        handleRemove() {//批量删除
            const { selectedRowKeys: ids } = this.props[this.props.model]
            const { dispatch } = this.props;
            dispatch({
                type: this.props.model + '/moreDelete',
                payload: { ids: ids }
            })
        }
        changeVisible=() =>{//自身state
            this.setState((state,props)=>{
                return {...state,visible:!state.visible}
            })
            // this.props.dispatch({
            //     type: this.props.model + '/changeVisible'
            // })
        }
        edit = (record) => {//自身state
            this.setState((state,props)=>{
                return {...state,visible:!state.visible,record:record}
            })
        }
        editChange = (newEdit) => {//新建或编辑
            const dataSource = this.getdata();
            const index = dataSource.findIndex(item => newEdit.id === item.id);
            if (index > -1) {
                this.props.dispatch({
                    type: this.props.dataModel + '/write',
                    payload: { id: newEdit.id, vals:{name:newEdit.name}  }
                })
               
                // this.props.dispatch({
                //     type: this.props.model + '/clearEdit',
                //     dataSource
                // })
            } else {
                this.props.dispatch({
                    type: this.props.dataModel + '/create',
                    payload: { vals: newEdit }
                })
                // this.props.dispatch({
                //     type: this.props.model + '/clearEdit',
                //     dataSource
                // })
            }
            this.setState((state,props)=>{
                return {...state,visible:!state.visible,edit:{}}
            })
        }
        getIds = (value) => {//获取查询的id等
            const data = this.props.odooData[this.props.dataModel]||{};
            const originIds = Object.keys(data)||[];
            const dataSource = lookup(originIds, data);
            const newid = value ? dataSource.map((item, index) => {
                let id = fuzzyQuery(item, value);;
                return id || null
            }) : originIds
            const newids = newid.filter((item) => Boolean(item));
            const newData=lookup(newids,data)
            return { newids, dataSource, originIds,newData }
        }
        searchValueChange = (value) => {//自身state
            const {newData}=this.getIds(value)
            const searchData =newData.map((item) => item[this.props.search])
            this.props.dispatch({
                type: this.props.model + '/searchData',
                searchData
            })
        }
        search = (value) => {//.ant-select-dropdown-hidden控制是否显示，login数据模型
            const { newids } = this.getIds(value)
            this.props.dispatch({
                type: this.props.dataModel + '/save',
                payload: { ids: newids }
            })
        }
        render() {
            const methods = {
                handleDelete: this.handleDelete,
                onSelectChange: this.onSelectChange,
                handleRemove: this.handleRemove,
                changeVisible: this.changeVisible,
                edit: this.edit,
                editChange: this.editChange,
                searchValueChange: this.searchValueChange,
                search: this.search,
                getdata: this.getdata,
            }
            
            return (
                <WrapTableForm {...this.props} {...methods} {...this.state}/>
            )
        }
    }
}

