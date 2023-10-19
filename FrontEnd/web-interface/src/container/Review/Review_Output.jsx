import React from "react";

const ReviewOutput = ({ prediction }) => {
  let userSentiment;
  if (prediction === "Positive") {
    userSentiment =
      "Great! Your review is positive. Thank you for your feedback!";
  }
  if (prediction === "Negative") {
    userSentiment =
      "Oops! Your review is negative. We apologize for any inconvenience.";
  }
  return (
    <div>
      <h5 className="p__cormorant">{userSentiment} </h5>
    </div>
  );
};

export default ReviewOutput;
