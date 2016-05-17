from flask import Flask, Blueprint, render_template

visual_algo = Blueprint('visual_algo', __name__,
			template_folder='templates', 
			static_folder='static', static_url_path = '/visual_algo/static')

@visual_algo.route('/sort/')
def visual_sort():
    return render_template('visual_sort.html')

if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(visual_algo)
    app.run(host= '0.0.0.0',debug=True)
