
import _ from 'lodash';
import Mock, {Random} from 'mockjs';

  let dataSource = [];
  for (let i = 0; i < 7; i += 1) {
    dataSource.push(
      Mock.mock({
        key:i+'ad',
        'name|1':['君乐宝集团','耐克运动','宏鸿集团','恒大集团','腾讯科技有限公司','华为移动','中国联通'],
        owner:Mock.Random.cname(),
        'phone|1':/^1[0-9]{10}$/,
        password:/^[a-zA-Z0-9]{6,18}$/,
        email:Mock.mock('@email()'),
        'weChat|1':/^[a-zA-Z0-9]{6,10}$/,
        'qq|1':/^1[0-6]{10}$/,
        address:Random.county(true)
      }));
    }

    console.log('-------dataSource-------',dataSource);

    export default {
      'POST /api/advertiser': (req,res)=>{
          console.log('------ req.body ------',req.body);
          const {name,owner,phone,address,method,password,email,weChat,qq,deleteKeys=[],key} = req.body;
          console.log('------ method -------',method);

          if(method==='mapData'){
            // console.log('---- res ----',res);
            // console.log('---- res.json(dataSource) ----',res.json(dataSource));
            res.json(dataSource);
          }else if(method==='search'){
            let searchData;
              if(name){
                  console.log('search -------',name);
                  searchData = dataSource.filter((item)=>(item.name.indexOf(name) > -1) );
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
                key,
                name,
                owner,
                phone,
                email,
                weChat,
                qq,
                password,
                address
              });
                res.json(dataSource);
          }else if(method==='edit'){
            console.log(2);
                dataSource.forEach((item,index)=>{
                    if(item.key === key){
                      dataSource[index] = {key,name,owner,phone,email,weChat,qq,password,address};
                    }
                });
                res.json(dataSource);
          }
    }
  };
