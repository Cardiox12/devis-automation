from flask import Flask, render_template, request
from pprint import pprint
import json

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/", methods=["GET", "POST"])
def home():
	services = None

	if request.method == "POST":
		data = request.form.items()
		services = []

		for items in zip(*[iter(data)] * 3):
			infos = []
			for item in items:
				infos.append(item[1])
			services.append(infos)

	with open("config/prestations.json", "r") as f:
		data = json.load(f)

		if services != None:
			if len(services) != 0:
				export = []

				for service in services:
					export.append({
						"name" : service[1],
						"price" : service[0],
						"description" : service[2]
					})

				with open("config/export.json", "w") as outfile:
					json.dump({"services" : export}, outfile, indent=4, ensure_ascii=False)

		return render_template("pages/home.html", quotes=data)

@app.errorhandler(404)
def page_not_found(error):
	return render_template("pages/404.html"), 404

if __name__ == "__main__":
	app.run(debug=True, port=80)