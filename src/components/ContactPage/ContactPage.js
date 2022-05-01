import React, { useEffect, useRef, useState } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelopeOpen } from "react-icons/fa";
import Footer from "../Footer/Footer";
import mapboxgl from 'mapbox-gl';
import './ContactPage.css';
mapboxgl.accessToken = process.env.REACT_APP_FIND_MY_PET_MAPBOX_ACCESS_TOKEN;

function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [isEmailInvallid, setIsEmailInvallid] = useState(false);

    const mapContainerRef = useRef(null);

    const onFieldChange = (field, value) => {
        if (field === "name") {
            setName(value)
        } else if (field === "email") {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!regex.test(value)) {
                setIsEmailInvallid(true);
            } else {
                setIsEmailInvallid(false);
            }
            setEmail(value);
        } else if (field === "message") {
            setMessage(value)
        } else if (field === "phone") {
            setPhone(value)
        }
    }

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [73.8615,18.4786],
          zoom: 10,
        });
    
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        //add marker to map
        const el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
        .setLngLat([73.8615,18.4786])
        .addTo(map);
    
        return () => map.remove();
      }, []);

    return (
        <div className="contact-page-container">
            <div className="contact-title">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-form">
                <input type="text" value={name} placeholder="Your Name" onChange={(e) => onFieldChange("name", e.target.value)} />
                <input type="email" className={isEmailInvallid ? "invalid-input" : ""} value={email} placeholder="Email" onChange={(e) => onFieldChange("email", e.target.value)} />
                <PhoneInput
                    international
                    placeholder="Phone number"
                    className="phone-input"
                    countryCallingCodeEditable={false}
                    defaultCountry="IN"
                    value={phone}
                    onChange={(value) => onFieldChange("phone", value)} />
                <textarea placeholder="Your Message" value={message} onChange={(e) => onFieldChange("message", e.target.value)} rows={8} />
                <button className={!isEmailInvallid ? "submit-btn" : "submit-btn disable-btn"} disabled={isEmailInvallid} onClick={() => alert("Thanks for contacting us...")}>Send</button>
            </div>
            <div className="contact-info-container">
                <div className="contact-details-wrapper">
                    <div className="contact-details">
                        <span className="icon-wrapper"><FaMapMarkerAlt /></span>
                        <p>Pune, Maharashtra, India</p>
                    </div>
                    <div className="contact-details">
                        <span className="icon-wrapper"><FaPhoneAlt /></span>
                        <p>+91 1234 567 890</p>
                    </div>
                    <div className="contact-details">
                        <span className="icon-wrapper"><FaEnvelopeOpen /></span>
                        <p>findmypet@gmail.com</p>
                    </div>
                    <div className="social-media-links"></div>
                </div>
                <div className="map-container"  ref={mapContainerRef}>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactPage;