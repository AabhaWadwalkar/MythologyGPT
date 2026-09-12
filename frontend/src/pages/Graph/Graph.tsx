// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router";
// import { graphGods } from "../../services/api";
// import type { GraphResponse } from "../../types/graph";
// import ForceGraph2D from "react-force-graph-2d";

// export const Graph = () => {
//   const[graphData, setGraphData] = useState<GraphResponse | null>(null);
//   const[loading, setLoading] = useState(false);
//   const[error, setError] = useState("");
//   const graphRef = useRef<any>(null);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const fetchGraph = async()=>{
//       setLoading(true);
//       setError("");
//       try{
//         const response = await graphGods();
//         console.log("Graph resssssponse:", response);
//         setGraphData(response);
//       }catch{
//         setError("Error doing graph");
//       }finally{
//         setLoading(false);
//       }
//     };
//     fetchGraph();
//   },[]);

//   // useEffect(()=>{
//   //   const linkForce = graphRef.current?.d3Force("link");

//   //   if(linkForce){
//   //     linkForce.distance(150);
//   //   }
//   // }, [graphData]);
//   useEffect(() => {
//     if (!graphData) return;

//     const linkForce = graphRef.current?.d3Force("link");
//     const chargeForce = graphRef.current?.d3Force("charge");

//     if (linkForce) {
//       linkForce.distance(100);
//     }

//     if (chargeForce) {
//       chargeForce.strength(-120);
//     }
//   }, [graphData]);



//   return (
//     <div>
//       <h2>Graph</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div style={{width: "100%", height: "700px"}}>
//       <ForceGraph2D ref={graphRef} graphData={{nodes: graphData?.response.nodes ?? [], links: graphData?.response.links ?? [] }} nodeLabel="id"
//       nodeCanvasObject={(node, ctx) => {
//         const label = node.id as string;
//         const fontSize = 12;

//         ctx.beginPath();
//         ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI);
//         ctx.fill();

//         ctx.font = `${fontSize}px Arial`;
//         ctx.fillStyle ="white";
//         ctx.fillText(label, node.x! + 8, node.y! + 4);
//       }} 
//       linkLabel="relation" 
//       onNodeClick={(node)=>{
//         navigate(`/god/${node.id}`);
//       }}
//       linkColor={() => "white"}
//       width={900}
//       height={700}
//       linkWidth={2}
//       linkDirectionalArrowLength={6}
//       linkDirectionalArrowRelPos={1}
//       cooldownTicks={100}
//       d3AlphaDecay={0.08}
//       d3VelocityDecay={0.4}
//       onEngineStop={() => {
//         graphRef.current?.zoomToFit(400, 80);
//       }}
//        />
//       </div>
//     </div>
//   )
// }
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { graphGods } from "../../services/api";
import type { GraphResponse } from "../../types/graph";
import ForceGraph2D from "react-force-graph-2d";
import "../../CSS/Graph.css";

export const Graph = () => {
  const [graphData, setGraphData] = useState<GraphResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const graphRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraph = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await graphGods();
        setGraphData(response);
      } catch {
        setError("Error loading knowledge graph");
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, []);

  useEffect(() => {
    if (!graphData) return;

    const linkForce = graphRef.current?.d3Force("link");
    const chargeForce = graphRef.current?.d3Force("charge");

    if (linkForce) {
      linkForce.distance(110);
    }

    if (chargeForce) {
      chargeForce.strength(-140);
    }
  }, [graphData]);

  return (
    <div className="graph-page">

      {/* Header */}
      <section className="graph-header">
        <div className="graph-symbol">✦</div>

        <p className="graph-eyebrow">
          KNOWLEDGE GRAPH
        </p>

        <h1>Explore Mythological Connections</h1>

        <p>
          Visualize relationships between gods and discover how
          mythological figures are connected.
        </p>
      </section>

      {/* Graph */}
      <section className="graph-section">

        <div className="graph-info-bar">
          <div>
            <span className="graph-info-icon">◈</span>
            <span>Mythological Relationship Network</span>
          </div>

          <p>
            Click a god to explore its details
          </p>
        </div>

        {loading && (
          <div className="graph-state">
            <div className="graph-loading-symbol">✦</div>
            <p>Building mythology knowledge graph...</p>
          </div>
        )}

        {error && (
          <div className="graph-error">
            {error}
          </div>
        )}

        {!loading && !error && graphData && (
          <div className="graph-container card">

            <ForceGraph2D
              ref={graphRef}
              graphData={{
                nodes: graphData.response.nodes ?? [],
                links: graphData.response.links ?? [],
              }}
              nodeLabel="id"

              nodeCanvasObject={(node, ctx) => {
                const label = node.id as string;
                const fontSize = 12;

                ctx.beginPath();
                ctx.arc(
                  node.x!,
                  node.y!,
                  5,
                  0,
                  2 * Math.PI
                );

                ctx.fillStyle = "#e6c875";
                ctx.fill();

                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = "#f5f1e8";
                ctx.fillText(
                  label,
                  node.x! + 9,
                  node.y! + 4
                );
              }}

              linkLabel="relation"

              onNodeClick={(node) => {
                navigate(`/god/${node.id}`);
              }}

              linkColor={() => "rgba(212, 168, 79, 0.55)"}
              linkWidth={1.5}
              linkDirectionalArrowLength={6}
              linkDirectionalArrowRelPos={1}

              cooldownTicks={100}
              d3AlphaDecay={0.08}
              d3VelocityDecay={0.4}

              onEngineStop={() => {
                graphRef.current?.zoomToFit(400, 80);
              }}

              width={900}
              height={650}
            />

          </div>
        )}

        {!loading && !error && !graphData && (
          <div className="graph-empty">
            <p>No graph data available.</p>
          </div>
        )}

      </section>

      {/* Legend */}
      <section className="graph-legend">

        <div className="legend-item">
          <span className="legend-node"></span>
          <span>Mythological Figure</span>
        </div>

        <div className="legend-item">
          <span className="legend-arrow">→</span>
          <span>Relationship</span>
        </div>

        <p>
          Hover over a connection to see its relationship type.
        </p>

      </section>

    </div>
  );
};