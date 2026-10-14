import { ReactNode, useState } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const ConfirmDisablePortfolio: React.FC<TemplateProps> = ({ onCancel }) => {
  const [value, setValue] = useState(``);

  const data = JSON.parse(localStorage.getItem(`portfolio`) || ``);
  const current = data.status;

  const alertShit = () => {
    onCancel();
    data.status = !current;
    localStorage.setItem(`portfolio`, JSON.stringify(data));
  };

  return (
    <div>
      <Dialog title="this is a title" onSave={alertShit} onCancel={onCancel}>
        <div className="dialog-child confirm-delete-account">
          <p>please enter disbale my portfolio</p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="disable portoflio"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDisablePortfolio;
