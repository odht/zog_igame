import React from 'react'
import ListDecorator from '@/component/ListDecorator2'
import { connect } from 'dva';

class gameView extends React.Component {
    componentWillMount() {
        const { location: { search } } = this.props;
        this.setState({
            key: search.split('=')[1]
        })
    }
    state = {
        key: ''
    }
    render() {
        const dataSource = this.props.games.dataSource
        let detailData = {}
        dataSource.map(item => {
            item['key'] === this.state.key ? detailData = item : null
        })

        return (
            <div>
                <ListDecorator detailData={detailData} />
            </div>
        )
    }
}

export default connect(({ games }) => ({ games }))(gameView)