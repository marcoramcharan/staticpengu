import { MdEdit } from "react-icons/md";
import "../styles/pages/vacancies.css";
import { useState } from "react";
import EditJobReceiverEmail from "../components/EditJobReceiverEmail";
import EditJobType from "../components/EditJobType";
import EditJobResponsibilities from "../components/EditJobResponsibilties";
import EditJobRequirements from "../components/EditJobRequirements";
import EditJobSalary from "../components/EditJobSalary";
import EditJobTitle from "../components/EditJobTitle";
import EditJobDescription from "../components/EditJobDescription";
import ConfirmSaveNoPost from "../components/dialogs/ConfirmSaveNoPost";
import ConfirmSavePost from "../components/dialogs/ConfirmSavePost";
import { defaultJob, Job } from "../helpers/helpers";
import { usePostJob } from "../hooks/usePostJob";
import EditJobLocation from "../components/EditJobLocation";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import EditJobEmploymentType from "../components/EditJobEmploymentType";
import EditJobCategories from "../components/EditJobCategories";
import EmptyFieldWarning from "../components/EmptyFieldWarning";
import RequiredFieldWarning from "../components/RequiredFieldWarning";
import FieldInfo from "../components/FieldInfo";

const PostJob = () => {
  const navigate = useNavigate();

  const { employer } = useStore();
  const ID = employer.user._id;

  const [showEmail, setShowEmail] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showEmploymentType, setShowEmploymentType] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [showSaveOne, setShowSaveOne] = useState(false);
  const [showSaveTwo, setShowSaveTwo] = useState(false);

  const [data, setData] = useState<Job>(defaultJob);

  const updateData = (attr: string, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [attr]: value,
    }));
  };

  const updateLocationData = (location: any, locationHierarchy: any) => {
    setData((prevData: any) => ({
      ...prevData,
      ["location"]: location,
      ["locationHierarchy"]: locationHierarchy,
    }));
  };

  const { postdata } = usePostJob();

  const saveNoPost = async () => {
    await postdata({ ...data, active: false, views: 0 });
    navigate(`/employer/console/${ID}/jobs`);
  };

  const saveWithPost = async () => {
    await postdata({ ...data, active: true, views: 0 });
    navigate(`/employer/console/${ID}/jobs`);
  };

  const isSaveDisabled = () => {
    return (
      !data.reciever_email ||
      !data.title ||
      !data.location ||
      data.location.length === 0
    );
  };

  return (
    <div className="vacancies">
      {showSaveOne ? (
        <ConfirmSaveNoPost
          saveNoPost={saveNoPost}
          onCancel={() => setShowSaveOne(false)}
        />
      ) : null}

      {showSaveTwo ? (
        <ConfirmSavePost
          savePost={saveWithPost}
          onCancel={() => setShowSaveTwo(false)}
        />
      ) : null}

      {showEmail ? (
        <EditJobReceiverEmail
          updateValue={updateData}
          value={data.reciever_email!}
          onCancel={() => setShowEmail(false)}
        />
      ) : null}
      {showType ? (
        <EditJobType
          updateValue={updateData}
          value={data.work_type!}
          onCancel={() => setShowType(false)}
        />
      ) : null}
      {showEmploymentType ? (
        <EditJobEmploymentType
          updateValue={updateData}
          value={data.employment_type!}
          onCancel={() => setShowEmploymentType(false)}
        />
      ) : null}
      {showRes ? (
        <EditJobResponsibilities
          updateValue={updateData}
          value={data.responsibilities!}
          onCancel={() => setShowRes(false)}
        />
      ) : null}
      {showReq ? (
        <EditJobRequirements
          updateValue={updateData}
          value={data.requirements!}
          onCancel={() => setShowReq(false)}
        />
      ) : null}

      {showCat ? (
        <EditJobCategories
          updateValue={updateData}
          value={data.categories!}
          onCancel={() => setShowCat(false)}
        />
      ) : null}

      {showSalary ? (
        <EditJobSalary
          updateValue={updateData}
          value={data.salary!}
          onCancel={() => setShowSalary(false)}
        />
      ) : null}

      {showLocation ? (
        <EditJobLocation
          updateLocationData={updateLocationData}
          value={data.location!}
          onCancel={() => setShowLocation(false)}
        />
      ) : null}

      {showTitle ? (
        <EditJobTitle
          updateValue={updateData}
          value={data.title!}
          onCancel={() => setShowTitle(false)}
        />
      ) : null}
      {showDesc ? (
        <EditJobDescription
          updateValue={updateData}
          value={data.description!}
          onCancel={() => setShowDesc(false)}
        />
      ) : null}

      <div className="jobpage-top">
        <h1>POSTJOB</h1>
        <div>
          <button
            disabled={isSaveDisabled()}
            style={{
              backgroundColor: isSaveDisabled() ? "grey" : "",
              cursor: isSaveDisabled() ? "not-allowed" : "pointer",
            }}
            onClick={() => setShowSaveTwo(true)}
          >
            save and post
          </button>
          <button
            disabled={isSaveDisabled()}
            style={{
              backgroundColor: isSaveDisabled() ? "grey" : "",
              cursor: isSaveDisabled() ? "not-allowed" : "pointer",
            }}
            onClick={() => setShowSaveOne(true)}
          >
            save without poting
          </button>
        </div>
      </div>
      <div className="port-box" onClick={() => setShowEmail(true)}>
        <div>
          <h1>reciever email</h1>
          <FieldInfo attribute="hr associated with job" />
          <span>
            {data.reciever_email ? (
              data.reciever_email
            ) : (
              <EmptyFieldWarning attribute="reciever email" />
            )}
          </span>
          <RequiredFieldWarning />
        </div>
        <MdEdit />
      </div>
      <div className="port-box" onClick={() => setShowTitle(true)}>
        <div>
          <h1>title</h1>
          <FieldInfo attribute="what is the jobs title" />
          <span>
            {data.title ? data.title : <EmptyFieldWarning attribute="title" />}
          </span>
          <RequiredFieldWarning />
        </div>
        <MdEdit />
      </div>
      <div className="port-box" onClick={() => setShowDesc(true)}>
        <div>
          <h1>description</h1>
          <FieldInfo attribute="what does this job entail" />
          <span>
            {data.description ? (
              data.description
            ) : (
              <EmptyFieldWarning attribute="description" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>
      <div className="port-box" onClick={() => setShowSalary(true)}>
        <div>
          <h1>salary</h1>
          <FieldInfo attribute="the mula" />
          <span>
            {data.salary ? (
              data.salary
            ) : (
              <EmptyFieldWarning attribute="salary" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>

      <div className="port-box" onClick={() => setShowLocation(true)}>
        <div>
          <h1>location</h1>
          <FieldInfo attribute="location of job" />
          <span>
            {data.location?.length! === 0 ? (
              <EmptyFieldWarning attribute="location" />
            ) : (
              data.location
            )}
          </span>
          <RequiredFieldWarning />
        </div>
        <MdEdit />
      </div>

      <div className="port-box" onClick={() => setShowType(true)}>
        <div>
          <h1>work type</h1>
          <FieldInfo attribute="work from home | office | hybrid" />
          <span>
            {data.work_type ? (
              data.work_type
            ) : (
              <EmptyFieldWarning attribute="work type" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>

      <div className="port-box" onClick={() => setShowEmploymentType(true)}>
        <div>
          <h1>employment type</h1>
          <FieldInfo attribute="employed permanent | temporary" />
          <span>
            {data.employment_type ? (
              data.employment_type
            ) : (
              <EmptyFieldWarning attribute="employment type" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>

      <div className="port-box" onClick={() => setShowReq(true)}>
        <div>
          <h1>requirements</h1>
          <FieldInfo attribute="what candidates must have to get this job" />
          <span>
            {data.requirements?.length! > 0 ? (
              data.requirements?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="requirements" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>
      <div className="port-box" onClick={() => setShowRes(true)}>
        <div>
          <h1>responsibilites</h1>
          <FieldInfo attribute="what candidate will do" />
          <span>
            {data.responsibilities?.length! > 0 ? (
              data.responsibilities?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="responsibilities" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>
      <div className="port-box" onClick={() => setShowCat(true)}>
        <div>
          <h1>categories</h1>
          <FieldInfo attribute="this helps with search of job" />
          <span>
            {data.categories?.length! > 0 ? (
              data.categories?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="categories" />
            )}
          </span>
        </div>
        <MdEdit />
      </div>
    </div>
  );
};

export default PostJob;
