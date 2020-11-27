'''
    tables.py
    This file defines the tables to be used in sqlalchemy of app.py
'''
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

BASE = declarative_base()


# pylint: disable=E1101
# pylint: disable=R0903
class Comment(BASE):
    '''Defines the Messages table'''
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True)
    tab = Column(String(50))
    name = Column(String(100))
    text = Column(String(1000))
    likes = Column(Integer)
    time = Column(DateTime(timezone=False))

    def __init__(self, text, name, tab, time):
        self.text = text
        self.name = name
        self.tab = tab
        self.likes = 0
        self.time = time

    def __repr__(self):
        return 'Comment: %s, On Tab: %s' % (self.text, self.tab)

# pylint: disable=E1101
# pylint: disable=R0903
class Theme(BASE):
    '''Defines the Themes table'''
    __tablename__ = 'theme'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(50))
    login_type = Column(String(50))
    pattern = Column(String(50))
    value = Column(String(255))

    # pylint: disable=R0913
    def __init__(self, name, email, login_type, pattern, value):
        self.name = name
        self.email = email
        self.login_type = login_type
        self.pattern = pattern
        self.value = value

    def __repr__(self):
        return 'Name: %s, Pattern: %s, Value: %s' % (self.name, self.pattern, self.value)
