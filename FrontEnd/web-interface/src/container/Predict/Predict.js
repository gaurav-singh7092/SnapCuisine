import React, { useState , useEffect} from "react";
import "../Review/Review.css";
import axios from "axios";

function Predict() {
  const [image, setImage] = useState("");  
  const [displayImage, setDisplayImage] = useState("");
  const [confidence, setConfidence] = useState("");
  const [prediction , setPrediction] = useState("");

  useEffect(() => {
  setConfidence("");
  setPrediction("");
  }, [displayImage]);


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const fileInput = document.getElementById('yourFileInput'); 
    setImage(selectedImage); 
    setDisplayImage(URL.createObjectURL(selectedImage));
  };

  const handlePredictionImage = async () => {
     try {
      const formData = new FormData();
      formData.append('file',image);
       const response = await axios.post("http://localhost:8000/api/predict", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       });

       console.log(response.data[0] , 'kkkk');
  
     setConfidence(response.data[0].confidence);
     setPrediction(response.data[0].class);

       console.log(confidence, "confidence");
console.log(prediction, "prediction");


     } catch (error) {
       console.error("Error predicting sentiment:", error);
     }
  }

  return (
    <div className="app__review_bg  flex flex-col items-center" id="predict" style={{ paddingTop: "40px" }}>
      <div className="app__review flex flex-col  items-center">
        <div className="app__review-heading">
          <h4 className="headtext__cormorant">Predict Food</h4>
        </div>
        <div className="flex flex-col w-full items-center  gap-8 mb-4 ">
          <input
            type="file"
            onChange={handleImageChange}
            className=""
          >
            </input>

          {image && (
            <img
              src={displayImage}
              placeholder="Upload Image"
              alt="Uploaded Preview"
              className="w-[38vw]"
            />
          )}
        </div>

        <button
          type="button"
          className="custom__button"
          onClick={() => handlePredictionImage()}
          style={{ margin: "auto", marginTop: "20px" }}
        >
          <span className="p__cormorant">Get Prediction</span>
        </button>

{confidence ? <div className="flex flex-col gap-2 !text-[1.2rem] text-white app__review-heading ">

<h4 className="headtext__cormorant">Predicted Food :{prediction}</h4>

<h4 className="headtext__cormorant">Confidence Level :{confidence}</h4>

</div> : null }



        
      
      </div>
    </div>
  );
}

export default Predict;
