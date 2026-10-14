import { Routes } from "react-router-dom";
import EmployerNavbar from "../components/EmployerNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const EmployerLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <EmployerNavbar />
      <main>
        <Routes>{children}</Routes>
      </main>{" "}
    </div>
  );
};

export default EmployerLayout;
