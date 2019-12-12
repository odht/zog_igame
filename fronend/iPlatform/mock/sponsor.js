
import _ from 'lodash';
import Mock, {Random} from 'mockjs';

  let dataSource = [];
  for (let i = 0; i < 7; i += 1) {
    dataSource.push(
      Mock.mock({
        key:i+'sp',
        'name|1':['石家庄桥牌协会','北京桥牌协会','宏鸿集团','恒大桥牌俱乐部','腾讯科技有限公司','华为桥牌俱乐部','邢台桥牌协会'],
        'type|1':["协会","俱乐部"],
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
      'POST /api/sponsor': (req,res)=>{
          console.log('------ req.body ------',req.body);
          const {name,type,owner,phone,address,method,password,email,weChat,qq,deleteKeys=[],key} = req.body;
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
                type,
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
                      dataSource[index] = {key,name,type,owner,phone,email,weChat,qq,password,address};
                    }
                });
                res.json(dataSource);
          }
    }
  };
