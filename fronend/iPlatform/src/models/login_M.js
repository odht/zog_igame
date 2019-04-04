import {loginService} from '@/services/api';
import {routerRedux} from 'dva/router';



export default{

    namespace:"login_m",
    
    state:{
       visible:false,
       inOutState:false
    },

    effects:{
        *login({payload},{call,put}){
            console.log('effects:payload:  -----',payload);
            let loginData = yield call(loginService,{...payload,method:'accountLogin'});
            console.log('loginData：',loginData);
            if (loginData.success === true) {
              yield put(
                routerRedux.push({
                  pathname:'/management'
                })
              )
              yield put({
                type:'save',
                payload:payload
              })
            } else {
              console.log('===== ShowModal =====');
              yield put({type:'showModal'});
            }
        },
        *logout({payload},{call,put}){
          console.log('--------logout -----',payload);
            yield put(
              routerRedux.push({
                pathname:'/login'
              })
            )
            yield put({
              type:'logouts',
              payload
            })
        }
    },

    reducers:{
          save(state,{payload}){
            console.log('login-M----payload save ------',payload);
            localStorage.setItem('inOutState', true);
            return {
              ...state,
              inOutState:true,
            }
          },
          logouts(state,{payload}){
            console.log('login-M----logout-payload------',payload);
            localStorage.setItem('inOutState', false);
            const{inOutState} = payload;
              return {
                ...state,
                inOutState:inOutState
              }
          },
          showModal(state) {
            console.log('------- loginModel/showModal -------');
            console.log('-=-=-=-', { ...state });
            return { ...state, visible: true }
          },
          handleOk(state) {
            console.log('------- loginModel/handleOk -------');
            return { ...state, visible: false }
          },
          handleCancel(state) {
            console.log('------- loginModel/handleCancel -------');
            return { ...state, visible: false }
          }
    }
}