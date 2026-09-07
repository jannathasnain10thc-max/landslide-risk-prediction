from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app, origins="*")

# Load your trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "landslide_model.pkl")
model = joblib.load(MODEL_PATH)


@app.route("/")
def home():
    return "Landslide Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_data = pd.DataFrame({
        "Rainfall_mm": [data["rainfall"]],
        "Soil_Moisture": [data["soil_moisture"]],
        "Slope_Degree": [data["slope"]],
        "Elevation_m": [data["elevation"]],
        "Temperature_C": [data["temperature"]],
        "Distance_From_River_m": [data["distance_river"]],
        "Vegetation_Index": [data["vegetation"]]
    })

    prediction = model.predict(input_data)[0]
    probabilities = model.predict_proba(input_data)[0]

    probability = max(probabilities) * 100

    return jsonify({
        "risk": prediction,
        "probability": round(probability, 2)
    })


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)