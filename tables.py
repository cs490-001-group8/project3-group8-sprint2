'''
    tables.py
    This file defines the tables to be used in sqlalchemy of app.py
'''
from sqlalchemy import Column, Integer, Sequence, String
from sqlalchemy.ext.declarative import declarative_base

BASE = declarative_base()


# pylint: disable=E1101
# pylint: disable=R0903
class Comment(BASE):
    '''Defines the Messages table'''
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True)
    tab = Column(String(50))
    text = Column(String(1000))

    def __init__(self, text, tab):
        self.text = text
        self.tab = tab

    def __repr__(self):
        return 'Comment: %s, On Tab: %s' % (self.text, self.tab)
