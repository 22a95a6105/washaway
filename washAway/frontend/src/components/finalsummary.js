import React, { useState } from 'react';
import './finalsummary.css';
import Payment from './payment';
function FinalSummary(props) {
    const { data, address } = props;
    const [pay,handlePay]=useState(false);
    if(pay) return <Payment data={data} address={address} />
    return (
        <div className="final-summary-container">
            <h2 className="final-summary-header">Final Summary</h2>
            
            <div className="summary-section order-summary">
                <h3 className="summary-title">Order Details</h3>
                {data.shirts > 0 && <p className="summary-item">Shirts: {data.shirts}</p>}
                {data.phants > 0 && <p className="summary-item">Phants: {data.phants}</p>}
                {data.jeans > 0 && <p className="summary-item">Jeans: {data.jeans}</p>}
                {data.shorts > 0 && <p className="summary-item">Shorts: {data.shorts}</p>}
                {data.tshirts > 0 && <p className="summary-item">T-Shirts: {data.tshirts}</p>}
                <p className="summary-total"><strong>Total Cost: ₹{data.totalCost}</strong></p>
                <p className="summary-total-items"><strong>Total Items: {data.totalItems}</strong></p>
            </div>
            
            <div className="summary-section address-summary">
                <h3 className="summary-title">Address Details</h3>
                <p className="address-item">{address.doorNumber}</p>
                <p className="address-item">{address.landmark}</p>
                <p className="address-item">{address.street}</p>
                <p className="address-item">{address.area}</p>
                <p className="address-item">{address.city}</p>
                <p className="address-item">{address.state}</p>
            </div>
            <button onClick={()=>handlePay(true)}>Pay Now</button>
        </div>
    );
}

export default FinalSummary;
