#Imports
import os
from flask import render_template, request, redirect, url_for, jsonify
from flask_login import current_user, login_user, logout_user
from sqlalchemy import desc
from app import app
from app.forms import LoginForm, SignupForm
from app.functions import write_user
from app.models import User, Movie, Question, Answer, QuestionVotes, AnswerVotes
from app import db

#Route defintions
@app.route('/', methods=['GET', 'POST'])
def main():
	return render_template('main.html', login=LoginForm(), signup=SignupForm())
    
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