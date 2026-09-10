import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import "../CSS/Layout.css";
import { Footer } from "./Footer";

export const Layout=()=>{
    return(
        <>
        <Navbar/>
        <main className="page-container">
            <Outlet/>
        </main>
        <Footer/>
        </>
    );
};