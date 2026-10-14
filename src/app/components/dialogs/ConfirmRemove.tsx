import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  deleteApp: () => void;
}

const ConfirmRemove: React.FC<TemplateProps> = ({ onCancel, deleteApp }) => {

  const alertShit = () => {
    deleteApp()
    onCancel();
  };

  return (
    <div>
      <Dialog title="remove application" onSave={alertShit} onCancel={onCancel}>
        <div className="dialog-child confirm-delete-account">
          <p>are you sire you want to remove this application</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmRemove;
