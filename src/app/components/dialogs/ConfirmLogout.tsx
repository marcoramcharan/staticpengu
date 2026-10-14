import { ReactNode } from "react";
import Dialog from "./Dialog";
import { useLogout } from "../../hooks/Logout";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const ConfirmLogout: React.FC<TemplateProps> = ({ onCancel }) => {
  const {logout} = useLogout()

  const alertShit = () => {
    onCancel();
    logout();
  };

  return (
    <div>
      <Dialog title="logout" onSave={alertShit} onCancel={onCancel}>
        <div>
          <p>are u sure u want to logout</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmLogout;
