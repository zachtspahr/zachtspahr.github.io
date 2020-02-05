import tweepy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
import json
from flask import jsonify
from config_twitter import consumer_key, consumer_secret, access_token, access_token_secret
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True,wait_on_rate_limit_notify=True, parser=tweepy.parsers.JSONParser())
import time
import geocoder
from splinter import Browser
from bs4 import BeautifulSoup
from unidecode import unidecode
results_list = []
compound_list = []
positive_list = []
negative_list = []
neutral_list = []
tweet_texts = []
time_stamp = []
user_name = []
locations = []
geo_enabled = []
geocode_list = []
tweet_time = []
tag_list = []
tags = ['"Bernie Sanders"', '"Elizabeth Warren"','"Pete Buttigieg"', '"Pete Buttigieg"','"Andrew Yang"',"Biden","Bernie","Warren","Buttigieg"]
import unicodedata
from unidecode import unidecode
def deEmojify(inputString):
    returnString = ""

    for character in inputString:
        try:
            character.encode("ascii")
            returnString += character
        except UnicodeEncodeError:
            replaced = unidecode(str(character))
            if replaced != '':
                returnString += replaced
            else:
                try:
                     returnString += "[" + unicodedata.name(character) + "]"
                except ValueError:
                     returnString += "[x]"

    return returnString
from flask import Flask, render_template, jsonify
import urllib.request
import requests


app = Flask(__name__)

@app.route("/")
def index():  
    tweets = pd.read_csv("/Users/zspahr/Desktop/Bootcamp/z_spahr_gw_hw/Python API Homework Week 6 and 7/Part 3 Twitter Bot/tweets_with_geocodes!.csv")
    tweets.head()
    return "Hello World"

@app.route("/data")
def jsonified():  
    tweets = pd.read_csv("/Users/zspahr/Desktop/Bootcamp/z_spahr_gw_hw/Python API Homework Week 6 and 7/Part 3 Twitter Bot/tweets_with_geocodes!.csv")
    geocodes_json = tweets.to_json()
    return geocodes_json

@app.route("/tweets")
def get_tweets():
    print(time.ctime())
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    url = 'https://www.mapdevelopers.com/geocode_tool.php'
    browser.visit(url)
    xpath1 = "/html/body/div[2]/div[1]/div[3]/div/form/div[1]/input"
    xpath2 = "/html/body/div[2]/div[1]/div[3]/div/form/div[1]/span[2]/button"
    time.sleep(5)
    
    for i in range (1):
        for tag in tags:
            public_tweets = api.search(tag + "-filter:retweets",count=1, tweet_mode='extended',result_type="recent")

            for tweet in public_tweets["statuses"]:
                #if tweet["created_at"] == "":
                tag_list.append(tag)
                tweet_time.append(tweet["created_at"])
                tweet_texts.append(deEmojify(tweet["full_text"].replace("\n", " ")))
                time_stamp.append(tweet["created_at"])
                user_name.append(tweet["user"]["screen_name"])
                new_location = deEmojify(tweet["user"]["location"])
                if new_location == '':
                    new_location = "Zek Zek Dadumle"
                results = analyzer.polarity_scores(tweet["full_text"].replace("\n", " "))
                compound = results["compound"]
                pos = results["pos"]
                neu = results["neu"]
                neg = results["neg"]
                locations.append(tweet["user"]["location"])

                # Add each value to the appropriate list
                compound_list.append(compound)
                positive_list.append(pos)
                negative_list.append(neg)
                neutral_list.append(neu)
                browser.find_by_xpath(xpath1).fill(new_location)
                browser.find_by_xpath(xpath2).click()
                time.sleep(2)
                html = browser.html
                soup = BeautifulSoup(html, "html.parser")
                results2 = soup.find_all('div', class_="col-xs-3 col-sm-4 col-md-4")
        
                geocode_list.append(f'{results2 [5].text},{results2[7].text}')
                y = len(compound_list)
                z = len(geocode_list)
    print(time.ctime())
    print (y)
    print(z)
    dadumle= {'User Name': user_name[0:len(geocode_list)],
     "Tag" : tag_list[0:len(geocode_list)],
    'Time_Stamp': time_stamp[0:len(geocode_list)],
    'Text_Tweet': tweet_texts[0:len(geocode_list)],
    'Compound_Score':compound_list[0:len(geocode_list)],
    'Positive_Score':positive_list[0:len(geocode_list)],
    'Neutral_Score': neutral_list[0:len(geocode_list)],
    'Negative_Score':negative_list[0:len(geocode_list)],
    "Location" : locations[0:len(geocode_list)],
    "Geocode": geocode_list[0:len(geocode_list)]}
    df = pd.DataFrame(dadumle)
    new_df = df.drop_duplicates(keep='first')
    df_drops = new_df
    df_drops = df_drops[df_drops.Geocode != (',')]
    df_drops = df_drops[df_drops.Geocode != ('39.7837304', '-100.4458825')]
    new_list = []
    zek = df_drops["Tag"]
    for z in zek:
        if z =='"Bernie Sanders"':
            new_list.append("Bernie")
        elif z =='"Elizabeth Warren"':
            new_list.append("Warren")
        elif z =='"Andrew Yang"':
            new_list.append("Yang")
        elif z =='"Pete Buttigieg"':
            new_list.append("Buttigieg")
        else:
            new_list.append(z)
    df_drops["Better_Candidate_Names"] = new_list
    dadumle.update({"better_name": new_list})
    final_lat = []
    final_long = []
    better_geocodes = []
    for geo in df_drops["Geocode"]:
        lat = geo.split(",")[0]
        long = geo.split(",")[1]
        final_lat.append(lat)
        final_long.append(long)
        better_geocodes.append([float(lat),float(long)])
    df_drops["Final_Latitude"] =  final_lat
    df_drops["Final_Longitude"] =  final_long
    df_drops["Better_Geocodes"] =  better_geocodes
    dadumle.update({"final_lat": final_lat})
    dadumle.update({"final_long": final_long})
    dadumle.update({"better_geocodes": better_geocodes})
    df_drops = df_drops.reset_index()
    df_drops = df_drops.drop(columns=['index'])
    final_dict = jsonify(df_drops.to_dict(orient='list'))
    
    

    
    
    
    browser.quit()
    return final_dict
    

if __name__ == "__main__":
    app.run(debug=True)
