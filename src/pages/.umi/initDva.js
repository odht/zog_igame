import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'contact', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/contact.js').default) });
app.model({ namespace: 'board', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/board.js').default) });
app.model({ namespace: 'deal', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/deal.js').default) });
app.model({ namespace: 'game', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/game.js').default) });
app.model({ namespace: 'gameGroup', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/gameGroup.js').default) });
app.model({ namespace: 'gameRound', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/gameRound.js').default) });
app.model({ namespace: 'gameTeam', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/gameTeam.js').default) });
app.model({ namespace: 'gameTeamPlayer', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/gameTeamPlayer.js').default) });
app.model({ namespace: 'gameTeamRoundInfo', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/gameTeamRoundInfo.js').default) });
app.model({ namespace: 'match', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/match.js').default) });
app.model({ namespace: 'matchLine', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/matchLine.js').default) });
app.model({ namespace: 'matchTeam', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/matchTeam.js').default) });
app.model({ namespace: 'table', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/table.js').default) });
app.model({ namespace: 'tablePlayer', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/tablePlayer.js').default) });
app.model({ namespace: 'user', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/igame/user.js').default) });
app.model({ namespace: 'odooData', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/odooData.js').default) });
app.model({ namespace: 'odooLogin', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/models/odooLogin.js').default) });
app.model({ namespace: 'games', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/pages/management/match/models/games.js').default) });
app.model({ namespace: 'match', ...(require('C:/Users/Borong/zog_igame-f_liushiyuan/fronend/imatch/src/pages/management/sponsor/models/match.js').default) });
