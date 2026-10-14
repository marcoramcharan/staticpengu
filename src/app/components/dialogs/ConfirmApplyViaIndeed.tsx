import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  pub: () => void;
}

const ConfirmApplyViaIndeed: React.FC<TemplateProps> = ({ onCancel, pub }) => {

  const save = async () => {
    pub();
    onCancel();
  };

  return (
    <div>
      <Dialog
        title="apply via indeed"
        onSave={save}
        onCancel={() => onCancel()}
      >
        <div>
          <p>you are applying via indeed</p>
          <p>u will show up as an applicant on the employers page</p>
          <p>if ur portoflio is active a link will be sent</p>
          <p>if your resume is ok they will be able to view it</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmApplyViaIndeed;
