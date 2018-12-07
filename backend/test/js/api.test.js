//import boardApi from '../src/odoo/boardApi';
import odooService from '../src/odoo/odooService';
import odooApi from '../src/odoo/odooApi';


describe('odoo-api', () => {
  it('all ok', (done) => {
    test_bid(done);
  });
});

const test_bid = async (done) => {
  const res = await odooService.login({login:'admin', password: '123', type:'account' } )
  const {result: {sid} } = res
  console.log(sid)

  const api = odooApi({model:'og.board'})
  const res1 = await api.read( sid, { id:1 })
  console.log(res1)

  const player = res1.result[0].player
  const res10 = await api.get_random_call( sid, { id:1 })
  console.log(res10)

  const call = res10.result

  const res2 = await api.bid(sid, {id:1, player, call} )
  console.log(res2)

  const res3 = await api.read( sid, { id:1 })
  console.log(res3)

  done()
}

const test_all2 = async (done) => {
  const res = await odooService.login({login:'admin', password: '123', type:'account' } )
  const {result: {sid} } = res
  console.log(sid)

  const api = boardApi({model: 'og.board'})
  const res1 = await api.read( sid, { id:1 })
  console.log(res1)

  done()

}

const test_longpolling = async (done) => {
  const res = await odooService.login({login:'admin', password: '123', type:'account' } )
  const {result: {sid} } = res
  console.log(sid)

  const res1 = await odooService.longpolling(sid,{channels:[], last:0})
  console.log(res1)

  done()

}
