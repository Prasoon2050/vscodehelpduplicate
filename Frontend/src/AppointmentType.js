import React from "react";
import "./App.css";

const AppointmentType = () => (
  <div className="flex justify-between p-6 bg-white rounded shadow-lg space-y-6">
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">Book Appointment</h3>
      <p>Select Your Consultation Type</p>
      <p>Fees approx ₹ 500</p>
      <p>(pay at clinic)</p>
    </div>
    <div className="flex space-x-4">
      <button className="px-4 py-2 rounded bg-blue-500 text-white">
        In-Clinic
      </button>
      <button className="px-4 py-2 rounded bg-blue-500 text-white">
        Audio
      </button>
      <button className="px-4 py-2 rounded bg-blue-500 text-white">
        Video
      </button>
    </div>
  </div>
);

export default AppointmentType;
