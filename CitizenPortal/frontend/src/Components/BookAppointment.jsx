import React, { useEffect, useState } from "react";
import "./BookAppointment.css";

export default function BookAppointment() {
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/api/departments", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setDepartments(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    departmentId: Number(departmentId),
                    appointmentDate: date,
                    appointmentTime: time.length === 5 ? time + ":00" : time,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`✅ Appointment booked! Queue number: ${data.data || "N/A"}`);
            } else {
                setMessage(`❌ ${data.message || "Booking failed"}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("⚠️ Error booking appointment.");
        }
    };

    return (
        <div className="appointment-container">
            <div className="appointment-card">
                <h2 className="appointment-title">Book an Appointment</h2>
                <p className="appointment-subtitle">
                    Please select a department and your preferred time slot.
                </p>

                {message && (
                    <div
                        className={`appointment-message ${
                            message.startsWith("✅")
                                ? "success"
                                : message.startsWith("❌")
                                    ? "error"
                                    : "warning"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <label>Department</label>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            required
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((d) => (
                                <option key={d.departmentId} value={d.departmentId}>
                                    {d.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Confirm Appointment
                    </button>
                </form>
            </div>
        </div>
    );
}
