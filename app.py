from flask import Flask, render_template, request
import json

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/", methods=["GET", "POST"])
def home():
	config = None

	if request.method == "POST":
		data = request.form.items()
		config = []

		for items in zip(*[iter(data)] * 2):
			infos = []
			for item in items:
				infos.append(item[1])
			config.append(infos)

	with open("config/prestations.json", "r") as f:
		data = json.load(f)

		if config != None:
			if len(config) == 0:
				print("No config")
			else:
				print(config)
		return render_template("pages/home.html", quotes=data)

@app.errorhandler(404)
def page_not_found(error):
	return render_template("pages/404.html"), 404

if __name__ == "__main__":
	app.run(debug=True, port=80)