import { ReactNode, useEffect } from "react";
import "../styles/components/editSection.css";

interface TemplateProps {
  onCancel: () => void;
  onSave: () => void;
  children?: ReactNode | undefined;
  sectionName: string;
}

const EditSection: React.FC<TemplateProps> = ({
  onCancel,
  onSave,
  children,
  sectionName,
}) => {
  useEffect(() => {
    // Set the body height and overflow when the component mounts
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    // Cleanup function to reset the body overflow when the component unmounts
    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="es">
      <div className="content-container">
        <div className="content-top">
          <h1>{sectionName}</h1>
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

export default EditSection;
