import { useEffect, useState } from "react";
import "../styles/pages/fonts.css";
interface TemplateProps {
  onCancel: () => void;
  updateFont: (font: string) => void;
  template: string;
}

const Fonts: React.FC<TemplateProps> = ({ onCancel, updateFont, template }) => {
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

  const [font, setFont] = useState(template);

  const save = () => {
    updateFont(font);
    onCancel();
  };

  const reset = () => {
    setFont(template);
  };

  return (
    <div className="fonts">
      <div className="fonts-top">
        <h1>FONTS</h1>
        <div>
        <button onClick={() => reset()}>reset</button>
          <button onClick={() => onCancel()}>cancel</button>
          <button onClick={() => save()}>save</button>
        </div>
        {/*         <IoClose className="close-icon" onClick={() => save()} />
         */}{" "}
      </div>
      <div className="fonts-container">
        <div
          onClick={() => setFont(`roboto-thin`)}
          className={font === `roboto-thin` ? "selectedbox" : "box"}
        >
          <div>
            <h3>roboto</h3>
            <p className="roboto-thin">example</p>
          </div>
        </div>
        <div
          onClick={() => setFont(`archivo-black-regular`)}
          className={font === `archivo-black-regular` ? "selectedbox" : "box"}
        >
          <div>
            <h3>archivo</h3>
            <p className="archivo-black-regular">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`bebas-neue-regular`)}
          className={font === `bebas-neue-regular` ? "selectedbox" : "box"}
        >
          <div>
            <h3>bebas nueves</h3>
            <p className="bebas-neue-regular">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`poetsen-one-regular`)}
          className={font === `poetsen-one-regular` ? "selectedbox" : "box"}
        >
          <div>
            <h3>poetsen</h3>
            <p className="poetsen-one-regular">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`freeman-regular`)}
          className={font === `freeman-regular` ? "selectedbox" : "box"}
        >
          <div>
            <h3>freeman</h3>
            <p className="freeman-regular">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`mon`)}
          className={font === `mon` ? "selectedbox" : "box"}
        >
          <div>
            <h3>monserrat</h3>
            <p className="mon">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`lobster`)}
          className={font === `lobster` ? "selectedbox" : "box"}
        >
          <div>
            <h3>lobster</h3>
            <p className="lobster">example</p>
          </div>
        </div>

        <div
          onClick={() => setFont(`open-sans`)}
          className={font === `open-sans` ? "selectedbox" : "box"}
        >
          <div>
            <h3>open sans</h3>
            <p className="open-sans">example</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fonts;
