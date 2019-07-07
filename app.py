from flask import Flask, render_template, request, Response, jsonify
import os
import pandas as pd
import s3fs

app = Flask(__name__)

############################
#            Flask App Routes         #
############################


#########################################
#                         Names API                             #
#               returns data in the form                  #
#          {'M': {'year': [], 'count': []},
#           'F': {'year': [], 'count': []}}                 #
#########################################
#####################################
#                         Home Page                      #
#####################################
# Home Page
@app.route("/")
def index():
    return render_template("index.html")
#####################################
#                        About Page                       #
#####################################
@app.route("/about.html")
def about():
    return render_template("about.html")


class Grapher:
    def __init__(self):
        self.names = pd.read_csv(
            "Resources/namedf.csv")[["name", "gender", "count", "year"]]
        #self.frames = pd.read_csv("s3://nametrender/nameByState2.csv",
        #                          index_col=['name', 'state'])

    def choroplethMap(self, name):
        # read in csv
        self.name = name.title()
        frames = self.frames.loc[f"{self.name}"]
        # filter based on name provided
        return frames.to_csv()

    def graph(self, name):
        # Format the name
        self.name = name.title()
        # Make a json response for Male and Female with the provided name
        jsond = {}
        for gender in ['M', 'F']:
            namedf = self.names[(self.names["name"] == f"{self.name}") & (self.names["gender"] == f"{gender}")][[
                "year", "count"]].reset_index().drop('index', axis=1)
            namedict = namedf.to_dict(orient='list')
            if gender == 'F':
                jsond["Female"] = namedict
            else:
                jsond["Male"] = namedict
        return jsonify(jsond)


grapher = Grapher()
app.add_url_rule("/names/<name>", "",
                 lambda name: grapher.graph(name), methods=["GET"])
#app.add_url_rule("/names/map/<name>", " ",
#                 lambda name: grapher.choroplethMap(name),  methods=["GET"])


if __name__ == "__main__":
    app.run(debug=False)
