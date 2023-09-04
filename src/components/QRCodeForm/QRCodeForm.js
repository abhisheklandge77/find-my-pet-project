import React, { useContext, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import UserContext from "../../UserContext/store";
import "./QRCodeForm.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import service from "../../services";
const minDate = "2002-01-01";

function QRCodeForm() {
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();

  const baseUrl =
    process.env.FIND_MY_PET_CLIENT_ENDPOINT ||
    "https://admirable-torte-e51d6b.netlify.app";

  const [petName, setPetName] = useState("");
  const [resizeImgURL, setResizeImgURL] = useState("");
  const [petDOB, setPetDOB] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [QRCodeValue, setQRCodeValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [disableQRBtn, setDisableQRBtn] = useState(true);
  const [selectedSizeOption, setSelectedSizeOption] = useState("Default");
  const [QRSize, setQRSize] = useState(40);

  const onFieldChange = (field, value) => {
    if (!value) {
      setDisableQRBtn(true);
    }
    setQRCodeValue("");

    if (field === "petName") {
      setPetName(value);
    } else if (field === "petDOB") {
      if (value > 20) {
        return;
      } else {
        setPetDOB(value);
      }
    } else if (field === "petDescription") {
      setPetDescription(value);
    }
  };

  const handleFileChange = (file) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var maxW = 400;
    var maxH = 350;
    var img = new Image();
    img.onload = function () {
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      const imgurl = canvas.toDataURL("image/jpeg", 0.5);
      setResizeImgURL(imgurl);
    };
    img.src = URL.createObjectURL(file);
  };

  const checkAllFieldsValid = () => {
    if (!petName || !petDOB || !petDescription) {
      return false;
    }
    return true;
  };

  const onAddPetBtnClick = async () => {
    const allFieldsValid = checkAllFieldsValid();
    if (!allFieldsValid) {
      setErrorMsg("All Fields Are Required");
      setSuccessMsg("");
      return;
    }

    try {
      const petId = `${userInfo?.id}&${btoa(petName)}${Date.now()}`;
      const formData = {
        petId,
        petName,
        petDOB,
        petDescription,
        petImage: resizeImgURL,
      };
      const response = await service.savePet({
        id: userInfo?.id,
        pet: formData,
      });
      if (response?._id) {
        setSuccessMsg("Pet Added Successfully");
        setErrorMsg("");
        setDisableQRBtn(false);
      } else {
        setErrorMsg("Failed to Add Pet");
        setSuccessMsg("");
      }
    } catch (err) {
      setErrorMsg("Failed to Add Pet");
      setSuccessMsg("");
      console.log(err);
    }
  };
  const onGenerateQRCodeBtnClick = () => {
    const allFieldsValid = checkAllFieldsValid();
    if (!allFieldsValid) {
      return;
    }
    const qrcodeValue = `${baseUrl}/lost-pet/${userInfo.id}&${btoa(
      petName
    )}${Date.now()}`;
    setQRCodeValue(qrcodeValue);
  };
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const doc = new jsPDF();
    const qrcodeText = `QR Code for ${petName}`;
    doc.text(qrcodeText, doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });

    const marginX = doc.internal.pageSize.getWidth() / 2 - QRSize / 2;
    if (selectedSizeOption === "Default") {
      doc.addImage(
        pngUrl,
        "PNG",
        doc.internal.pageSize.getWidth() / 2 - 20,
        20,
        40,
        40
      );
    } else if (selectedSizeOption === "Custom") {
      doc.addImage(pngUrl, "PNG", marginX, 20, QRSize, QRSize);
    }
    doc.save("QRCode.pdf");
  };
  const handleQRCodeSize = (value) => {
    if (value >= 20 && value <= 200) {
      setQRSize(parseInt(value));
    }
  };

  return (
    <div className="qrcode-form-container">
      {userInfo && userInfo?.id ? (
        <div className="qrcode-form-wrapper">
          <div className="add-pet-form-container">
            <h1>Add Your Pet First</h1>
            <div className="add-pet-form">
              <input
                type="file"
                accept="image/*"
                placeholder="Pet Image: "
                onChange={(e) => {
                  handleFileChange(e.target.files[0]);
                }}
              />

              <input
                type="text"
                value={petName}
                placeholder="Pet Name"
                onChange={(e) => onFieldChange("petName", e.target.value)}
              />

              <input
                type="date"
                value={petDOB}
                placeholder="Pet DOB: "
                min={minDate}
                onChange={(e) => onFieldChange("petDOB", e.target.value)}
              />

              <textarea
                placeholder="Pet Description"
                value={petDescription}
                onChange={(e) =>
                  onFieldChange("petDescription", e.target.value)
                }
                rows={8}
              />

              <button
                className="add-pet-btn"
                onClick={() => onAddPetBtnClick()}
              >
                Add Pet
              </button>
              {errorMsg && !successMsg && (
                <div className="error">
                  <p>{errorMsg}</p>
                </div>
              )}
              {successMsg && !errorMsg && (
                <div className="success">
                  <p>{successMsg}</p>
                </div>
              )}
            </div>
          </div>
          <div className="generate-qrcode-container">
            <h1>Get QR Code For Your Pet</h1>
            <div className="qrcode-wrapper">
              {QRCodeValue ? (
                <div>
                  <QRCodeCanvas
                    id="qrcode"
                    value={QRCodeValue}
                    size={200}
                    includeMargin={true}
                  />
                  <div className="select-size-container">
                    <p>Select size of QR Code below :</p>
                    <div className="select-size-wrapper">
                      <div>
                        <input
                          type="radio"
                          value="Default"
                          id="default-size"
                          checked={selectedSizeOption === "Default"}
                          onChange={(e) =>
                            setSelectedSizeOption(e.target.value)
                          }
                        />
                        <label htmlFor="default-size">Default Size</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          value="Custom"
                          id="custom-size"
                          checked={selectedSizeOption === "Custom"}
                          onChange={(e) =>
                            setSelectedSizeOption(e.target.value)
                          }
                        />
                        <label htmlFor="custom-size">Custom Size</label>
                      </div>
                    </div>
                    {selectedSizeOption === "Custom" && (
                      <div className="qrsize">
                        <input
                          type="number"
                          value={QRSize}
                          placeholder="Size"
                          onChange={(e) => handleQRCodeSize(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="download-qrcode-btn"
                    disabled={!QRCodeValue}
                    onClick={() => downloadQRCode()}
                  >
                    Download QR Code
                  </button>
                </div>
              ) : (
                <button
                  className={
                    disableQRBtn
                      ? "generate-qrcode-btn-disable"
                      : "generate-qrcode-btn"
                  }
                  disabled={disableQRBtn}
                  onClick={() => onGenerateQRCodeBtnClick()}
                >
                  Generate QR Code
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="services-card">
          <h1>You are not Signed In !</h1>
          <button
            className="services-signup-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default QRCodeForm;
