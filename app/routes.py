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
    
@app.route('/movie', methods=['GET'])
def movie():
	#Un-pack variables
    imdb = request.args.get('imdb')
    title = request.args.get('title')
	
	#Check if movie is already in database
    movie = Movie.query.filter_by(imdb_id=imdb).first()
	
	#If not, add movie to database
    if movie:
        pass
    else:
        movie = Movie(imdb_id=imdb, movie_title=title)
        db.session.add(movie)
        db.session.commit()
    
    #Pack and return Question data
    movieid = Movie.query.filter_by(imdb_id=imdb).first().id
    questions = Question.query.filter_by(movie_id=movieid).order_by(desc('points')).all()
	
    outer = []
	
    for question in questions:
        answers = Answer.query.filter_by(movie_id=movieid, question_id=question.id).order_by(desc('points')).all()
        inner = []
        for answer in answers:
            entry = {'id': answer.id, 'content': answer.answer_text, 'points': answer.points}
            inner.append(entry)
        entry = {'id': question.id, 'content': question.question_text, 'points': question.points, 'answers': inner}
        outer.append(entry)
	
    return jsonify([{'id': '1', 'content': 'Who directed it?', 'points': '100', 'answers': [{'id': '1', 'content': 'George Lucas', 'points': '100'}, {'id': '2', 'content': 'Steven Spielberg', 'points': '80'}, {'id': '3', 'content': 'Bob Sagat', 'points': '10'}]},
                    {'id': '2', 'content': 'What is the plot?', 'points': '80', 'answers': [{'id': '1', 'content': 'It is about space.', 'points': '80'}, {'id': '2', 'content': 'It is about an Jedi.', 'points': '20'}]}])
                    
@app.route('/register', methods=['GET', 'POST'])
def register():
	confirmation = write_user(request.form['username'], request.form['email'], request.form['pword'])
	return confirmation
    
@app.route('/login', methods=['POST'])
def login():

	username = request.form.get('user')
	password = request.form.get('pword')
	
	user = User.query.filter_by(username=username).first()
	
	if user is None or not user.check_password(password):
		return jsonify({'login': 'invalid', 'username': 'none'})
	
	else:
		login_user(user)
		return jsonify({'login': 'valid', 'username': str(user.username)})

@app.route('/logout', methods=['POST'])
def logout():

	logout_user()
	return 'logged out'