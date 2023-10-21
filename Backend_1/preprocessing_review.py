# preprocessing.py
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")

def preprocess_review(review):
    lemmatizer = WordNetLemmatizer()
    # Remove non-alphabet characters and digits
    review = re.sub('[^a-zA-Z]', ' ', review)
    # Convert to lowercase and tokenize
    review = nltk.word_tokenize(review.lower())
    # Lemmatize and remove stopwords
    all_stopwords = set(stopwords.words('english'))
    all_stopwords.remove('not')
    review = [lemmatizer.lemmatize(word) for word in review if word not in all_stopwords and len(word) > 2]
    # Join the processed words back into a sentence
    review = " ".join(review)
    return review
