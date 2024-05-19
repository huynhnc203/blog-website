from flask import Blueprint, render_template, send_from_directory, current_app as app
import os

main_page_bp = Blueprint("main_page", __name__)

@main_page_bp.route("/", defaults={"path": ""})
@main_page_bp.route("/<path:path>")
def main_page(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return render_template('index.html')
