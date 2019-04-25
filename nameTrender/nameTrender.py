from flask import Flask, render_template, request, Response
import os
import pandas as pd
import matplotlib.pyplot as plt
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

# create a dictionary that has the name and image of all the premade graphs 
# if the name is not in the dictionary, make a new graph and add the name/pic to the dict

app = Flask(__name__)
names = pd.read_csv("nameTrender/Resources/namedf.csv")[['name','gender','count','year']]

@app.route("/")
def index():
    full_filename = "static/img/graph.png"
    return render_template("index.html", user_image = full_filename)


@app.route('/graph/<name>', methods=['POST', 'GET'])
def graph(name):
    global names
    text = request.form['First Name'].title()
    name = name.title()
    name_df = plt.plot(names[(names['name']==f'{name}') & (names['gender']=='M')]['year'].astype(str),
                        names[(names['name']==f'{name}') & (names['gender']=='M')]['count'].astype(int),
                        c='b',
                        marker='o',
                        label=f'{name} : M')
        #name_m_plot = plt.plot(name_df[name_df['name']==f'{name}']['year'].astype(str), name_df[name_df['name']==f'{name}']['count'].astype(int),c='b',marker='o',label=f'{name} : M')
    
    plt.xticks(rotation=90)
    plt.grid()
    plt.title(f"Popularity of Name for {str(name).title()} - Male(US)")
    plt.ylabel("Name Count")
    plt.legend()
    plt.savefig("nameTrender/static/img/graph.png")
    full_filename = "static/img/graph.png"
    return render_template("index.html", user_image = full_filename)


@app.route('/about.html')
def about():
    return render_template("about.html")
   
    
if __name__ == "__main__":
    app.run(debug=True)
