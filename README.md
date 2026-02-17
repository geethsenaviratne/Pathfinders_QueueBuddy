
# Pathfinders QueueBuddy

Pathfinders QueueBuddy is a robust queue management system designed to streamline and optimize service queues for businesses and organizations. Leveraging modern web technologies, QueueBuddy offers an intuitive interface for users and administrators, real-time updates, and comprehensive analytics to enhance customer experience and operational efficiency.

## 🚀 Tech Stack

- **Frontend:** [React](https://react.dev/)
- **Backend:** [Spring Boot](https://spring.io/projects/spring-boot)
- **Database:** SQL (e.g., MySQL)

## ✨ Features

- **Real-Time Queue Updates:** Instantly view and update queue status for both users and admins.
- **User-Friendly Interface:** Modern, responsive design built with React for seamless user experience.
- **Role-Based Access Control:** Secure authentication and authorization for different user roles.
- **Comprehensive Analytics:** Detailed insights and reporting for queue performance and user activity.
- **Notifications:** Real-time alerts and notifications for queue status changes.
- **Customizable Settings:** Flexible configuration options to fit various business needs.

## 🏗️ Project Structure

```
frontend/      # React application
backend/       # Spring Boot backend API
docs/          # Documentation and resources
```

## 🚦 Getting Started

### Prerequisites

- Node.js (for frontend)
- Java 21 (for backend)
- SQL database (e.g., MySQL)

### Clone the Repository

```bash
git clone https://github.com/ChanuRasmika/Pathfinders_QueueBuddy.git
cd Pathfinders_QueueBuddy
```

### Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

### Backend Setup (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

### Database Setup

1. Create a new SQL database instance.
2. Update the database credentials and URL in `backend/src/main/resources/application.properties`:

    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/queuebuddy_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

3. Run the backend server to auto-create tables.

## 📦 Deployment

- **Frontend:** Deploy with Vercel, Netlify, or any static hosting provider.
- **Backend:** Deploy on Heroku, AWS Elastic Beanstalk, or any Java-compatible server.
- **Database:** Use managed SQL services like AWS RDS, Azure SQL, or Google Cloud SQL.

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a new branch, and submit a pull request with your changes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).



> Pathfinders QueueBuddy – Efficient queues, happier customers!
