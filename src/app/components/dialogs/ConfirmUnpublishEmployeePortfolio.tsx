import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  updateData: (attr: string, value: any) => void;
}

const ConfirmUnpublishEmployeePortfolio: React.FC<TemplateProps> = ({
  onCancel,
  updateData,
}) => {
  const save = () => {
    updateData("active", false);
    onCancel();
  };

  return (
    <div>
      <Dialog title="unpublish" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to unpublish portfolio</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmUnpublishEmployeePortfolio;
