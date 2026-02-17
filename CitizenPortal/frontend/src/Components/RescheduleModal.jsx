import { useState } from "react";
import { rescheduleAppointment } from "./api/appointmentsApi.js";

export default function RescheduleModal({ open, onClose, appointmentId, onSuccess }) {
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await rescheduleAppointment(appointmentId, newDate, newTime);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to reschedule");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Reschedule Appointment</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium">New Date</label>
                        <input
                            type="date"
                            className="border rounded w-full p-2"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">New Time</label>
                        <input
                            type="time"
                            className="border rounded w-full p-2"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
