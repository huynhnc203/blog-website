import logging
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from functools import wraps
def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500, value={"error": str(e)})
    return wrapper