import { useState } from "react";
import { askQuestion }  from "../../services/api";

export const Home = () => {
  const [searchquery, setSearchquery] = useState("");
  const[loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const[error, setError] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearchquery(value);
  }

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    //check for empty input
    if(!searchquery.trim()){          //trim is used to remove whitespace from both ends of a string - not trim means input is empty
      setError("Please enter a question");
      return;
    }

    //clear previous error
    setError("");
    setAnswer("");
    setLoading(true);
    try{
      const response = await askQuestion(searchquery);
      setAnswer(response.response);
    }catch{
      setError("Error while fetching answer");
    }finally{
      setLoading(false);
    }    
    // console.log(response);
  }

  return (
    <div>
        {/* <h2>AI MYTHOLOGY ENGINE</h2>
        <p>Explore mythology using an AI-powered knowledge engine.</p> */}
        <form onSubmit={handleSearchSubmit}>
          <input value={searchquery} onChange={handleSearch} type="text" placeholder="Search" />
          <button type="submit">Search</button>
          {
            loading && <p>Searching...</p> 
          }
          {
            error && <p>{error}</p>
          }
        </form>
        <p>{answer}</p>
    </div>
  )
}
