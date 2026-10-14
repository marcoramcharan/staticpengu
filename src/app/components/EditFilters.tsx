import "../styles/components/editFilters.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  setPref: (type: string, id: string) => void;
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFilter: React.FC<TemplateProps> = ({
  onCancel,
  setPref,
  setShowSaved,
}) => {
  const save = () => {
    onCancel();
  };

  return (
    <EditDetail detailName={"filters"} onCancel={onCancel} onSave={save}>
      <div className="editFilters">
        <button
          onClick={() => {
            setShowSaved(true);
            onCancel();
          }}
        >
          saved
        </button>
        <button
          onClick={() => {
            setShowSaved(false);
            onCancel();
          }}
        >
          all
        </button>
        <button
          onClick={() => {
            setPref("RESET", "");
            onCancel();
          }}
        >
          reset pref
        </button>
        {/*         <button>clear filters</button>
        <button>saved</button>
        <button>hidden</button>
        <button>reset preferences</button>
        <button>date created up</button>
        <button>date created down</button>
        <select>
          <option value="">salary min</option>
          <option value="">salary max</option>
        </select>
        <input type="text" placeholder="company dropdown" /> */}
      </div>
    </EditDetail>
  );
};

export default EditFilter;
