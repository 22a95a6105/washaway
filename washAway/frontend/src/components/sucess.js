import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Success() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const transactionId = query.get('transactionId');

  useEffect(() => {
    if (transactionId) {
      axios.get(`http://localhost:3002/payment/validate/${transactionId}`)
        .then(response => {
            console.log(response.data);
          setPaymentDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching payment details:', error);
        });
    }
  }, [transactionId]);

  if (!paymentDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {/* <h1>{paymentDetails.data}</h1> */}
      <h1>Payment Successful!</h1>
      <p>Transaction ID: {paymentDetails.data.transactionId}</p>
      <p>Status: {paymentDetails.code}</p>
      <p>Amount: {paymentDetails.data.amount / 100} (in appropriate currency)</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default Success;
