import "../styles/pages/templates.css";
import One from "./skeletons/One";
import Three from "./skeletons/Three";
import Two from "./skeletons/Two";

interface TemplateProps {
  template: string;
  setTemplate: any;
}

const TemplatePrev: React.FC<TemplateProps> = ({ template, setTemplate }) => {
  return (
    <div className="template">
      <div className="template-info">
        <p>{template}</p>
        <div>
          <button onClick={() => setTemplate(template)}>select</button>
        </div>
      </div>
      <div className="template-content">
        {template === `ONE` ? <One /> : null}
        {template === `TWO` ? <Two /> : null}
        {template === `THREE` ? <Three /> : null}
      </div>
    </div>
  );
};

export default TemplatePrev;
