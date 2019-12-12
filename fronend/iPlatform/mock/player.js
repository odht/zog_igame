
import _ from 'lodash';
import Mock, {Random} from 'mockjs';

  let dataSource = [];
  for (let i = 0; i < 7; i += 1) {
    dataSource.push(
      Mock.mock({
        key:i+'pl',
        'nickName|1':Mock.Random.name(),
        'realName|1':Mock.Random.cname(),
        'gender|1':["男","女"],
        'phoneNo|1':/^1[0-9]{10}$/,
        email:Random.email('.com'),
        'weChat|1':/^[a-zA-Z0-9]{6,10}$/,
        'qq|1':/^1[0-6]{10}$/,
        password:/^[a-zA-Z0-9]{6,18}$/,
        address:Mock.mock('@county(true)')
      }));
    }

    console.log('-------dataSource-------',dataSource);

    export default {
      'POST /api/player': (req,res)=>{
          console.log('------ req.body ------',req.body);
          const {key,nickName,realName,gender,phoneNo,email,weChat,qq,password,address,method,deleteKeys=[]} = req.body;
          console.log('------ method -------',method);

          if(method==='mapData'){
            // console.log('---- res ----',res);
            // console.log('---- res.json(dataSource) ----',res.json(dataSource));
            res.json(dataSource);
          }else if(method==='search'){
            let searchData;
              if(realName){
                  console.log('search -------',realName);
                  searchData = dataSource.filter((item)=>(item.realName.indexOf(realName) > -1) );
                  console.log('search_status ------',searchData);
                  if(searchData){
                    res.send(searchData);
                  }
              }
          }else if(method==='delete'){
            console.log(2);
              if(deleteKeys){
                _.remove(dataSource, function(item) {
                  return deleteKeys.indexOf(item.key) > -1;
                });
              }
              res.json(dataSource);
          }else if(method==='add'){
            console.log('add');
                dataSource.unshift({
                nickName,
                realName,
                key,
                gender,
                phoneNo,
                email,
                qq,
                weChat,
                password,
                address
              });
                res.json(dataSource);
          }else if(method==='edit'){
            console.log('edit');
                dataSource.forEach((item, index)=>{

                    if(item.key === key){
                      dataSource[index] = {
                        key,
                        nickName,
                        realName,
                        gender,
                        phoneNo,
                        email,
                        qq,
                        weChat,
                        password,
                        address
                      };
                    }
                });
                res.json(dataSource);
          }
    }
  };
