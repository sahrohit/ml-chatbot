from urllib import request
from flask import Flask, request, jsonify
import random
import json
from requests.models import Response
import torch
from werkzeug.wrappers import response
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from flask_cors import CORS
import requests
from os import environ
import datetime

app = Flask("chat_bot")
CORS(app)


@app.route("/", methods=["GET"])
def ping():
    return "Pinging Model Application"


@app.route("/api/generate", methods=["POST"])
def api():

    input_json = request.json
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    with open("intents.json", "r") as f:
        intents = json.load(f)

    FILE = "data.pth"
    data = torch.load(FILE)

    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    all_words = data["all_words"]
    tags = data["tags"]
    model_state = data["model_state"]

    model = NeuralNet(input_size, hidden_size, output_size).to(device)
    model.load_state_dict(model_state)
    model.eval()

    sentence = input_json["question"]
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.50:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                result = random.choice(intent["responses"])
                isAnswered = True
                probableAnswer = None
    else:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                probableAnswer = random.choice(intent["responses"])
        result = "I have no idea..."
        isAnswered = False

    if not request.headers.getlist("X-Forwarded-For"):
        ip = request.remote_addr
    else:
        ip = request.headers.getlist("X-Forwarded-For")[0]

    try:
        geoDataResponse = requests.get(f"http://www.geoplugin.net/json.gp?ip={ip}")
        geoData = json.loads(geoDataResponse.text)
    except:
        print("Error getting Geo Data")

    response = {
        "answer": result,
        "probableAnswer": probableAnswer,
        "probability": prob.item(),
        "isAnswered": isAnswered,
    }
    database_data = {
        "question": input_json["question"],
        "response": result,
        "probableAnswer": probableAnswer,
        "probability": prob.item(),
        "isAnswered": isAnswered,
        "timestamp": datetime.datetime.now().timestamp(),
        "ipAddress": ip,
        "geoData": geoData,
    }

    try:
        requests.post(
            environ.get("DATABASE_URL"),
            data=json.dumps(database_data),
        )
    except:
        print("Couldn't Write to the Database")

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=9696)
