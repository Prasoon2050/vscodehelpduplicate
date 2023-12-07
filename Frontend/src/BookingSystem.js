import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingSystem() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { date, time, type } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const notify = () => toast("Booking Successful!");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(event.target.validity.valid);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  console.log(loader);

  const sendOtp = () => {
    setLoader(true);
    fetch("http://localhost:3001/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.text())
      .then(() => {
        setOtpSent(true);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoader(false);
      });
  };

  const verifyOtp = () => {
    fetch("http://localhost:3001/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          sendBookingDataToBackend();
        } else {
          alert("OTP verification failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const sendBookingDataToBackend = () => {
    const bookingData = { date, time, email, type };

    fetch("http://localhost:3001/bookSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          notify();
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else {
          alert("Booking failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className="p-6 bg-white rounded shadow-lg space-y-6"
      style={{ paddingLeft: "5%", paddingTop: "5%" }}
    >
      <hr className="border-light-grey border-t-1" />
      <div className="flex justify-between items-center space-x-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Book Appointment</h3>
          <p>{type} Consultation</p>
          <p>Fees approx ₹ 500</p>
          <p>(pay at clinic)</p>
        </div>
        <div
          className="flex flex-col items-center space-y-2"
          style={{ marginRight: "40%" }}
        >
          <div className="flex space-x-2">
            <div>{date}</div>
            <div>{time}</div>
          </div>
          <button
            className="border-none text-blue-500"
            onClick={() => (window.location.href = "/")}
          >
            Change Date & Time
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-gray-500 text-sm">Enter phone number to continue</p>
        <p className="text-gray-500 text-sm">
          Please enter your Email to receive timely updates.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="w-1/3 border-b-2 border-black focus:outline-none focus:border-blue-500"
          required
        />
        <p className="text-gray-400 text-xs w-1/3">
          Please enter the Email of the patient. You will receive a confirmation
          message on this Email.
        </p>
        {otpSent && (
          <div className="w-1/3">
            <input
              type="text"
              value={otp}
              className="w-full border-b-2 border-black focus:outline-none focus:border-blue-500"
              onChange={handleOtpChange}
              placeholder="Enter OTP"
            />
            <button
              className={`mt-4 px-6 py-2 text-sm rounded text-white ${
                isValid ? "bg-blue-500" : "bg-gray-500"
              }`}
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className={`px-6 py-2 rounded text-white ${
              isValid ? "bg-blue-500" : "bg-gray-500"
            }`}
            disabled={!isValid}
            onClick={sendOtp}
          >
            {loader ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
}

export default BookingSystem;
