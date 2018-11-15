
import service from './odooService/'

const { odooCall } = service

const apiCreator = (options) => {
  const { model, fields:{default: default_fields=['name'] }} = options

  const search = async (token, params) => {
    const {domain} = params
    const method = 'search'
    const args = [domain]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  const search_read = async (token, params) => {
    const {domain, fields = default_fields} = params
    const method = 'search_read'
    const args = [domain, fields]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  const read = async (token, params) => {
    const {id, fields = default_fields} = params
    const method = 'read';
    const args = [id, fields]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  const write = async (token, params) => {
    const {id, vals} = params
    const method = 'write';
    const args = [id, vals]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  const create = async (token, params) => {
    const { vals} = params
    const method = 'create'
    const args = [vals]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };


  const unlink = async (token, params) => {
    const { id } = params
    const method = 'unlink'
    const args = [id]
    const response = await odooCall(token, { model, method, args, kwargs: {} })
    const { result, error } = response;
    return { result, error };
  };

  return { search,search_read, read, write, create, unlink };
};


export default (options) => {
  const api = apiCreator(options);
  return { ...api  };
};


