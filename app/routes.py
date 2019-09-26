#Imports
from flask import render_template
from app import app

#Route defintions
@app.route('/', methods=['GET'])
def main():
	return render_template('main.html')