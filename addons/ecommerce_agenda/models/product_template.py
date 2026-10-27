# -*- coding: utf-8 -*-
from odoo import models, fields, api


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    ecommerce_category_ids = fields.Many2many(
        'ecommerce.category',
        'product_ecommerce_category_rel',
        'product_id',
        'category_id',
        string='Categorías en Tienda',
    )

    ecommerce_category_id = fields.Many2one(
        'ecommerce.category',
        string='Categoría Principal',
        compute='_compute_ecommerce_category_id',
        inverse='_inverse_ecommerce_category_id',
        store=True,
    )

    @api.depends('ecommerce_category_ids')
    def _compute_ecommerce_category_id(self):
        for rec in self:
            rec.ecommerce_category_id = rec.ecommerce_category_ids[0] if rec.ecommerce_category_ids else False

    def _inverse_ecommerce_category_id(self):
        for rec in self:
            if rec.ecommerce_category_id and rec.ecommerce_category_id not in rec.ecommerce_category_ids:
                rec.ecommerce_category_ids = [(4, rec.ecommerce_category_id.id)]

    ecommerce_subtitle = fields.Char(string='Subtítulo / Destacado corto')
    ecommerce_featured = fields.Boolean(string='Destacado en tienda', default=False)

    ecommerce_price_bcv = fields.Float(
        string='Precio BCV',
        digits='Product Price',
        help='Precio del producto según la tasa oficial BCV.'
    )

    ecommerce_profit = fields.Float(
        string='Ganancia',
        compute='_compute_ecommerce_profit',
        store=True,
        digits='Product Price',
        help='Ganancia calculada (Precio de Venta - Costo).'
    )

    @api.depends('list_price', 'standard_price')
    def _compute_ecommerce_profit(self):
        for rec in self:
            rec.ecommerce_profit = (rec.list_price or 0.0) - (rec.standard_price or 0.0)

    ecommerce_compare_at_price = fields.Float(
        string='Precio Anterior',
        digits='Product Price',
        help='Precio original tachado para ofertas y promociones.'
    )

    ecommerce_discount_percentage = fields.Float(
        string='% de Descuento',
        compute='_compute_ecommerce_discount',
        store=True,
        readonly=False,
        digits=(5, 0),
        help='Porcentaje de descuento mostrado en la tarjeta web (ej: 15).'
    )

    @api.depends('list_price', 'ecommerce_compare_at_price')
    def _compute_ecommerce_discount(self):
        for rec in self:
            if rec.ecommerce_compare_at_price and rec.ecommerce_compare_at_price > rec.list_price and rec.ecommerce_compare_at_price > 0:
                diff = rec.ecommerce_compare_at_price - rec.list_price
                rec.ecommerce_discount_percentage = round((diff / rec.ecommerce_compare_at_price) * 100.0, 0)
            elif not rec.ecommerce_discount_percentage:
                rec.ecommerce_discount_percentage = 0.0
