import React, { useContext, useEffect, useState } from 'react';
import { BsList, BsX } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import logo from "../../assets/find-my-pet-logo.png";
import './Navbar.css';
import UserContext from '../../UserContext/store';

function Navbar() {
    const userInfo = useContext(UserContext);
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
    ];

    useEffect(() => {
        if (location.pathname === "/services/get-qr-code" || location.pathname === "/services/pet-selling") {
            setActiveTab(2)
        }
    }, [location.pathname]);

    return (
        <div className={(location.pathname === "/register" || location.pathname === "/login" || location.pathname.includes("lost-pet") || location.pathname.includes("pet-map")) ? "hide-navbar" : "navbar"}>
            <div className="navbar-header">
                <div className="logo">
                <img src={logo} alt="logo" />
                </div>
                {/* <h2 className="logo">FindMyPet</h2> */}
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
                {
                    (userInfo && userInfo?.id) ?
                        (<div className="navbar-user">
                            <span className="navbar-username"><p>Hey {userInfo.name}</p><FaUserAlt title="See Profile" className="user-profile-btn" onClick={() => navigate("/user-profile")} /></span>
                            <button className="logout-button" onClick={() => navigate("/login")}>Logout</button>
                        </div>)
                        : (<div className="navbar-btn-container">
                            <button className="signin-button" onClick={() => navigate("/login")}>Sign In</button>
                        </div>)
                }

            </div>
        </div>
    )
}

export default Navbar;