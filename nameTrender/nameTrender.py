from flask import Flask, render_template, request, Response
import os
import pandas as pd
import matplotlib.pyplot as plt
from namesdictionary import pregraphedNames


app = Flask(__name__)
names = pd.read_csv("nameTrender/Resources/namedf.csv")[["name","gender","count","year"]]

def scatterList(name):
    """
        Currently this only makes a graph based on males with the name. 
        Needs another input from the form with a gender variable. 
        Or can be changed to produce both a male and female graph
    """
    global names
    # Format the name
    name = name.title()
    # Clear any matplotlib figure that may still be in memory
    plt.clf()
    # Plot the given name with the year as the X axis and count of babies born as the Y axis
    plt.plot(names[(names["name"]==f"{name}") & (names["gender"]=="M")]["year"].astype(str),
                        names[(names["name"]==f"{name}") & (names["gender"]=="M")]["count"].astype(int),
                        c="b",
                        marker="o",
                        label=f"{name} : M")
    # Adjust ticks, add title and labels, add a legend, and save the figure
    plt.xticks(rotation=90)
    plt.grid()
    plt.title(f"Popularity of Name for {str(name)} - Male(US)")
    plt.ylabel("Name Count")
    plt.legend()
    plt.savefig(f"nameTrender/static/img/pregraphed/{name}.png")

#####################################
#          Flask App Routes         #
#####################################
#Home Page
@app.route("/")
def index():
    full_filename = "static/img/graph.png"
    return render_template("index.html", user_image = full_filename)

# Returned when "First Name" for POST request is sent
@app.route("/graph", methods=["POST", "GET"])
def graph():
    # Retrieve the name from the html form "First Name"
    name = request.form["First Name"].title()
    # Check the pregraphedNames dictionary for a premade graph of the input name
    if name in pregraphedNames:
        filename = f"static/img/pregraphed/{pregraphedNames[name]}"
        return render_template("index.html", user_image = filename)
    # if the name is not in the dictionary, make a new graph and add the name/pic to the dict
    scatterList(name)
    pregraphedNames[f"{name}"] = f"{name}.png"
    filename = f"static/img/pregraphed/{name}.png"
    return render_template("index.html", user_image = filename)

# About Page
@app.route("/about.html")
def about():
    return render_template("about.html")
   
    
if __name__ == "__main__":
    app.run(debug=True)