import { useState } from "react";
import axios from "axios";
import { Loader2, ShieldCheck, Upload, AlertTriangle } from "lucide-react";
import "./DeepfakeDetector.css";

const DeepfakeDetector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Backend Error:", error);
      alert(
        "Backend is waking up or connection failed. Please try again in a few seconds.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="glass-card">
        <div className="card-header">
          <ShieldCheck size={40} className="header-icon" />
          <h2>Deepfake Face Detector</h2>
          <p>Analyze images for AI-generated manipulations</p>
        </div>

        <div className="upload-zone">
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Upload size={20} /> {file ? "Change Image" : "Select Image"}
          </label>
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-img" />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="analyze-button"
        >
          {loading ? (
            <>
              <Loader2 className="spinner" /> Analyzing...
            </>
          ) : (
            "Run Detection"
          )}
        </button>

        {result && (
          <div className={`result-display ${result.prediction.toLowerCase()}`}>
            {result.prediction === "FAKE" ? (
              <AlertTriangle size={24} />
            ) : (
              <ShieldCheck size={24} />
            )}
            <div>
              <span className="label">Result: {result.prediction}</span>
              <span className="confidence">
                Confidence: {result.confidence}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// CRITICAL: This allows App.jsx to see this component
export default DeepfakeDetector;
