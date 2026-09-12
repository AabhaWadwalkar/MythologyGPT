// import React, { useState } from "react"
// import { storyGods } from "../../services/api";

// export const Story = () => {
//     const [storyinput, setStoryinput] = useState("");
//     const[loading, setLoading] = useState(false);
//     const[error, setError] = useState("");
//     const [storyResult, setStoryresult] = useState("");


//     const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
//         setStoryinput(e.target.value);
//     }

//     const storySubmit = async()=>{
//         if(!storyinput.trim()){
//             setError("Enter valid input");
//             return;
//         }
//         setLoading(true);
//         setError("");

//         try{
//           const topic = storyinput;
//           const response = await storyGods(topic);
//           console.log(response);
//           setStoryresult(response.response);
//           setStoryinput("");
//         }catch{
//             setError("Error in creating story");
//         }finally{
//             setLoading(false);
//         }
//     }
//   return (
//     <div>
//         <h2>Story</h2>
//         <input placeholder="Enter your topic" value={storyinput} onChange={handleInputChange}/>
//         <button onClick={storySubmit}>Create Story</button>
//         {loading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//         <p>{storyResult}</p>
//     </div>
//   )
// }
import React, { useState } from "react";
import { storyGods } from "../../services/api";
import "../../CSS/Story.css";

export const Story = () => {
  const [storyinput, setStoryinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storyResult, setStoryresult] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStoryinput(e.target.value);
  };

  const storySubmit = async () => {
    if (!storyinput.trim()) {
      setError("Enter valid input");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const topic = storyinput;
      const response = await storyGods(topic);

      setStoryresult(response.response);
      setStoryinput("");
    } catch {
      setError("Error in creating story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story-page">

      {/* Header */}
      <section className="story-header">
        <div className="story-symbol">✦</div>

        <p className="story-eyebrow">
          AI MYTHOLOGY STORYTELLER
        </p>

        <h1>Bring Mythology to Life</h1>

        <p>
          Enter a mythological topic and let the knowledge engine
          transform it into an engaging story.
        </p>
      </section>

      {/* Story Generator */}
      <section className="story-generator">

        <div className="story-input-card card">

          <label htmlFor="story-topic">
            What story would you like to explore?
          </label>

          <div className="story-input-row">
            <input
              id="story-topic"
              placeholder="e.g. The battle between Zeus and Cronus"
              value={storyinput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  storySubmit();
                }
              }}
              disabled={loading}
            />

            <button
              className="primary-button"
              onClick={storySubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Story"}
            </button>
          </div>

          <p className="story-input-hint">
            Try a god, event, relationship, legend, or mythological
            topic.
          </p>

        </div>

        {error && (
          <div className="story-error">
            {error}
          </div>
        )}

        {loading && (
          <div className="story-loading">
            <div className="story-loading-symbol">✦</div>

            <p>
              Weaving your mythological story...
            </p>

            <div className="story-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

      </section>

      {/* Story Result */}
      {storyResult && !loading && (
        <section className="story-result-section">

          <div className="story-result-heading">
            <p className="story-eyebrow">
              YOUR MYTHOLOGICAL STORY
            </p>

            <h2>{storyinput || "Mythological Tale"}</h2>
          </div>

          <article className="story-result card">

            <div className="story-ornament">
              ✦
            </div>

            <div className="story-text">
              {storyResult}
            </div>

            <div className="story-ending">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>

          </article>

        </section>
      )}

      {/* Empty State */}
      {!storyResult && !loading && !error && (
        <section className="story-empty">

          <div className="story-empty-line"></div>

          <p>
            Enter a topic above to begin your mythological journey.
          </p>

        </section>
      )}

    </div>
  );
};