
import { queryItems } from '@/services/api';

export default {
  namespace: 'player',

  state: {
    dataList: [],
  },

  effects: {
    *fetch( {payload}, { call, put }) {
      const response = yield call(queryItems,{method:'mapData', target:'player'});
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({payload},{call,put}) {
        const response = yield call(queryItems,{...payload, method:'search', target:'player'});
        console.log('------ response ------',response);
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *delete({payload},{call,put}) {
        const response = yield call(queryItems,{...payload,method:'delete', target:'player'});
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *add({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload,method:'add', target:'player'});
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *edit({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload,method:'edit', target:'player'});
      yield put({
          type: 'save',
          payload: response,
      });
    }

  },
  reducers: {
    save(state, {payload}) {
      console.log('------ save ------',payload);
      return {
        ...state,
        dataList: payload
      };
    },
  },
};
