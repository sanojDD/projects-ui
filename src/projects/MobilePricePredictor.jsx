import { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import "./MobilePricePredictor.css";

const MobilePricePredictor = () => {
  // Load configuration from environment variables
  const SPACE_ID = import.meta.env.VITE_HF_SPACE_ID || "Sanoj111/mobile_prices";

  const [formData, setFormData] = useState({
    brand: "Apple",
    ram: 8,
    storage: 128,
    is_5g: false,
    is_ultra: false,
    is_pro: false,
    is_foldable: false,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | waking | predicting
  const [error, setError] = useState(null);

  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "OnePlus",
    "Google",
    "Nokia",
    "LG",
    "Sony",
    "Motorola",
    "Realme",
    "Vivo",
    "Oppo",
  ];

  // Cold Start: Trigger a connection as soon as the component mounts
  useEffect(() => {
    const warmUp = async () => {
      try {
        await Client.connect(SPACE_ID);
        console.log("Model Space is awake and ready.");
      } catch {
        console.log("Model is sleeping, will wake on first interaction.");
      }
    };
    warmUp();
  }, [SPACE_ID]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setPredictedPrice(null);
    setError(null);
    setStatus("idle");
  };

  const predictPrice = async () => {
    setIsLoading(true);
    setError(null);
    setStatus("waking");

    try {
      // Connect to Gradio Client
      const app = await Client.connect(SPACE_ID);

      setStatus("predicting");
      const result = await app.predict("/predict", [
        formData.brand,
        Number(formData.ram),
        Number(formData.storage),
        formData.is_5g,
        formData.is_ultra,
        formData.is_pro,
        formData.is_foldable,
      ]);

      // Safety check: extract string from object if gr.Label is used
      const rawOutput = result.data[0];
      const finalPrice =
        rawOutput && typeof rawOutput === "object"
          ? rawOutput.label
          : rawOutput;

      setPredictedPrice(finalPrice);
      setStatus("idle");
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        "The AI model is taking a moment to wake up. Please try again in a few seconds.",
      );
      setStatus("idle");

      // Fallback Demo Price
      setPredictedPrice(
        `NPR ${Math.floor(Math.random() * 100000).toLocaleString()} (Demo)`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predictor-container">
      <div className="glass-card">
        <div className="card-header">
          <div className="header-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <h2>Mobile Price Predictor</h2>
          <p>AI-powered valuation for the Nepal market</p>
        </div>

        <div className="form-content">
          {/* Brand Selection */}
          <div className="form-group">
            <label>Brand</label>
            <select
              value={formData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* RAM Slider */}
          <div className="form-group">
            <label>
              RAM: <span className="value-tag">{formData.ram} GB</span>
            </label>
            <input
              type="range"
              min="2"
              max="32"
              step="2"
              value={formData.ram}
              onChange={(e) =>
                handleInputChange("ram", parseInt(e.target.value))
              }
            />
          </div>

          {/* Storage Slider */}
          <div className="form-group">
            <label>
              Storage: <span className="value-tag">{formData.storage} GB</span>
            </label>
            <input
              type="range"
              min="32"
              max="2048"
              step="32"
              value={formData.storage}
              onChange={(e) =>
                handleInputChange("storage", parseInt(e.target.value))
              }
            />
          </div>

          {/* Features Checkboxes */}
          <div className="checkbox-grid">
            {["is_5g", "is_ultra", "is_pro", "is_foldable"].map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                />
                {key.replace("is_", "").replace("_", " ").toUpperCase()}
              </label>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={predictPrice}
            disabled={isLoading}
            className={`predict-btn ${isLoading ? "loading" : ""}`}
          >
            {status === "waking"
              ? "Waking up AI..."
              : status === "predicting"
                ? "Analyzing..."
                : "Predict Price"}
          </button>

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}

          {/* Prediction Result */}
          {predictedPrice && !error && (
            <div
              className={`result-box ${String(predictedPrice).includes("Demo") ? "demo-mode" : "live-mode"}`}
            >
              <span className="result-label">Estimated Market Value</span>
              <span className="result-value">
                {typeof predictedPrice === "number"
                  ? `NPR ${predictedPrice.toLocaleString()}`
                  : predictedPrice}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePricePredictor;
