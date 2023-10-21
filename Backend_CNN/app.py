from fastapi import FastAPI
from fastapi import UploadFile, File
import uvicorn
import io
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
from pydantic import BaseModel
from prediction_model import read_imagefile,predict

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api')
def hello():
    return 'hello world!!!'
@app.post('/api/predict')
async def predict_image(file: UploadFile = File()):
    image = read_imagefile(await file.read())
    prediction = predict(image)
    return prediction


if __name__ == '__main__':
    uvicorn.run(app,port=8000, host = '127.0.0.1')
