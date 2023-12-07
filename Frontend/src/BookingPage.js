import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const TimeSlot = ({ time, booked, onSelect, selected }) => {
  return (
    <td onClick={onSelect} className="cursor-pointer text-center">
      <button
        className={`${
          booked
            ? "bg-gray-200"
            : selected
            ? "bg-green-600 text-white"
            : "bg-white"
        } rounded-md px-12 py-2 hover:drop-shadow-md`}
        disabled={booked}
      >
        {time}
      </button>
    </td>
  );
};

const DateSlot = ({ date, onSelect, selected }) => (
  <div
    onClick={onSelect}
    className={`${
      selected ? "bg-blue-300" : "bg-white"
    } text-center px-6 py-2 rounded-lg hover:cursor-pointer`}
  >
    {date}
  </div>
);

const BookingPage = () => {
  const [dates] = useState(getNextThreeDates());
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const times_in_clinic = [
    "10:00 a.m.",
    "10:15 a.m.",
    "10:30 a.m.",
    "10:45 a.m.",
    "11:00 a.m.",
    "11:15 a.m.",
    "11:30 a.m.",
    "11:45 a.m.",
  ];
  const times_call = [
    "12:00 p.m.",
    "12:15 p.m.",
    "12:30 p.m.",
    "12:45 p.m.",
    "01:00 p.m.",
    "01:15 p.m.",
    "01:30 p.m.",
    "01:45 p.m.",
    "02:00 p.m.",
  ];
  const times_video = [
    "02:15 p.m.",
    "02:30 p.m.",
    "02:45 p.m.",
    "03:00 p.m.",
    "03:15 p.m.",
    "03:30 p.m.",
    "03:45 p.m.",
    "04:00 p.m.",
    "04:15 p.m.",
  ];

  const [timeSlots, setTimeSlots] = useState(times_in_clinic);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/bookedSlots") // replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        let temp_date = selectedDate;
        let temp_type =
          activeTab === 0 ? "In Clinic" : activeTab === 1 ? "Audio" : "Video";

        const filteredSlots = data.filter((slot) => {
          return slot.date === temp_date && slot.type === temp_type;
        });
        setBookedSlots(filteredSlots);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/bookedSlots") // replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        let temp_date = selectedDate;
        let temp_type =
          activeTab === 0 ? "In Clinic" : activeTab === 1 ? "Audio" : "Video";

        const filteredSlots = data.filter((slot) => {
          return slot.date === temp_date && slot.type === temp_type;
        });
        setBookedSlots(filteredSlots);
      });
  }, [activeTab, selectedDate]);

  const isBooked = (d, t) => {
    for (let i = 0; i < bookedSlots.length; i++) {
      if (bookedSlots[i].time === t && bookedSlots[i].date === d) return true;
    }
    return false;
  };

  return (
    <div>
      <hr className="border-light-grey border-t-1 mt-4" />
      <div className="p-6 bg-white rounded space-y-6">
        <div className="flex justify-between items-center space-x-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Book Appointment</h3>
            <p>Select Your Consultation Type</p>
            <p>Fees approx ₹ 500</p>
            <p>(pay at clinic)</p>
          </div>
          <div className="flex space-x-4">
            {["In Clinic", "Audio", "Video"].map((item, index) => {
              return (
                <button
                  className={`px-4 py-2 rounded  ${
                    index === activeTab
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 border-2 border-blue-500"
                  }`}
                  onClick={() => {
                    if (item === "In Clinic") {
                      setTimeSlots(times_in_clinic);
                      setActiveTab(0);
                    } else if (item === "Audio") {
                      setTimeSlots(times_call);
                      setActiveTab(1);
                    } else {
                      setTimeSlots(times_video);
                      setActiveTab(2);
                    }
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <hr className="border-light-grey border-t-1" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{ marginLeft: "2%" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {dates.slice(currentIndex, currentIndex + 3).map((date) => (
          <DateSlot
            key={date}
            date={date}
            onSelect={() => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            selected={date === selectedDate}
          />
        ))}
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex >= dates.length - 3}
          style={{ marginRight: "2%" }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="text-blue-500  text-center">
        <span className="font-bold">
          {timeSlots.length - bookedSlots.length}
        </span>{" "}
        slots available!
      </div>
      {selectedDate && (
        <div>
          <table className="m-auto w-full">
            <tbody>
              {chunkArray(timeSlots, 3).map((timeRow, i) => (
                <tr key={i}>
                  {timeRow.map((time, ind) => (
                    <TimeSlot
                      key={ind}
                      time={time}
                      booked={isBooked(selectedDate, time)}
                      onSelect={() => setSelectedTime(time)}
                      selected={time === selectedTime}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-end">
        <button
          className={`px-6 py-2 rounded text-white mr-6 ${
            selectedDate && selectedTime ? "bg-blue-500" : "bg-gray-500"
          }`}
          disabled={!selectedDate || !selectedTime}
          onClick={() =>
            navigate(
              `/booking/${selectedDate}/${selectedTime}/${
                JSON.stringify(timeSlots) === JSON.stringify(times_in_clinic)
                  ? "In Clinic"
                  : JSON.stringify(timeSlots) === JSON.stringify(times_call)
                  ? "Audio"
                  : "Video"
              }`
            )
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
};

function getNextThreeDates() {
  let dates = [];
  let currentDate = new Date();

  for (let i = 0; i < 30; i++) {
    let nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate.toISOString().split("T")[0]);
  }

  return dates;
}

function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default BookingPage;
