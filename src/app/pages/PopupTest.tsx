import "../styles/pages/home.css";
import PopupTestModal from "../components/dialogs/PopupTestModal";
import { useState } from "react";
import ConfirmLogout from "../components/dialogs/ConfirmLogout";
import ConfirmDeleteAccount from "../components/dialogs/ConfirmDeleteAccount";

const PopupTest = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>open modal</button>
      <button onClick={() => setShow2(true)}>open dialog</button>
      <button onClick={() => setShow3(true)}>open dialog</button>

      {show ? <PopupTestModal onCancel={() => setShow(false)} /> : null}
      {show2 ? <ConfirmLogout onCancel={() => setShow2(false)} /> : null}
      {show3 ? <ConfirmDeleteAccount onCancel={() => setShow3(false)} /> : null}
    </div>
  );
};

export default PopupTest;
