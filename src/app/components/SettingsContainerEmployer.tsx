import { ReactNode, useState } from "react";
import "../styles/pages/notes.css";
import ConfirmLogout from "./dialogs/ConfirmLogout";
import ConfirmDisablePortfolio from "./dialogs/ConfirmDisablePortfolio";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiExit } from "react-icons/bi";
import ConfirmDeleteAccountEmployer from "./dialogs/ConfirmDeleteAccountEmployer";
import ConfirmChangePasswordEmployer from "./dialogs/ConfirmChangePasswordEmployer";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel?: () => void;
}

const SettingsContainerEmployer: React.FC<TemplateProps> = ({}) => {
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  return (
    <div className="settings_container">
      <div className="settings_container_section">
        <h1>GENERAL</h1>
        <div className="setting">
          <div>
            {" "}
            <h3>Joined</h3>
            <p>2 april 2022</p>
          </div>
        </div>

        <div className="setting">
          <div>
            <h3>email</h3>
            <p>miguelmarcoramcharan@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="settings_container_section">
        <h1>DANGER</h1>
        <div
          className="setting hover-icon-parent"
          onClick={() => setShow6(true)}
        >
          <div>
            <h3>change password</h3>
            <p>getting old?</p>
          </div>

          <MdEdit className="hover-icon" />
        </div>

        <div
          className="setting hover-icon-parent"
          onClick={() => setShow3(true)}
        >
          <div>
            <h3>delete account</h3>
            <p>sick of this app</p>
          </div>

          <MdDelete className="hover-icon" />
        </div>

        <div
          className="setting hover-icon-parent"
          onClick={() => setShow4(true)}
        >
          <div>
            <h3>logout</h3>
            <p>end your session</p>
          </div>

          <BiExit className="hover-icon" />
        </div>
      </div>

      {show3 ? (
        <ConfirmDeleteAccountEmployer onCancel={() => setShow3(false)} />
      ) : null}
      {show6 ? (
        <ConfirmChangePasswordEmployer onCancel={() => setShow6(false)} />
      ) : null}
      {show5 ? (
        <ConfirmDisablePortfolio onCancel={() => setShow5(false)} />
      ) : null}
      {show4 ? <ConfirmLogout onCancel={() => setShow4(false)} /> : null}
    </div>
  );
};

export default SettingsContainerEmployer;
