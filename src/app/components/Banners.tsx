import "../styles/components/Banners.css";

interface TemplateProps {
  onCancel: () => void;
  banner: string;
  setBanner: React.Dispatch<React.SetStateAction<string>>;
}

const Banners: React.FC<TemplateProps> = ({ onCancel, setBanner, banner }) => {
  return (
    <div className="banners">
      <p>banner type: {banner}</p>
      <button onClick={onCancel}>cancel</button>
      <button onClick={onCancel}>save</button>
      <h1 className="banners-heading">banners</h1>
      <p className="banners-description">
        this is a list of our default banners
      </p>

      <div className="banners-container">
        <div className="box">
          <h1>name: banner 1</h1>
          <p>
            dscription: simple banner without any photos just name and
            occupation
          </p>
          <button disabled={banner === `1`} onClick={() => setBanner(`1`)}>
            choose
          </button>
        </div>
        <div className="box">
          <h1>name: banner 2</h1>
          <p>dscription: photo center</p>
          <button disabled={banner === `2`} onClick={() => setBanner(`2`)}>
            choose
          </button>
        </div>
        <div className="box">
          <h1>name: banner 3</h1>
          <p>dscription: photo left text right</p>
          <button disabled={banner === `3`} onClick={() => setBanner(`3`)}>
            choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banners;
