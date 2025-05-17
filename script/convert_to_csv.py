import json
import pandas as pd

with open("./data/ewallet_playstore_reviews.json") as f:
    data = json.load(f)

df = pd.DataFrame(data)

def get_sentiment(score):
    if score <= 2:
        return "Negatif"
    elif score >= 4:
        return "Positif"
    else:
        return "Netral"

df["Sentiment"] = df["Rating"].apply(get_sentiment)

df["ReviewLength"] = df["Review"].apply(lambda x: len(x.split()) if isinstance(x, str) else 0)
df["ReviewCharCount"] = df["Review"].apply(lambda x: len(x) if isinstance(x, str) else 0)

df.to_csv("ewallet_playstore_reviews.csv", index=False)
