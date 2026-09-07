from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import psycopg2

app = Flask(__name__)
CORS(app, origins="*")

# Load trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "landslide_model.pkl")
model = joblib.load(MODEL_PATH)


# Connect to PostgreSQL
def get_db_connection():
    return psycopg2.connect(os.environ.get("DATABASE_URL"))


# Create database table
def create_table():
    database_url = os.environ.get("DATABASE_URL")

    if not database_url:
        print("DATABASE_URL not found. Running without database.")
        return

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id SERIAL PRIMARY KEY,
            rainfall FLOAT,
            soil_moisture FLOAT,
            slope FLOAT,
            elevation FLOAT,
            temperature FLOAT,
            distance_river FLOAT,
            vegetation FLOAT,
            risk VARCHAR(20),
            probability FLOAT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    cur.close()
    conn.close()


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

    # Save prediction to PostgreSQL
   
conn = get_db_connection()
cur = conn.cursor()
# Create table if it does not exist
cur.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        rainfall FLOAT,
        soil_moisture FLOAT,
        slope FLOAT,
        elevation FLOAT,
        temperature FLOAT,
        distance_river FLOAT,
        vegetation FLOAT,
        risk VARCHAR(20),
        probability FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create table if it does not exist
cur.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        rainfall FLOAT,
        soil_moisture FLOAT,
        slope FLOAT,
        elevation FLOAT,
        temperature FLOAT,
        distance_river FLOAT,
        vegetation FLOAT,
        risk VARCHAR(20),
        probability FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

cur.execute("""
    INSERT INTO predictions (
            rainfall,
            soil_moisture,
            slope,
            elevation,
            temperature,
            distance_river,
            vegetation,
            risk,
            probability
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        data["rainfall"],
        data["soil_moisture"],
        data["slope"],
        data["elevation"],
        data["temperature"],
        data["distance_river"],
        data["vegetation"],
        str(prediction),
        round(probability, 2)
    ))

conn.commit()
cur.close()
conn.close()


return jsonify({
        "risk": prediction,
        "probability": round(probability, 2)
    })


# Create table when application starts
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)