// import { NavLink } from "react-router";
// import "../CSS/Navbar.css";

// export const Navbar=()=>{
//     return(
//         <nav>
//             <h2>AI Mythology Knowledge Engine</h2>
//             {/* <p>Explore mythology using an AI-powered knowledge engine.</p> */}
//             <div>
//                 <NavLink to="/" className={({isActive})=> isActive ? "active": ""}>Home</NavLink>
//                 <NavLink to="/chat" className={({isActive})=> isActive ? "active": ""}>Chat</NavLink>
//                 <NavLink to="/compare" className={({isActive})=> isActive ? "active": ""}>Compare</NavLink>
//                 <NavLink to="/story" className={({isActive})=> isActive ? "active": ""}>Story</NavLink>
//                 <NavLink to="/graph" className={({isActive})=> isActive ? "active": ""}>Graph</NavLink>
//             </div>
//         </nav>
//     )
// };
import { NavLink } from "react-router";
import "../CSS/Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-symbol">✦</div>

        <div className="brand-text">
          <span className="brand-title">AI Mythology</span>
          <span className="brand-subtitle">Knowledge Engine</span>
        </div>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Chat
        </NavLink>

        <NavLink
          to="/compare"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Compare
        </NavLink>

        <NavLink
          to="/story"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Story
        </NavLink>

        <NavLink
          to="/graph"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Graph
        </NavLink>
      </div>
    </nav>
  );
};