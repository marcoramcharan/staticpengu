import { useNavigate } from "react-router-dom";
import "../styles/components/fullJob.css";
import { Job, Preferences } from "../helpers/helpers";
import { useStore } from "../store/store";
import { FaLocationPin } from "react-icons/fa6";
import LocationDisplay from "./LocationDisplay";

interface TemplateProps {
  selectedJob: Job;
  setPref: (type: string, id: string) => void;
  preferences: Preferences;
}

const FullJob: React.FC<TemplateProps> = ({
  selectedJob,
  setPref,
  preferences,
}) => {
  const navigate = useNavigate();

  const isSaved = preferences?.saved?.includes(selectedJob._id);
  const isHidden = preferences?.hidden?.includes(selectedJob._id);

  const { employee } = useStore();
  const ID = employee?.user?._id;

  return (
    <div id="right" className="right">
      <div className="right-content">
        <div className="right-content-top">
          <h1>{selectedJob?.title!}</h1>
          <p
            className="cursor-hover"
            onClick={() =>
              navigate(`/profile/employer/${selectedJob.company_id!}`)
            }
          >
            {selectedJob.company_name!}
          </p>
          {selectedJob.location ? (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <FaLocationPin />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                }}
              >
                <LocationDisplay
                  locationHierarchy={selectedJob.locationHierarchy!}
                />
              </div>
            </span>
          ) : null}
          <div className="salty">
            {selectedJob.salary ? (
              <div className="salary">{selectedJob?.salary!}</div>
            ) : null}

            {selectedJob.employment_type ? (
              <div className="type">{selectedJob?.employment_type!}</div>
            ) : null}
          </div>
          <div className="right-content-top-buttons">
            {ID ? (
              <button onClick={() => navigate(`/jobs/${selectedJob._id!}`)}>
                apply now
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate(`/auth/employee/login?redirect=${selectedJob._id!}`)
                }
              >
                apply now
              </button>
            )}

            {isSaved ? (
              <button
                style={{
                  backgroundColor: ID ? "" : "grey",
                  cursor: ID ? "pointer" : "not-allowed",
                }}
                onClick={() => setPref("UNSAVE", selectedJob._id!)}
              >
                unsave
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: ID ? "" : "grey",
                  cursor: ID ? "pointer" : "not-allowed",
                }}
                onClick={() => setPref("SAVE", selectedJob._id!)}
              >
                save
              </button>
            )}

            {isHidden ? (
              <button
                style={{
                  backgroundColor: ID ? "" : "grey",
                  cursor: ID ? "pointer" : "not-allowed",
                }}
                onClick={() => setPref("UNHIDE", selectedJob._id!)}
              >
                unhide
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: ID ? "" : "grey",
                  cursor: ID ? "pointer" : "not-allowed",
                }}
                onClick={() => setPref("HIDE", selectedJob._id!)}
              >
                hide
              </button>
            )}
          </div>
        </div>
        <div className="right-content-bottom">
          {selectedJob.description ? (
            <div className="right-content-bottom-box">
              <p>description</p>
              <span>{selectedJob?.description!}</span>
            </div>
          ) : null}

          {selectedJob.requirements?.length! > 0 ? (
            <div className="right-content-bottom-box">
              <p>requirments</p>
              <div>
                {selectedJob?.requirements?.map((req, index) => (
                  <div key={index} className="req-box">
                    - <span>{req!}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {selectedJob.responsibilities?.length! > 0 ? (
            <div className="right-content-bottom-box">
              <p>responsibilties</p>
              <div>
                {selectedJob?.responsibilities?.map((req, index) => (
                  <div key={index} className="req-box">
                    - <span>{req!}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {selectedJob.work_type ? (
            <div className="right-content-bottom-box">
              <p>type</p>
              <div>
                <div>{selectedJob?.work_type!}</div>
              </div>
            </div>
          ) : null}

          {selectedJob.employment_type ? (
            <div className="right-content-bottom-box">
              <p>employment type</p>
              <div>
                <div>{selectedJob?.employment_type!}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FullJob;
