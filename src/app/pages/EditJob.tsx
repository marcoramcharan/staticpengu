import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import "../styles/pages/vacancies.css";
import { useEffect, useState } from "react";
import EditJobReceiverEmail from "../components/EditJobReceiverEmail";
import EditJobType from "../components/EditJobType";
import EditJobSalary from "../components/EditJobSalary";
import EditJobTitle from "../components/EditJobTitle";
import EditJobDescription from "../components/EditJobDescription";
import ConfirmSaveNoPost from "../components/dialogs/ConfirmSaveNoPost";
import ConfirmSavePost from "../components/dialogs/ConfirmSavePost";
import ConfirmPublish from "../components/dialogs/ConfirmPublish";
import ConfirmUnpublish from "../components/dialogs/ConfirmUnpublish";
import ConfirmDeleteJob from "../components/dialogs/ConfirmDeleteJob";
import EditJobRequirements from "../components/EditJobRequirements";
import EditJobResponsibilities from "../components/EditJobResponsibilties";
import useGetVacancy from "../hooks/useGetVacancy";
import { defaultJob, Job } from "../helpers/helpers";
import { useEditJob } from "../hooks/useEditJob";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import EditJobCategories from "../components/EditJobCategories";
import { useDeleteJob } from "../hooks/useDeleteJob";
import EditJobStatus from "../components/EditJobStatus";
import EditJobEmploymentType from "../components/EditJobEmploymentType";
import EditJobLocation from "../components/EditJobLocation";
import RequiredFieldWarning from "../components/RequiredFieldWarning";
import EmptyFieldWarning from "../components/EmptyFieldWarning";
import LocationDisplay from "../components/LocationDisplay";
import FieldInfo from "../components/FieldInfo";

const EditJob = () => {
  const navigate = useNavigate();

  const { employer } = useStore();
  const ID = employer.user._id;

  const { data, refetch } = useGetVacancy();

  const { postdata } = useEditJob();

  const [data2, setData2] = useState<Job>(defaultJob);

  useEffect(() => {
    if (data) {
      setData2(data);
    }
  }, [data]);

  // create get single job employee

  // add in edit the edit employee
  const updateValue = async (attr: string, value: any) => {
    console.log("att and value", attr, value);
    await postdata({ ...data2, [attr]: value });
    refetch();
  };

  const updateLocationValue = async (location: any, locationHierarchy: any) => {
    await postdata({
      ...data2,
      ["location"]: location,
      ["locationHierarchy"]: locationHierarchy,
    });
    refetch();
  };

  const [showEmail, setShowEmail] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showEmploymentType, setShowEmploymentType] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const [showSaveOne, setShowSaveOne] = useState(false);
  const [showSaveTwo, setShowSaveTwo] = useState(false);

  const [showPublish, setShowPublish] = useState(false);
  const [showUnpublish, setShowUnpublish] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { deleteJob } = useDeleteJob();

  const saveNoPost = () => {
    console.log("saveNoPost", {
      ...data,
      active: false,
      views: 0,
      categories: [""],
    });
    postdata({ ...data, active: false, views: 0, categories: [""] });
    navigate(`/employer/console/${ID}/jobs`);
  };

  const saveWithPost = () => {
    console.log("saveWithPost", {
      ...data,
      active: true,
      views: 0,
      categories: [""],
    });
    postdata({ ...data, active: true, views: 0, categories: [""] });
    navigate(`/employer/console/${ID}/jobs`);
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
          updateValue={updateValue}
          value={data2.reciever_email!}
          onCancel={() => setShowEmail(false)}
        />
      ) : null}
      {showType ? (
        <EditJobType
          updateValue={updateValue}
          value={data2.work_type!}
          onCancel={() => setShowType(false)}
        />
      ) : null}
      {showEmploymentType ? (
        <EditJobEmploymentType
          updateValue={updateValue}
          value={data2.employment_type!}
          onCancel={() => setShowEmploymentType(false)}
        />
      ) : null}
      {showRes ? (
        <EditJobResponsibilities
          updateValue={updateValue}
          value={data2.responsibilities! || []}
          onCancel={() => setShowRes(false)}
        />
      ) : null}
      {showReq ? (
        <EditJobRequirements
          updateValue={updateValue}
          value={data2.requirements! || []}
          onCancel={() => setShowReq(false)}
        />
      ) : null}
      {showCat ? (
        <EditJobCategories
          updateValue={updateValue}
          value={data2.categories! || []}
          onCancel={() => setShowCat(false)}
        />
      ) : null}
      {showSalary ? (
        <EditJobSalary
          updateValue={updateValue}
          value={data2.salary!}
          onCancel={() => setShowSalary(false)}
        />
      ) : null}
      {showLocation ? (
        <EditJobLocation
          updateLocationData={updateLocationValue}
          value={data2.locationHierarchy!}
          onCancel={() => setShowLocation(false)}
        />
      ) : null}
      {showTitle ? (
        <EditJobTitle
          updateValue={updateValue}
          value={data2.title!}
          onCancel={() => setShowTitle(false)}
        />
      ) : null}
      {showDesc ? (
        <EditJobDescription
          updateValue={updateValue}
          value={data2.description!}
          onCancel={() => setShowDesc(false)}
        />
      ) : null}

      {showPublish ? (
        <ConfirmPublish
          updateValue={updateValue}
          onCancel={() => setShowPublish(false)}
        />
      ) : null}

      {showUnpublish ? (
        <ConfirmUnpublish
          updateValue={updateValue}
          onCancel={() => setShowUnpublish(false)}
        />
      ) : null}

      {showDelete ? (
        <ConfirmDeleteJob
          deleteJob={deleteJob}
          onCancel={() => setShowDelete(false)}
        />
      ) : null}

      {showStatus ? (
        <EditJobStatus
          updateValue={updateValue}
          value={data2.active!}
          onCancel={() => setShowStatus(false)}
        />
      ) : null}

      <div className="jobpage-top">
        <h1>EDIT JOB</h1>
      </div>
      <h1>Details</h1>
      <div
        onClick={() => setShowEmail(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>reciever email</h1>
          <FieldInfo attribute="hr associated with job" />
          <span>
            {data2.reciever_email ? (
              data2.reciever_email
            ) : (
              <>
                <EmptyFieldWarning attribute="reciever email" />

                <RequiredFieldWarning />
              </>
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowTitle(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>title</h1>
          <FieldInfo attribute="what is the jobs title" />
          <span>
            {data2.title ? (
              data2.title
            ) : (
              <EmptyFieldWarning attribute="title" />
            )}
          </span>
          <RequiredFieldWarning />
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowDesc(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>description</h1>
          <FieldInfo attribute="what does this job entail" />
          <span>
            {data2.description ? (
              data2.description
            ) : (
              <EmptyFieldWarning attribute="description" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowSalary(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>salary</h1>
          <FieldInfo attribute="the mula" />
          <span>
            {data2.salary ? (
              data2.salary
            ) : (
              <EmptyFieldWarning attribute="salary" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowLocation(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>location</h1>
          <FieldInfo attribute="location of job" />
          <span>
            {data2.location ? (
              <LocationDisplay locationHierarchy={data2.locationHierarchy!} />
            ) : (
              <EmptyFieldWarning attribute="location" />
            )}
          </span>
          <RequiredFieldWarning />
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowType(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>type</h1>
          <FieldInfo attribute="work from home | office | hybrid" />
          <span>
            {data2.work_type ? (
              data2.work_type
            ) : (
              <EmptyFieldWarning attribute="work_type" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowEmploymentType(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>employment type</h1>
          <FieldInfo attribute="employed permanent | temporary" />

          <span>
            {data2.employment_type ? (
              data2.employment_type
            ) : (
              <EmptyFieldWarning attribute="employment type" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowReq(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>requirments</h1>
          <FieldInfo attribute="what candidates must have to get this job" />
          <span>
            {data2.requirements?.length! > 0 ? (
              data2.requirements?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="requirements" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowRes(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>responsibilites</h1>
          <FieldInfo attribute="what candidate will do" />
          <span>
            {data2.responsibilities?.length! > 0 ? (
              data2.responsibilities?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="responsibilities" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowCat(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>categories</h1>
          <FieldInfo attribute="this helps with search of job" />

          <span>
            {data2.categories?.length! > 0 ? (
              data2.categories?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="categories" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>

      <h1>Danger</h1>
      <div
        onClick={() => setShowDelete(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>delete</h1>
        </div>
        <MdDelete className="hover-icon" />
      </div>

      <div
        onClick={() => setShowStatus(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>status</h1>
          <span>{data2.active ? "active" : "unactive"}</span>
        </div>
        {data2.active ? (
          <MdArrowDownward className="hover-icon" />
        ) : (
          <MdArrowUpward className="hover-icon" />
        )}
      </div>
    </div>
  );
};

export default EditJob;
