

所有对对外的 api, 有且仅有这几个.

controllers.controllers.JsonApi


http.route('/json/api',type='json', auth='user',cors='*',csrf=False)
1. 需要提供 session_id, 才可以访问
2. 参数: (model,method, args,kwargs)
3. search_read2, read2 方法, 支持对 m2o, o2m 字段的级联读取
4. 示例: read(id, fields=[name,[title,[name]], [category_id,[name]] ])

http.route('/json/user/login',type='json', auth='none', cors='*', csrf=False )
1. 参数: (db,login,password)
2. 登录成功后, odoo 生成 session 并存储, 返回 session_id
3. 应读取 userinfo 并一同返回

http.route('/json/user/register',type='json', auth='none', cors='*', csrf=False )
1. 参数: (db,login,password)
2. 创建新用户
3. 应读取 userinfo 并一同返回
4. 应该与短信验证码功能协同工作


http.route('/json/user/reset/password',type='json', auth='none', cors='*', csrf=False )
1. 参数: (db,login,password)
2. 重置密码
3. 应该与短信验证码功能协同工作

---

models/user
register
change_password
reset_new_password
