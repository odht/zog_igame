import React from 'react';
import { Redirect } from "dva/router";


export default props => <Redirect to="/home"><div>{props.children}</div></Redirect>