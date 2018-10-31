// import { queryMatches } from '@/services/o';

export default {
  namespace: 'match',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call('');console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({payload},{call,put}) {
        const response = yield call('',{...payload,method:'search'});
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *delete({payload},{call,put}) {
        const response = yield call('',{...payload,method:'delete'});
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *add({payload},{call,put}) {  console.log(payload)
      const response = yield call('',{...payload,method:'add'});
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *edit({payload},{call,put}) {  console.log(payload)
    //   const response = yield call(queryMatches,{...payload,method:'edit'});
      yield put({
          type: 'save',
        //   payload: response,
      });
    }
    
  },
  reducers: {
    save(state, {payload}) { 
      return {
        ...state,
        list: payload,
      };
    },
  },
};
