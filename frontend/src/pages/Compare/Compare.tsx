import {useState} from "react";
import { compareGods } from "../../services/api";


export const Compare = () => {
  const[god1, setGod1] = useState<string>("");
  const[god2, setGod2] = useState<string>("");
  const[comparisonResult, setComparisonResult] = useState<string>("");
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  const handleGod1Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setGod1(e.target.value);
  }

    const handleGod2Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setGod2(e.target.value);
  }

  const handleCompare = async()=>{
    if (!god1.trim() || !god2.trim()) {
      setError("Enter both god names");
      return;
    }

    setLoading(true);
    setError("");
    setComparisonResult("");

    try{
      const response = await compareGods(god1,god2);
      console.log("RESSSSS:", response)
      console.log("Responnnnnnnnnse:",response.response)
      setComparisonResult(response.response);
    }
    catch{
      setError("Error in comparing gods");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <h2>Compare Gods</h2>
      <input placeholder="Enter God1 value" value={god1} onChange={handleGod1Change}/>
      <input placeholder="Enter God2 value" value={god2} onChange={handleGod2Change}/>
      <button onClick={handleCompare} disabled={loading} >Compare</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div style={{whiteSpace: "pre-wrap" }}>{comparisonResult}</div>
    </div>
  )
}
