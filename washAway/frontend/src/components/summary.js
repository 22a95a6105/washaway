import React, { useState } from 'react';
import './summary.css'; // Ensure this path is correct
import Address from './address';
import { useLocation } from 'react-router-dom';

function Summary() {
    const location = useLocation();
    const data = location.state?.data || {};
    const { shirts, phants, jeans, shorts, tshirts } =data;
    const phantsCount = phants - jeans; // Assuming phants includes jeans, so subtract jeans count

    const shirtPrice = 7;
    const phantPrice = 8;
    const jeansPrice = 10;
    const shortsPrice = 5;
    const tshirtPrice = 5;

    const totalCost = (shirts * shirtPrice) +
                      (phantsCount * phantPrice) +
                      (jeans * jeansPrice) +
                      (shorts * shortsPrice) +
                      (tshirts * tshirtPrice);

    const totalItems = shirts + phantsCount + jeans + shorts + tshirts;

    const [next, setNext] = useState(false);

    const orderDetails = {
        shirts,
        phants: phantsCount,
        jeans,
        shorts,
        tshirts,
        totalCost,
        totalItems,
        shirtPrice :7,
        phantPrice : 8,
        jeansPrice : 10,
        shortsPrice :5,
        tshirtPrice : 5
    };

    if (next) {
        console.log(orderDetails);
        return <Address data={orderDetails} />;
    }

    return (
        <div className="summary-container">
            <h1 className="summary-header">Order Summary</h1>
            {shirts > 0 && <p className="summary-item">Shirts: {shirts} x ₹{shirtPrice} = <strong>₹{shirts * shirtPrice}</strong></p>}
            {phantsCount > 0 && <p className="summary-item">Phants: {phantsCount} x ₹{phantPrice} = <strong>₹{phantsCount * phantPrice}</strong></p>}
            {jeans > 0 && <p className="summary-item">Jeans: {jeans} x ₹{jeansPrice} = <strong>₹{jeans * jeansPrice}</strong></p>}
            {shorts > 0 && <p className="summary-item">Shorts: {shorts} x ₹{shortsPrice} = <strong>₹{shorts * shortsPrice}</strong></p>}
            {tshirts > 0 && <p className="summary-item">T-Shirts: {tshirts} x ₹{tshirtPrice} = <strong>₹{tshirts * tshirtPrice}</strong></p>}
            <hr />
            <p className="total-cost"><strong>Total Cost: ₹{totalCost}</strong></p>
            <p>Total Items: {totalItems}</p>
            <button class='btn' onClick={() => setNext(true)}>Next</button>
        </div>
    );
}

export default Summary;
