# -*- coding: utf-8 -*-
"""Copy_of_natural_language_processing.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/github/Wise-Wizard/NLP-Model/blob/main/Copy_of_natural_language_processing.ipynb

# Natural Language Processing

## Importing the libraries
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

"""## Importing the dataset"""

dataset = pd.read_csv('Restaurant_Reviews.tsv', delimiter = '\t', quoting = 3)

"""## Cleaning the texts"""

import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")

corpus = []
lemmatizer = WordNetLemmatizer()
for review in dataset["Review"]:
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
    corpus.append(review)

"""## Creating the Bag of Words model"""

# Define a function to preprocess the review
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

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, -1].values

"""## Splitting the dataset into the Training set and Test set"""

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

"""## Training the Naive Bayes model on the Training set"""

from sklearn.svm import LinearSVC

# Create the LinearSVC classifier
classifier = LinearSVC()

# Fit the classifier to the training data
classifier.fit(X_train, y_train)

"""## Predicting the Test set results"""

y_pred = classifier.predict(X_test)

"""## Making the Confusion Matrix"""

from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
accuracy_score(y_test, y_pred)

# Single review to predict
single_review = "Service could be better, food not great and food was cold"

# Preprocess the single review
processed_review = preprocess_review(single_review)

# Transform the processed review using the CountVectorizer
X_single = cv.transform([processed_review]).toarray()

# Predict the sentiment of the single review
prediction = classifier.predict(X_single)

# Display the prediction (1 for positive sentiment, 0 for negative sentiment)
if prediction[0] == 1:
    print("Positive sentiment")
else:
    print("Negative sentiment")

import joblib

# Create a dictionary to store both CountVectorizer and classifier
model_data = {
    'count_vectorizer': cv,
    'classifier': classifier
}

# Save the dictionary to a single pickle file
filename = 'nlp_model_reviews.pkl'
joblib.dump(model_data, filename)

print("Model saved as", filename)