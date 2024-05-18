from setuptools import setup

setup(
    name='mycli',
    version='0.1',
    py_modules=['my_cli'],
    install_requires=[
        'Click',
    ],
    entry_points='''
        [console_scripts]
        mycli=my_cli:cli
    ''',
)
