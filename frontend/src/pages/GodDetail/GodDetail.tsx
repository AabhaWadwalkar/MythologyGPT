// import{ useParams}  from 'react-router';
// import {useState, useEffect} from 'react';
// import type {God} from './../../types/god';
// import {getGods} from '../../services/api';

// export const GodDetail = () => {
//   const {name} = useParams<{name:string}>();  //name:string tells typescript that route parameter is expected to be a string
//   const [god, setGod] = useState<God | null>(null);  
//   const[loading,setLoading] = useState<boolean>(false);
//   const[error,setError] = useState<string>("");
  
//   useEffect(()=>{
//     const fetchGod = async()=>{
//       setLoading(true);
//       setError("");
//       try{
//       if(name){
//         const response = await getGods(name);
//         // const data = await response.json();
//         setGod(response);
        
//       }
//       }catch(error){
//         setError("Error while fetching god details");
//       }finally{
//         setLoading(false);
//       }

//     };
//     fetchGod();
    
//   }, [name]);
//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       GodDetail: {name}
//       {god &&
//       <>
//        <h2>{god.name}</h2>
//        <p>{god.description}</p>
//        <p>{god.category}</p>
//        <p>{god.role}</p>
//        {god.powers.map((power, index) =>(
//         <p key={index}>{power}</p>
//        ))}
//        {god.symbols.map((symbol,index) =>(
//         <p key={index}>{symbol}</p>
//        ))}
//        {god.relationships.parents.map((relationship,index) => (
//         <p key={index}>{relationship}</p>
//        ))}
//        {god.relationships.spouse.map((relationship,index) => (
//         <p key={index}>{relationship}</p>
//        ))}
//        {god.relationships.children.map((relationship,index) => (
//         <p key={index}>{relationship}</p>
//        ))}
//        {god.stories.map((story,index) => (
//         <p key={index}>{story}</p>
//        ))}
//        {god.sources.map((source,index) => (
//         <p key={index}>{source}</p>
//        ))}       
//        </>
//        }

//     </div>

//   )
// }
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import type { God } from "../../types/god";
import { getGods } from "../../services/api";
import "../../CSS/GodDetail.css";

export const GodDetail = () => {
  const { name } = useParams<{ name: string }>();

  const [god, setGod] = useState<God | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGod = async () => {
      setLoading(true);
      setError("");

      try {
        if (name) {
          const response = await getGods(name);
          setGod(response);
        }
      } catch {
        setError("Error while fetching god details");
      } finally {
        setLoading(false);
      }
    };

    fetchGod();
  }, [name]);

  return (
    <div className="god-detail-page">

      {loading && (
        <div className="god-loading">
          <div className="god-loading-symbol">✦</div>
          <p>Loading mythology details...</p>
        </div>
      )}

      {error && (
        <div className="god-error">
          {error}
        </div>
      )}

      {god && (
        <>
          {/* Hero */}
          <section className="god-hero">
            <div className="god-hero-symbol">✦</div>

            <p className="god-eyebrow">
              {god.category}
            </p>

            <h1>{god.name}</h1>

            <p className="god-role">
              {god.role}
            </p>

            <div className="god-hero-line"></div>

            <p className="god-description">
              {god.description}
            </p>
          </section>

          {/* Main Information */}
          <section className="god-content">

            {/* Powers */}
            <div className="god-info-card card">
              <div className="god-card-heading">
                <span>✦</span>
                <h2>Powers</h2>
              </div>

              <div className="god-tags">
                {god.powers.map((power, index) => (
                  <span key={index}>{power}</span>
                ))}
              </div>
            </div>

            {/* Symbols */}
            <div className="god-info-card card">
              <div className="god-card-heading">
                <span>◇</span>
                <h2>Symbols</h2>
              </div>

              <div className="god-tags">
                {god.symbols.map((symbol, index) => (
                  <span key={index}>{symbol}</span>
                ))}
              </div>
            </div>

            {/* Relationships */}
            <div className="god-info-card card relationships-card">
              <div className="god-card-heading">
                <span>◈</span>
                <h2>Relationships</h2>
              </div>

              <div className="relationship-grid">

                <div className="relationship-group">
                  <h3>Parents</h3>

                  {god.relationships.parents.length > 0 ? (
                    god.relationships.parents.map((relationship, index) => (
                      <p key={index}>{relationship}</p>
                    ))
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                </div>

                <div className="relationship-group">
                  <h3>Spouse</h3>

                  {god.relationships.spouse.length > 0 ? (
                    god.relationships.spouse.map((relationship, index) => (
                      <p key={index}>{relationship}</p>
                    ))
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                </div>

                <div className="relationship-group">
                  <h3>Children</h3>

                  {god.relationships.children.length > 0 ? (
                    god.relationships.children.map((relationship, index) => (
                      <p key={index}>{relationship}</p>
                    ))
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                </div>

              </div>
            </div>

            {/* Stories */}
            <div className="god-info-card card">
              <div className="god-card-heading">
                <span>✧</span>
                <h2>Stories</h2>
              </div>

              <div className="story-list">
                {god.stories.map((story, index) => (
                  <div className="story-item" key={index}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{story}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="god-info-card card sources-card">
              <div className="god-card-heading">
                <span>◎</span>
                <h2>Sources</h2>
              </div>

              <div className="source-list">
                {god.sources.map((source, index) => (
                  <p key={index}>
                    <span>•</span>
                    {source}
                  </p>
                ))}
              </div>
            </div>

          </section>
        </>
      )}
    </div>
  );
};