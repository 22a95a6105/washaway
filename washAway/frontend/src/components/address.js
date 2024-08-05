import React, { useState } from 'react';
import './AddressForm.css';
import Finalsummary from './finalsummary';
function Address(props) {
  const [formValues, setFormValues] = useState({
    doorNumber: '',
    landmark: '',
    street: '',
    area: '',
    state: '',
    city: '',
  });
  const[final,setFinal]=useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Address:', formValues);
    setFinal(true);
  };
  if(final) return <Finalsummary address={formValues} data={props.data}/>

  return (
    <div className="address-form-container">
      <div className="address-form-card">
        <h2>Enter Your Address</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Door Number:</label>
            <input
              type="text"
              name="doorNumber"
              value={formValues.doorNumber}
              onChange={handleChange}
              // required
            />
          </div>
          <div>
            <label>Landmark:</label>
            <input
              type="text"
              name="landmark"
              value={formValues.landmark}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formValues.street}
              onChange={handleChange}
              // required
            />
          </div>
          <div>
            <label>Area:</label>
            <input
              type="text"
              name="area"
              value={formValues.area}
              onChange={handleChange}
              // required
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formValues.state}
              onChange={handleChange}
              // required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              // required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Address;
