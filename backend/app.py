from __future__ import print_function
import json
from flask_cors import CORS
from fpdf import FPDF
from flask import Flask, request, render_template, Markup
import numpy as np
import pickle
import pandas as pd
from disease import disease_dic
from fertilizer import fertilizer_dic
import requests
import io
import torch
from torchvision import transforms
from PIL import Image
from model import ResNet9
from crop_predict import Crop_Predict
import os
from PIL import Image
import torchvision.transforms.functional as TF
import CNN

app = Flask(__name__)
CORS(app)

# Loading plant disease classification model
disease_classes = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

disease_model_path = "models/plant-disease-model.pth"
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(
    torch.load(disease_model_path, map_location=torch.device("cpu"))
)
disease_model.eval()

disease_info = pd.read_csv("disease_info.csv", encoding="cp1252")
supplement_info = pd.read_csv("supplement_info.csv", encoding="cp1252")

model = CNN.CNN(39)
model.load_state_dict(torch.load("models/diseaseV2.pt"))
model.eval()


def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index


# prediction function
def CropPredictor(to_predict_list):
    to_predict = np.array([to_predict_list])
    loaded_model = pickle.load(open("models/RandomForest.pkl", "rb"))
    result = loaded_model.predict(to_predict)
    return result[0]


def FertilizerPredictor(to_predict_list):
    to_predict = np.array([to_predict_list])
    loaded_model = pickle.load(open("models/classifier.pkl", "rb"))
    result = loaded_model.predict(to_predict)
    return result[0]


def WeatherPredictor(to_predict_list):
    to_predict = np.array([to_predict_list])
    loaded_model = pickle.load(open("models/weather.pkl", "rb"))
    result = loaded_model.predict(to_predict)
    return result[0]


def DiseasesPredictor(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label
    :params: image
    :return: prediction (string)
    """
    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.ToTensor(),
        ]
    )
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    # Retrieve the class label
    print(prediction)
    return prediction


# routing
@app.route("/", methods=["GET"])
def home():
    return "server started..."


@app.route("/crop-predict2", methods=["POST"])
def result():
    if request.method == "POST":
        print(request.json)
        to_predict_list = request.json
        to_predict_list = list(to_predict_list.values())
        to_predict_list = list(map(int, to_predict_list))
        result = CropPredictor(to_predict_list)
        return result


@app.route("/crop-predict", methods=["POST"])
def crop():
    model = Crop_Predict()
    if request.method == "POST":
        crop_name = model.crop()
        if crop_name == "noData":
            return -1

        return {
            "crop_name": crop_name,
            "no_of_crops": len(crop_name),
        }


@app.route("/fertilizer-predict", methods=["POST"])
def result2():
    if request.method == "POST":
        print(request.json)
        to_predict_list = request.json
        to_predict_list = list(to_predict_list.values())
        to_predict_list = list(map(int, to_predict_list))
        ans = FertilizerPredictor(to_predict_list)
        if ans == 0:
            return "10-26-26"
        elif ans == 1:
            return "14-35-14"
        elif ans == 2:
            return "17-17-17"
        elif ans == 3:
            return "20-20"
        elif ans == 4:
            return "28-28"
        elif ans == 5:
            return "DAP"
        else:
            return "Urea"


@app.route("/weather-predict", methods=["POST"])
def result3():
    if request.method == "POST":
        # print(request.json)
        # to_predict_list = request.json
        # to_predict_list = list(to_predict_list.values())
        to_predict_list = list(to_predict_list.values())
        weather = WeatherPredictor(to_predict_list)
        result = {"data": weather}
        return result


@app.route("/disease-predict", methods=["POST"])
def disease_prediction():
    title = " Disease Detection"

    if request.method == "POST":
        print(request.files)
        if "file" not in request.files:
            return "file not found"
        file = request.files.get("file")
        if not file:
            return "plz send image"
        try:
            img = file.read()
            print(file)

            prediction = DiseasesPredictor(img)
            print(prediction)

            prediction = Markup(str(disease_dic[prediction]))
            return {"prediction": prediction, "title": title}
        except:
            pass
    return render_template("disease.html", title=title)


@app.route("/disease-predict2", methods=["GET", "POST"])
def submit():
    if request.method == "POST":
        image = request.files["file"]
        filename = image.filename
        file_path = os.path.join("static/uploads", filename)
        image.save(file_path)
        print(file_path)
        pred = prediction(file_path)
        title = disease_info["disease_name"][pred]
        description = disease_info["description"][pred]
        prevent = disease_info["Possible Steps"][pred]
        image_url = disease_info["image_url"][pred]
        supplement_name = supplement_info["supplement name"][pred]
        supplement_image_url = supplement_info["supplement image"][pred]
        supplement_buy_link = supplement_info["buy link"][pred]
        print(pred)
        return {
            "title": title,
            "desc": description,
            "prevent": prevent,
            # "image_url": image_url,
            # "pred": pred,
            "sname": supplement_name,
            "simage": supplement_image_url,
            "buy_link": supplement_buy_link,
        }


@app.route("/price-predict", methods=["POST"])
def result4():
    if request.method == "POST":
        print(request.json)
        to_predict_list = request.json
        to_predict_list = list(to_predict_list.values())
        to_predict_list = list(map(int, to_predict_list))
        result = CropPredictor(to_predict_list)
        return result


@app.route("/forecast", methods=["POST"])
def forecast():
    # Get the user's location from the form
    location = request.form["location"]

    # Use the OpenWeatherMap API to get the weather forecast for the next 15 days
    api_key = "25a7391eb816518d0639ab3f83a31f42"
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={location}&cnt=15&appid={api_key}"
    response = requests.get(url)
    weather_data = response.json()

    # Extract the necessary information from the API response
    forecast = []
    for item in weather_data["list"]:
        forecast.append(
            {
                "date": item["dt_txt"],
                "temperature": item["main"]["temp"],
                "humidity": item["main"]["humidity"],
                "wind": item["wind"]["speed"],
            }
        )

    forecast = json.dumps(forecast)
    # Return the forecast to the user
    return forecast


if __name__ == "__main__":
    app.run()
