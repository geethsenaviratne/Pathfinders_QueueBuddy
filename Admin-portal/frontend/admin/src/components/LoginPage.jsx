import { useState } from "react"

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    department: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const departments = [
    "Department of Health",
    "Department of Education",
    "Department of Transportation",
    "Department of Finance",
    "Department of Public Safety",
    "Department of Social Services",
    "Department of Environmental Protection",
    "Department of Labor",
    "Department of Housing",
    "Department of Veterans Affairs",
  ];

  // Dummy login credentials
  const dummyCredentials = {
    email: "admin@gov.com",
    password: "admin123"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check dummy credentials
      if (formData.email === dummyCredentials.email &&
          formData.password === dummyCredentials.password) {

        // Create dummy response with token
        const dummyResponse = {
          message: "Login successful",
          token: "dummy-jwt-token-12345",
          user: {
            email: formData.email,
            department: formData.department,
            role: "admin"
          }
        };

        console.log("Login response:", dummyResponse);

        // Store token safely
        localStorage.setItem("token", dummyResponse.token);
        localStorage.setItem("user", JSON.stringify(dummyResponse.user));

        // Call onLogin to trigger the redirect
        onLogin(formData);
      } else {
        throw new Error("Invalid credentials. Use admin@gov.com / admin123");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Admin Portal</h1>
            <p className="login-subtitle">Secure Access to Analytics Dashboard</p>
          </div>

          {/* Demo credentials info */}
          <div style={{
            backgroundColor: "#e3f2fd",
            border: "1px solid #2196f3",
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "16px",
            fontSize: "14px"
          }}>
            <strong>Demo Credentials:</strong><br />
            Email: admin@gov.com<br />
            Password: admin123
          </div>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="department">
                Department
              </label>
              <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                  required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;