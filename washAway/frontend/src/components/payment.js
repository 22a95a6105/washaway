import axios from 'axios';

function Payment(props) {
    let data = {
        name: "Jay",
        mobileNumber: "8341829286",
        amount: props.data.totalCost,
        MUID: "M" + Date.now(),
        // transactionId: "T" + Date.now(),
    };

    const payNow = async () => {
        try {
            console.log("Initiating payment...");
            let res = await axios.post('http://localhost:3002/pay', { amount: data.amount });
            console.log(res);
                window.location.href = res.data.redirectUrl;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <>
            <button onClick={payNow}>Pay</button>
        </>
    );
}

export default Payment;
