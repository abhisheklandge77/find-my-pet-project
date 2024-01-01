import React, { useContext, useEffect, useState } from "react";
import "./QRCodeModal.css";
import { QRCodeCanvas } from "qrcode.react";
import { Modal } from "@mui/material";
import jsPDF from "jspdf";
import UserContext from "../../UserContext/store";

function QRCodeModal({ petName, showQRModal, setShowQRModal }) {
  const userInfo = useContext(UserContext);

  const baseUrl =
    process.env.FIND_MY_PET_CLIENT_ENDPOINT ||
    "https://find-my-pet-tau.vercel.app/";

  const [QRCodeValue, setQRCodeValue] = useState("");
  const [selectedSizeOption, setSelectedSizeOption] = useState("Default");
  const [QRSize, setQRSize] = useState(40);

  useEffect(() => {
    if (userInfo?.id && !QRCodeValue) {
      const qrcodeValue = `${baseUrl}/lost-pet/${userInfo.id}&${btoa(petName)}`;
      setQRCodeValue(qrcodeValue);
    }
  }, [userInfo?.id, QRCodeValue, petName, baseUrl]);

  const onGenerateQRCodeBtnClick = () => {
    const qrcodeValue = `${baseUrl}/lost-pet/${userInfo.id}&${btoa(petName)}`;
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
    <Modal
      open={showQRModal}
      onClose={() => setShowQRModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="qrcode-modal"
    >
      <div className="qrcode-modal-container">
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
                    onChange={(e) => setSelectedSizeOption(e.target.value)}
                  />
                  <label htmlFor="default-size">Default Size</label>
                </div>

                <div>
                  <input
                    type="radio"
                    value="Custom"
                    id="custom-size"
                    checked={selectedSizeOption === "Custom"}
                    onChange={(e) => setSelectedSizeOption(e.target.value)}
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
            className="generate-qrcode-button"
            onClick={() => onGenerateQRCodeBtnClick()}
          >
            Generate QR Code
          </button>
        )}
      </div>
    </Modal>
  );
}

export default QRCodeModal;
