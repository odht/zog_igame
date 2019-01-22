import {loginService} from '@/services/api';
// import {routerRedux} from 'dva/router';
import logOut from '@/assets/logOut.png';
import odoo from '@/odoo-rpc/odoo';
import router from 'umi/router';


export default {
    
    namespace:"login_m",
    state:{
      modalVisible:false,
      // avatar:logOut,
      inOutState:false,
      userInfo:{ }
    },

    effects:{
      *login ({payload}, {call, put}) {
        const session_id = yield odoo.login(payload);
        console.log('----- login-payload -----',payload, session_id);
        
        if (session_id) {
          const me = yield odoo.me({ id: null, partner_id: { id: null, name: null } });
          const { partner_id: { id: partner_id }, id } = yield me.look({ id: null, partner_id: { id: null, name: null } });
          yield put({
            type:'save',
            payload:session_id
          }),
          yield put(
            localStorage.setItem('uid', id),
            localStorage.setItem('sid', session_id),
            localStorage.setItem('patId', partner_id),
            router.push('/')
          )
        } else {
          console.log('===== ShowModal =====');
          yield put({type:'showModal'});
        }
      },
        *logout({payload},{call,put}){
          console.log('--------logout -----',payload);
            yield put({
              type:'logouts',
              payload
            })
        }
    },

    reducers:{
        logouts(state,{payload}){
          console.log('login-M----logout-payload------',payload);
          const{inOutState} = payload;
            return {
              ...state,
              avatar:logOut,
              inOutState:inOutState
            }
        },
        save(state,{payload}){
          console.log('login-M----payload save ------',payload);
            return {
              ...state,
              // avatar:payload.userData[0].userInfo.avatar,
              inOutState:true,
              // userInfo:payload.userData[0].userInfo
            }
        },
        showModal(state) {
            console.log('------- loginModel/showModal -------');
      
            console.log('-=-=-=-', { ...state });
            return { ...state, modalVisible: true }
          },
          handleOk(state) {
            console.log('------- loginModel/handleOk -------');
            return { ...state, modalVisible: false }
          },
          handleCancel(state) {
            console.log('------- loginModel/handleCancel -------');
            return { ...state, modalVisible: false }
          }
    }


}