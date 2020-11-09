

#Set up authentication for the tweepy API using environmental variables set up like in the README
auth = tweepy.OAuthHandler(os.getenv("CONSUMER_KEY"), os.getenv("CONSUMER_SECRET"))
auth.set_access_token(os.getenv("ACCESS_TOKEN"), os.getenv("ACCESS_TOKEN_SECRET"))

#Get the tweepy object you can use to access the Twitter API
api = tweepy.API(auth, wait_on_rate_limit=True)