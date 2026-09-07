# 🏔️ Landslide Risk Prediction System

A machine learning based web application for estimating landslide risk using environmental parameters.

## 📌 Project Overview

This project uses a Random Forest Classifier to predict landslide risk based on environmental conditions.

The system classifies the predicted risk into:

- 🟢 Low Risk
- 🟡 Medium Risk
- 🔴 High Risk

## 🌱 Input Features

The model uses seven environmental parameters:

1. Rainfall
2. Soil Moisture
3. Slope
4. Elevation
5. Temperature
6. Distance from River
7. Vegetation Index

## 🤖 Machine Learning Model

A Random Forest Classifier is used for landslide risk classification.

The prototype model was trained using a synthetically generated dataset.

### Model Evaluation

The model was evaluated using:

- Accuracy
- Classification Report
- Confusion Matrix
- Feature Importance

The prototype achieved approximately **88.5% accuracy** on the test dataset.

## 🖥️ Web Application

The project includes a React + Vite frontend connected to a Flask backend.

The application provides:

- Environmental parameter input
- Landslide risk prediction
- Model confidence
- Confidence visualization
- Interactive risk map
- Dynamic early warning system
- Risk-based recommendations
- Responsive interface

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS
- React Leaflet

### Backend
- Python
- Flask
- Flask-CORS

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

## ⚠️ Important Limitation

This project is a prototype developed using a synthetically generated dataset for educational and demonstration purposes.

It is **not a scientifically validated real-world landslide prediction system**.

## 🚀 Future Scope

- Integrate real-world landslide datasets
- Use satellite imagery
- Add GIS-based visualization
- Integrate real-time rainfall data
- Improve model validation
- Deploy the system as a cloud-based application
- Integrate real-time environmental monitoring

## 👥 Project Purpose

Developed as a prototype for demonstrating how machine learning and environmental data can support landslide risk assessment and early-warning systems.