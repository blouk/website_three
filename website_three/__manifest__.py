{
    'name': 'Website Three',
    'description': 'Three JS Example',
    'category': 'Website/Theme',
    'version': '16.0.1',
    'author': 'nwi@odoo.com',
    'license': 'OEEL-1',
    'depends': [
        'website',
    ],
    'data': [
        'data/pages/homepage.xml',

    ],
    'assets': {
        'web.assets_frontend': [
            'website_three/static/src/**/*',
        ],
    },

}
