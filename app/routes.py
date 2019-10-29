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
	
    return jsonify(outer)
                    
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
    
@app.route('/add-question', methods=['GET'])
def add_question():
	user = request.args.get('user')
	movie = request.args.get('movie')
	question = request.args.get('question')
	
	userid = User.query.filter_by(username=user).first().id
	movieid = Movie.query.filter_by(movie_title=movie).first().id
	check_question = Question.query.filter_by(user_id=userid, movie_id=movieid, question_text=question).first()
	
	if check_question:
		pass
	else:
		new_question = Question(user_id=userid, movie_id=movieid, question_text=question)
		db.session.add(new_question)
		db.session.commit()
		
	verify_question = Question.query.filter_by(user_id=userid, movie_id=movieid, question_text=question).first()

	return str(verify_question.question_text)