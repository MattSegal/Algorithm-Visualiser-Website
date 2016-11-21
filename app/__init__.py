from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def visual_sort():
    return render_template('visual_sort.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
