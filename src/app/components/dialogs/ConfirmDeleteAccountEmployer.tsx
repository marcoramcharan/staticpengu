import { ReactNode, useState } from "react";
import Dialog from "./Dialog";
import { useDeleteEmployerAccount } from "../../hooks/useDeleteEmployerAccount";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const ConfirmDeleteAccountEmployer: React.FC<TemplateProps> = ({
  onCancel,
}) => {
  const { deleteAccount } = useDeleteEmployerAccount();

  const [value, setValue] = useState(``);

  const alertShit = () => {
    if (value === `delete my account`) {
      deleteAccount();
      onCancel();
    }
  };

  return (
    <div>
      <Dialog
        title="delete account"
        disable={value !== `delete my account`}
        onSave={alertShit}
        onCancel={onCancel}
      >
        <div className="dialog-child confirm-delete-account">
          <p>please enter delete my account</p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="delete my account"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDeleteAccountEmployer;
