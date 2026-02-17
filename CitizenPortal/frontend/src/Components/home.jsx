"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`

const Navbar = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  min-height: 100px;
`

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  color: ${(props) => (props.active ? "#2563eb" : "#6b7280")};
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }
`

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const WelcomeSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const WelcomeTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`

const WelcomeText = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`

const ActionCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const ActionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`

const ActionDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
`

const Home = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState("Home")
  const navigate = useNavigate();

  const navItems = ["Home", "My Appointments", "Book Appointment", "Feedback", "Profile"]

  const quickActions = [
    {
      title: "Book New Appointment",
      description: "Schedule your next appointment.",
      route: "/bookappointments",
    },
    {
      title: "View My Appointments",
      description: "Check your upcoming and past appointments",
      route: "/appointments",
    },
    {
      title: "Leave Feedback",
      description: "Share your experience and help us improve",
      route: "/feedback",
    },
  ]

  const handleNavClick = (item) => {
    setActiveNav(item)
    if (item === "Profile") {
      navigate("/profile")
    } else if (item === "Home") {
      navigate("/home")
    } else if (item === "My Appointments") {
      navigate("/appointments")
    } else if (item === "Book Appointment") {
      navigate("/bookappointments")
    } else if (item === "Feedback") {
      navigate("/feedback")
    }
  }

  return (
      <HomeContainer>
        <Navbar>
          <Logo>QueueBuddy</Logo>
          <NavItems>
            {navItems.map((item) => (
                <NavItem
                    key={item}
                    active={activeNav === item}
                    onClick={() => handleNavClick(item)}
                >
                  {item}
                </NavItem>
            ))}
          </NavItems>
        </Navbar>

        <MainContent>
          <WelcomeSection>
            <WelcomeTitle>Welcome to QueueBuddy</WelcomeTitle>
            <WelcomeText>
              Manage your appointments, view your schedule, and access all your important information in one place.
            </WelcomeText>
          </WelcomeSection>

          <QuickActions>
            {quickActions.map((action, index) => (
                <ActionCard
                    key={index}
                    onClick={() => navigate(action.route)}  // 🔗 added navigation
                >
                  <ActionTitle>{action.title}</ActionTitle>
                  <ActionDescription>{action.description}</ActionDescription>
                </ActionCard>
            ))}
          </QuickActions>
        </MainContent>
      </HomeContainer>
  )
}

export default Home
