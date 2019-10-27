#Imports
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms.fields.html5 import EmailField

#Form definition
class LoginForm(FlaskForm):
	username = StringField('Username', id="login-username", validators=[DataRequired()])
	password = PasswordField('Password', id="login-password", validators=[DataRequired()])
	login_submit = SubmitField('SUBMIT', id="login-submit")
    
class SignupForm(FlaskForm):
	username = StringField('Username', id="signup-username", validators=[DataRequired()])
	email = EmailField('Email', id="email", validators=[DataRequired(), Email()])
	password = PasswordField('Password', id="signup-password", validators=[DataRequired()])
	signup_submit = SubmitField('SUBMIT', id="signup-submit")
    
class QuestionForm(FlaskForm):
	question = TextAreaField('Add Question', id="question-field", validators=[DataRequired()])
	question_submit = SubmitField('SUBMIT', id="question-submit")
	
class AnswerForm(FlaskForm):
	answer = TextAreaField('Add Answer', id="answer-field", validators=[DataRequired()])
	answer_submit = SubmitField('SUBMIT', id="answer-submit")