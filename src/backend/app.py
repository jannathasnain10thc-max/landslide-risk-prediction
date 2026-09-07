from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load("src/backend/landslide_model.pkl")


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


if __name__ == "__main__":
    app.run(port=5000, debug=True)
   