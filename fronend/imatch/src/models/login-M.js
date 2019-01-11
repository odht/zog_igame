import {loginService} from '@/services/api';
import {routerRedux} from 'dva/router';
import logOut from '@/assets/logOut.png';


export default {
    
    namespace:"login_m",
    state:{
      modalVisible:false,
      avatar:logOut,
      inOutState:false,
      userInfo:{ }
    },

    effects:{
        *login({payload},{call,put}){
            console.log('effects:payload:  -----',payload);
            let loginData = yield call(loginService,{...payload,method:'accountLogin'});
            console.log('--------loginData：',loginData);
            if (loginData.success === true) {
              yield put({
                type:'save',
                payload:loginData
              }),
              yield put(
                routerRedux.push({
                  pathname:'../home'
                })
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
          console.log('login-M----payload------',payload.userData[0].avatar);
            return {
              ...state,
              avatar:payload.userData[0].userInfo.avatar,
              inOutState:true,
              userInfo:payload.userData[0].userInfo
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