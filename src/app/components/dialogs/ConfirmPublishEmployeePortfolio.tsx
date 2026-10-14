import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  updateData: (attr:string, value:any) => void;
}

const ConfirmPublishEmployeePortfolio: React.FC<TemplateProps> = ({
  onCancel,
  updateData,
}) => {
  const save = () => {
    updateData('active', true);
    onCancel();
  };

  return (
    <div>
      <Dialog title="publish" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to publish</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmPublishEmployeePortfolio;
