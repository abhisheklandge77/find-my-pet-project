import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import UserContext from "../../UserContext/store";
import "./OrderPage.css";
import Footer from "../Footer/Footer";
import service from "../../services";

function OrderPage() {
    const userInfo = useContext(UserContext);
    const location = useLocation();
    const orderDetails = location?.state?.orderDetails;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [isEmailInvallid, setIsEmailInvallid] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("Card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [upiId, setUpiId] = useState("");

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
        } else if (field === "address") {
            setAddress(value)
        } else if (field === "zipcode") {
            setZipcode(value)
        } else if (field === "phone") {
            setPhone(value)
        } else if (field === "cardNumber") {
            setCardNumber(value)
        } else if (field === "cardExpiry") {
            setCardExpiry(value)
        } else if (field === "upiId") {
            setUpiId(value)
        }
    }

    const onOrderBtnClick = async () => {
        const allFieldsValid = checkAllFieldsValid(); // checking all fields are valid
        if (!allFieldsValid) {
            alert("All fields are required");
            return;
        }
        try {
            const formData = {
                email,
                name,
                orderDetails,
                paymentMethod: selectedPaymentOption
            };
            const response = await service.sendPlaceOrderEmail(formData);
            console.log("Response::=", response);
            if (response) {
                navigate("/services/pet-selling/order-summary", {
                    state: {
                        orderSummary: {
                            ...orderDetails,
                            selectedPaymentOption,
                            address
                        }
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const checkAllFieldsValid = () => {
        if (!name || !email || !address || !phone || !zipcode) {
            return false;
        }
        return true;
    }

    return (
        <div className="order-details-container">
            {
                (userInfo?.id && orderDetails) ? 
                    (<div className="order-details-wrapper">
                        <div className="pet-details-container">
                            <h1>Pet Details</h1>
                            <div className="pet-image">
                                <img src={orderDetails?.image} alt="dog" />
                            </div>
                            <div className="pet-info">
                                <p>Type: <span>{orderDetails?.type}</span></p>
                                <p>Breed: <span>{orderDetails?.breed}</span></p>
                                <p>Price: <span>{orderDetails?.price}</span></p>
                            </div>
                            <div className="pet-description">
                                <p>{orderDetails?.description}</p>
                            </div>
                        </div>
                        <div className="order-form-container">
                            <h1>Checkout</h1>
                            <div className="order-form">
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
                                <input type="text" value={address} placeholder="Delivery Address" onChange={(e) => onFieldChange("address", e.target.value)} />
                                <input type="number" value={zipcode} placeholder="Zip Code" onChange={(e) => onFieldChange("zipcode", e.target.value)} />
                                <div className="select-payment-container">
                                    <p>Select payment method</p>
                                    <div className="select-size-wrapper">
                                        <div>
                                            <input type="radio" value="Card" id="card-payment" checked={selectedPaymentOption === "Card"} onChange={(e) => setSelectedPaymentOption(e.target.value)} />
                                            <label htmlFor="card-payment">Card</label>
                                        </div>

                                        <div>
                                            <input type="radio" value="UPI" id="upi-payment" checked={selectedPaymentOption === "UPI"} onChange={(e) => setSelectedPaymentOption(e.target.value)} />
                                            <label htmlFor="upi-payment">UPI</label>
                                        </div>

                                    </div>
                                    {
                                        selectedPaymentOption === "Card" && (
                                            <div className="card-payment-info">
                                                <input type="number" value={cardNumber} placeholder="Card Number" onChange={(e) => onFieldChange("cardNumber", e.target.value)} />
                                                <input type="text" value={cardExpiry} placeholder="MM/YY CVC" onChange={(e) => onFieldChange("cardExpiry", e.target.value)} />
                                            </div>
                                        )
                                    }
                                    {
                                        selectedPaymentOption === "UPI" && (
                                            <div className="upi-payment-info">
                                                <input type="text" value={upiId} placeholder="UPI ID: abc@okhdfcbank" onChange={(e) => onFieldChange("upiId", e.target.value)} />
                                            </div>
                                        )
                                    }
                                </div>
                                <button className={!isEmailInvallid ? "place-order-btn" : "place-order-disable-btn"} disabled={isEmailInvallid} onClick={() => onOrderBtnClick()}>Place Order</button>
                            </div>
                        </div>
                    </div>)
                    :
                    (<div className="order-page-card">
                        <h1>You are not Signed In !</h1>
                        <button className="order-signup-btn" onClick={() => navigate("/login")}>Sign In</button>
                    </div>)
            }
            <Footer />
        </div>
    )
}

export default OrderPage;