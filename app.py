from flask import Flask, render_template

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def hello():
	return render_template('pages/home.html')

@app.errorhandler(404)
def page_not_found(error):
	return render_template("pages/404.html"), 404

if __name__ == "__main__":
	app.run(debug=True, port=80)