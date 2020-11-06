# CS490-PROJECT3-GROUP8

## READ ME

  This Project allows you to post to launch a website that acts as a hub for NJ
    residents.
  To launch the app run the command 'npm run watch' to update your script.js and
    then run 'python app.py' in order to run the app.
    If running 'npm run watch' asks you if you want to install 'webpack-CLI'
      respond 'yes'.
  
  
  INSTALLATIONS AND TECHNOLOGIES
  
    Before running this app, make sure you have everything you need installed installed.  
      I have everything I had installed in the requirements.txt file, but all of 
      that is not necessary.  I will lay out what you need below:
        I used pip install for flask, coverage, pylint, pytz, black, and flask-socketio
        I used npm for heroku (`npm install -g heroku`)
        I also used the Git CLI which I highly suggest you utilizing.
        
    You need to get PSQL to work with python by running these commands:
        1. `sudo yum update`, and enter yes to all prompts    
        2. `sudo pip install --upgrade pip`  
        3. `sudo pip install psycopg2-binary`    
        4. `sudo pip install Flask-SQLAlchemy==2.1`
        
    If you do not already have a psql database, you need to initialize one:
        1. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`    
            Enter yes to all prompts.    
        2. `sudo service postgresql initdb`  
        3. `sudo service postgresql start`    
        4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` 
        5. Make a new database: `sudo -u postgres createdb $USER`   
        6. Make sure your user shows up and make a new one:    
            a) `psql`    
            b) `\du` look for yourself as a user    
            c) `\l` look for yourself as a database 
            b) `create user [some_username_here] superuser password '[password]';` 
              i) Make sure you remember the quotes around password and the semicolon. 
                Check `\du` to ensure it worked.
            c) `\q` to quit out of sql
            
    Update the API keys in the env file for the news api 
            a. Go to `https://www.gnews.io/`
            b. Sign up and you will granted an API key
            c. Copy and paste that key in .env file with the name `REACT_APP_NEWS_API_KEY`
            
    There are also a few commands you need to run on the directory in which 
      this project is installed, those are:
        1. `npm install`
        2. `npm install -g webpack`
        3. `npm install --save-dev webpack`
        4. `npm install --save google-map-react`
    
    If you wish to utilize test cases, pip install unittest and requests\_mock, run `python umocked_unit_tests.py` and
      `python ocked_unit_tests.py`to use the tests in those files.  To test code coverage, run the
      following commands in this directory
        1. `coverage run -m --source=. unittest tests/*.py`
        2. `coverage html`
      You can rerun these two with `coverage run -m --source=. unittest tests/*.py && coverage html`
    
    If you wish to test the linting on the project, pip install pylint and black and run the commands
        1. `npm install -g eslint`
        2. `eslint --init` and select the following options:
            a) "To check syntax, find problems, and enforce code style"
            b) "Javascript modules (import/export)"
            c) "React"
            d) "No"
            e) "Browser"
            f) "Use a popular style guide"
            h) "Airbnb"
            i) "Javascript"
            j) When asked if you want to install dependencies with npm, say "Yes"
        3. Run `eslint scripts\[FILE]` on any of the .js files in scripts.
            a) Run `eslint --fix  scripts\[FILE]` on those files to fix simple errors.
        4. Run `pylint [FILE]` on any of the python files.
        
        
  
  KNOWN PROBLEMS
  
    Nothing is yet implemented.
    
  
  TECHNICAL ISSUES AND SOLUTIONS
  
    TODO
    
  OTHER
    TODO
