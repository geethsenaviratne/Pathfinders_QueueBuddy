import { useEffect, useState } from "react";
import { fetchMyAppointments, cancelAppointment } from "./api/appointmentsApi.js";
import "./Appointments.css";   // 👈 centralized CSS file

export default function AppointmentsTable() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    async function loadAppointments() {
        setLoading(true);
        setError("");
        try {
            const data = await fetchMyAppointments(null, 0, 20);
            setAppointments(data.content || []);
        } catch (err) {
            setError(err.message || "Failed to load appointments");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    // Cancel confirm
    async function handleCancelConfirmed() {
        if (!appointmentToCancel) return;
        setCancelLoading(true);
        try {
            await cancelAppointment(appointmentToCancel.id, "Cancelled by user");
            await loadAppointments();
        } catch (err) {
            alert(err.message || "Failed to cancel appointment");
        } finally {
            setCancelLoading(false);
            setConfirmOpen(false);
            setAppointmentToCancel(null);
        }
    }

    function handleCancel(id) {
        const appt = appointments.find((a) => a.id === id);
        setAppointmentToCancel(appt);
        setConfirmOpen(true);
    }

    // Reschedule
    function handleOpenReschedule(id) {
        const appt = appointments.find((a) => a.id === id);
        setSelectedAppointment(appt);
        setRescheduleOpen(true);
    }

    function handleRescheduleSave() {
        // fake update
        setAppointments((prev) =>
            prev.map((a) =>
                a.id === selectedAppointment.id
                    ? { ...a, date: newDate, time: newTime }
                    : a
            )
        );
        setRescheduleOpen(false);
        setNewDate("");
        setNewTime("");
    }

    return (
        <section className="appointments-section">
            <div className="appointments-card">
                <h1 className="appointments-title">My Appointments</h1>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && appointments.length === 0 && (
                    <p className="text-center">No appointments found.</p>
                )}

                {appointments.length > 0 && (
                    <div className="table-wrapper">
                        <table className="appointments-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointments.map((a, index) => (
                                <tr key={a.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td>{a.date}</td>
                                    <td>{a.time}</td>
                                    <td>{a.departmentName}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${
                                                a.status === "BOOKED" ? "status-booked" : "status-other"
                                            }`}
                                        >
                                            {a.status}
                                        </span>
                                    </td>
                                    <td>
                                        {a.status === "BOOKED" && (
                                            <>
                                                <button
                                                    onClick={() => handleCancel(a.id)}
                                                    className="btn btn-cancel"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleOpenReschedule(a.id)}
                                                    className="btn btn-reschedule"
                                                >
                                                    Reschedule
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Reschedule Modal */}
                {rescheduleOpen && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h2>Reschedule Appointment</h2>
                            <p>
                                {selectedAppointment?.departmentName} – Current:{" "}
                                {selectedAppointment?.date} at {selectedAppointment?.time}
                            </p>
                            <div className="modal-inputs">
                                <input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                                <input
                                    type="time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                />
                            </div>
                            <div className="modal-actions">
                                <button
                                    className="btn btn-reschedule"
                                    disabled={!newDate || !newTime}
                                    onClick={handleRescheduleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-cancel"
                                    onClick={() => setRescheduleOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancel Confirmation */}
                {confirmOpen && (
                    <div className="confirm-overlay">
                        <div className="confirm-box">
                            <h2>Cancel Appointment</h2>
                            <p>
                                Are you sure you want to cancel your appointment on{" "}
                                {appointmentToCancel?.date} at {appointmentToCancel?.time}?
                            </p>
                            <div className="confirm-actions">
                                <button
                                    className="btn btn-cancel"
                                    onClick={handleCancelConfirmed}
                                    disabled={cancelLoading}
                                >
                                    {cancelLoading ? <span className="spinner"></span> : "Yes, Cancel"}
                                </button>
                                <button
                                    className="btn btn-reschedule"
                                    onClick={() => setConfirmOpen(false)}
                                    disabled={cancelLoading}
                                >
                                    No, Keep
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
