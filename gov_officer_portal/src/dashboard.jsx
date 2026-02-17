"use client"
import React from "react";
import { useState } from "react"
import styled from "styled-components"

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const GovLogo = styled.div`
  width: 32px;
  height: 32px;
  background-color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`

const HeaderTitle = styled.div`
  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
  p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NotificationBell = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  
  &::after {
    content: "3";
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`

const UserInfo = styled.div`
  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`

const MainLayout = styled.div`
  display: flex;
  flex: 1;
`

const Sidebar = styled.nav`
  width: 250px;
  background-color: #f1f5f9;
  padding: 1.5rem 0;
  border-right: 1px solid #e2e8f0;
`

const SidebarItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => (props.active ? "#16a34a" : "#64748b")};
  background-color: ${(props) => (props.active ? "#dcfce7" : "transparent")};
  
  &:hover {
    background-color: #e2e8f0;
  }
`

const SecurityStatus = styled.div`
  margin: 1rem 1.5rem;
  background-color: #fbbf24;
  color: #92400e;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.75rem;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
  }
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const MetricCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => props.color || "#16a34a"};
  
  h3 {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
    font-weight: 500;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.25rem 0;
  }
  
  .metric-change {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`

const PerformanceSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`

const PerformanceItem = styled.div`
  text-align: center;
  
  .icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.iconBg || "#f3f4f6"};
    color: ${(props) => props.iconColor || "#6b7280"};
  }
  
  h4 {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 0.25rem 0;
    font-weight: 500;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 0.5rem;
    background-color: ${(props) => props.indicatorColor || "#10b981"};
  }
`

const QuickActionsSection = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`

const ActionCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid ${(props) => (props.primary ? "#16a34a" : "#e5e7eb")};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => (props.primary ? "white" : "#1a1a1a")};
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: ${(props) => (props.primary ? "rgba(255,255,255,0.8)" : "#6b7280")};
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }
  
  ${(props) =>
    props.primary &&
    `
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    color: white;
  `}
`

const AppointmentsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  height: calc(100vh - 200px);
`

const AppointmentsMain = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const AppointmentsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }
`

const AppointmentsList = styled.div`
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
`

const AppointmentCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #f9fafb;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const AppointmentInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .service-type {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0 0 0.5rem 0;
  }
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) => (props.status === "confirmed" ? "#dcfce7" : "#fef3c7")};
  color: ${(props) => (props.status === "confirmed" ? "#166534" : "#92400e")};
`

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`

const AppointmentActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.primary
      ? `
    background-color: #16a34a;
    color: white;
    border-color: #16a34a;
    
    &:hover {
      background-color: #15803d;
    }
  `
      : `
    background-color: white;
    color: #374151;
    border-color: #d1d5db;
    
    &:hover {
      background-color: #f9fafb;
    }
  `}
`

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CalendarWidget = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 1rem;
`

const CalendarDay = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  border-radius: 4px;
  cursor: pointer;
  
  ${(props) =>
    props.isHeader
      ? `
    font-weight: 600;
    color: #6b7280;
    cursor: default;
  `
      : props.isToday
        ? `
    background-color: #16a34a;
    color: white;
    font-weight: 600;
  `
        : props.hasAppointment
          ? `
    background-color: #fbbf24;
    color: #92400e;
    font-weight: 500;
  `
          : `
    color: #374151;
    
    &:hover {
      background-color: #f3f4f6;
    }
  `}
`

const CommunicationsWidget = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
  }
`

const MessageItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
  
  .message-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  
  .sender-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: #1a1a1a;
  }
  
  .priority-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .priority-new {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .priority-high {
    background-color: #fecaca;
    color: #991b1b;
  }
  
  .message-content {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }
  
  .message-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    
    &:hover {
      background-color: #f9fafb;
    }
  }
`

const DocumentReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const DocumentQueue = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0 0 1.5rem 0;
  }
`

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const DocumentInfo = styled.div`
  flex: 1;
  
  .document-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .applicant-name {
    font-weight: 600;
    color: #1a1a1a;
  }
  
  .document-type {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  
  .submission-time {
    color: #9ca3af;
    font-size: 0.75rem;
  }
`

const DocumentStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${(props) => {
    switch (props.status) {
      case "needs-review":
        return "background-color: #fef3c7; color: #92400e;"
      case "corrections-needed":
        return "background-color: #fecaca; color: #991b1b;"
      case "approved":
        return "background-color: #dcfce7; color: #166534;"
      default:
        return "background-color: #f3f4f6; color: #6b7280;"
    }
  }}
`

const DocumentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`

const DasboardHome  = ({ onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("dashboard")

  const sidebarItems = [
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "document-review", label: "Document Review", icon: "📄" },
    { id: "communications", label: "Communications", icon: "💬" },
    { id: "citizens", label: "Citizens", icon: "👥" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  const handleNavClick = (item) => {
    if (item === "Profile") {
      onNavigate("profile")
    }
  }

  const handleLogout = () => {
    onLogout()
  }

  const renderContent = () => {
    switch (activeSection) {
      case "appointments":
        return (
          <AppointmentsSection>
            <AppointmentsMain>
              <AppointmentsHeader>
                <h2>📅 Upcoming Appointments</h2>
                <p>Your scheduled appointments with integrated document and communication status</p>
              </AppointmentsHeader>
              <AppointmentsList>
                <AppointmentCard>
                  <AppointmentHeader>
                    <AppointmentInfo>
                      <h3>
                        👤 Shenal Perera <StatusBadge status="confirmed">confirmed</StatusBadge> APT-2024-001
                      </h3>
                      <p className="service-type">Health Certificate</p>
                    </AppointmentInfo>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>🕙 10:00 AM</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Today</div>
                    </div>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <div>📍 Room 201</div>
                    <div>📄 Documents: 2/3 submitted</div>
                    <div>📞 (555) 123-4567</div>
                    <div>
                      💬 2 unread messages{" "}
                      <span
                        style={{
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          padding: "0.125rem 0.375rem",
                          fontSize: "0.75rem",
                          marginLeft: "0.25rem",
                        }}
                      >
                        2
                      </span>
                    </div>
                    <div>✉️ shenal12@gmail.com</div>
                  </AppointmentDetails>
                  <AppointmentActions>
                    <ActionButton primary>View Details</ActionButton>
                    <ActionButton>Review Documents</ActionButton>
                    <ActionButton>Send Message</ActionButton>
                    <ActionButton>Reply (2)</ActionButton>
                  </AppointmentActions>
                </AppointmentCard>

                <AppointmentCard>
                  <AppointmentHeader>
                    <AppointmentInfo>
                      <h3>
                        👤 Lavanya Bandara <StatusBadge status="pending">pending</StatusBadge> APT-2024-002
                      </h3>
                      <p className="service-type">Business License</p>
                    </AppointmentInfo>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>🕐 2:30 PM</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Today</div>
                    </div>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <div>📍 Room 105</div>
                    <div>📄 Documents: 3/3 submitted</div>
                    <div>📞 (555) 987-6543</div>
                    <div>💬 No new messages</div>
                    <div>✉️ lava2003@gmail.com</div>
                  </AppointmentDetails>
                  <AppointmentActions>
                    <ActionButton primary>View Details</ActionButton>
                    <ActionButton>Review Documents</ActionButton>
                    <ActionButton>Send Message</ActionButton>
                  </AppointmentActions>
                </AppointmentCard>

                <AppointmentCard>
                  <AppointmentHeader>
                    <AppointmentInfo>
                      <h3>
                        👤 kavindu Sankalpa <StatusBadge status="confirmed">confirmed</StatusBadge> APT-2024-003
                      </h3>
                      <p className="service-type">Permit Application</p>
                    </AppointmentInfo>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>🕘 9:00 AM</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Tomorrow</div>
                    </div>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <div>📍 Room 301</div>
                    <div>📄 Documents: 2/2 submitted</div>
                    <div>📞 (555) 456-7890</div>
                    <div>
                      💬 1 unread messages{" "}
                      <span
                        style={{
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          padding: "0.125rem 0.375rem",
                          fontSize: "0.75rem",
                          marginLeft: "0.25rem",
                        }}
                      >
                        1
                      </span>
                    </div>
                    <div>✉️ kavindu12@gmail.com</div>
                  </AppointmentDetails>
                  <AppointmentActions>
                    <ActionButton primary>View Details</ActionButton>
                    <ActionButton>Review Documents</ActionButton>
                    <ActionButton>Send Message</ActionButton>
                    <ActionButton>Reply (1)</ActionButton>
                  </AppointmentActions>
                </AppointmentCard>
              </AppointmentsList>
              <div style={{ padding: "1rem", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
                <ActionButton>View All Appointments</ActionButton>
              </div>
            </AppointmentsMain>

            <RightPanel>
              <CalendarWidget>
                <h3>
                  📅 Calendar <div style={{ fontSize: "0.875rem", fontWeight: "normal" }}>August 2025</div>
                </h3>
                <CalendarGrid>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <CalendarDay key={day} isHeader>
                      {day}
                    </CalendarDay>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1
                    const isToday = day === 16
                    const hasAppointment = [3, 7, 12, 15, 18, 22, 25, 28].includes(day)
                    return (
                      <CalendarDay key={day} isToday={isToday} hasAppointment={hasAppointment}>
                        {day}
                      </CalendarDay>
                    )
                  })}
                </CalendarGrid>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#16a34a",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}
                  ></span>
                  Today
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "1rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#fbbf24",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}
                  ></span>
                  Has Appointments
                </div>
                <ActionButton style={{ width: "100%" }}>View Full Calendar</ActionButton>
              </CalendarWidget>

              <CommunicationsWidget>
                <h3>💬 Communications</h3>
                <p>Recent messages and citizen interactions</p>

                <MessageItem>
                  <div className="message-header">
                    <span className="sender-name">Shenal Perera</span>
                    <span className="priority-badge priority-new">New</span>
                    <span className="priority-badge priority-high">high</span>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginLeft: "auto" }}>30 minutes ago</span>
                  </div>
                  <div className="message-content">Health certificate requirements</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
                    Need clarification on the medical examination requirements...
                  </div>
                  <div className="message-actions">
                    <button className="action-btn">↩️ Reply</button>
                    <button className="action-btn">📞 Call</button>
                    <button className="action-btn">📹 Video</button>
                  </div>
                </MessageItem>

                <MessageItem>
                  <div className="message-header">
                    <span className="sender-name">Lavanya Bandara</span>
                    <span className="priority-badge" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                      medium
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginLeft: "auto" }}>2 hours ago</span>
                  </div>
                  <div className="message-content">Document correction submission</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
                    I have uploaded the corrected business license documents...
                  </div>
                  <div className="message-actions">
                    <button className="action-btn">↩️ Reply</button>
                    <button className="action-btn">📞 Call</button>
                    <button className="action-btn">📹 Video</button>
                  </div>
                </MessageItem>

                <MessageItem>
                  <div className="message-header">
                    <span className="sender-name">Kavindu Sankalpa</span>
                    <span className="priority-badge" style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}>
                      low
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginLeft: "auto" }}>1 day ago</span>
                  </div>
                  <div className="message-content">Thank you for permit approval</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
                    Thank you for processing my permit application so quickly...
                  </div>
                  <div className="message-actions">
                    <button className="action-btn">↩️ Reply</button>
                    <button className="action-btn">📞 Call</button>
                    <button className="action-btn">📹 Video</button>
                  </div>
                </MessageItem>

                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <ActionButton style={{ marginRight: "0.5rem" }}>View All Messages</ActionButton>
                  <ActionButton primary>✉️ New Message</ActionButton>
                </div>
              </CommunicationsWidget>
            </RightPanel>
          </AppointmentsSection>
        )

      case "document-review":
        return (
          <DocumentReviewSection>
            <DocumentQueue>
              <h2>📄 Document Review Queue</h2>
              <p>Pre-submitted documents awaiting your review</p>

              <DocumentItem>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                  <DocumentInfo>
                    <div className="document-header">
                      <span className="applicant-name">Shenal Perera</span>
                      <DocumentStatus status="needs-review">Needs Review</DocumentStatus>
                    </div>
                    <div className="document-type">Health Certificate Application</div>
                    <div className="submission-time">Submitted 2 hours ago</div>
                  </DocumentInfo>
                </div>
                <DocumentActions>
                  <ActionButton primary>Review</ActionButton>
                </DocumentActions>
              </DocumentItem>

              <DocumentItem>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                  <DocumentInfo>
                    <div className="document-header">
                      <span className="applicant-name">Lavanya Bandara</span>
                      <DocumentStatus status="corrections-needed">Corrections Needed</DocumentStatus>
                    </div>
                    <div className="document-type">Business License Documents</div>
                    <div className="submission-time">Submitted 1 day ago</div>
                  </DocumentInfo>
                </div>
                <DocumentActions>
                  <ActionButton primary>Review</ActionButton>
                  <ActionButton>Message</ActionButton>
                </DocumentActions>
              </DocumentItem>

              <DocumentItem>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                  <DocumentInfo>
                    <div className="document-header">
                      <span className="applicant-name">Kavindu Sankalpa</span>
                      <DocumentStatus status="approved">Approved</DocumentStatus>
                    </div>
                    <div className="document-type">Permit Application Forms</div>
                    <div className="submission-time">Submitted 3 days ago</div>
                  </DocumentInfo>
                </div>
                <DocumentActions>
                  <ActionButton>Review</ActionButton>
                </DocumentActions>
              </DocumentItem>

              <div style={{ padding: "1rem", textAlign: "center", borderTop: "1px solid #e5e7eb", marginTop: "1rem" }}>
                <ActionButton>View All Documents</ActionButton>
              </div>
            </DocumentQueue>
          </DocumentReviewSection>
        )

      default:
        return (
          <>
            <DashboardHeader>
              <h1>Dashboard Overview</h1>
              <p>Welcome back, Dr. Kaveesha Rathnayake. Here's your department summary for today.</p>
            </DashboardHeader>

            <MetricsGrid>
              <MetricCard color="#16a34a">
                <h3>Today's Appointments</h3>
                <div className="metric-value">12</div>
                <p className="metric-change">+2 from yesterday</p>
              </MetricCard>
              <MetricCard color="#f59e0b">
                <h3>Pending Documents</h3>
                <div className="metric-value">8</div>
                <p className="metric-change">-3 from yesterday</p>
              </MetricCard>
              <MetricCard color="#3b82f6">
                <h3>Unread Messages</h3>
                <div className="metric-value">5</div>
                <p className="metric-change">+1 from yesterday</p>
              </MetricCard>
              <MetricCard color="#10b981">
                <h3>Citizens Served</h3>
                <div className="metric-value">47</div>
                <p className="metric-change">+12 this week</p>
              </MetricCard>
            </MetricsGrid>

            <PerformanceSection>
              <h2>📈 Department Performance</h2>
              <PerformanceGrid>
                <PerformanceItem iconBg="#fef3c7" iconColor="#d97706" indicatorColor="#ef4444">
                  <div className="icon">⏱️</div>
                  <h4>Average Processing Time</h4>
                  <div className="value">
                    2.3 days <span className="indicator"></span>
                  </div>
                </PerformanceItem>
                <PerformanceItem iconBg="#d1fae5" iconColor="#059669" indicatorColor="#10b981">
                  <div className="icon">✅</div>
                  <h4>Approval Rate</h4>
                  <div className="value">
                    94% <span className="indicator"></span>
                  </div>
                </PerformanceItem>
                <PerformanceItem iconBg="#fef2f2" iconColor="#dc2626" indicatorColor="#6b7280">
                  <div className="icon">⚠️</div>
                  <h4>Pending Reviews</h4>
                  <div className="value">
                    3 <span className="indicator"></span>
                  </div>
                </PerformanceItem>
              </PerformanceGrid>
            </PerformanceSection>

            <QuickActionsSection>
              <h2>➕ Quick Actions</h2>
              <QuickActionsGrid>
                <ActionCard primary>
                  <h3>📅 Schedule Appointment</h3>
                  <p>Book a new appointment for a citizen</p>
                </ActionCard>
                <ActionCard>
                  <h3>📄 Review Documents</h3>
                  <p>Process pending document submissions</p>
                </ActionCard>
                <ActionCard>
                  <h3>💬 Send Message</h3>
                  <p>Communicate with citizens</p>
                </ActionCard>
                <ActionCard>
                  <h3>👤 Citizen Lookup</h3>
                  <p>Search citizen records</p>
                </ActionCard>
                <ActionCard>
                  <h3>📊 Generate Report</h3>
                  <p>Create department reports</p>
                </ActionCard>
                <ActionCard>
                  <h3>⚙️ System Settings</h3>
                  <p>Configure dashboard preferences</p>
                </ActionCard>
              </QuickActionsGrid>
            </QuickActionsSection>
          </>
        )
    }
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderLeft>
          <GovLogo>G</GovLogo>
          <HeaderTitle>
            <h1>Gov Portal</h1>
            <p>Department of Health</p>
          </HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <NotificationBell>🔔</NotificationBell>
          <button onClick={() => handleNavClick("Profile")}>⚙️</button>
          <UserProfile>
            <UserAvatar>SJ</UserAvatar>
            <UserInfo>
              <h3>Dr. Kaveesha Rathnayake</h3>
              <p>Senior Official</p>
            </UserInfo>
          </UserProfile>
          <button onClick={handleLogout}>↗️</button>
        </HeaderRight>
      </Header>

      <MainLayout>
        <Sidebar>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.id} active={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
              <span>{item.icon}</span>
              {item.label}
            </SidebarItem>
          ))}

          <SecurityStatus>
            <h4>Security Status</h4>
            <p>System Secure</p>
          </SecurityStatus>
        </Sidebar>

        <MainContent>{renderContent()}</MainContent>
      </MainLayout>
    </DashboardContainer>
  )
}

export default DasboardHome 
