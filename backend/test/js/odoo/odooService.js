import request from './request';

const jsonrpc = params => {
  return {
    method: 'POST',
    body: {
      jsonrpc: 2.0,
      id: 1,
      method: 'call',
      params: params,
    },
  };
};


//const HOST = 'http://192.168.0.110:8069'
const HOST = 'http://192.168.56.105:8069'

const login = async params => {
    const url = HOST + '/json/user/login'
    const db = 'TT'
    const res = await request(url, jsonrpc({ ...params, db }));
    return res
};

const _call = async (token, url0, params) => {
    // TBD to check token is true
    const now = Date.now();
    const url = `${url0}?session_id=${token}&_now=${now}`;
    return await request(url, jsonrpc(params));
};


const longpolling = async (token, params) => {
    const url = HOST + '/longpolling/igame'
    return _call(token, url, params)
};

const call = async (token, params) =>{
    const url = HOST + '/json/api'
    return _call(token, url, params)
}

const odooCall = call

export default {
  login,
  call,
  odooCall,
  longpolling
};



