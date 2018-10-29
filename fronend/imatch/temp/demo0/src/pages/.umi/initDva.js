import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'board', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/board.js').default) });
app.model({ namespace: 'contact', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/contact.js').default) });
app.model({ namespace: 'deal', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/deal.js').default) });
app.model({ namespace: 'game', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/game.js').default) });
app.model({ namespace: 'gameGroup', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/gameGroup.js').default) });
app.model({ namespace: 'gameRound', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/gameRound.js').default) });
app.model({ namespace: 'gameTeam', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/gameTeam.js').default) });
app.model({ namespace: 'gameTeamPlayer', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/gameTeamPlayer.js').default) });
app.model({ namespace: 'gameTeamRoundInfo', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/gameTeamRoundInfo.js').default) });
app.model({ namespace: 'match', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/match.js').default) });
app.model({ namespace: 'matchLine', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/matchLine.js').default) });
app.model({ namespace: 'matchTeam', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/matchTeam.js').default) });
app.model({ namespace: 'odooData', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/odooData.js').default) });
app.model({ namespace: 'odooLogin', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/odooLogin.js').default) });
app.model({ namespace: 'table', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/table.js').default) });
app.model({ namespace: 'tablePlayer', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/tablePlayer.js').default) });
app.model({ namespace: 'user', ...(require('/home/wo/work/PROJECT/umi(6)/dva-odoo/examples/demo0/src/models/user.js').default) });
