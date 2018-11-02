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
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('../home.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/game",
        "exact": false,
        "component": require('../game/_layout.js').default,
        "routes": [
          {
            "path": "/game/gameNational",
            "exact": true,
            "component": require('../game/gameNational.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/gameseatch",
            "exact": true,
            "component": require('../game/gameseatch.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/gamelocal",
            "exact": true,
            "component": require('../game/gamelocal.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/review",
            "exact": true,
            "component": require('../game/review.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/reviewclub",
            "exact": true,
            "component": require('../game/reviewclub.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/reviewlocal",
            "exact": true,
            "component": require('../game/reviewlocal.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/reviewNational",
            "exact": true,
            "component": require('../game/reviewNational.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/gameclub",
            "exact": true,
            "component": require('../game/gameclub.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game/trailnotice",
            "exact": true,
            "component": require('../game/trailnotice.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/game",
            "exact": true,
            "component": require('../game/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
            "_title": "imatch",
            "_title_default": "imatch"
          }
        ],
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/info",
        "exact": false,
        "component": require('../info/_layout.js').default,
        "routes": [
          {
            "path": "/info/backcard",
            "exact": true,
            "component": require('../info/backcard.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/info/contact",
            "exact": true,
            "component": require('../info/contact.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/info/id",
            "exact": true,
            "component": require('../info/id.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/info",
            "exact": true,
            "component": require('../info/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/info/modifyPwd",
            "exact": true,
            "component": require('../info/modifyPwd.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
            "_title": "imatch",
            "_title_default": "imatch"
          }
        ],
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/management",
        "exact": false,
        "component": require('../management/_layout.js').default,
        "routes": [
          {
            "path": "/management/advertise",
            "exact": true,
            "component": require('../management/advertise.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management",
            "exact": true,
            "component": require('../management/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match/creat",
            "exact": true,
            "component": require('../management/match/creat.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match/data",
            "exact": true,
            "component": require('../management/match/data.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match/gameinfo",
            "exact": true,
            "component": require('../management/match/gameinfo.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match/gameView",
            "exact": true,
            "component": require('../management/match/gameView.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match",
            "exact": true,
            "component": require('../management/match/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/match/models/games",
            "exact": true,
            "component": require('../management/match/models/games.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/sponsor",
            "exact": true,
            "component": require('../management/sponsor/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/management/sponsor/models/match",
            "exact": true,
            "component": require('../management/sponsor/models/match.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
            "_title": "imatch",
            "_title_default": "imatch"
          }
        ],
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/details",
        "exact": false,
        "component": require('../details/_layout.js').default,
        "routes": [
          {
            "path": "/details/dhome",
            "exact": true,
            "component": require('../details/dhome.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details/data",
            "exact": true,
            "component": require('../details/data.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details/grade",
            "exact": false,
            "component": require('../details/grade/_layout.js').default,
            "routes": [
              {
                "path": "/details/grade/1",
                "exact": true,
                "component": require('../details/grade/1/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/1/play",
                "exact": true,
                "component": require('../details/grade/1/play.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/2",
                "exact": true,
                "component": require('../details/grade/2/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/datumn",
                "exact": true,
                "component": require('../details/grade/datumn/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade",
                "exact": true,
                "component": require('../details/grade/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/graresult",
                "exact": false,
                "component": require('../details/grade/graresult/_layout.js').default,
                "routes": [
                  {
                    "path": "/details/grade/graresult",
                    "exact": true,
                    "component": require('../details/grade/graresult/index.js').default,
                    "_title": "imatch",
                    "_title_default": "imatch"
                  },
                  {
                    "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
                    "_title": "imatch",
                    "_title_default": "imatch"
                  }
                ],
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/round",
                "exact": true,
                "component": require('../details/grade/round/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/score",
                "exact": true,
                "component": require('../details/grade/score/index.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "path": "/details/grade/score/rank",
                "exact": true,
                "component": require('../details/grade/score/rank.js').default,
                "_title": "imatch",
                "_title_default": "imatch"
              },
              {
                "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
                "_title": "imatch",
                "_title_default": "imatch"
              }
            ],
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details/join",
            "exact": true,
            "component": require('../details/join/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details/news",
            "exact": true,
            "component": require('../details/news.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details/team",
            "exact": true,
            "component": require('../details/team.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "path": "/details",
            "exact": true,
            "component": require('../details/index.js').default,
            "_title": "imatch",
            "_title_default": "imatch"
          },
          {
            "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
            "_title": "imatch",
            "_title_default": "imatch"
          }
        ],
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/mall",
        "exact": true,
        "component": require('../mall/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/add",
        "exact": true,
        "component": require('../add/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/join",
        "exact": true,
        "component": require('../join/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/news",
        "exact": true,
        "component": require('../news/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/live",
        "exact": true,
        "component": require('../live/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/sponsor",
        "exact": true,
        "component": require('../sponsor/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/community",
        "exact": true,
        "component": require('../community/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/user/forget",
        "exact": true,
        "component": require('../user/forget.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/user/info",
        "exact": true,
        "component": require('../user/info.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/user/login",
        "exact": true,
        "component": require('../user/login.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/user/register",
        "exact": true,
        "component": require('../user/register.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/bridge",
        "exact": true,
        "component": require('../bridge/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/vip",
        "exact": true,
        "component": require('../vip/index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "imatch",
        "_title_default": "imatch"
      },
      {
        "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "imatch",
        "_title_default": "imatch"
      }
    ],
    "_title": "imatch",
    "_title_default": "imatch"
  },
  {
    "component": () => React.createElement(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "imatch",
    "_title_default": "imatch"
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
