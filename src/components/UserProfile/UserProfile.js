import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useContext } from "react";
import UserContext from "../../UserContext/store";
import service from "../../services";
import userImage from "../../assets/user-profile.png";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const userInfo = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [reloadPage, setReloadPage] = useState(false);

  const navigate = useNavigate();

  const getUserDetails = async (userId) => {
    try {
      const payload = {
        id: userId,
      };
      const response = await service.getUserInfo(payload);
      if (response?._id) {
        setUserData(response);
      } else {
        console.log("Failed to get user !");
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  const onDeleteBtnCLick = async (pet) => {
    const res = window.confirm(
      `Are you sure you want to delete ${pet.petName}`
    );
    if (!res) {
      return;
    }
    try {
      const response = await service.deletePet({ id: userInfo?.id, pet });
      if (response?._id) {
        alert("Pet deleted successfully");
        setReloadPage(!reloadPage);
      } else {
        alert("Failed to delete pet");
      }
    } catch (err) {
      alert("Failed to delete pet");
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      getUserDetails(userInfo?.id);
    }
  }, [userInfo?.id, reloadPage]);

  return (
    <div className="user-profile-container">
      <div className="user-profile-wrapper">
        <div className="user-image">
          <img src={userData?.userImage || userImage} alt="user" />
        </div>
        <div className="user-profile-info">
          <p className="user-name">{userData?.name}</p>
          <p className="user-email">{userData?.email}</p>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile", { state: { userData } })}
        >
          Edit Profile
        </button>
        <button
          className="user-add-pet-btn"
          onClick={() => navigate("/services/get-qr-code")}
        >
          Add Pet
        </button>
        <div className="pets-info">
          <p>Your Pets:</p>
          {userData?.pets.length ? (
            userData?.pets.map((pet, index) => {
              return (
                <div key={index} className="user-pet-card">
                  <div className="user-pet-image">
                    <img src={pet.petImage} alt="pet" />
                  </div>
                  <div className="user-pet-info">
                    <h3>{pet.petName}</h3>
                    <button
                      className="delete-pet-btn"
                      onClick={() => onDeleteBtnCLick(pet)}
                    >
                      Delete Pet
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-pets-available">
              <h2>No Pets Available</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
