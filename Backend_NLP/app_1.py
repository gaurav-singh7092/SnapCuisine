import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from preprocessing_review import preprocess_review
from pydantic import BaseModel
import joblib
# Loaded Model

sentitment_model = joblib.load("./model/nlp_model_reviews.pkl")
cv = sentitment_model['count_vectorizer']
classifier = sentitment_model['classifier']

# Initialize App
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# GET Route


@app.get("/")
async def index():
    return {"Test": "Server is Running"}


class ReviewInput(BaseModel):
    customer_review: str

class ReviewOutput(BaseModel):
    sentiment_review: str
# Function to predict Sentiment


def process_sentiment(review):
    processed_review = preprocess_review(review)
    user_review = cv.transform([processed_review]).toarray()
    sentiment = classifier.predict(user_review)
    return sentiment

# Prediction Route


@app.post("/predict/", response_model=ReviewOutput)
def predict_sentiment(review_input: ReviewInput):
    processed_sentiment = process_sentiment(review_input.customer_review)
    if processed_sentiment[0] == 1:
        return {"sentiment_review": "Positive"}
    else:
        return {"sentiment_review": "Negative"}


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)
