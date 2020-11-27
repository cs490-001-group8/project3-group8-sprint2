"""
    app.py
    This file launches the flask server for the app
"""
# pylint: disable=E1101
# E1101 disabled, false positive when working with database.
import os
import json
from datetime import datetime
import flask
import flask_socketio
import sqlalchemy
from dotenv import load_dotenv
from pytz import timezone
import tables
from tables import BASE, Theme
import hourly_weather
import tweets
import news
import politics
from national_parks import national_parks

load_dotenv()

APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

# ENGINE = sqlalchemy.create_engine(database_url)
ENGINE = sqlalchemy.create_engine(os.environ["DATABASE_URL"])
BASE.metadata.create_all(ENGINE, checkfirst=True)

SESSION_MAKER = sqlalchemy.orm.sessionmaker(bind=ENGINE)
SESSION = SESSION_MAKER()

LOGGEDIN_CLIENTS = {}

EST = timezone("EST")

@APP.route("/")
def home():
    """When someone opens the home tab, send them the page"""
    return flask.render_template("index.html")


@APP.route("/Commuter")
def commuter_tab():
    """When someone opens the commuter tab, send them the page"""
    return flask.render_template("index.html")


@APP.route("/Politics")
def politics_tab():
    """When someone opens the politics tab, send them the page"""
    return flask.render_template("index.html")


@APP.route("/Recreation")
def recreation_tab():
    """When someone opens the recreation tab, send them the page"""
    return flask.render_template("index.html")


@APP.route("/landing_page")
def landing_page():
    """When someone click About link, render landing page"""
    return flask.render_template("landing_page.html")


@SOCKETIO.on("log in")
def on_user_login(data):
    """Recieve OAuth information when sent by the client"""
    if flask.request.sid not in LOGGEDIN_CLIENTS:
        LOGGEDIN_CLIENTS[flask.request.sid] = data
    theme = SESSION.query(Theme).filter(
        Theme.name == data["newName"],
        Theme.email == data["newEmail"],
        Theme.login_type == data["loginType"]).first()
    if not theme:
        result = {
            "pattern": "color",
            "value": "white"
        }
        SESSION.add(Theme(data["newName"], data["newEmail"],
                          data["loginType"], result["pattern"], result["value"]))
        SESSION.commit()
    else:
        result = {
            "pattern": theme.pattern,
            "value": theme.value
        }
    SOCKETIO.emit("theme", result)


@SOCKETIO.on("update theme")
def on_update_theme(data):
    """Update theme table"""
    SESSION.query(Theme).filter(
        Theme.name == data["name"],
        Theme.email == data["email"],
        Theme.login_type == data["loginType"]).update(
            {'pattern': data["pattern"], 'value': data['value']})
    SESSION.commit()


@SOCKETIO.on("disconnect")
def on_user_disconnect():
    """Recieve OAuth information when sent by the client"""
    if flask.request.sid in LOGGEDIN_CLIENTS:
        LOGGEDIN_CLIENTS.pop(flask.request.sid)


@SOCKETIO.on("get comments")
def on_get_comments(data):
    """Process a new comment"""
    try:
        which_tab = data["tab"]
        all_comments_tab = [
            {
                "text": comment.text,
                "name": comment.name,
                "time": comment.time.astimezone(EST).strftime("%m/%d/%Y, %H:%M:%S"),
                "id": comment.id,
                "likes": comment.likes,
            }
            for comment in SESSION.query(
                tables.Comment
                ).filter(
                    tables.Comment.tab == which_tab
                ).order_by(sqlalchemy.asc(tables.Comment.time)).all()
        ]
        all_comments_tab.reverse()
        flask_socketio.emit("old comments", {"comments": all_comments_tab})
    except KeyError:
        return


@SOCKETIO.on("new comment")
def on_new_comment(data):
    """Process a new comment"""
    if flask.request.sid not in LOGGEDIN_CLIENTS:
        return
    try:
        new_text = data["text"]
        which_tab = data["tab"]
        who_sent = data["name"]
        time = datetime.now()
        comment = tables.Comment(new_text, who_sent, which_tab, time)
        SESSION.add(comment)
        SESSION.commit()
        time_str = time.astimezone(EST).strftime("%m/%d/%Y, %H:%M:%S")
        SOCKETIO.emit(
            "new comment",
            {
                "text": new_text,
                "name": who_sent,
                "tab": which_tab,
                "time": time_str,
                "id": comment.id,
                "likes": 0,
            },
        )
    except KeyError:
        return


@SOCKETIO.on("like comment")
def on_like_comment(data):
    """Process a new comment"""
    if flask.request.sid not in LOGGEDIN_CLIENTS:
        return
    try:
        user_info = LOGGEDIN_CLIENTS[flask.request.sid]
        comment = SESSION.query(tables.Comment).filter_by(id=data["comment_id"]).first()
        if data["like"]:
            if SESSION.query(tables.Like).filter_by(email=user_info["newEmail"], login_type=user_info["loginType"], comment_id=data["comment_id"]).first() == None:
                comment.likes += 1
                like = tables.Like(user_info["newEmail"], user_info["loginType"], data["comment_id"])
                SESSION.add(like)
        else:
            if SESSION.query(tables.Like).filter_by(email=user_info["newEmail"], login_type=user_info["loginType"], comment_id=data["comment_id"]).first() != None:
                comment.likes -= 1
                SESSION.query(tables.Like).filter_by(email=user_info["newEmail"], login_type=user_info["loginType"], comment_id=data["comment_id"]).delete()
        SESSION.commit()
    except KeyError:
        return


@SOCKETIO.on("weather request")
def on_weather_request(data):
    """Recieve city, return back weather for the day"""
    request_name = data["city_name"]
    if not request_name.isdigit():
        request_name = request_name.lower()

    zip_codes = {}
    with open('weather_resources/zip_dict.json') as zip_dict:
        zip_codes = json.load(zip_dict)
    zip_dict.close()

    cities = {}
    with open("weather_resources/city_list.txt", 'r') as city_file:
        cities = {line.strip() for line in city_file}
    city_file.close()

    if (request_name.isdigit() and request_name in zip_codes):
        request_name = zip_codes[request_name]
        weather_object = hourly_weather.fetch_weather(request_name)
        weather_object["city_name"] = request_name.title()
        flask_socketio.emit("send weather", weather_object)
    elif request_name in cities:
        weather_object = hourly_weather.fetch_weather(request_name)
        weather_object["city_name"] = request_name.title()
        flask_socketio.emit("send weather", weather_object)
    else:
        flask_socketio.emit("weather error", {})



@SOCKETIO.on("get political tweets")
def on_pol_tweet_request():
    """Return tweets from politicians"""
    pol_tweets = tweets.get_politicians_latest_tweets()
    flask_socketio.emit("political tweets", pol_tweets)


@SOCKETIO.on("get news")
def on_news_request():
    """Returns news for New Jersey"""
    news_object = news.get_latest_news()
    flask_socketio.emit("news", news_object)


@SOCKETIO.on("get bills")
def on_bills_request():
    """Returns bills for New Jersey"""
    bills_object = politics.get_recent_bills()
    flask_socketio.emit("send bills", bills_object)


@SOCKETIO.on("get politicians")
def on_politicians_request():
    """Returns politicians for New Jersey"""
    pols_object = politics.get_politicians()
    flask_socketio.emit("send politicians", pols_object)


@SOCKETIO.on("get sport")
def get_sport_data():
    """Returns sports link for New Jersey Teams"""
    teams = [{'name': 'Devils Hockey', 'link': 'https://www.nhl.com/devils/'},
             {'name': 'Giants Football', 'link': 'https://www.giants.com/'},
             {'name': 'Jets Football', 'link': 'https://www.newyorkjets.com/'},
             {'name': 'Red Bulls', 'link': 'https://www.newyorkredbulls.com/'},
             {'name': 'NJ Jackals',
              'link': 'http://njjackals.pointstreaksites.com/view/njjackals'},
             {'name': 'Somerset Patriots', 'link': 'https://www.somersetpatriots.com/'},
             {'name': 'Trenton Thunder', 'link': 'https://www.milb.com/trenton'},
             {'name': 'Lakewood Blue Claws', 'link': 'https://www.milb.com/jersey-shore'}]
    flask_socketio.emit("send sport", {'teams': teams})

@SOCKETIO.on("get national parks")
def on_national_parks():
    """Returns all NJ National Parks"""
    parks = national_parks()
    flask_socketio.emit("national parks", {"parks": parks})


if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", "8080")),
        debug=True,
    )
