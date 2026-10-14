import "../styles/pages/templates.css";
import { useEffect, useState } from "react";
import ConfirmApplyViaIndeed from "./dialogs/ConfirmApplyViaIndeed";
import { Job } from "../helpers/helpers";
import { useStore } from "../store/store";
import { useApplyJob } from "../hooks/useApplyJob";
import { useNavigate, useParams } from "react-router-dom";
import useGetApplications from "../hooks/useGetApplications";

interface TemplateProps {
  onCancel: () => void;
  job: Job;
}

const ApplyNow: React.FC<TemplateProps> = ({ onCancel, job }) => {
  // the job id
  // get the hr emails for the job
  // apply button

  const { jobID } = useParams();

  const { employee } = useStore();

  console.log("emoployee", employee);

  const { postdata } = useApplyJob();

  const { data } = useGetApplications();
  const [applied, setApplied] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      // Check if the jobid exists in any of the objects
      const isApplied = data.some(
        (application: any) => application.job_id === jobID
      );

      if (isApplied) {
        setApplied(true);
      }
    }
  }, [data, jobID]);

  const navigate = useNavigate();

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

  const [show, setShow] = useState(false);

  const applyViaIndeed = async () => {
    console.log("apply via indeed");
    const application = {
      job_id: job._id!,
      employer_id: job.company_id!,
      job_title: job.title! || "no job title",
      applicant_name: employee?.portfolio?.name!,
      applicant_email: employee?.user?.email!,
      resume_link: "resume path",
      portfolio_link: `/profile/employee/${employee?.user?._id!}`,
      rejected: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await postdata(application);
    navigate(`/employee/console/${employee.user._id}/applications?open=true`);
  };

  return (
    <div className="templates">
      {show ? (
        <ConfirmApplyViaIndeed
          onCancel={() => setShow(false)}
          pub={applyViaIndeed}
        />
      ) : null}

      <div className="templates-top">
        <h1>apply now</h1>
        <div>
          <button onClick={() => onCancel()}>cancel</button>
        </div>
      </div>
      <div className="apply-now-bottom">
        <div className="anb">
          <h1>hr email for this job</h1>
          <p>{job.reciever_email!}</p>
          <div className="anb-blue">
            <span>contact hr directly</span>
          </div>
        </div>
        <div className="anb" onClick={() => setShow(true)}>
          <h1>apply via indeed</h1>
          {applied ? (
            <div className="anb-red">
              <span>you have applied for this job before</span>
            </div>
          ) : (
            <div className="anb-blue">
              <span>you have not applied for this job before</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
