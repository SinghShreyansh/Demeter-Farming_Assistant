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
import openai
import datetime
from dotenv import load_dotenv
import os

load_dotenv()


# fruit disease prediction

# import tensorflow as tf

# from tensorflow.compat.v1 import ConfigProto
# from tensorflow.compat.v1 import InteractiveSession

# config = ConfigProto()
# config.gpu_options.per_process_gpu_memory_fraction = 0.2
# config.gpu_options.allow_growth = True
# session = InteractiveSession(config=config)
# # Keras
# from tensorflow.keras.applications.resnet50 import preprocess_input
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Model saved with Keras model.save()
# MODEL_PATH ='./test.h5'

# Load your trained model
# model = load_model(MODEL_PATH)

# def model_predict(img_path, model):
#     print(img_path)
#     img = image.load_img(img_path, target_size=(512, 512))
#     # Preprocessing the image
#     x = image.img_to_array(img)
#     # x = np.true_divide(x, 255)
#     ## Scaling
#     x=x/255
#     x = np.expand_dims(x, axis=0)


#     # Be careful how your trained model deals with the input
#     # otherwise, it won't make correct prediction!
#    # x = preprocess_input(x)

#     preds = model.predict(x)
#     preds=np.argmax(preds, axis=1)
#     if preds==0:
#         preds="Brownspot"
#     elif preds==1:
#         preds="Healthy"
#     else :
#         preds="Woodiness"


#     return preds


# @app.route('/predict-fruit-disease', methods=["POST"])
# def upload():
#     if request.method == "POST":
#         # Get the file from post request
#         print("dfdsf")
#         # print(request.files)
#         # if "file" not in request.files:
#         #     return "file not found"
#         file = request.files.get("file")

#         basepath = os.path.dirname(__file__)
#         file_path = os.path.join(basepath, 'uploads', secure_filename(file.filename))
#         file.save(file_path)

#         # Make prediction
#         preds = model_predict(file_path, model)
#         result=preds
#         print(result)
#         return result

#         # # Save the file to ./uploads

#         # # f.save(file_path)

#         # # Make prediction

#     return "hello"


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
        location = request.json["location"]
        del to_predict_list["location"]
        to_predict_list = list(to_predict_list.values())

        # Use the OpenWeatherMap API to get the weather forecast for the next 15 days
        api_key = os.getenv("OPEN_WEATHER_API_KEY")
        url = f"http://api.openweathermap.org/data/2.5/forecast?q={location}&cnt=15&appid={api_key}"
        response = requests.get(url)
        weather_data = response.json()

        print((float(weather_data["list"][0]["main"]["temp"]) - 273.15))
        Temp = float(weather_data["list"][0]["main"]["temp"]) - 273.15
        Hum = weather_data["list"][0]["main"]["humidity"]
        to_predict_list.append(Temp)
        to_predict_list.append(Hum)
        print(to_predict_list)

        to_predict_list = list(map(int, to_predict_list))

        ans = FertilizerPredictor(to_predict_list)

        fertilizer_info = {"name": "", "img": ""}
        if ans == 0:
            response = openai.Image.create(
                prompt="10-26-26 fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "10-26-26",
                "img": response["data"][0]["url"],
                "how_to_use": "To use 10-26-26 fertilizer, you will need to mix it with water according to the instructions on the package. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of 10-26-26 fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7.",
            }
        elif ans == 1:
            response = openai.Image.create(
                prompt="14-35-14 fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "14-35-14",
                "img": response["data"][0]["url"],
                "how_to_use": "14-35-14 is a type of water-soluble fertilizer that contains 14% nitrogen, 35% phosphorous, and 14% potassium. To use it, you will need to mix it with water according to the instructions on the label. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of 14-35-14 fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used properly.",
            }
        elif ans == 2:
            response = openai.Image.create(
                prompt="17-17-17 fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "17-17-17",
                "img": response["data"][0]["url"],
                "how_to_use": "7-17-17 fertilizer is a water-soluble fertilizer that contains 7% nitrogen, 17% phosphorous, and 17% potassium. To use it, you will need to mix it with water according to the instructions on the label. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of 7-17-17 fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used properly. It's important to keep in mind that 7-17-17 ratio is lower in nitrogen than other ratio, that's why it's a good idea to use this fertilizer when the plant is in the blooming or fruiting stage and not in the vegetative stage.",
            }
        elif ans == 3:
            response = openai.Image.create(
                prompt="20-20 fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "20-20",
                "img": response["data"][0]["url"],
                "how_to_use": "20-20 fertilizer is a water-soluble fertilizer that contains equal amounts of Nitrogen (N) and Potassium (K) which is 20% each. It's important to note that this fertilizer does not contain any Phosphorus (P). To use it, you will need to mix it with water according to the instructions on the label. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of 20-20 fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used properly. It's important to keep in mind that 20-20 ratio is higher in Potassium (K) than Nitrogen(N), that's why it's a good idea to use this fertilizer when the plant is in the blooming or fruiting stage and not in the vegetative stage.",
            }
        elif ans == 4:
            response = openai.Image.create(
                prompt="28-28 fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "28-28",
                "img": response["data"][0]["url"],
                "how_to_use": "28-28 fertilizer is a water-soluble fertilizer that contains equal amounts of Nitrogen (N) and Potassium (K) which is 28% each. It's important to note that this fertilizer does not contain any Phosphorus (P). To use it, you will need to mix it with water according to the instructions on the label. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of 28-28 fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used improperly. It's important to keep in mind that 28-28 ratio is higher in Nitrogen (N) and Potassium (K) than other ratios, that's why it's a good idea to use this fertilizer when the plant is in the vegetative stage and not in the blooming or fruiting stage. It's also important to note that this fertilizer does not contain Phosphorus (P), which is important for root growth and seed production, so you may need to supplement with additional fertilizer that contains P.",
            }
        elif ans == 5:
            response = openai.Image.create(
                prompt="DAP fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "DAP",
                "img": response["data"][0]["url"],
                "how_to_use": "DAP (diammonium phosphate) fertilizer is a water-soluble fertilizer that contains 18% Nitrogen (N) and 46% Phosphorus (P) . To use it, you will need to mix it with water according to the instructions on the label. The package will have a recommended mixing ratio, such as 1 tablespoon per gallon of water. For example, if you want to make a gallon of solution and package says to use 1 tablespoon per gallon, you would need to use 1 tablespoon of DAP fertilizer and 1 gallon of water. Then you can use the solution to water your plants or apply it to the foliage. It's important to note that different plants have different needs, and the amount of fertilizer you use should be adjusted accordingly. Also, be sure to not over-fertilize, as it can burn the plants. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used improperly. It's important to keep in mind that DAP is high in Phosphorus (P) than Nitrogen(N), that's why it's a good idea to use this fertilizer when the plant is in the blooming or fruiting stage and not in the vegetative stage.",
            }
        else:
            response = openai.Image.create(
                prompt="Urea fertilizer",
                n=1,
                size="256x256",
            )
            return {
                "name": "Urea",
                "img": response["data"][0]["url"],
                "how_to_use": "Urea is a type of nitrogen fertilizer that is commonly used in agriculture. It is typically applied in granular form, although it can also be found in liquid or pellet form. To use urea fertilizer, you will need to spread it evenly over the soil and then till or rake it into the top few inches of soil. The recommended application rate will vary depending on the type of crop you are growing and the stage of growth it is in, so it's important to consult the instructions on the package or consult with your local agricultural extension agent. It's recommended to apply Urea fertilizer when the soil is moist and the weather is mild, in order to avoid loss of nitrogen due to volatilization. It's also important to note that Urea fertilizer should not be applied to dry soil or to the foliage of plants, as this can cause damage. It's also a good idea to check the pH level of your soil and adjust it if necessary. As a general rule, most plants prefer a pH between 6 and 7. Be sure to follow the instructions on the label and use caution when handling any fertilizer, as they can be harmful if not used properly.",
            }


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
        openai.api_key = os.getenv("OPENAI_API_KEY")
        instructions = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"how to use {supplement_name}",
            max_tokens=200,
            temperature=0,
        )
        print(instructions)
        return {
            "title": title,
            "desc": description,
            "prevent": prevent,
            # "image_url": image_url,
            # "pred": pred,
            "sname": supplement_name,
            "simage": supplement_image_url,
            "buy_link": supplement_buy_link,
            "how_to_use": instructions.choices[0].text,
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
    location = request.json["location"]

    # Use the OpenWeatherMap API to get the weather forecast for the next 15 days
    api_key = os.getenv("OPEN_WEATHER_API_KEY")
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

    month = datetime.datetime.now().month
    hemisphere = "north"

    # Determine the season based on the month and hemisphere
    if (month >= 3 and month <= 6) and hemisphere == "north":
        climate = "summer"
    elif (month >= 7 and month <= 10) and hemisphere == "north":
        climate = "rainy"
    elif (
        month == 11 or month == 12 or month == 1 or month == 2
    ) and hemisphere == "north":
        climate = "winter"

    temperature = forecast[0]["temperature"]
    openai.api_key = os.getenv("OPENAI_API_KEY")
    instructions = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"aggricultural conditions based on {temperature} kelvin and {climate} climate",
        max_tokens=1000,
        temperature=0,
    )
    analysis = instructions.choices[0].text
    forecast = json.dumps(forecast)
    # Return the forecast to the user
    return [forecast, analysis]


if __name__ == "__main__":
    app.run()
