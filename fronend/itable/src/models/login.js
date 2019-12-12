import odoo from '@/odoo'
import router from 'umi/router';
export default {
    namespace: 'login',
    state: {
        sid: localStorage.getItem('sid'),
        managener: false,
        user: {},
    },
    effects: {
        *login({ payload }, { put }) {
            const { sid } = payload;
            if (sid) {
                yield put({
                    type: 'loginSid',
                    payload: { sid: sid }
                })
            } else {
                const isNew = yield odoo.verify();
                if (!isNew) {
                    yield put({
                        type: 'logout',
                    })
                    router.push('/login')
                }
            }
        }
    },
    reducers: {
        loginSid(state, { payload }) {
            let { sid } = payload;
            if (!sid) {
                sid = null;
                localStorage.removeItem('sid')
            }
            return { ...state, sid: sid }
        },
        logout(state, { payload }) {
            window.localStorage.clear()
            return { ...state, sid: null }
        }
    }
}