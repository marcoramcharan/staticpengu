import "../styles/pages/details.css";
interface TemplateProps {
  onCancel: () => void;
}

const Components: React.FC<TemplateProps> = ({ onCancel }) => {
  return (
    <div className="details">
      <div className="details-top">
        <h1>components</h1>
        <button onClick={() => onCancel()}>close</button>
      </div>
      <div className="details-container">
        <div className="details-container-left">
          <div className="box">
            <div>
              <h3>scroll to top</h3>
              <p>enabled</p>
            </div>
            <button>toggle</button>
          </div>
          <div className="box">
            
            <div>
              <h3>contact form</h3>
              <p>no recieevr email</p>
            </div>
            <button>edit</button>
          </div>

          <div className="box">
            
            <div>
              <h3>contact form</h3>
              <p>enabled</p>
            </div>
            <button>toggle</button>
          </div>

        </div>

        <div className="details-container-right"></div>
      </div>
    </div>
  );
};

export default Components;
