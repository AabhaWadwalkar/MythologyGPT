// import { useState } from "react";
// import { askQuestion }  from "../../services/api";

// export const Home = () => {
//   const [searchquery, setSearchquery] = useState("");
//   const[loading, setLoading] = useState(false);
//   const [answer, setAnswer] = useState("");
//   const[error, setError] = useState("");

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
//     const value = e.target.value;
//     setSearchquery(value);
//   }

//   const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
//     e.preventDefault();

//     //check for empty input
//     if(!searchquery.trim()){          //trim is used to remove whitespace from both ends of a string - not trim means input is empty
//       setError("Please enter a question");
//       return;
//     }

//     //clear previous error
//     setError("");
//     setAnswer("");
//     setLoading(true);
//     try{
//       const response = await askQuestion(searchquery);
//       setAnswer(response.response);
//     }catch{
//       setError("Error while fetching answer");
//     }finally{
//       setLoading(false);
//     }    
//     // console.log(response);
//   }

//   return (
//     <div>
//         {/* <h2>AI MYTHOLOGY ENGINE</h2>
//         <p>Explore mythology using an AI-powered knowledge engine.</p> */}
//         <form onSubmit={handleSearchSubmit}>
//           <input value={searchquery} onChange={handleSearch} type="text" placeholder="Search" />
//           <button type="submit">Search</button>
//           {
//             loading && <p>Searching...</p> 
//           }
//           {
//             error && <p>{error}</p>
//           }
//         </form>
//         <p>{answer}</p>
//     </div>
//   )
// }

import { useState } from "react";
import { askQuestion } from "../../services/api";
import '../../CSS/Home.css';

export const Home = () => {
  const [searchquery, setSearchquery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchquery(e.target.value);
  };

  const handleSearchSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!searchquery.trim()) {
      setError("Please enter a question");
      return;
    }

    setError("");
    setAnswer("");
    setLoading(true);

    try {
      const response = await askQuestion(searchquery);
      setAnswer(response.response);
    } catch {
      setError("Error while fetching answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-symbol">✦</div>

          <p className="hero-eyebrow">
            AI-POWERED MYTHOLOGY EXPLORATION
          </p>

          <h1>
            Discover the Stories
            <span> Behind the Gods</span>
          </h1>

          <p className="hero-description">
            Explore mythology through an intelligent knowledge engine
            that connects gods, stories, relationships, powers, and
            ancient traditions.
          </p>

          <div className="hero-actions">
            <a href="#search" className="primary-button">
              Explore Mythology
            </a>

            <a href="/graph" className="secondary-button">
              Explore Knowledge Graph
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="home-search section" id="search">
        <div className="section-header">
          <p className="search-eyebrow">ASK THE KNOWLEDGE ENGINE</p>

          <h2>What would you like to discover?</h2>

          <p>
            Ask questions about mythology and get answers retrieved
            from the knowledge base.
          </p>
        </div>

        <form
          className="search-form"
          onSubmit={handleSearchSubmit}
        >
          <input
            value={searchquery}
            onChange={handleSearch}
            type="text"
            placeholder="Ask about a god, story, relationship, or mythology..."
          />

          <button
            type="submit"
            className="primary-button search-button"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p className="home-error">
            {error}
          </p>
        )}

        {loading && (
          <div className="home-loading">
            Searching the mythology knowledge base...
          </div>
        )}

        {answer && !loading && (
          <div className="answer-card card">
            <div className="answer-heading">
              <span>✦</span>
              <h3>Knowledge Engine Response</h3>
            </div>

            <p>{answer}</p>
          </div>
        )}
      </section>

      {/* Explore */}
      <section className="section explore-section">
        <div className="section-header">
          <p className="search-eyebrow">EXPLORE</p>

          <h2>Explore Mythology Your Way</h2>

          <p>
            Go beyond simple questions and discover mythology through
            multiple intelligent experiences.
          </p>
        </div>

        <div className="feature-grid">

          <a href="/chat" className="feature-card card">
            <span className="feature-icon">◈</span>
            <h3>AI Chat</h3>
            <p>
              Have a natural conversation and ask deeper questions
              about mythology.
            </p>
            <span className="feature-link">Start exploring →</span>
          </a>

          <a href="/compare" className="feature-card card">
            <span className="feature-icon">◐</span>
            <h3>Compare Gods</h3>
            <p>
              Compare mythology figures and understand their roles,
              powers, and characteristics.
            </p>
            <span className="feature-link">Compare figures →</span>
          </a>

          <a href="/story" className="feature-card card">
            <span className="feature-icon">✧</span>
            <h3>Generate Stories</h3>
            <p>
              Discover mythology through AI-generated stories based
              on your chosen topic.
            </p>
            <span className="feature-link">Read a story →</span>
          </a>

          <a href="/graph" className="feature-card card">
            <span className="feature-icon">◇</span>
            <h3>Knowledge Graph</h3>
            <p>
              Visualize connections between gods, families, and
              mythological relationships.
            </p>
            <span className="feature-link">View the graph →</span>
          </a>

        </div>
      </section>

      {/* How it works */}
      <section className="section how-section">
        <div className="section-header">
          <p className="search-eyebrow">HOW IT WORKS</p>

          <h2>From Question to Knowledge</h2>

          <p>
            The system combines structured mythology data, semantic
            retrieval, and AI generation to create meaningful answers.
          </p>
        </div>

        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Ask</h3>
            <p>
              Ask a question about mythology using natural language.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Retrieve</h3>
            <p>
              Relevant knowledge is retrieved from the mythology
              knowledge base.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Understand</h3>
            <p>
              AI processes the retrieved information to understand
              the context of your question.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Discover</h3>
            <p>
              Receive a meaningful answer grounded in the available
              mythology knowledge.
            </p>
          </div>

        </div>
      </section>

      {/* Technology */}
      <section className="section technology-section">
        <div className="technology-card">

          <div className="technology-content">
            <p className="search-eyebrow">BUILT WITH AI</p>

            <h2>
              More Than a Chatbot
            </h2>

            <p>
              AI Mythology Knowledge Engine is designed as a structured
              AI system rather than a simple conversational interface.
              It combines retrieval, structured knowledge, intelligent
              agents, and visual relationships.
            </p>

            <div className="technology-tags">
              <span>RAG</span>
              <span>Vector Search</span>
              <span>Knowledge Graph</span>
              <span>AI Agents</span>
              <span>MongoDB</span>
              <span>FastAPI</span>
              <span>React</span>
            </div>
          </div>

          <div className="technology-symbol">
            ✦
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section final-cta">
        <div className="cta-content">
          <div className="hero-symbol">✦</div>

          <h2>Begin Your Mythology Journey</h2>

          <p>
            Ask a question, explore a god, compare mythological
            figures, or discover their relationships.
          </p>

          <a href="#search" className="primary-button">
            Explore the Knowledge Engine
          </a>
        </div>
      </section>

    </div>
  );
};