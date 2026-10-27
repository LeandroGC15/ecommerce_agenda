# -*- coding: utf-8 -*-
from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    ecommerce_store_name = fields.Char(
        string="Nombre de la Tienda",
        config_parameter='ecommerce.store_name',
        default="Mi Tienda",
        help="Nombre público que aparecerá en el encabezado de la tienda web."
    )
    ecommerce_whatsapp_number = fields.Char(
        string="Número de WhatsApp / Pedidos",
        config_parameter='ecommerce.whatsapp_number',
        help="Número de teléfono internacional para recibir pedidos por WhatsApp (ej: 584121234567)."
    )
    ecommerce_instagram_handle = fields.Char(
        string="Cuenta de Instagram",
        config_parameter='ecommerce.instagram_handle',
        help="Nombre de usuario en Instagram (ej: @mitienda)."
    )
    ecommerce_location = fields.Char(
        string="Ubicación / Ciudad",
        config_parameter='ecommerce.location',
        help="Ciudad o dirección visible en la tienda web."
    )
    ecommerce_delivery_info = fields.Char(
        string="Información de Entrega",
        config_parameter='ecommerce.delivery_info',
        help="Detalles de envíos, retiros y delivery visibles en la tienda."
    )
