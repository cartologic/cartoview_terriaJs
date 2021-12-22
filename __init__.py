import os
APP_NAME = os.path.basename(os.path.dirname(__file__))
__version__ = '2.0.0'
urls_dict = {
    'admin': {'%s.new' % APP_NAME: 'Create new'},
}
