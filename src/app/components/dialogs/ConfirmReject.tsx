import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  rejectApp: () => void;
}

const ConfirmReject: React.FC<TemplateProps> = ({ onCancel, rejectApp }) => {
  const alertShit = () => {
    rejectApp();
    onCancel();
  };

  return (
    <div>
      <Dialog title="decline" onSave={alertShit} onCancel={onCancel}>
        <div className="dialog-child confirm-delete-account">
          <p>are you sire you want to reject this application</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmReject;
