from flask import Flask, render_template, request, Response, jsonify
import os
import pandas as pd
import matplotlib.pyplot as plt
from namesdictionary import pregraphedMales, pregraphedFemales


app = Flask(__name__)

names = pd.read_csv("Resources/namedf.csv")[["name","gender","count","year"]]


#####################################
#          Flask App Routes         #
#####################################

@app.route("/names/<name>", methods=["GET"])
def graph(name):
    names = pd.read_csv("Resources/namedf.csv")[["name","gender","count","year"]]
    # Format the name
    name = name.title()
    # Make a plot for Male and Female
    jsond = {}
    print(f"this is the name: {name}")
    for gender in ['M','F']:
        namedf = names[(names["name"]==f"{name}") & (names["gender"]==f"{gender}")][["year","count"]].reset_index().drop('index', axis=1)
        namedict = namedf.to_dict(orient='list')
        jsond[f'{gender}'] = namedict
    return jsonify(jsond)
#####################################
#          Flask App Routes         #
#####################################
#Home Page
@app.route("/")
def index():
    full_filename = "static/img/graph.png"
    return render_template("index.html", maleimg = full_filename, femaleimg = full_filename, name='Json')


# About Page
@app.route("/about.html")
def about():
    return render_template("about.html")
   
    


if __name__ == "__main__":
    app.run(debug=True)