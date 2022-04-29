import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import sectionImage1 from "../../assets/lost-pets-1.jpg";
import sectionImage2 from "../../assets/lost-pets-2.jpg";
import qrCodeImage from "../../assets/qr-code-home.jpg";
import Footer from "../Footer/Footer";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page-container">
            <section className="image-slider">
                <ImageSlider />
            </section>
            <section className="info-section">
                <div className="info-subsection1">
                    <div className="section-text-container">
                        <div className="text-wrapper">
                            <h1>Section Title</h1>
                            <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                        </div>
                    </div>
                    <div className="section-image-container">
                        <div className="image-wrapper">
                            <img src={sectionImage1} alt="section-image1" />
                        </div>
                    </div>
                </div>
                <div className="info-subsection2">
                    <div className="section-image-container">
                        <div className="image-wrapper">
                            <img src={sectionImage2} alt="section-image2" />
                        </div>
                    </div>
                    <div className="section-text-container">
                        <div className="text-wrapper">
                            <h1>Section Title</h1>
                            <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="qrcode-info-section">
                <div className="qrcode-info-wrapper">
                    <div className="qrcode-info">
                        <h1>Section Title</h1>
                        <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                        <button className="qrcode-info-btn">Know More</button>
                    </div>
                    <div className="qrcode-image">
                        <img src={qrCodeImage} alt="qrcode" />
                    </div>

                </div>
            </section>
            <section className="our-mission-section">
                <div className="our-mission-section-title">
                    <h1>Our Mission</h1>
                </div>
                <div className="our-mission-content">
                    <div className="our-mission-text">
                        <span className="text-quotes-left"><FaQuoteLeft /></span>
                        <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                        <span className="text-quotes-right"><FaQuoteRight /></span>
                    </div>
                </div>
            </section>
            <section className="review-section">
            <div className="review-section-title">
                    <h1>People Says</h1>
                </div>
                <div className="reviews-wrapper">
                <div className="review-text">
                    <span className="text-quotes-left"><FaQuoteLeft /></span>
                    <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                    <span className="text-quotes-right"><FaQuoteRight /></span>
                    <p className="reviewed-by">- Rahul</p>
                </div>
                <div className="review-text">
                    <span className="text-quotes-left"><FaQuoteLeft /></span>
                    <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                    <span className="text-quotes-right"><FaQuoteRight /></span>
                    <p className="reviewed-by">- Barkha</p>
                </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage;