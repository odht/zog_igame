import React, { Component } from 'react';
import { Redirect } from "dva/router";

// export default props => <div>{props.children}</div>
export default class BasicLayout extends Component {

    state = {
        currentPath: null
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { route, location: { pathname }, children } = this.props;
        if (pathname === nextProps.pathname) {
            return false;
        } else {
            return true;
        }
    }
    componentDidMount() {
        const { route, location: { pathname }, children } = this.props;
        console.log(route)
        const routePath = route.routes;
        function redirectRoute(routeChildren,currentpath) {
            return routeChildren.map(item => {
                if (item.path === pathname) {
                    return <div key={item.path}><Redirect to={pathname} />{children}</div>
                } else {
                    if (item.routes && item.routes.length > 0 && currentpath !==item.routes.path) {
                        
                        redirectRoute(item.routes,item.path);
                    } else {
                        return null;
                    }
                    return <div key={item.path}><Redirect to='/home' />{children}</div>
                }
            })
        }
        console.log(routePath)
        this.setState({
            currentPath: redirectRoute(routePath,'/')
        })
    }

    render() {
        const { currentPath } = this.state;
        console.log(currentPath)
        return currentPath
    }
}