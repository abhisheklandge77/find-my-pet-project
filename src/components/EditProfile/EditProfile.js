import React, { useContext, useEffect, useState } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import "./EditProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext/store";
import service from "../../services";
import Footer from "../Footer/Footer";

function EditProfile() {
    const userInfo = useContext(UserContext);
    const [userImageURL, setUserImageURL] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isEmailInvallid, setIsEmailInvallid] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

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
        } else if (field === "phone") {
            setPhone(value)
        } else if (field === "address") {
            setAddress(value)
        }
    }

    const handleFileChange = (file) => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var maxW = 400;
        var maxH = 350;
        var img = new Image();
        img.onload = function () {
            var iw = img.width;
            var ih = img.height;
            var scale = Math.min((maxW / iw), (maxH / ih));
            var iwScaled = iw * scale;
            var ihScaled = ih * scale;
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
            const imgurl = canvas.toDataURL("image/jpeg", 0.5);
            setUserImageURL(imgurl);
        }
        img.src = URL.createObjectURL(file);
    }

    const onUpdateBtnClick = async () => {
        const allFieldsValid = checkAllFieldsValid();
        if (!allFieldsValid) {
            alert("All Fields Are Required");
            return;
        }

        try {
            const formData = {
                id: userInfo?.id,
                name,
                email,
                phone,
                address,
                userImage: userImageURL
            };
            const response = await service.updateUser(formData);
            if (response?._id) {
                alert("Profile Updated Successfully");
                navigate("/user-profile");
            } else {
                alert("Failed to update profile");
            }
        } catch (err) {
            alert("Failed to update profile");
            console.log(err)
        }
    }

    const checkAllFieldsValid = () => {
        if (!name || !email) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        if(location?.state?.userData){
            setName(location?.state?.userData?.name);
            setEmail(location?.state?.userData?.email);
            setAddress(location?.state?.userData?.address);
            const phoneNumber = `+${location?.state?.userData?.phone.toString()}`;
            setPhone(phoneNumber);
        }
    }, [location?.state?.userData]);

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <div className="edit-profile-form">
                <input type="file" accept="image/*" placeholder="Upload Photo: " onChange={(e) => {
                    handleFileChange(e.target.files[0])
                }} />
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
                <input type="text" value={address} placeholder="Address" onChange={(e) => onFieldChange("address", e.target.value)} />
                <div className="edit-profile-btn-container">
                    <button className={!isEmailInvallid ? "edit-profile-update-btn" : "edit-profile-update-btn disable-btn"} disabled={isEmailInvallid} onClick={() => onUpdateBtnClick()}>Update</button>
                    <button className="edit-profile-cancel-btn" onClick={() => navigate("/user-profile")}>Cancel</button>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default EditProfile;