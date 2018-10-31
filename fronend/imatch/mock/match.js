
import _ from 'lodash';
  let dataSource = [];
  for (let i = 0; i < 50; i += 1) {
    dataSource.push({
      key: i+'a',
      name: `比赛${i+1}`,
      expiration:new Date(`2018-09-${Math.floor(i / 2) + 1}`),
      start: new Date(`2018-10-${Math.floor(i / 2) + 1}`),
      status: Math.random() >0.5 ? '1' : '0',
    });
  }
export default {
    'POST /api/match': (req,res)=>{
         console.log(req.body)
         const {name,status,method,deleteKeys=[],start,expiration,key} = req.body;
         if(method==='search'){
           let searchData;
             if(name){ console.log('qq',name)
                searchData = dataSource.filter( (item)=>(item.name.indexOf(name) > -1) )
                if(status){
                  searchData = searchData.filter( (item)=>(item.status === status ) ) ; 
                }
              res.json(searchData)
              return;
             }
             if(status){
                 searchData = dataSource.filter( (item)=>(item.status === status ) ) ; 
             }
             res.json(searchData)
             return;
         }
         if(method==='delete'){
           console.log(2)
              if(deleteKeys){ 
                _.remove(dataSource, function(item) {
                  return deleteKeys.indexOf(item.key) > -1;
                });
              }
              res.json(dataSource)
              return;
          }
          if(method==='add'){
            console.log(2)
               dataSource.unshift({
                key: new Date().getTime(),
                name,
                status,
                start,
                expiration
               })
               res.json(dataSource)
               return;
           }
           if(method==='edit'){
            console.log(2)
               dataSource.forEach((item,index)=>{
                    if(item.key === key){
                      dataSource[index] = {key,name,expiration,start,status}
                    }
               })
               res.json(dataSource)
               return;
           }
         res.json(dataSource)
    }
}