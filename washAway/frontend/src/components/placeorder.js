import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './placceorder.css';

function Placeorder() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        shirts: 0,
        phants: 0,
        jeans: 0,
        shorts: 0,
        tshirts: 0,
    });

    useEffect(() => {
        // Retrieve form data from local storage on component mount
        const savedData = JSON.parse(localStorage.getItem('formValues'));
        if (savedData) {
            setFormValues(savedData);
        }
    }, []);

    const place = (event) => {
        event.preventDefault();
        const formdata = {
            shirts: Number(document.getElementById('shirts').value) || 0,
            phants: Number(document.getElementById('phants').value) || 0,
            jeans: Number(document.getElementById('jeans').value) || 0,
            shorts: Number(document.getElementById('shorts').value) || 0,
            tshirts: Number(document.getElementById('tshirts').value) || 0,
        };

        // Check if all items are 0
        const totalItems = formdata.shirts + formdata.phants + formdata.jeans + formdata.shorts + formdata.tshirts;
        if (totalItems === 0) {
            alert("Invalid input: Please enter at least one item.");
        } else if (formdata.phants < formdata.jeans) {
            alert('Include jeans count into phants count \n Jeans cannot be more than phants');
        } else {
            setFormValues(formdata);
            // Save form data to local storage
            localStorage.setItem('formValues', JSON.stringify(formdata));
            navigate('/summary', { state: { data: formdata } });
        }
    };

    return (
        <>
        <div className="container">
            <div className="place-order-form">
                <h1>Enter Details</h1>
                <label>Total Number of shirts</label>
                <input type="number" name="shirts" id="shirts" value={formValues.shirts} onChange={(e) => setFormValues(prev => ({ ...prev, shirts: e.target.value }))} min="0" step="1" />
                <br />
                <label>Total Number of Phants (with jeans)</label>
                <input type="number" id="phants" value={formValues.phants} onChange={(e) => setFormValues(prev => ({ ...prev, phants: e.target.value }))} min="0" step="1" />
                <br />
                <label>Number Of Jeans</label>
                <input type="number" id="jeans" value={formValues.jeans} onChange={(e) => setFormValues(prev => ({ ...prev, jeans: e.target.value }))} min="0" />
                <br />
                <label>Number Of Shorts</label>
                <input type="number" id="shorts" value={formValues.shorts} onChange={(e) => setFormValues(prev => ({ ...prev, shorts: e.target.value }))} min="0" />
                <br />
                <label>Number Of Tshirts</label>
                <input type="number" id="tshirts" value={formValues.tshirts} onChange={(e) => setFormValues(prev => ({ ...prev, tshirts: e.target.value }))} min="0" />
                <br />
                <button onClick={place}>Submit</button>
            </div>
        </div>
        </>
    );
}

export default Placeorder;
