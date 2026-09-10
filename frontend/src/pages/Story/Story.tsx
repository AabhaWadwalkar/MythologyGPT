import React, { useState } from "react"
import { storyGods } from "../../services/api";

export const Story = () => {
    const [storyinput, setStoryinput] = useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const [storyResult, setStoryresult] = useState("");


    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setStoryinput(e.target.value);
    }

    const storySubmit = async()=>{
        if(!storyinput.trim()){
            setError("Enter valid input");
            return;
        }
        setLoading(true);
        setError("");

        try{
          const topic = storyinput;
          const response = await storyGods(topic);
          console.log(response);
          setStoryresult(response.response);
          setStoryinput("");
        }catch{
            setError("Error in creating story");
        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
        <h2>Story</h2>
        <input placeholder="Enter your topic" value={storyinput} onChange={handleInputChange}/>
        <button onClick={storySubmit}>Create Story</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <p>{storyResult}</p>
    </div>
  )
}
