import { useState } from "react";
import "../styles/components/editEmail.css";
import EditDetail from "./EditDetails";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";
import { useWriteReview } from "../hooks/useWriteReview";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  refetch: () => void;

}

const AddReview: React.FC<TemplateProps> = ({ onCancel,refetch }) => {
  const { employee } = useStore();
  const { id } = useParams();

  // add review

  const [value, setValue] = useState(``);

  const { postdata } = useWriteReview();

  const save = async () => {
    let review: any = {};
    review.body = value;
    review.user_id = "anonymous";
    review.employer_id = id;
    if (employee?.user?._id) {
      review.user_id = employee.user._id;
    }
    await postdata(review)
    refetch()
    onCancel();
  };

  return (
    <EditDetail detailName={"add review"} onCancel={onCancel} onSave={save}>
      <div className="editEmail">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="username"
        />
      </div>
    </EditDetail>
  );
};

export default AddReview;
