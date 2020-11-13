![The Jersey Bulletin](https://i.imgur.com/6orq2qv.png)
*CS490, Group 8 Final Project*

---
The Jersey Bulletin's Deployment can be found here: [https://young-chamber-62436.herokuapp.com/](https://young-chamber-62436.herokuapp.com/)

The Jersey Bulletin is an open forum for New Jersey residents while also acting as a one stop shop for information you may need as a New Jersey resident. This web app will feature different tabs containing different information relating to different aspects of life in the Garden state. Some of the information we hope to relay to the user include weather, politics, traffic, and news. Along with this information, all tabs will also feature their own bulletin board. In order to add any messages to the bulletin board, you must sign in with your Google account via OAuth.

This Project allows you to post to launch a website that acts as a hub for NJ residents. To launch the app run the command `npm run build` to update your script.js and then run `python app.py` in order to run the app. If running `npm run build` asks you if you want to install `webpack-CLI` respond 'yes'.

# Installations and Technologies.
Before running this app, make sure you have all of the dependencies installed. All the dependencies are in the `requirements.txt` file, but all of these packages are not necessary.
1. Use the command `pip install` to install flask, coverage, pylint, pytz, black, tweepy, and flask-socketio.
2. Use `npm` to install the heroku package, `npm install -g heroku`
3. It's recommended that you use the `Git CLI` in order to keep your code up to date.

## Database Setup
This web application uses `psql` as the database to provide persistence with the bulletin boards. In order to get psql to work with python, run the following commands:
1. `sudo yum update`, say yes for all the prompts.
2. `sudo pip install --upgrade pip`
3. `sudo pip install psycopg2-binary`
4. `sudo pip install Flask-SQLAlchemy==2.1`

If you have not already created a psql database, follow these steps in order to initialize one.

1. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`, Enter yes to all prompts.    
2. `sudo service postgresql initdb`  
3. `sudo service postgresql start`    
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` 
5. Make a new database: `sudo -u postgres createdb $USER`   
6. Make sure your user shows up and make a new one:    
	1. `psql`    
	2. `\du` look for yourself as a user    
	3. `\l` look for yourself as a database 
	4. `create user [some_username_here] superuser password '[password]';` 
	5. Make sure you remember the quotes around password and the semicolon. 
		1. Check `\du` to ensure it worked.
	6. `\q` to quit out of psql

## API Keys
In order to get the modules to work correctly, you will need to register and obtain a few API Keys.
1. [OpenWeather API](https://openweathermap.org/) - This is used for the weather module, used for retrieval of up-to-date weather information.
2. [Geocodio API](https://www.geocod.io/) - This is used to retrieve the latitude and longitude for use with the OpenWeather API.
3. [GNews API](https://www.gnews.io/) - This is used to retrieve relevant New Jersey news.
4. [Google Maps API](https://developers.google.com/maps/documentation) - This is used to retrieve traffic related data from Google Maps.
5. [Twitter API](https://developer.twitter.com/en/apply-for-access) - This is used to retrieve tweets from New Jersey political figures.
	1. Go to https://developer.twitter.com/en/apply-for-access and apply for access.
	2. When you are approved, create a project and save your consumer key, consumer secret, access token, and access token secret.

Create a file named `.env` and set it up as the following:
```
OPEN_WEATHER_API_KEY=<Open weather API Key Here>
GEOCODIO_API_KEY=<Geocodio API Key Here>
FREE_NEWS_API_KEY=<Gnews API Key Here>
DATABASE_URL=<URL to your psql database>
TWITTER_CONSUMER_KEY = "<Twitter consumer key>"
TWITTER_CONSUMER_SECRET = "<Twitter consumer secret>"
TWITTER_ACCESS_TOKEN = "<Twitter access token>"
TWITTER_ACCESS_TOKEN_SECRET = "<Twitter access token secret>"
GOOGLE_MAP_API_KEY=<Google map API Key Here>
```

Note: Do not include quotes or the `<>` characters in the `.env` file.\
Optional, but you can run the command `source .env` to ensure the system has read the API Key variables.

## Setting up the clientside
There are a few commands you must run in order to ensure that the clientside will run properly.
1. `npm install`
2. `npm i nanoid`
3. `npm install -g webpack`
4. `npm install --save-dev webpack`
5. `npm install --save google-map-react`


## Setting up testcases
If you wish to utilize test cases, enter the following commands to ensure you have the correct modules:
1. `pip install unittest`
2. `pip install requests_mock`

In order to run these tests, run `python unmocked_unit_tests.py` and `python mocked_unit_tests.py` to test the test cases in those files.

In order to view the code coverage, run the following commands in the directory:
1. `coverage run -m --source=. unittest tests/*.py`
2. `coverage html`
3. In the future, you can simply run ``coverage run -m --source=. unittest tests/*.py && coverage html`` to run both of these commands at the same time.

### Linting
If you wish to check the linting on this project, execute the following commands.
1. `pip install pylint`
2. `pip install black`
3. `npm install -g eslint`
4. `eslint --init`, select the following options.
	1. "To check syntax, find problems, and enforce code style"
	2. "Javascript modules (import/export)"
	3. "React"
	4. "No"
	5. "Browser"
	6. "Use a popular style guide"
	7. "Airbnb"
	8. "Javascript"
	9. When asked if you want to install dependencies with npm, say "Yes"
5. Run `eslint scripts/[FILE]` on any of the `.js/.jsx`  files in the scripts directory.
	1.  Run `eslint --fix scripts/[FILE]` in order to automatically fix some of the linting errors
6. Run `pylint [FILE]` on any of the python files.

## Known Problems
API Requests are incredibly frequent, making it likely we run out of requests often.

## Technical Issues and Solutions
The comment section was having an issue where each tab was not recognizing different comment sections as different.
  This was solved by utilizing hooks to keep the comment sections as the same element that
  simply updates on a switched tab.
  
The comment section was having issues where they were getting the comments sent to all tabs.
  This was solved by utilizing rooms in the backend to ensure that comments were only sent 
  to users in one tab.
## Other
TODO

