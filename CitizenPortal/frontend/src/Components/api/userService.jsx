import api from "./api";

// Signup
export const signup = async (userData) => {
    const response = await api.post("/api/users", userData);
    return response.data;
};

// Login
export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

// Fetch authenticated user profile
export const getUserProfile = async () => {
    const response = await api.get("/api/me");
    return response.data;
};

// Update user profile (simulated, as additional fields are stored in local storage)
export const updateUserProfile = async (userData) => {
    return userData;
};

