import React from "react";
import { BsShop } from "react-icons/bs";
import { AiOutlineQrcode } from "react-icons/ai";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import './ServicesPage.css';

function ServicesPage() {
    
    const navigate = useNavigate();

    return (
        <div className="services-page-container">
            <div className="services-top-section">
                <div className="services-title">
                    <h1>Services</h1>
                </div>
            </div>
            <div className="services-wrapper">
                <div className="services-cards-container">
                    <div className="service-card">
                        <div className="service-card-border">
                            <div className="image-bg">
                                <AiOutlineQrcode />
                            </div>
                            <div className="service-card-title"><p>QR Code for Pet</p></div>
                            <div className="service-card-text">
                                <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering.</p>
                            </div>
                            <button className="services-btn" onClick={() => navigate("/services/get-qr-code")}>Get QR Code</button>
                        </div>
                    </div>
                    <div className="service-card">
                        <div className="service-card-border">
                            <div className="image-bg">
                                <BsShop />
                            </div>
                            <div className="service-card-title"><p>Pet Shopping</p></div>
                            <div className="service-card-text">
                                <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering.</p>
                            </div>
                            <button className="services-btn" onClick={() => navigate("/services/pet-selling")}>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ServicesPage;