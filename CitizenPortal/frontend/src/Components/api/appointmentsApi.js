const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function getAuthHeaders() {
    const token = localStorage.getItem("token"); // assuming JWT stored in localStorage
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchMyAppointments(status, page = 0, size = 10) {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    if (status) params.append("status", status);

    const response = await fetch(`${API_BASE}/appointments/my?${params}`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
}

export async function cancelAppointment(id, reason = "") {
    const response = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason }),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
}

export async function rescheduleAppointment(id, newDate, newTime) {
    const response = await fetch(`${API_BASE}/appointments/${id}/reschedule`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ newDate, newTime }),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
}
