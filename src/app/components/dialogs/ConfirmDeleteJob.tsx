import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  deleteJob: () => void;
}

const ConfirmDeleteJob: React.FC<TemplateProps> = ({ onCancel, deleteJob }) => {

  const alertShit = () => {
    deleteJob();
    onCancel();
  };

  return (
    <div>
      <Dialog title="delete job" onSave={alertShit} onCancel={onCancel}>
        <div className="dialog-child confirm-delete-account">
          <p>are you sire you want to delete the job</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDeleteJob;
