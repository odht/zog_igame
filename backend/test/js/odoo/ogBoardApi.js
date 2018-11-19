import baseApi from './baseApi';
import service from './odooService/'
const { odooCall } = service

const model = 'og.board'

const apiCreator = (options) => {
  const api = baseApi({ ...options, model })

  const bid = async (token, params) => {
    const {id,player,call} = params
    const method = 'bid'
    const args = [id,player,call]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  const get_random_call = async (token, params) => {
    const {id} = params
    const method = 'get_random_call'
    const args = [id]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  return { ...api, bid, get_random_call  };

};


export default ( options ) => {

  const myapi = apiCreator(options);
  return { ...myapi  };
};


