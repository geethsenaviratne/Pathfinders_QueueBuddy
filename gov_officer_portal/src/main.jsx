import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import GovernmentLogin from "../src/government-login.jsx";
import DashboardHome from "../src/dashboard.jsx";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GovernmentLogin />} />
                <Route path="/dashboard" element={<DashboardHome />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);