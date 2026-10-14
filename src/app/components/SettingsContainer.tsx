import { ReactNode, useState } from "react";
import "../styles/pages/notes.css";
import ConfirmDeleteAccount from "./dialogs/ConfirmDeleteAccount";
import ConfirmLogout from "./dialogs/ConfirmLogout";
import ConfirmDisablePortfolio from "./dialogs/ConfirmDisablePortfolio";
import ConfirmChangePassword from "./dialogs/ConfirmChangePasswordEmployer";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel?: () => void;
}

const SettingsContainer: React.FC<TemplateProps> = ({}) => {
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  return (
    <div className="settings_container">
      <div className="setting">
        <h3>Joined</h3>
        <p>2 april 2022</p>
      </div>

      <div className="setting">
        <h3>email</h3>
        <p>miguelmarcoramcharan@gmail.com</p>
      </div>

      <div className="setting" onClick={() => setShow6(true)}>
        <h3>change password</h3>
        <p>getting old?</p>
      </div>

      <div className="setting" onClick={() => setShow3(true)}>
        <h3>delete account</h3>
        <p>sick of this app</p>
      </div>

      <div className="setting" onClick={() => setShow4(true)}>
        <h3>logout</h3>
        <p>end your session</p>
      </div>
      {show3 ? <ConfirmDeleteAccount onCancel={() => setShow3(false)} /> : null}
      {show6 ? (
        <ConfirmChangePassword onCancel={() => setShow6(false)} />
      ) : null}
      {show5 ? (
        <ConfirmDisablePortfolio onCancel={() => setShow5(false)} />
      ) : null}
      {show4 ? <ConfirmLogout onCancel={() => setShow4(false)} /> : null}
    </div>
  );
};

export default SettingsContainer;
