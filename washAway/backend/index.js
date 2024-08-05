// // Importing modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const paymentRoutes = require('./routes/paymentRoutes');

// // Creating express application
// const app = express();

// // Setting up middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Using routes
// app.use('/', paymentRoutes);

// // Starting the server
// const port = 3002;
// app.listen(port, () => {
//   console.log(`PhonePe application listening on port ${port}`);
// });

// Importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const sha256 = require("sha256");
const uniqid = require("uniqid");

// Creating express application
const app = express();

// UAT environment
const MERCHANT_ID = "PGTESTPAYUAT86";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX = 1;
const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const APP_BE_URL = "http://localhost:3000"; // our application

// Setting up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Defining a test route
app.get("/", (req, res) => {
  res.send("PhonePe Integration APIs!");
});

// Endpoint to initiate a payment
app.post("/pay", async function (req, res) {
  try {
    const amount = req.body.amount;
    console.log("Received amount:", amount);

    let merchantTransactionId = uniqid();
    let normalPayLoad = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID123",
      amount: amount * 100,
      redirectUrl: `${APP_BE_URL}/success`,
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      // PhonePeDPSDK.startPG({ environment: "production" });

    };

    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    console.log("Payload:", normalPayLoad);
    console.log("X-VERIFY:", xVerifyChecksum);

    let response = await axios.post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    );

    console.log("PhonePe Response:", response.data);
    // Redirect with transaction ID
    if (response.data.success)
    res.json({ redirectUrl: `${APP_BE_URL}/success?transactionId=${merchantTransactionId}` });
  } catch (error) {
    console.error("Error in payment initiation:", error.response ? error.response.data : error.message);
    res.status(500).send("Server error");
  }
});

// Endpoint to check the status of payment
app.get("/payment/validate/:merchantTransactionId", async function (req, res) {
  const { merchantTransactionId } = req.params;
  if (merchantTransactionId) {
    let statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId;

    let string = `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    try {
      let response = await axios.get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": merchantTransactionId,
          accept: "application/json",
        },
      });

      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        res.send(response.data);
      } else {
        res.send(response.data);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send("Invalid request");
  }
});

// Starting the server
const port = 3002;
app.listen(port, () => {
  console.log(`PhonePe application listening on port ${port}`);
});
