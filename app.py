"""
    app.py
    This file launches the flask server for the app
"""
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
database_url = os.getenv('DATABASE_URL')

# ENGINE = sqlalchemy.create_engine(database_url)
ENGINE = sqlalchemy.create_engine(os.environ["DATABASE_URL"])
BASE.metadata.create_all(ENGINE, checkfirst=True)

SESSION_MAKER = sqlalchemy.orm.sessionmaker(bind=ENGINE)
SESSION = SESSION_MAKER()


@APP.route('/')
def hello():
    """When someone opens the app, send them the page"""
    return flask.render_template("index.html")


@SOCKETIO.on('user login')
def on_user_login(data):
    '''Recieve OAuth information when sent by the client'''
    # Send user information information back to the clientside.
    SOCKETIO.emit('send client', data)


@SOCKETIO.on("get comments")
def on_get_comments(data):
    """Process a new comment"""
    try:
        which_tab = data["tab"]
        all_comments_tab = [
            {"text": comment.text, "name": comment.name}
            for comment in SESSION.query(tables.Comment)
                .filter(tables.Comment.tab == which_tab)
                .all()
        ]
        all_comments_tab.reverse()
        flask_socketio.emit("old comments", {"comments": all_comments_tab})
    except KeyError:
        return


@SOCKETIO.on("new comment")
def on_new_comment(data):
    """Process a new comment"""
    try:
        new_text = data["text"]
        which_tab = data["tab"]
        who_sent = data["name"]
        SESSION.add(tables.Comment(new_text, who_sent, which_tab))
        SESSION.commit()
        SOCKETIO.emit("new comment", {"text": new_text, "name": who_sent, "tab": which_tab})
    except KeyError:
        return


if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", "8080")),
        debug=True,
    )
