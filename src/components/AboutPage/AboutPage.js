import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from "../Footer/Footer";
import './AboutPage.css';

function AboutPage() {
    return (
        <div className="about-page-container">
            <section className="what-we-do-section">
                <div className="section-text">
                    <div className="what-we-do-section-title">
                        <h1>WHAT WE DO</h1>
                    </div>
                    <p>Dogs and cats are a common member of the family in homes across the US. No population-based data exist on the frequency of pets getting lost from the home and lost pets can be a source of human and animal suffering. Our primary objective was to determine the percentage of owned dogs and cats that were lost, and of these, what percentages of pets were recovered</p>
                </div>
            </section>
            <section className="our-team-section">
                <div className="section-title">
                    <h1>OUR TEAM</h1>
                </div>
                <div className="cards-container">
                    <div className="card-wrapper">
                        <div className="card">
                            <div className="card-info">
                                <div className="card-name">
                                    <span className="card-line"></span>
                                    <p>Abhishek Landge</p>
                                </div>
                                <p className="card-role">Web Developer</p>
                            </div>
                        </div>
                        <div className="card-icons">
                            <a href='https://instagram.com/abhi___5757?igshid=YmMyMTA2M2Y=' target="_blank" rel="noreferrer"><FaInstagram /></a>
                            <a href='https://github.com/abhisheklandge77' target="_blank" rel="noreferrer"><FaGithub /></a>
                            <a href='https://www.linkedin.com/in/abhishek-landge-7bbb77239' target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        </div>
                    </div>
                    <div className="card-wrapper">
                        <div className="card">
                            <div className="card-info">
                                <div className="card-name">
                                    <span className="card-line"></span>
                                    <p>Shailesh Palavakar</p>
                                </div>
                                <p className="card-role">Web Developer</p>
                            </div>
                        </div>
                        <div className="card-icons">
                            <a href='https://instagram.com'><FaInstagram /></a>
                            <a href='https://facebook.com'><FaGithub /></a>
                            <a href='https://twitter.com'><FaLinkedin /></a>
                        </div>
                    </div>
                    <div className="card-wrapper">
                        <div className="card">
                            <div className="card-info">
                                <div className="card-name">
                                    <span className="card-line"></span>
                                    <p>Wahid Pathan</p>
                                </div>
                                <p className="card-role">Web Developer</p>
                            </div>
                        </div>
                        <div className="card-icons">
                            <a href='https://instagram.com'><FaInstagram /></a>
                            <a href='https://facebook.com'><FaGithub /></a>
                            <a href='https://twitter.com'><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default AboutPage;