'''
    app.py
    This file launches the flask server for the app
'''
import os
import flask
import flask_socketio

APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

@APP.route('/')
def hello():
    '''When someone opens the app, send them the page'''
    return flask.render_template('index.html')

if __name__ == '__main__':
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', '8080')),
        debug=True
    )
