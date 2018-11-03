import React from 'react';
import { connect } from 'dva';

const Home = (props) => {
    console.log(props,'home_login')
    return (
        <div>Home</div>
    )
}

export default connect(({ login }) => ({ login }))(Home)