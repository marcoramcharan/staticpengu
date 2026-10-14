import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  revert:() => void;
}

const ConfirmReset: React.FC<TemplateProps> = ({ onCancel, revert }) => {

  const alertShit = () => {
    revert()
    onCancel();
  };

  return (
    <div>
      <Dialog title="reset" onSave={alertShit} onCancel={onCancel}>
        <div>
          <p>are u sure u want to Reset</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmReset;
