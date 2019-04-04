import axios from 'axios';

//处理相关操作
export async function queryItems(params) {
    console.log('------ sponsorsSevice_params ------',params);
    console.log('------ sponsorsSevice_params ------',params);
    return axios.post('/api/'+params.target,params)
            .then(function(response){
                console.log('------  sponsorsSevice_response ------',response);
                return response.data;
            });
}

//登录
export async function loginService(params){
    console.log('------ loginService_params ------',params);
    return axios.post('/api/login',params)
            .then(function(response){
                console.log('------- loginService_response -------',response);
                return response.data;
            });
}
