'''
    app.py
    This file launches the flask server for the app
'''
import os
import flask
import flask_socketio
import sqlalchemy
from dotenv import load_dotenv
import tables
from tables import BASE

load_dotenv()

APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

engine = sqlalchemy.create_engine(os.environ['DATABASE_URL'])
BASE.metadata.create_all(engine, checkfirst=True)

Session = sqlalchemy.orm.sessionmaker(bind=engine)
session = Session()

@APP.route('/')
def hello():
    '''When someone opens the app, send them the page'''
    return flask.render_template('index.html')

@SOCKETIO.on('new comment')
def on_new_comment(data):
    '''Process a new connection'''
    try:
        new_text = data["text"]
        which_tab = data["tab"]
        session.add(tables.Comment(new_text, which_tab))
        session.commit()
    except:
        return

if __name__ == '__main__':
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', '8080')),
        debug=True
    )
