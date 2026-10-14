import EmployeeNavbar from "../components/EmployeeNavbar";
import { Routes } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <EmployeeNavbar />
      <main>
        <Routes>{children}</Routes>
      </main>{" "}
    </div>
  );
};

export default EmployeeLayout;
