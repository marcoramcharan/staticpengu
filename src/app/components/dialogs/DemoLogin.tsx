import { ReactNode } from "react";
import Dialog from "./Dialog";
import { useEmployerLogin } from "../../hooks/useEmployerLogin";
import { useEmployeeLogin } from "../../hooks/useEmployeeLogin";
import "../../styles/components/demoLogin.css";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const DemoLogin: React.FC<TemplateProps> = ({ onCancel }) => {
  const { login: login2 } = useEmployeeLogin();
  const { login } = useEmployerLogin();

  const save = async (type: number) => {
    if (type === 1) {
      await login("demo", "demo");
      onCancel();
    }
    if (type === 2) {
      await login2("demo", "demo");
      onCancel();
    }
  };

  return (
    <div>
      <Dialog
        title="demo login"
        onSave={() => onCancel()}
        onCancel={() => onCancel()}
      >
        <div className="demoLogin">
          <button className="demo-buttons" onClick={() => save(1)}>
            employer login
          </button>
          <button className="demo-buttons" onClick={() => save(2)}>
            employee login
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default DemoLogin;
