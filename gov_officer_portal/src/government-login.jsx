"use client"
import React from "react";
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin: 0;
`

const LoginCard = styled.div`
  background: linear-gradient(135deg, #e6fffa 0%, #f0fff4 100%);
  border: 1px solid #aad4b7ff;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  margin: 0 0 8px 0;
`

const CardDescription = styled.p`
  color: #718096;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.5;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #38a169;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #38a169;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.1);
  }
`

const PasswordContainer = styled.div`
  position: relative;
`

const PasswordInput = styled(Input)`
  padding-right: 48px;
`

const EyeIcon = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  padding: 4px;

  &:hover {
    color: #4a5568;
  }
`

const LoginButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;

  &:hover {
    background: linear-gradient(135deg, #2f855a 0%, #276749 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const SecurityNotice = styled.p`
  text-align: center;
  color: #718096;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`

const Footer = styled.p`
  text-align: center;
  color: #718096;
  font-size: 0.9rem;
  margin-top: 24px;
  line-height: 1.4;
`

const GovernmentLogin = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    department: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Government login attempt:", formData)
    // Add your authentication logic here
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container>
      <Header>
        <Title>Government Portal</Title>
        <Subtitle>Secure access for authorized officials</Subtitle>
      </Header>

      <LoginCard>
        <CardTitle>Official Login</CardTitle>
        <CardDescription>Enter your credentials to access the appointment management system</CardDescription>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Employee ID</Label>
            <Input
              type="text"
              name="employeeId"
              placeholder="Enter your employee ID"
              value={formData.employeeId}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Department</Label>
            <Select name="department" value={formData.department} onChange={handleInputChange} required>
              <option value="">Select Department</option>
              <option value="health">Health Department</option>
              <option value="education">Education Department</option>
              <option value="finance">Finance Department</option>
              <option value="administration">Administration</option>
              <option value="public-works">Public Works</option>
              <option value="social-services">Social Services</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <PasswordContainer>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <EyeIcon
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </EyeIcon>
            </PasswordContainer>
          </FormGroup>

          <LoginButton type="submit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure Login
          </LoginButton>

          <SecurityNotice>This system uses multi-factor authentication and encryption</SecurityNotice>
        </form>
      </LoginCard>

      <Footer>Authorized personnel only. All access is monitored and logged.</Footer>
    </Container>
  )
}

export default GovernmentLogin
