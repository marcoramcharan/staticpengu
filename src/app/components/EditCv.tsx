import { useEffect, useState } from "react";
import useGetResume from "../hooks/useGetResume";
import "../styles/components/editCv.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
}

const EditCv: React.FC<TemplateProps> = ({ onCancel }) => {
  const { data } = useGetResume();
  console.log("resume data", data);

  const [resume, setResume] = useState<any>(data);
  console.log("resume", resume);

  // use edit resume when dleeteing it

  // use uploadresuemfile when editing it

  const save = () => {
    onCancel();
  };

  useEffect(() => {
    if (data) {
      setResume(data);
    }
  }, [data]);

  return (
    <EditDetail detailName={"name"} onCancel={onCancel} onSave={save}>
      <div className="editCv">
        <h1>upload resume</h1>
        <p>resume: {resume?.mimetype}</p>
        <p>is deleted :{resume?.deleted ? "deleted" : "not deleted"}</p>
        <button>change</button>
        <button>delete</button>
      </div>
    </EditDetail>
  );
};

export default EditCv;
