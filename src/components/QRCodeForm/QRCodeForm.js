import React, { useContext, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import UserContext from "../../UserContext/store";
import "./QRCodeForm.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

function QRCodeForm() {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [QRCodeValue, setQRCodeValue] = useState("");
    const [disableQRBtn, setDisableQRBtn] = useState(true);

    const onFieldChange = (field, value) => {
        if(!value){
            setDisableQRBtn(true);
        }
        setQRCodeValue("");
        if (field === "petName") {
            setPetName(value);
        } else if (field === "petAge") {
            if (value > 20) {
                return;
            } else {
                setPetAge(value);
            }
        } else if (field === "petDescription") {
            setPetDescription(value);
        }
    };

    const checkAllFieldsValid = () => {
        if (!petName || !petAge || !petDescription) {
            return false;
        }
        return true;
    }

    const onAddPetBtnClick = () => {
        const allFieldsValid = checkAllFieldsValid();
        if (!allFieldsValid) {
            return;
        }
        setDisableQRBtn(false);
    }
    const onGenerateQRCodeBtnClick = () => {
        const allFieldsValid = checkAllFieldsValid();
        if (!allFieldsValid) {
            return;
        }
        const qrcodeValue = `findmypet.com/${userInfo.id}#${petName}`;
        setQRCodeValue(qrcodeValue);
    }

    return (
        <div className="qrcode-form-container">
            {
                (userInfo && userInfo?.id) ?
                    (<div className="qrcode-form-wrapper">
                        <div className="add-pet-form-container">
                            <h1>Add Your Pet First</h1>
                            <div className="add-pet-form">
                                <input type="text" value={petName} placeholder="Pet Name" onChange={(e) => onFieldChange("petName", e.target.value)} />

                                <input type="number" value={petAge} placeholder="Pet Age" onChange={(e) => onFieldChange("petAge", e.target.value)} />

                                <textarea placeholder="Pet Description" value={petDescription} onChange={(e) => onFieldChange("petDescription", e.target.value)} rows={8} />

                                <button className="add-pet-btn" onClick={() => onAddPetBtnClick()}>Add Pet</button>
                            </div>
                        </div>
                        <div className="generate-qrcode-container">
                            <h1>Get QR Code For Your Pet</h1>
                            <div className="qrcode-wrapper">
                            {
                                QRCodeValue ? (
                                    <div>
                                        <QRCodeSVG value={QRCodeValue} size={200} includeMargin={true} />
                                    </div>
                                ) : (<button className={disableQRBtn ? "generate-qrcode-btn-disable" : "generate-qrcode-btn"} disabled={disableQRBtn} onClick={() => onGenerateQRCodeBtnClick()}>Generate QR Code</button>)
                            }
                            </div>
                        </div>
                    </div>)
                    :
                    (<div className="services-card">
                        <h1>You are not Signed In !</h1>
                        <button className="services-signup-btn" onClick={() => navigate("/login")}>Sign In</button>
                    </div>)
            }

            <Footer />
        </div>
    )
}

export default QRCodeForm;