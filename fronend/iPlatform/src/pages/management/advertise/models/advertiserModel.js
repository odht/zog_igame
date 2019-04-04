
import { queryItems } from '@/services/api';

export default {
  namespace: 'advertiser',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch( {payload}, { call, put }) {
      const response = yield call(queryItems,{method:'mapData', target:'advertiser'});
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({payload},{call,put}) {
        const response = yield call(queryItems,{...payload, method:'search', target:'advertiser'});
        console.log('------ response ------',response);
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *delete({payload},{call,put}) {
        const response = yield call(queryItems,{...payload, method:'delete', target:'advertiser'});
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *add({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload, method:'add', target:'advertiser'});
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *edit({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload, method:'edit', target:'advertiser'});
      yield put({
          type: 'save',
          payload: response,
      });
    }

  },
  reducers: {
    save(state, {payload}) {
      console.log('----- advertiser ----',payload);
      return {
        ...state,
        list: payload
      };
    },
  },
};
