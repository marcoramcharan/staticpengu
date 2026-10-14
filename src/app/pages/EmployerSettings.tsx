import { Helmet } from "react-helmet";
import "../styles/pages/settings.css";
import SettingsContainerEmployer from "../components/SettingsContainerEmployer";

const EmployerSettings = () => {
  return (
    <div className="settings">
      <Helmet>
        <title>Account Settings</title>
        <meta
          name="description"
          content="Manage your account settings, preferences, and profile information"
        />
      </Helmet>

      <h3>SETTINGS</h3>
      <SettingsContainerEmployer />
    </div>
  );
};

export default EmployerSettings;
