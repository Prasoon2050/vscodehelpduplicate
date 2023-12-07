import React from "react";
import "./App.css";
import Person from "./assets/images/person.jpg";

const Profile = () => (
  <div className="profile">
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={Person} alt="Doctor profile" style={{ marginRight: "10px" }} />
      <div>
        <h2>Dr. Mark Gold</h2>
        <p>Obstetrics & Gynecology</p>
        <button className="px-6 py-2 rounded text-white bg-blue-500 text-sm">
          VIEW PROFILE
        </button>
      </div>
    </div>
  </div>
);

export default Profile;
