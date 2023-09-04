import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services";
import petIcon from "../../assets/lost-pet-icon.jpg";
import PhoneInput from "react-phone-number-input";
import "./LostPet.css";
import Footer from "../Footer/Footer";

function LostPet() {
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const [petData, setPetData] = useState("");
  const [personName, setPersonName] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personAddress, setPersonAddress] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personMessage, setPersonMessage] = useState("");
  const [isEmailInvallid, setIsEmailInvallid] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const getCurrentGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        if (latitude && longitude) {
          alert("Thanks for sharing this location :)");
        }
        console.log(
          "Lat:",
          latitude,
          "Long: ",
          longitude,
          "Accuracy: ",
          accuracy
        );
      },
      function error(msg) {
        console.log("Please enable your GPS position feature.", msg);
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  };

  const getUserDetails = async (userId) => {
    try {
      const payload = {
        id: userId,
      };
      const response = await service.getUserInfo(payload);
      if (response?._id) {
        setUserData(response);
        // getPerInfo(response);
      } else {
        console.log("Failed to get user !");
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  const onFieldChange = (field, value) => {
    if (field === "personName") {
      setPersonName(value);
    } else if (field === "personEmail") {
      const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!regex.test(value)) {
        setIsEmailInvallid(true);
      } else {
        setIsEmailInvallid(false);
      }
      setPersonEmail(value);
    } else if (field === "personPhone") {
      setPersonPhone(value);
    } else if (field === "personAddress") {
      setPersonAddress(value);
    } else if (field === "personMessage") {
      setPersonMessage(value);
    }
  };

  const onSendBtnClick = async () => {
    clearAllFields();
    const allFieldsValid = checkAllFieldsValid(); // checking all fields are valid
    if (!allFieldsValid) {
      alert("Please enter name and email...");
      return;
    }
    try {
      const formData = {
        petId: petData?.petId,
        personName,
        personEmail,
        personAddress,
        personPhone,
        personMessage,
        ownerName: userData?.name,
        ownerEmail: userData?.email,
        petName: petData?.petName,
        latitude: lat,
        longitude: long,
      };
      const response = await service.sendLostPetEmail(formData);
      if (response) {
        alert("Thanks for helping me :)");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAllFieldsValid = () => {
    if (!personName || !personEmail) {
      return false;
    }
    return true;
  };

  const clearAllFields = () => {
    setPersonName("");
    setPersonEmail("");
    setPersonAddress("");
    setPersonPhone("");
    setPersonMessage("");
  };

  useEffect(() => {
    if (id) {
      const userIds = id.toString().split("&");
      getUserDetails(userIds[0]);
    }
  }, [id]);

  useEffect(() => {
    if (userData) {
      const lostPet = userData?.pets.find((v) => v.petId === id);
      if (lostPet) {
        setPetData(lostPet);
      }
    } else {
      setPetData("");
    }
  }, [userData, id]);
  return (
    <div className="lost-pet-container">
      {petData ? (
        <div>
          <div className="pet-image-container">
            <img src={petData.petImage || petIcon} alt="pet" />
          </div>
          <div className="pet-info-container">
            <h2>Hii Friend I'm {petData.petName}</h2>
            <h2>
              I'm Lost, Would you please help me get to my owner{" "}
              {`(${userData.name}) `}?
            </h2>
          </div>
          <div className="get-location-container">
            <h2>
              You can share this location to my owner so he/she can know where I
              am right now
            </h2>
            <button
              className="location-btn"
              onClick={() => getCurrentGeoLocation()}
            >
              Share This Location
            </button>
          </div>
          <div className="owner-contact-form-container">
            <h2>
              Also you can contact with my owner by filling this form below
            </h2>
            <div className="owner-contact-form">
              <input
                type="text"
                value={personName}
                placeholder="Your Name"
                onChange={(e) => onFieldChange("personName", e.target.value)}
              />
              <input
                type="email"
                className={isEmailInvallid ? "invalid-input" : ""}
                value={personEmail}
                placeholder="Email"
                onChange={(e) => onFieldChange("personEmail", e.target.value)}
              />
              <PhoneInput
                international
                placeholder="Phone number"
                className="phone-input"
                countryCallingCodeEditable={false}
                defaultCountry="IN"
                value={personPhone}
                onChange={(value) => onFieldChange("personPhone", value)}
              />
              <input
                type="text"
                value={personAddress}
                placeholder="Address where pet found"
                onChange={(e) => onFieldChange("personAddress", e.target.value)}
              />
              <textarea
                placeholder="Your Message"
                value={personMessage}
                onChange={(e) => onFieldChange("personMessage", e.target.value)}
                rows={8}
              />
              <button
                className={
                  !isEmailInvallid ? "submit-btn" : "submit-btn disable-btn"
                }
                disabled={isEmailInvallid}
                onClick={() => onSendBtnClick()}
              >
                Send
              </button>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="page-not-found-container">
          <h1>404 Page Not Found !</h1>
        </div>
      )}
    </div>
  );
}

export default LostPet;
