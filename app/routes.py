#Imports
import os
import datetime
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
@app.route('/homepage', methods=['GET'])
def homepage():
    url = '/home'
    return jsonify({"redirect": url})
    
@app.route('/home', methods=['GET'])
def home():
    return render_template('home.html', login=LoginForm(), signup=SignupForm())
    
@app.route('/', methods=['GET', 'POST'])
def main():
    movie = request.args.get('movie')
    if movie:
        url = 'https://www.omdbapi.com/?apikey=227f7057&' +'t=' + movie
        data = requests.get(url).json()
        return render_template('main.html', data=data, login=LoginForm(), signup=SignupForm(), question=QuestionForm(), answer=AnswerForm())
    else:
        return redirect(url_for('home'))

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
            entry = {'id': answer.id, 'user': User.query.filter_by(id=answer.user_id).first().username, 'time': answer.create_datetime.strftime("%c"), 'content': answer.answer_text, 'points': answer.points}
            inner.append(entry)
        entry = {'id': question.id, 'user': User.query.filter_by(id=question.user_id).first().username, 'time': question.create_datetime.strftime("%c"), 'content': question.question_text, 'points': question.points, 'answers': inner}
        outer.append(entry)
	
    return jsonify(outer)
                    
@app.route('/register', methods=['GET', 'POST'])
def register():
    write = write_user(request.form['username'], request.form['email'], request.form['pword'])
    user = User.query.filter_by(username=request.form['username']).first()
    login_user(user)
    return user.username
    
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
    
@app.route('/add-answer', methods=['GET'])
def add_answer():
	user = request.args.get('user')
	movie = request.args.get('movie')
	question = request.args.get('question')
	answer = request.args.get('answer')
	
	userid = User.query.filter_by(username=user).first().id
	movieid = Movie.query.filter_by(movie_title=movie).first().id
	questionid = Question.query.filter_by(movie_id=movieid, question_text=question).first().id
	check_answer = Answer.query.filter_by(user_id=userid, movie_id=movieid, question_id=questionid, answer_text=answer).first()
	
	if check_answer:
		pass
	else:
		new_answer = Answer(user_id=userid, movie_id=movieid, question_id=questionid, answer_text=answer)
		db.session.add(new_answer)
		db.session.commit()
		
	verify_answer = Answer.query.filter_by(user_id=userid, movie_id=movieid, question_id=questionid, answer_text=answer).first()

	return str(verify_answer.answer_text)
    
@app.route('/check', methods=['POST'])
def check():
  if current_user.is_authenticated:
    return jsonify({'user': current_user.username})
  else:
    return ''
    
@app.route('/upvote-question', methods=['POST'])
def upvote_question():
    user = request.form.get('user')
    movie = request.form.get('movie')
    content = request.form.get('content')
	
    userid = User.query.filter_by(username=user).first().id
    movieid = Movie.query.filter_by(movie_title=movie).first().id
    questionid = Question.query.filter_by(movie_id=movieid, question_text=content).first().id
	
    user = User.query.filter_by(id=userid).first()
    movie = Movie.query.filter_by(id=movieid).first()
    question = Question.query.filter_by(id=questionid).first()
    vote = QuestionVotes.query.filter_by(user_id=userid, question_id=questionid).first()
		
    if not question.points:
        points = 0
    else:
        points = question.points
	
    if vote == None:
        vote = QuestionVotes(user_id=userid, question_id=questionid)
        db.session.add(vote)
        db.session.commit()
        question.points = points + 10
        db.session.commit()
        counted = 'Y'
    else:
        counted = 'N'
	
    new = Question.query.filter_by(id=questionid).first()
    return jsonify([content, new.points, counted])
	
@app.route('/downvote-question', methods=['POST'])
def downvote_question():
	user = request.form.get('user')
	movie = request.form.get('movie')
	content = request.form.get('content')
	
	userid = User.query.filter_by(username=user).first().id
	movieid = Movie.query.filter_by(movie_title=movie).first().id
	questionid = Question.query.filter_by(movie_id=movieid, question_text=content).first().id
	
	user = User.query.filter_by(id=userid).first()
	movie = Movie.query.filter_by(id=movieid).first()
	question = Question.query.filter_by(id=questionid).first()
	vote = QuestionVotes.query.filter_by(user_id=userid, question_id=questionid).first()
		
	if not question.points:
		points = 0
	else:
		points = question.points
	
	if vote == None:
		vote = QuestionVotes(user_id=userid, question_id=questionid)
		db.session.add(vote)
		db.session.commit()
		if points > 10:
			question.points = points - 10
		else:
			question.points = 0
		db.session.commit()
		counted = 'Y'
	else:
		counted = 'N'
	
	new = Question.query.filter_by(id=questionid).first()
	return jsonify([content, new.points, counted])
	
@app.route('/upvote-answer', methods=['POST'])
def upvote_answer():
	user = request.form.get('user')
	movie = request.form.get('movie')
	question = request.form.get('quest')
	content = request.form.get('ans')
	
	userid = User.query.filter_by(username=user).first().id
	movieid = Movie.query.filter_by(movie_title=movie).first().id
	questionid = Question.query.filter_by(movie_id=movieid, question_text=question).first().id
	answerid = Answer.query.filter_by(movie_id=movieid, question_id=questionid, answer_text=content).first().id
	
	user = User.query.filter_by(id=userid).first()
	movie = Movie.query.filter_by(id=movieid).first()
	question = Question.query.filter_by(id=questionid).first()
	answer = Answer.query.filter_by(id=answerid).first()
	vote = AnswerVotes.query.filter_by(user_id=userid, answer_id=answerid).first()
		
	if not answer.points:
		points = 0
	else:
		points = answer.points
	
	if vote == None:
		vote = AnswerVotes(user_id=userid, answer_id=answerid)
		db.session.add(vote)
		db.session.commit()
		answer.points = points + 10
		db.session.commit()
		counted = 'Y'
	else:
		counted = 'N'
	
	new = Answer.query.filter_by(id=answerid).first()
	return jsonify([content, new.points, counted])
	
@app.route('/downvote-answer', methods=['POST'])
def downvote_answer():
	user = request.form.get('user')
	movie = request.form.get('movie')
	question = request.form.get('quest')
	content = request.form.get('ans')
	
	userid = User.query.filter_by(username=user).first().id
	movieid = Movie.query.filter_by(movie_title=movie).first().id
	questionid = Question.query.filter_by(movie_id=movieid, question_text=question).first().id
	answerid = Answer.query.filter_by(movie_id=movieid, question_id=questionid, answer_text=content).first().id
	
	user = User.query.filter_by(id=userid).first()
	movie = Movie.query.filter_by(id=movieid).first()
	question = Question.query.filter_by(id=questionid).first()
	answer = Answer.query.filter_by(id=answerid).first()
	vote = AnswerVotes.query.filter_by(user_id=userid, answer_id=answerid).first()
		
	if not answer.points:
		points = 0
	else:
		points = answer.points
	
	if vote == None:
		vote = AnswerVotes(user_id=userid, answer_id=answerid)
		db.session.add(vote)
		db.session.commit()
		if points > 10:
			answer.points = points - 10
		else:
			answer.points = 0
		db.session.commit()
		counted = 'Y'
	else:
		counted = 'N'
	
	new = Answer.query.filter_by(id=answerid).first()
	return jsonify([content, new.points, counted])
    
@app.route('/top', methods=['POST'])
def top():
    movies = Movie.query.order_by(desc('create_datetime')).limit(3).all()
    
    data = []
    
    for movie in movies:
        title = movie.movie_title
        url = 'https://www.omdbapi.com/?apikey=227f7057&' +'t=' + title
        item = requests.get(url).json()
        data.append({'title': item['Title'], 'poster': item['Poster'], 'url': url_for('main') + item['Title']})
        
    return jsonify(data)