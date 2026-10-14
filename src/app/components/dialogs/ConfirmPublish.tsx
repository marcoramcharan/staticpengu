import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  updateValue: (attr: string, value: any) => void;
}

const ConfirmPublish: React.FC<TemplateProps> = ({ onCancel, updateValue }) => {
  const save = () => {
    updateValue("active", true);
    onCancel();
  };

  return (
    <div>
      <Dialog title="publish" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to Publish</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmPublish;
