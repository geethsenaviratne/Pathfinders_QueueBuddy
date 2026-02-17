
import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { login } from "./api/userService.jsx";


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffffff;
  padding: 20px;
`

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
    background-color: #ffffffff;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormTitle = styled.h2`
  font-size: 30px;
  font-weight: 780;
  color: #1f2937;
  margin: 0 0 24px 0;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  background-color: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LoginButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 24px;

  &:hover {
    background-color: #3b82f6;
  }

  &:active {
    background-color: #3b82f6;
  }
`

const SignUpContainer = styled.div`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
`

const SignUpLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Login = ({ onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state for error messages
  const [loading, setLoading] = useState(false); // Add state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    // Prepare data for the backend
    const credentials = {
      email,
      password,
    };

    try {
      // Call the login API
      const response = await login(credentials);
      console.log("Login successful:", response);

      // Store the token from the response in localStorage
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token received from server");
      }

      // Redirect to dashboard or home page
      navigate("/home"); // Adjust the route as needed
    } catch (error) {
      // Handle errors from the backend
      const errorMessage =
          error.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password logic
    console.log("Forgot password clicked");
    // Optionally navigate to a forgot password page
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    onSwitchToSignUp();
  };

  return (
      <Container>
        <LoginCard>
          <Header>
            <Title>QueueBuddy</Title>
            <Subtitle>Sign in to your account</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FormTitle>Log In</FormTitle>

            {/* Display error message if exists */}
            {error && (
                <div style={{ color: "red", marginBottom: "16px", textAlign: "center" }}>
                  {error}
                </div>
            )}

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading} // Disable input during loading
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </FormGroup>

            <ForgotPasswordContainer>
              <ForgotPasswordLink onClick={handleForgotPassword}>
                Forgot password?
              </ForgotPasswordLink>
            </ForgotPasswordContainer>

            <LoginButton type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </LoginButton>

            <SignUpContainer>
              {"Don't have an account? "}
              <SignUpLink onClick={() => navigate("/signup")}>Sign up</SignUpLink>
            </SignUpContainer>
          </Form>
        </LoginCard>
      </Container>
  );
};

export default Login;
