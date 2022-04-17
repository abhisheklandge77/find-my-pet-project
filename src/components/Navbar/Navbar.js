import React, { useState } from 'react';
import { BsList, BsX } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        {
            tabName: "Home",
            pathName: "/"
        },
        {
            tabName: "About",
            pathName: "/about"
        },
        {
            tabName: "Services",
            pathName: "/services"
        },
        {
            tabName: "Contact",
            pathName: "/contact"
        },
    ]

    return (
        <div className={(location.pathname === "/register" || location.pathname === "/login") ? "hide-navbar" : "navbar"}>
            <div className="navbar-header">
                <h2 className="logo">FindMyPet</h2>
                <div onClick={() => setShowMenu(!showMenu)} className="hamburger-menu-icon">
                    {!showMenu ? <BsList /> : <BsX />}
                </div>
            </div>
            <div className={showMenu ? "navbar-items-mobile" : "navbar-items"}>
                <div className="navbar-tabs">
                    {
                        tabs.map((item, index) => {
                            return (
                                <Link to={item.pathName} key={index} className={activeTab === index ? "tab tab-active" : "tab"} onClick={() => setActiveTab(index)}>
                                    {item.tabName}
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navbar-btn-container">
                    <button className="signin-button" onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;