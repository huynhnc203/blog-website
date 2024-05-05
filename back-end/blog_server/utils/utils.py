from functools import wraps
from blog_server.utils.responses import response_with
import blog_server.utils.responses as resp
import logging

def handle_exceptions(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        """Handle exceptions."""
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500, value={"error": str(e)})
    return decorated