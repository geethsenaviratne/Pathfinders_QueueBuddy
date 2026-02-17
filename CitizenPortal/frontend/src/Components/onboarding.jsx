"use client"
import styled from "styled-components"

const OnboardingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #c3c9e6ff 0%, #3f5b97ff 100%);
  padding: 20px;
`

const OnboardingCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`

const PrimaryButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3182ce;
    transform: translateY(-1px);
  }
`

const SecondaryButton = styled.button`
  background: transparent;
  color: #4299e1;
  border: 2px solid #4299e1;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4299e1;
    color: white;
    transform: translateY(-1px);
  }
`

const SocialLoginSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #e2e8f0;
`

const SocialLoginText = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 20px;
  text-align: center;
`

const SocialButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

const SocialButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.facebook {
    color: #1877f2;
  }

  &.google {
    color: #4285f4;
  }

  &.apple {
    color: #000;
  }
`

const Onboarding = ({ onSwitchToLogin, onSwitchToSignup }) => {
  const handleSocialLogin = (provider) => {
    console.log(`[v0] Social login with ${provider}`)
    // Add social login logic here
  }

  return (
    <OnboardingContainer>
      <OnboardingCard>
        <Title>Welcome to QueueBuddy</Title>
        <Subtitle>
          Streamline your appointment scheduling with our easy-to-use platform. Book, manage, and track all your
          appointments in one place.
        </Subtitle>

        <ButtonContainer>
          <PrimaryButton onClick={onSwitchToSignup}>Get Started - Sign Up</PrimaryButton>
          <SecondaryButton onClick={onSwitchToLogin}>Already have an account? Log In</SecondaryButton>
        </ButtonContainer>

        <SocialLoginSection>
          <SocialLoginText>or Sign up with:</SocialLoginText>
          <SocialButtonContainer>
            <SocialButton
              className="facebook"
              onClick={() => handleSocialLogin("facebook")}
              title="Continue with Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialButton>
            <SocialButton className="google" onClick={() => handleSocialLogin("google")} title="Continue with Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 4.12-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </SocialButton>
            <SocialButton className="apple" onClick={() => handleSocialLogin("apple")} title="Continue with Apple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </SocialButton>
          </SocialButtonContainer>
        </SocialLoginSection>
      </OnboardingCard>
    </OnboardingContainer>
  )
}

export default Onboarding
