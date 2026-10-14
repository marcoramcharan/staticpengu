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

const JobFull = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);

  return (
    <div className="vacancies">
      {showEmail ? (
        <EditJobReceiverEmail
          updateValue={() => console.log("dkjjdkj")}
          value="mmr"
          onCancel={() => setShowEmail(false)}
        />
      ) : null}
      {showType ? (
        <EditJobType
          updateValue={() => console.log("dkjjdkj")}
          value="mmr"
          onCancel={() => setShowType(false)}
        />
      ) : null}
      {showRes ? (
        <EditJobResponsibilities
          updateValue={() => console.log("dkjjdkj")}
          value={[]}
          onCancel={() => setShowRes(false)}
        />
      ) : null}
      {showReq ? (
        <EditJobRequirements
          updateValue={() => console.log("dkjjdkj")}
          value={[]}
          onCancel={() => setShowReq(false)}
        />
      ) : null}
      {showSalary ? (
        <EditJobSalary
          updateValue={() => console.log("dkjjdkj")}
          value="mmr"
          onCancel={() => setShowSalary(false)}
        />
      ) : null}
      {showTitle ? (
        <EditJobTitle
          updateValue={() => console.log("dkjjdkj")}
          value="mmr"
          onCancel={() => setShowTitle(false)}
        />
      ) : null}
      {showDesc ? (
        <EditJobDescription
          updateValue={() => console.log("dkjjdkj")}
          value="mmr"
          onCancel={() => setShowDesc(false)}
        />
      ) : null}

      <div className="jobpage-top">
        <h1>POSTJOB</h1>
      </div>
      <div className="port-box">
        <div>
          <h1>reciever email</h1>
          <span>mm@gmail.com</span>
        </div>
        <MdEdit onClick={() => setShowEmail(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>title</h1>
          <span>john</span>
        </div>
        <MdEdit onClick={() => setShowTitle(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>description</h1>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            omnis ...
          </span>
        </div>
        <MdEdit onClick={() => setShowDesc(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>salary</h1>
          <span>R20 000</span>
        </div>
        <MdEdit onClick={() => setShowSalary(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>type</h1>
          <span>hybrid</span>
        </div>
        <MdEdit onClick={() => setShowType(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>requirments</h1>
          <span>req, req, req</span>
        </div>
        <MdEdit onClick={() => setShowReq(true)} />
      </div>
      <div className="port-box">
        <div>
          <h1>responsibilites</h1>
          <span>res, res, res</span>
        </div>
        <MdEdit onClick={() => setShowRes(true)} />
      </div>

      <hr />

      <h1>applicants</h1>
      <h1>views</h1>
    </div>
  );
};

export default JobFull;
