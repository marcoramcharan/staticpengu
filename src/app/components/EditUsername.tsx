import { useState } from "react";
import { useUpdateUsername } from "../hooks/useUpdateUsername";
import "../styles/components/editEmail.css";
import EditDetail from "./EditDetails";
import { useStore } from "../store/store";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
}

const EditUsername: React.FC<TemplateProps> = ({ onCancel }) => {
  const { user } = useStore();

  const [value, setValue] = useState(user.user.username || ``);

  const { postdata } = useUpdateUsername();

  const save = () => {
    if (value !== ``) {
      postdata(value);
      onCancel();
    }
  };

  return (
    <EditDetail detailName={"username"} onCancel={onCancel} onSave={save}>
      <div className="editEmail">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="username"
        />
      </div>
    </EditDetail>
  );
};

export default EditUsername;
