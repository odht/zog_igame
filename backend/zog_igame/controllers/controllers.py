# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging
_logger = logging.getLogger(__name__)

from odoo import http
from odoo.http import request
from odoo import SUPERUSER_ID, registry, api


from odoo.addons.bus.controllers.main import BusController

class Message(BusController):

    #@http.route('/longpolling/igame', type="json", auth="user")
    @http.route('/longpolling/igame',type='json',auth='user',cors='*',csrf=False)
    def poll2(self, channels, last, options=None):
        return self.poll(channels, last, options)