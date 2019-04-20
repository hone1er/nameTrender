from flask import Flask, render_template, request, Response
import os
import pandas as pd
import matplotlib.pyplot as plt
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure


app = Flask(__name__)

def scatterList(namesList):
    """namesList = format namesList = [(name,gender,color),
                                        (name,gender,color)]
        A scatter plot from year 2000 onward will be produced"""
    # go through each file in 'names' folder, if 'yob20' is in the filename, put the file in a DF called name_df
    for filename in os.listdir("nameTrender/Resources/names"):
        if 'yob' in filename:
            name_file = pd.read_csv(f"nameTrender/Resources/names/{filename}",header=None)
            name_df = pd.DataFrame(name_file)
            name_df = name_df.rename(columns={0:'Name', 1:'Gender',2:'Birth Count'})
    # add a year column to the DF based on the filename(ex. add 2005 to year column for yob2005.txt)
            name_df["Year"] = os.path.splitext(filename)[0][-4:]
    # find the name in the current file and plot the point
            for name in namesList:
                year = str(name_df[(name_df["Name"]==f"{name[0]}") & (name_df["Year"] != "0") & (name_df["Gender"] == f"{name[1]}")]['Year'].sum())
                count = name_df[(name_df["Name"]==f"{name[0]}") & (name_df["Gender"] == f"{name[1]}")]["Birth Count"].sum()
                if count != 0:
                  plt.scatter(year,count,c=f"{name[2]}",edgecolor=(0,0,0),alpha=0.75)

    handles = [plt.scatter([],
                        [],
                        marker="o",
                        color=name[2],
                        label=name[0],
                        edgecolor=(0,0,0)) for name in namesList]
    plt.legend(handles=handles,
            markerscale=1)
    plt.xticks(rotation=90)
    if namesList[0][1] == "M":
        plt.title("Name Popularity 2000-2017(Male)")
        plt.xlabel("Year")
        plt.ylabel("Name Count")
        plt.grid()
        plt.show()
    elif namesList[0][1] == "F":
        plt.title("Name Popularity 2000-2017(Female)")
        plt.xlabel("Year")
        plt.ylabel("Name Count")
        plt.grid()
        plt.show()    
    plt.savefig("nameTrender/static/img/graph.png")

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/graph.py', methods=['POST'])
def my_form_post():
    text = request.form['First Name'].title()
    fig = scatterList([(text,'M','b')])
    fig = scatterList([(text,'F','b')])
    return render_template("index.html")
    
           
if __name__ == "__main__":
    app.run(debug=True)