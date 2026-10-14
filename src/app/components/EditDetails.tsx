import { ReactNode } from "react";
import "../styles/components/editDetail.css";

interface TemplateProps {
  onCancel: () => void;
  onSave: () => void;
  children?: ReactNode | undefined;
  detailName: string;
}

const EditDetail: React.FC<TemplateProps> = ({
  onCancel,
  onSave,
  children,
  detailName,
}) => {
  return (
    <div className="es">
      <div className="content-container">
        <div className="content-top">
          <h1>{detailName}</h1>
        </div>
        <div className="content-middle">{children}</div>
        <div className="content-bottom">
          <button onClick={onCancel}>cancel</button>
          <button onClick={onSave}>save</button>
        </div>
      </div>
    </div>
  );
};

export default EditDetail;
