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
                            <h1>Do You Know?</h1>
                            <p>The total Livestock population is 535.78 million in the country showing an increase of 4.6% over Livestock Census2012. The largest livestock population was recorded in the state of Uttar Pradesh (68 million), followed by Rajasthan (56.8 million) and Madhya Pradesh (40.6 million) .  Each year, approximately 10 million pets are lost in some countries, and mostly lost animas are dogs and cats.600 millions homeless animals in the  world(by news report),and lost animals cases are more in that homeless animals.</p>
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
                            <h1>How many pet owners are in India?</h1>
                            <p>The number of households with pet dogs and cats in India accounted for approximately 17 million and 1.5 million respectively in 2021. The increase in the number of households getting pets had led to a two fold increase .Dogs and cat onwners are more in india.6,00,000 pets are adopted every year.Bengaluru emerged as the most pet-friendly city in India, followed by Mumbai, in a survey of over 1,500 pet owners across India. </p>
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
                        <p>BECAUSE EVERY RESCUE MISSION IS POSSIBLE!.We're on a mission to save animals—and we need you! The first step in saving the animals. All the pets that have been registered in our site, if they ever get lost, we will help you to find them.. We show the animals the way home. SMALL CONTRIBUTE FOR SAVE THE ANIMAL LIFE.</p>
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
                    <p>I would like to thank you because you found my lost dog. You are doing a wonderful service.Your work is also very fast, you found my dog very quickly.</p>
                    <span className="text-quotes-right"><FaQuoteRight /></span>
                    <p className="reviewed-by">- Rahul</p>
                </div>
                <div className="review-text">
                    <span className="text-quotes-left"><FaQuoteLeft /></span>
                    <p>First of all thank you for find my cat.I was very upset because my cat was not meeting me for two days but you found my cat in one day. I am blessed because I am a customer of your website.</p>
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