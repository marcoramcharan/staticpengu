import SettingsContainerEmployee from "../components/SettingsContainerEmployee";
import { Helmet } from "react-helmet";
import "../styles/pages/settings.css";

const EmployeeSettings = () => {
  return (
    <div className="settings">
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="Manage your account settings, preferences, and profile information" />
      </Helmet>
      
      <h3>SETTINGS</h3>
      <SettingsContainerEmployee />
    </div>
  );
};

export default EmployeeSettings;