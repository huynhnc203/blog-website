from blog_api import app as application
from tornado.wsgi import WSGIContainer
from tornado.httpserver import  HTTPServer
from tornado.ioloop import IOLoop

http_server = HTTPServer(WSGIContainer(application))
http_server.listen(8000)
IOLoop.instance().start()