import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <MainNavbar />
      <main>
        {children}
      </main>{" "}
      <Footer />
    </div>
  );
};

export default MainLayout;
