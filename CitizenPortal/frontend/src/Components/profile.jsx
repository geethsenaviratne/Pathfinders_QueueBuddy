"use client"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components"
import { getUserProfile, updateUserProfile } from "./api/userService.jsx"

const ProfileContainer = styled.div`
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

const MainContent = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
`

const Sidebar = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 280px;
  height: fit-content;
`

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`

const SidebarItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  color: ${(props) => (props.active ? "#2563eb" : "#6b7280")};
  cursor: pointer;
  transition: color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    color: #2563eb;
  }

  &:last-child {
    border-bottom: none;
  }
`

const LogoutButton = styled.button`
  width: 100%;
  background-color: #bd1f1f;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`

const ContentArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`

const ContentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`

const ContentSubtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const PhotoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.9rem;
`

const PhotoInfo = styled.div`
  flex: 1;
`

const PhotoTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
`

const PhotoSubtext = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FormGroup = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 2rem 0 1rem 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const SaveButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Profile");
  const [activeSidebar, setActiveSidebar] = useState("Profile Information");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    streetAddress: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(true);

  const navItems = ["Home", "My Appointments", "Book Appointment", "Feedback", "Profile"];
  const sidebarItems = ["Profile Information", "Security Settings", "Notification Preferences", "Appointment History"];

  // Fetch profile data and load from local storage on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        const { firstName, lastName, email } = response.data;

        // Load additional fields from local storage
        const storedData = JSON.parse(localStorage.getItem("userProfile")) || {};

        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          phone: storedData.phone || "",
          dateOfBirth: storedData.dateOfBirth || "",
          streetAddress: storedData.streetAddress || "",
          city: storedData.city || "",
          zipCode: storedData.zipCode || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleNavClick = (item) => {
    setActiveNav(item);
    if (item === "Home") {
      navigate("/home");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile (API call for firstName, lastName, email if backend supports it)
      const updatedData = await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      // Save additional fields to local storage
      const additionalData = {
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        streetAddress: formData.streetAddress,
        city: formData.city,
        zipCode: formData.zipCode,
      };
      localStorage.setItem("userProfile", JSON.stringify(additionalData));

      console.log("Profile updated:", { ...updatedData, ...additionalData });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ProfileContainer>
        <Navbar>
          <Logo>QueueBuddy</Logo>
          <NavItems>
            {navItems.map((item) => (
                <NavItem key={item} active={activeNav === item} onClick={() => handleNavClick(item)}>
                  {item}
                </NavItem>
            ))}
          </NavItems>
        </Navbar>

        <MainContent>
          <Sidebar>
            <SidebarTitle>Account</SidebarTitle>
            {sidebarItems.map((item) => (
                <SidebarItem key={item} active={activeSidebar === item} onClick={() => setActiveSidebar(item)}>
                  {item}
                </SidebarItem>
            ))}
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </Sidebar>

          <ContentArea>
            <ContentTitle>Profile Information</ContentTitle>
            <ContentSubtitle>Update your personal information</ContentSubtitle>

            <PhotoSection>
              <PhotoPlaceholder>Photo</PhotoPlaceholder>
              <PhotoInfo>
                <PhotoTitle>{`${formData.firstName} ${formData.lastName}`}</PhotoTitle>
                <PhotoSubtext>Change Photo</PhotoSubtext>
              </PhotoInfo>
            </PhotoSection>

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    disabled // Email is typically non-editable
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Input
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      placeholder="DD/MM/YYYY"
                  />
                </FormGroup>
              </FormRow>

              <SectionTitle>Address Information</SectionTitle>

              <FormGroup>
                <Label>Street Address</Label>
                <Input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>City</Label>
                  <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>ZIP Code</Label>
                  <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                  />
                </FormGroup>
              </FormRow>

              <ButtonGroup>
                <SaveButton type="submit">Save Changes</SaveButton>
                <CancelButton type="button" onClick={() => navigate("/home")}>
                  Cancel
                </CancelButton>
              </ButtonGroup>
            </Form>
          </ContentArea>
        </MainContent>
      </ProfileContainer>
  );
};

export default Profile;
