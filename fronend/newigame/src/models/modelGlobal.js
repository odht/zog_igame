
export default {
  namespace: 'global',
  state: {
    loading: true
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    loading(state, { payload }) {
      return { ...state, payload }
    }
  },
};

