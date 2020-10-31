# CS490-PROJECT2-JF353

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
        I used pip install for flask, coverage, pylint, eslint, black, and flask-socketio
        I used npm for heroku (`npm install -g heroku`)
        I also used the Git CLI which I highly suggest you utilizing.
            
    There are also a few commands you need to run on the directory in which 
      this project is installed, those are:
        1. `npm install`
        2. `npm install -g webpack`
        3. `npm install --save-dev webpack`
    
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
