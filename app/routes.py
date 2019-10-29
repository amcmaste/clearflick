#Imports
import os
import requests
from flask import render_template, request, redirect, url_for, jsonify
from flask_login import current_user, login_user, logout_user
from sqlalchemy import desc
from app import app
from app.forms import LoginForm, SignupForm, QuestionForm, AnswerForm
from app.functions import write_user
from app.models import User, Movie, Question, Answer, QuestionVotes, AnswerVotes
from app import db

#Route defintions
@app.route('/', methods=['GET', 'POST'])
def main():
    movie = request.args.get('movie')
    url = '' +'t=' + movie
    data = requests.get(url).json()
    return render_template('main.html', data=data, login=LoginForm(), signup=SignupForm(), question=QuestionForm(), answer=AnswerForm())

@app.route('/search', methods=['GET', 'POST'])
def search():
    movie = request.form.get('movie')
    url = '/?movie=' + movie
    return jsonify({"redirect": url})