import "../styles/pages/templates.css";
import { useEffect, useState } from "react";
import TemplatePrev from "./TemplatePrev";

interface TemplateProps {
  onCancel: () => void;
  template: string;
  updateTemplate: (font: string) => void;
}

const Templates: React.FC<TemplateProps> = ({
  onCancel,
  updateTemplate,
  template,
}) => {
  const [template2, setTemplate] = useState(template);
  const [temp, setTemp] = useState(template);

  const save = () => {
    updateTemplate(template2);
    onCancel();
  };

  const reset = () => {
    setTemplate(template);
    setTemp(template);
  };

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
    <div className="templates">
      <div className="templates-top">
        <h1>templates</h1>
        <div>
          <button onClick={() => reset()}>reset</button>
          <button onClick={() => onCancel()}>cancel</button>
          <button onClick={() => save()}>save</button>
        </div>
      </div>
      <div className="templates-bottom">
        <div className="templates-list">
          <div
            onClick={() => setTemp(`ONE`)}
            className={
              template2 === `ONE`
                ? "box-set"
                : temp === `ONE`
                ? "box-selected"
                : "box"
            }
          >
            <div>
              <h3>template one</h3>
              <p>white with photo</p>
            </div>
          </div>
          <div
            onClick={() => setTemp(`TWO`)}
            className={
              template2 === `TWO`
                ? "box-set"
                : temp === `TWO`
                ? "box-selected"
                : "box"
            }
          >
            {" "}
            <div>
              <h3>template two</h3>
              <p>white</p>
            </div>
          </div>

          <div
            onClick={() => setTemp(`THREE`)}
            className={
              template2 === `THREE`
                ? "box-set"
                : temp === `THREE`
                ? "box-selected"
                : "box"
            }
          >
            {" "}
            <div>
              <h3>template three</h3>
              <p>black</p>
            </div>
          </div>
        </div>
        <TemplatePrev template={temp} setTemplate={setTemplate} />
      </div>
    </div>
  );
};

export default Templates;
