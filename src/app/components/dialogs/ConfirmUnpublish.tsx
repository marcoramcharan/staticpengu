import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  updateValue: (attr: string, value:any) => void;
}

const ConfirmUnpublish: React.FC<TemplateProps> = ({ onCancel, updateValue }) => {
  const save = () => {
    updateValue("active", false);
    onCancel();
  };

  return (
    <div>
      <Dialog title="unpublish" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to UnPublish</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmUnpublish;
