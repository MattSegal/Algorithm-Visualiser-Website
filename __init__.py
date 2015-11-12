from flask import Blueprint, render_template

visual_algo_app = Blueprint('visual_algo_app', __name__,
			template_folder='templates', 
			static_folder='static', static_url_path = '/visual_algo_app')

@visual_algo_app.route('/sort/')
def  sort():
    return render_template('index.html')