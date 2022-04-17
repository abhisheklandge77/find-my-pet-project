import React, { useEffect, useState } from 'react'
import homeBackground1 from "../../assets/home-background.jpg";
import homeBackground2 from "../../assets/home-background-2.jpg";
import homeBackground3 from "../../assets/home-background-3.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "./ImageSlider.css";
import { useNavigate } from 'react-router-dom';

function ImageSlider() {
    const slides = [homeBackground1, homeBackground2, homeBackground3];
    const [activeSlide, setActiveSlide] = useState(0);

    const navigate = useNavigate();

    const handleNextSlide = () => {
        if (activeSlide !== slides.length - 1) {
            setActiveSlide(activeSlide + 1);
        } else if (activeSlide === slides.length - 1) {
            setActiveSlide(0);
        }
    }

    const handlePrevSlide = () => {
        if (activeSlide !== 0) {
            setActiveSlide(activeSlide - 1);
        } else if (activeSlide === 0) {
            setActiveSlide(slides.length - 1);
        }
    }

    const handleDotClick = (index) => {
        setActiveSlide(index);
    }

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (activeSlide !== slides.length - 1) {
                setActiveSlide(s => s + 1);
            } else if (activeSlide === slides.length - 1) {
                setActiveSlide(0);
            }
        },3000);

        return () => window.clearInterval(timer);
    }, [activeSlide, slides.length]);
    return (
        <div className="image-slider-container">
            <button className="prev-btn" onClick={handlePrevSlide}><FaAngleLeft /></button>
            <button className="next-btn" onClick={handleNextSlide}><FaAngleRight /></button>
            <div className="slides">
                {
                    slides.map((item, index) => {
                        return (
                            <div key={index} className={activeSlide === index ? "slide slide-active" : "slide"}>
                                <img src={item} alt={`${item}+${index}`} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-container">
                <p className="header-text">DO YOU CARE ?</p>
                <p className="message-text">WE DO CARE FOR OUR BELOVED FRIENDS</p>
                <button className="home-signup-btn" onClick={() => navigate("/login")}>Sign Up <FaAngleRight /></button>
            </div>
            <div className="dots-container">
                {slides.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={activeSlide === index ? "dot dot-active" : "dot"}
                        ></div>
                    )
                })
                }
            </div>
        </div>
    );
}

export default ImageSlider;