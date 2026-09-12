// import {useState} from "react";
// import { compareGods } from "../../services/api";


// export const Compare = () => {
//   const[god1, setGod1] = useState<string>("");
//   const[god2, setGod2] = useState<string>("");
//   const[comparisonResult, setComparisonResult] = useState<string>("");
//   const[loading, setLoading] = useState(false);
//   const[error, setError] = useState("");

//   const handleGod1Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
//     setGod1(e.target.value);
//   }

//     const handleGod2Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
//       setGod2(e.target.value);
//   }

//   const handleCompare = async()=>{
//     if (!god1.trim() || !god2.trim()) {
//       setError("Enter both god names");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setComparisonResult("");

//     try{
//       const response = await compareGods(god1,god2);
//       console.log("RESSSSS:", response)
//       console.log("Responnnnnnnnnse:",response.response)
//       setComparisonResult(response.response);
//     }
//     catch{
//       setError("Error in comparing gods");
//     }finally{
//       setLoading(false);
//     }
//   }
//   return (
//     <div>
//       <h2>Compare Gods</h2>
//       <input placeholder="Enter God1 value" value={god1} onChange={handleGod1Change}/>
//       <input placeholder="Enter God2 value" value={god2} onChange={handleGod2Change}/>
//       <button onClick={handleCompare} disabled={loading} >Compare</button>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div style={{whiteSpace: "pre-wrap" }}>{comparisonResult}</div>
//     </div>
//   )
// }
import { useState } from "react";
import { compareGods } from "../../services/api";
import "../../CSS/Compare.css";

export const Compare = () => {
  const [god1, setGod1] = useState<string>("");
  const [god2, setGod2] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGod1Change = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGod1(e.target.value);
  };

  const handleGod2Change = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGod2(e.target.value);
  };

  const handleCompare = async () => {
    if (!god1.trim() || !god2.trim()) {
      setError("Enter both god names");
      return;
    }

    setLoading(true);
    setError("");
    setComparisonResult("");

    try {
      const response = await compareGods(god1, god2);
      setComparisonResult(response.response);
    } catch {
      setError("Error in comparing gods");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compare-page">

      {/* Header */}
      <section className="compare-header">
        <div className="compare-symbol">✦</div>

        <p className="compare-eyebrow">
          MYTHOLOGY COMPARISON
        </p>

        <h1>Compare Mythological Figures</h1>

        <p>
          Explore the similarities and differences between two
          mythological figures using the knowledge engine.
        </p>
      </section>

      {/* Comparison Input */}
      <section className="compare-section">

        <div className="comparison-input-card card">

          <div className="god-input">
            <label>First Figure</label>

            <input
              type="text"
              placeholder="Enter a god name..."
              value={god1}
              onChange={handleGod1Change}
            />
          </div>

          <div className="vs-symbol">
            VS
          </div>

          <div className="god-input">
            <label>Second Figure</label>

            <input
              type="text"
              placeholder="Enter a god name..."
              value={god2}
              onChange={handleGod2Change}
            />
          </div>

        </div>

        <div className="compare-action">
          <button
            className="primary-button"
            onClick={handleCompare}
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare Figures"}
          </button>
        </div>

        {error && (
          <div className="compare-error">
            {error}
          </div>
        )}

        {loading && (
          <div className="compare-loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

      </section>

      {/* Result */}
      {comparisonResult && !loading && (
        <section className="comparison-result-section">

          <div className="result-heading">
            <p className="compare-eyebrow">
              KNOWLEDGE ENGINE ANALYSIS
            </p>

            <h2>
              {god1} <span>vs</span> {god2}
            </h2>
          </div>

          <div className="comparison-result card">
            <div className="result-symbol">✦</div>

            <div className="result-text">
              {comparisonResult}
            </div>
          </div>

        </section>
      )}

      {/* Empty state */}
      {!comparisonResult && !loading && !error && (
        <section className="compare-empty">
          <div className="empty-line"></div>

          <p>
            Enter two mythological figures above to begin your
            comparison.
          </p>
        </section>
      )}

    </div>
  );
};