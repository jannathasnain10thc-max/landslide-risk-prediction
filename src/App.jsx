import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";

function App() {
   const [inputs, setInputs] = useState({
    rainfall: "",
    soil_moisture: "",
    slope: "",
    elevation: "",
    temperature: "",
    distance_river: "",
    vegetation: ""
  });
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
  e.preventDefault();

  // Check that all fields are filled
  if (Object.values(inputs).some((value) => value === "")) {
    alert("Please fill in all environmental parameters.");
    return;
  }
    if (
    Number(inputs.rainfall) < 0 ||
    Number(inputs.soil_moisture) < 0 ||
    Number(inputs.soil_moisture) > 100 ||
    Number(inputs.slope) < 0 ||
    Number(inputs.elevation) < 0 ||
    Number(inputs.distance_river) < 0 ||
    Number(inputs.vegetation) < 0 ||
    Number(inputs.vegetation) > 1
  ) {
    alert("Please enter valid environmental values.");
    return;
  }

  try {
  const response = await fetch("https://landslide-risk-prediction-1-fn6b.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rainfall: Number(inputs.rainfall),
          soil_moisture: Number(inputs.soil_moisture),
          slope: Number(inputs.slope),
          elevation: Number(inputs.elevation),
          temperature: Number(inputs.temperature),
          distance_river: Number(inputs.distance_river),
          vegetation: Number(inputs.vegetation),
        }),
      });

      if (!response.ok) {
  throw new Error("Prediction server returned an error.");
}

const data = await response.json();

setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Could not connect to the prediction server.");
    }
  };
   
  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⛰</span>
          <span>LANDSAFE</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#prediction">Prediction</a>
          <a href="#map">Risk Map</a>
          <a href="#alerts">Alerts</a>
          <a href="#about">About</a>
        </div>

        <button
  className="nav-button"
  onClick={() => {
    document.getElementById("prediction-form").scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Launch Dashboard
</button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">

          <div className="badge">
            <span>●</span> AI-POWERED EARLY WARNING SYSTEM
          </div>

          <h1>
            Predict Landslide Risk
            <br />
            <span>Before It Happens.</span>
          </h1>

          <p>
            An AI-powered landslide risk prediction platform that analyzes
            environmental conditions to identify potential hazards and
            support early decision-making.
          </p>

          <div className="hero-buttons">
   <button
  type="button"
  className="reset-button"
  onClick={() => {
    setInputs({
      rainfall: "",
      soil_moisture: "",
      slope: "",
      elevation: "",
      temperature: "",
      distance_river: "",
      vegetation: ""
    });
    setResult(null);
  }}
>
  Reset
</button>
   {result && (
  <div className={`prediction-result ${result.risk.toLowerCase()}`}>
    <h3>Prediction Result</h3>

    <div className="risk-value">
      {result.risk.toUpperCase()} RISK
    </div>

    <p>
      Model Confidence: <strong>{result.probability}%</strong>
    </p>
    <div className="confidence-bar">
  <div
    className={`confidence-fill ${result.risk.toLowerCase()}`}
    style={{ width: `${result.probability}%` }}
  ></div>
</div>

    <p>
  AI analysis of the provided environmental conditions.
</p>

{result.risk === "High" && (
  <p className="recommendation high-recommendation">
    ⚠️ Recommendation: Immediate monitoring and precautionary measures are advised.
  </p>
)}

{result.risk === "Medium" && (
  <p className="recommendation medium-recommendation">
    ⚠️ Recommendation: Continue monitoring environmental conditions and remain prepared.
  </p>
)}

{result.risk === "Low" && (
  <p className="recommendation low-recommendation">
    ✓ Recommendation: Current conditions indicate relatively low landslide risk.
  </p>
)}
  </div>
)}

            <button
  className="secondary-button"
  onClick={() => {
    document.getElementById("map").scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Explore Risk Map
</button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>7+</strong>
              <span>Environmental Parameters</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Machine Learning Model</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Risk Levels</span>
            </div>
          </div>

        </div>

        {/* Mountain Visual */}
        <div className="mountain-area">
          <div className="circle-glow"></div>

          <div className="mountain">
            <div className="peak peak-one"></div>
            <div className="peak peak-two"></div>
            <div className="peak peak-three"></div>
          </div>

          <div className="risk-card">
            <div className="risk-dot"></div>
            <div>
              <span>Current Risk Status</span>
              <strong>Monitoring Active</strong>
            </div>
          </div>
        </div>
        {result && (
  <div className={`prediction-result ${result.risk.toLowerCase()}`}>
    <h3>Prediction Result</h3>

    <div className="risk-value">
      {result.risk.toUpperCase()} RISK
    </div>

    <p>
      Model Confidence: <strong>{result.probability}%</strong>
    </p>

    <p>
      AI analysis of the provided environmental conditions.
    </p>
  </div>
)}
      </section>

      {/* Features */}
      <section className="features" id="prediction">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From Environmental Data to Early Warning</h2>
          <p>
            LANDSAFE combines environmental parameters with machine learning
            to estimate landslide risk.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🌧️</div>
            <h3>Environmental Data</h3>
            <p>
              Analyze rainfall
              , soil moisture, temperature and other
              environmental conditions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Prediction</h3>
            <p>
              Our machine learning model processes multiple parameters to
              estimate landslide risk.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚨</div>
            <h3>Early Warning</h3>
            <p>
              Identify high-risk conditions and provide actionable warnings
              for better preparedness.
            </p>
          </div>

        </div>
      </section>
      {/* Prediction Form */}
<section className="prediction-form-section" id="prediction-form">

  <div className="section-heading">
    <span>AI RISK PREDICTION</span>
    <h2>Check Landslide Risk</h2>
    <p>
      Enter environmental conditions to get an AI-powered risk prediction.
    </p>
  </div>

  <div className="prediction-form">

    <input
  type="number"
  placeholder="Rainfall (mm)"
  value={inputs.rainfall}
  onChange={(e) => setInputs({ ...inputs, rainfall: e.target.value })}
/>
    <input
  type="number"
  placeholder="Soil Moisture (%)"
  value={inputs.soil_moisture}
  onChange={(e) =>
    setInputs({ ...inputs, soil_moisture: e.target.value })
  }
/>
    <input
  type="number"
  placeholder="Slope (degrees)"
  value={inputs.slope}
  onChange={(e) =>
    setInputs({ ...inputs, slope: e.target.value })
  }
/>
    <input
  type="number"
  placeholder="Elevation (m)"
  value={inputs.elevation}
  onChange={(e) =>
    setInputs({ ...inputs, elevation: e.target.value })
  }
/>
    <input
  type="number"
  placeholder="Temperature (°C)"
  value={inputs.temperature}
  onChange={(e) =>
    setInputs({ ...inputs, temperature: e.target.value })
  }
/>
    <input
  type="number"
  placeholder="Distance from River (m)"
  value={inputs.distance_river}
  onChange={(e) =>
    setInputs({ ...inputs, distance_river: e.target.value })
  }
/>
    <input
  type="number"
  placeholder="Vegetation Index (0.1 - 0.9)"
  value={inputs.vegetation}
  onChange={(e) =>
    setInputs({ ...inputs, vegetation: e.target.value })
  }
/>

    <button
  type="button"
  className="primary-button"
  onClick={handlePredict}
>
  Predict Landslide Risk →
</button>

  </div>

</section>
{/* Risk Map */}
<section className="map-section" id="map">

  <div className="section-heading">
    <span>LANDSLIDE RISK MAP</span>
    <h2>Monitor High-Risk Areas</h2>
    <p>
      Visualize areas based on predicted landslide risk levels.
    </p>
  </div>
  {result && (
  <div className={`map-status ${result.risk.toLowerCase()}`}>
    <span>LIVE MODEL STATUS</span>
    <strong>{result.risk.toUpperCase()} RISK</strong>
    <p>
      Confidence: {result.probability}%
    </p>
  </div>
)}

  <MapContainer
  center={[28.6139, 77.2090]}
  zoom={5}
  className="risk-map"
>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* High Risk Zone */}
  <Circle
    center={[30.0668, 79.0193]}
    radius={30000}
    pathOptions={{
      color: "red",
      fillColor: "red",
      fillOpacity: 0.35
    }}
  >
    <Popup>
      <strong>🔴 High Risk Zone</strong>
      <br />
      Increased landslide monitoring required.
    </Popup>
  </Circle>

  {/* Medium Risk Zone */}
  <Circle
    center={[27.0238, 74.2179]}
    radius={25000}
    pathOptions={{
      color: "orange",
      fillColor: "orange",
      fillOpacity: 0.3
    }}
  >
    <Popup>
      <strong>🟡 Medium Risk Zone</strong>
      <br />
      Monitoring recommended.
    </Popup>
  </Circle>

  {/* Low Risk Zone */}
  <Circle
    center={[23.2599, 77.4126]}
    radius={20000}
    pathOptions={{
      color: "green",
      fillColor: "green",
      fillOpacity: 0.3
    }}
  >
    <Popup>
      <strong>🟢 Low Risk Zone</strong>
      <br />
      Relatively stable conditions.
    </Popup>
  </Circle>

</MapContainer>
<div className="map-legend">
  <h3>Risk Level</h3>

  <div>
    <span className="legend-dot low-dot"></span>
    Low Risk
  </div>

  <div>
    <span className="legend-dot medium-dot"></span>
    Medium Risk
  </div>

  <div>
    <span className="legend-dot high-dot"></span>
    High Risk
  </div>
</div>
  

</section>

      {/* Risk Levels */}
      <section className="risk-section" id="alerts">
        <div className="alert-banner">
  <div className="alert-icon">🚨</div>

  <div>
    <span>EARLY WARNING SYSTEM</span>
    <h3>
  {!result
    ? "Monitoring conditions for potential landslide hazards"
    : result.risk === "High"
    ? "High-risk conditions detected"
    : result.risk === "Medium"
    ? "Moderate-risk conditions detected"
    : "Conditions currently stable"}
</h3>
  <p>
  {!result
    ? "LANDSAFE analyzes environmental parameters to support early detection and disaster preparedness."
    : result.risk === "High"
    ? "Immediate monitoring and precautionary measures are recommended."
    : result.risk === "Medium"
    ? "Continue monitoring environmental conditions and remain prepared."
    : "Current environmental conditions indicate relatively low risk."}
</p>
  </div>

  <div className="alert-status">
    <span></span>
    SYSTEM ACTIVE
  </div>
</div>

        <div className="section-heading">
          <span>RISK CLASSIFICATION</span>
          <h2>Understand the Risk Level</h2>
        </div>

        <div className="risk-grid">

          <div className="risk-level low">
            <div className="risk-symbol">✓</div>
            <h3>LOW RISK</h3>
            <p>
              Environmental conditions indicate a relatively stable area.
            </p>
          </div>

          <div className="risk-level medium">
            <div className="risk-symbol">!</div>
            <h3>MEDIUM RISK</h3>
            <p>
              Conditions require monitoring and increased preparedness.
            </p>
          </div>

          <div className="risk-level high">
            <div className="risk-symbol">⚠</div>
            <h3>HIGH RISK</h3>
            <p>
              Conditions indicate elevated landslide risk and require
              immediate attention.
            </p>
          </div>

        </div>
      </section>

      {/* About */}
      <section className="about" id="about">

        <div>
          <span>ABOUT LANDSAFE</span>
          <h2>Technology for Safer Communities.</h2>
        </div>

        <p>
          LANDSAFE is a prototype AI-based landslide risk prediction system
          designed to support disaster preparedness. It combines
          environmental parameters with machine learning to classify
          potential landslide risk into Low, Medium and High categories.
        </p>

      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          <span className="logo-icon">⛰</span>
          <span>LANDSAFE</span>
        </div>

        <p>
          AI-Powered Landslide Risk Prediction & Early Warning System
        </p>

        <span>SIH Prototype • 2026</span>
      </footer>

    </div>
  );
}

export default App;