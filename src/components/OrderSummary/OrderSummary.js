import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Footer from "../Footer/Footer";
import "./OrderSummary.css";

function OrderSummary() {
    const location = useLocation();
    const orderSummary = location?.state?.orderSummary;
    const navigate = useNavigate();

    const downloadReceipt = () => {
        const doc = new jsPDF("p","pt", "a4" );
        const receiptHtml = document.getElementById("payment-receipt");
        doc.text("Order  Summary", doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
        const marginX = (doc.internal.pageSize.getWidth() / 2)/2;
        doc.html(receiptHtml, {
            callback: function (pdf) {
              pdf.save("Payment-Receipt.pdf");
            },
            x: marginX,
            y: 60,
            html2canvas: { scale: .60 }
         });
    }

    return (
        <div className="order-summary-container">
            <div className="order-summary-card">
                <h1>Order Summary</h1>
                <div id="payment-receipt" className="order-summary-info">
                    <p>Type: <span>{orderSummary?.type}</span></p>
                    <p>Breed: <span>{orderSummary?.breed}</span></p>
                    <p>Delivery Address: <span>{orderSummary?.address}</span></p>
                    <p>Payment Method: <span>{orderSummary?.selectedPaymentOption}</span></p>
                    <div className="line"></div>
                    <p>Total: <span>{orderSummary?.price}</span></p>
                </div>
                <div className="order-summary-btn-container">
                    <button className="order-summary-btn" onClick={() => downloadReceipt()}>Download Receipt</button>
                    <button className="order-summary-btn" onClick={() => navigate("/services/pet-selling")}>Continue Shopping</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderSummary;