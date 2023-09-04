import React, { useEffect, useRef, useState } from "react";
import "./PetMap.css";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import Footer from "../Footer/Footer";
import service from "../../services";
mapboxgl.accessToken =
  process.env.REACT_APP_FIND_MY_PET_MAPBOX_ACCESS_TOKEN ||
  "pk.eyJ1IjoiYWJoaXNoZWstbGFuZGdlIiwiYSI6ImNsMm42Z3ZqazB1MHozY211aGptM2YzZnoifQ.3-Ki2MdqJu95TUAeB2BWkg";

function PetMap() {
  const { locationParams } = useParams();
  const [userData, setUserData] = useState("");
  const [petData, setPetData] = useState("");
  const [petId, setPetId] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const petMapContainerRef = useRef(null);

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

  useEffect(() => {
    if (locationParams) {
      const params = locationParams.toString().split("$");
      setPetId(params[0]);
      const userIds = params[0].split("&");
      getUserDetails(userIds[0]);

      const coordinates = params[1].split("&");
      setLat(parseFloat(coordinates[0]));
      setLong(parseFloat(coordinates[1]));
    }
  }, [locationParams]);

  useEffect(() => {
    if (userData) {
      const lostPet = userData?.pets.find((v) => v.petId === petId);
      if (lostPet) {
        setPetData(lostPet);
      }
    } else {
      setPetData("");
    }
  }, [userData, petId]);

  useEffect(() => {
    const petMap = new mapboxgl.Map({
      container: petMapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 14,
    });

    petMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    //add marker to map
    const el = document.createElement("div");
    el.className = "marker";
    new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(petMap);

    return () => petMap.remove();
  }, [long, lat]);

  return (
    <div className="pet-map-container">
      {petData ? (
        <div className="pet-map-info">
          <h2>
            Hii {userData?.name}, Your pet {petData?.petName} might be around
            this location
          </h2>
        </div>
      ) : (
        <div className="page-not-found-container">
          <h1>404 Page Not Found !</h1>
        </div>
      )}
      <div className="pet-map" ref={petMapContainerRef}></div>

      <Footer />
    </div>
  );
}

export default PetMap;
