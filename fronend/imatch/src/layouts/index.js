import React from 'react';
import BasicLayout from './BasicLayout';
import DetailsLayout from './DetailsLayout';
import UserLayout from './UserLayout';

export default function (props) {
  const { location: { pathname } } = props;
  const router = '/' + pathname.split('/')[1];
  if (router === '/details') {
    return <DetailsLayout {...props}>{props.children}</DetailsLayout>
  }

  if(router === '/user'){
    return <UserLayout {...props}>{props.children}</UserLayout>
  }

  return <BasicLayout {...props}>{props.children}</BasicLayout>

}