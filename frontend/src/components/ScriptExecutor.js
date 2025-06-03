import React, { useState, useEffect } from "react";
import "./ScriptExecutor.css";

function ScriptExecutor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking...");

  // Check if backend is running
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/health");
      const data = await response.json();
      setBackendStatus("✅ Connected");
    } catch (err) {
      setBackendStatus("❌ Backend not running");
    }
  };

  const executeScript = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5002/api/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        console.log("✅ Script executed successfully:", data.output);
      } else {
        setError(data.error || "Script execution failed");
      }
    } catch (err) {
      setError("❌ Failed to connect to server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="script-executor">
      <div className="backend-status">
        <h3>🔗 Backend Status: {backendStatus}</h3>
        <button className="status-refresh-btn" onClick={checkBackendHealth}>
          Refresh Status
        </button>
      </div>

      <button
        className={`execute-btn ${loading ? "loading" : ""} ${backendStatus.includes("❌") ? "disabled" : ""}`}
        onClick={executeScript}
        disabled={loading || backendStatus.includes("❌")}
      >
        {loading ? "⏳ Executing Script..." : "🚀 Execute Shell Script"}
      </button>

      {/* Success Results */}
      {result && (
        <div className="result-success">
          <h3>✅ Success!</h3>
          <p>
            <strong>Message:</strong> {result.message}
          </p>
          <p>
            <strong>Executed at:</strong> {result.timestamp}
          </p>
          <p>
            <strong>Script Output:</strong>
          </p>
          <pre className="script-output">{result.output}</pre>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="result-error">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <p>
            <em>Make sure the Express backend is running on port 5000</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default ScriptExecutor;
