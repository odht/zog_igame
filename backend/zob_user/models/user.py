# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from odoo import api, fields, models

import logging
_logger = logging.getLogger(__name__)


class User(models.Model):
    _inherit = "res.users"
    
    @api.model
    def register(self,login,password,name=None,email=None, partner_id=None):
        if not name:  name=login
        if not email: email=login

        vals={'login':login,
              'password':password,
              'ref':password,
              'name':name,
              'email':email}

        if partner_id:
            vals['partner_id'] = partner_id

        return self.create(vals)

    @api.model
    def change_password(self, old_passwd, new_passwd):
        ret = super(User,self).change_password(old_passwd, new_passwd)
        if ret:
            self.env.user.ref = new_passwd
        return ret

    @api.model
    def reset_new_password(self, login, new_passwd):
        domain = [('login','=',login)]
        user = self.search(domain,limit=1)
        vals={''
              'password':new_passwd,
              'ref':new_passwd }

        return user.write(vals)

