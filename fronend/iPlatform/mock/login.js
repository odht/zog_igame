import Mock from 'mockjs';

var loginTemplate = {

  'loginUsers': [
    {
      name: 'qqq',
      pwd: '111'
    },
    {
      name: 'www',
      pwd: '222'
    }
  ]
}

var loginData = Mock.mock(loginTemplate);

export default {
    'POST /api/login': (req,res)=>{
         console.log('------ req.body ------',req.body);
         const {name,pwd,method} = req.body;
        if(method==='accountLogin'){
            console.log('===========req==',loginData,req.body);
            console.log('loginTemplate-----',loginTemplate);
            console.log('loginData-----',loginData);
        
            const userArr = loginData.loginUsers.filter(
              item => (
                item.name === req.body.name && item.pwd === req.body.pwd
              )
            )
            console.log('--- userArr ---',userArr);
            if (userArr.length ===1) {
              console.log('验证通过');
              res.send({success:true});
            } else {
              console.log('验证失败');
              res.send({success:false});
            }
         }
      
        // res.json(dataSource);
  }
}
