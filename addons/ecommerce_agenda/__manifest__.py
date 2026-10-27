{
    'name': 'E-Commerce Agenda',
    'version': '1.0',
    'category': 'Website',
    'summary': 'Tienda web pública interactiva con checkout directo por WhatsApp',
    'description': 'Plataforma de comercio electrónico desacoplada y rápida construida sobre OWL y Odoo 19.',
    'depends': ['base', 'product', 'sale', 'stock'],
    'data': [
        'security/ir.model.access.csv',
        'views/ecommerce_category_views.xml',
        'views/product_template_views.xml',
        'views/res_config_settings_views.xml',
    ],
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
