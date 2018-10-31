# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging
_logger = logging.getLogger(__name__)

from odoo import http
#from odoo.http import request

from odoo.addons.bus.controllers.main import BusController

class Message(BusController):

    @http.route('/longpolling/poll111', type="json", auth="public")
    def poll2(self, channels, last, options=None):
        ret = self.poll(channels, last, options)
        #print(type(ret), ret )
        return ret


