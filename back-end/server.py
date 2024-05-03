"""
Module Docstring: Entry point for running the server.
"""

from blog_api import app

if __name__ == "__main__":
    app.run(debug=True)
