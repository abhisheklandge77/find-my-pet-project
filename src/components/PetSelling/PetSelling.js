import React from "react";
import "./PetSelling.css";
import petShop from "../../petConstants";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function PetSelling() {
    const { pets } = petShop;
    const navigate = useNavigate();
    return (
        <div className="pet-shopping-container">
            <section className="pet-shopping-bg">
                <div className="pet-shopping-text-wrapper">
                    <div className="pet-shopping-text">
                        <h1>WANT JOY IN LIFE</h1>
                        <h3>What are you waiting for ? <br /> Add new member to your family</h3>
                        <a className="shop-now-btn" href="#pets">Shop Now</a>
                    </div>
                </div>
            </section>
            <section id="pets" className="pet-selling-section">
                <h1>Best Pets For Best People</h1>
                <div className="pet-cards">
                    {
                        pets.map((pet, index) => {
                            return (
                                <div key={index} className="pet-card">
                                    <div className="pet-card-image">
                                        <img src={pet.image} alt={pet.type} />
                                    </div>
                                    <div className="pet-card-info">
                                        <p>{pet.breed}</p>
                                        <p>{pet.type}</p>
                                        <p className="price">{pet.price}</p>
                                    </div>
                                    <button className="buy-btn" onClick={() => navigate("/services/pet-selling/place-order", { state: { orderDetails: pet }} )}>Buy Now</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default PetSelling;