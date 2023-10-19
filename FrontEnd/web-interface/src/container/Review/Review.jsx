import React, { useState } from "react";
import ReviewOutput from "./Review_Output";
import axios from "axios";
import "./Review.css";

const Review = () => {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const handlePredict = async (review) => {
    try {
      const response = await axios.post("http://localhost:8000/predict/", {
        customer_review: review,
      });

      const sentiment = response.data.sentiment_review;
      setPrediction(sentiment);
    } catch (error) {
      console.error("Error predicting sentiment:", error);
      setPrediction(null);
    }
  };

  return (
    <div className="app__review_bg" id="review">
      <div className="app__review">
        <div className="app__review-heading">
          <h4 className="headtext__cormorant">Leave a Review 🌟 </h4>
        </div>
        <textarea
          rows="5"
          cols="100"
          placeholder="Enter your restaurant review here..."
          value={review}
          onChange={handleInputChange}
          className="app__review-input"
        ></textarea>
        <button
          type="button"
          className="custom__button"
          onClick={() => handlePredict(review)} // Pass review to the handler
          style={{ margin: "auto", marginTop: "20px" }}
        >
          <span className="p__cormorant">Submit Review</span>
        </button>
        <div style={{ marginTop: "25px" }}>
          {prediction !== null && <ReviewOutput prediction={prediction} />}
        </div>
      </div>
    </div>
  );
};

export default Review;
