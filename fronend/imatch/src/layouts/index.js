import React from 'react';
import HomeLayout from './HomeLayout.js';
import NoneLayout from './NoneLayout.js';
import DetailsLayout from './DetailsLayout.js';

function Layout(props) {
  console.log('---------rootProps', props);
  const { location: { pathname } } = props;

  if (pathname.indexOf('/user') > -1) {
    return (
      <NoneLayout {...props}> {props.children} </NoneLayout>
    )
  } else if (pathname === '/homepage' || pathname === '/news' || pathname === '/games' || pathname === '/teaching') {
    return (
      <HomeLayout {...props}> {props.children} </HomeLayout>
    );
  } else if (pathname.indexOf('/details') > -1) {
    return (
      <DetailsLayout {...props}> {props.children} </DetailsLayout>
    )
  } else if (pathname.indexOf('/sponsor') > -1) {
    return (
      <HomeLayout {...props} sponsor={true}> {props.children} </HomeLayout>
    )
  }
  else {
    return (
      <HomeLayout {...props}> {props.children} </HomeLayout>
    );
  }
}


export default Layout;

