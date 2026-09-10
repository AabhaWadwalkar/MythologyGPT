import { NavLink } from "react-router";
import "../CSS/Navbar.css";

export const Navbar=()=>{
    return(
        <nav>
            <h2>AI Mythology Knowledge Engine</h2>
            {/* <p>Explore mythology using an AI-powered knowledge engine.</p> */}
            <div>
                <NavLink to="/" className={({isActive})=> isActive ? "active": ""}>Home</NavLink>
                <NavLink to="/chat" className={({isActive})=> isActive ? "active": ""}>Chat</NavLink>
                <NavLink to="/compare" className={({isActive})=> isActive ? "active": ""}>Compare</NavLink>
                <NavLink to="/story" className={({isActive})=> isActive ? "active": ""}>Story</NavLink>
                <NavLink to="/graph" className={({isActive})=> isActive ? "active": ""}>Graph</NavLink>
            </div>
        </nav>
    )
};