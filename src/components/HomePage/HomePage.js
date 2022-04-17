import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page-container">
            <section className="image-slider">
                <ImageSlider />
            </section>
        </div>
    )
}

export default HomePage;