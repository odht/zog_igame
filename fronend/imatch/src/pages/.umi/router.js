import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/Contact/Contact",
        "exact": true,
        "component": require('../Contact/Contact.js').default,
        "_title": "demo1",
        "_title_default": "demo1"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "demo1",
        "_title_default": "demo1"
      },
      {
        "component": () => React.createElement(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "demo1",
        "_title_default": "demo1"
      }
    ],
    "_title": "demo1",
    "_title_default": "demo1"
  },
  {
    "component": () => React.createElement(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "demo1",
    "_title_default": "demo1"
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
