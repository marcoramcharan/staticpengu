import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
import { Helmet } from "react-helmet"; // Using regular react-helmet

// Define the props type for each card
interface ConsoleCardProps {
  title: string;
  icon: string;
  link: string;
  color: string;
}

// Card component for each section
const ConsoleCard: React.FC<ConsoleCardProps> = ({
  title,
  icon,
  link,
  color,
}) => {
  return (
    <Link to={link}>
      <div className="console-card" style={{ backgroundColor: color }}>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <style>{`
          .console-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            border-radius: 10px;
            color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            min-height: 200px;
          }
          .console-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }
          .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
          }
        `}</style>
      </div>
    </Link>
  );
};

// Main Employer Console component
const EmployerConsole: React.FC = () => {
  const { employer } = useStore();
  const ID = employer.user._id;
  
  // Fix the string interpolation in the Messages link
  const consoleItems = [
    {
      title: "Vacancies",
      icon: "📋",
      link: `/employer/console/${ID}/jobs`,
      color: "#4a6fa5",
    },
    {
      title: "Applicants",
      icon: "👥",
      link: `/employer/console/${ID}/applicants`,
      color: "#6a8d73",
    }
  ];

  return (
    <div className="employer-console">
      <Helmet>
        <title>Employer Dashboard</title>
        <meta name="description" content="Manage your job listings, applicants, and messages all in one place." />
      </Helmet>
      
      <h1>Employer Dashboard</h1>
      <div className="console-grid">
        {consoleItems.map((item, index) => (
          <ConsoleCard
            key={index}
            title={item.title}
            icon={item.icon}
            link={item.link}
            color={item.color}
          />
        ))}
      </div>

      <style>{`
        .employer-console {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }
        .console-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .console-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployerConsole;