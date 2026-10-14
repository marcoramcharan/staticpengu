import UserNavbar from "../components/UserNavbar";
import { Routes } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <UserNavbar />
      <main>
        <Routes>{children}</Routes>
      </main>{" "}
    </div>
  );
};

export default DashboardLayout;
