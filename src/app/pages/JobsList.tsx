import React, { useState } from "react";
import "../styles/components/jobsList.css";
import { Job, Preferences } from "../helpers/helpers";
import { formatDistanceToNow } from "date-fns";
import { FaLocationPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LocationDisplay from "../components/LocationDisplay";
import { useStore } from "../store/store";

interface TemplateProps {
  jobs: Job[];
  preferences: Preferences;
  setSelectedJob: React.Dispatch<React.SetStateAction<Job>>;
  setPref: (type: string, id: string) => void;
}

const JobsList: React.FC<TemplateProps> = ({
  jobs,
  setSelectedJob,
  preferences,
  setPref,
}) => {
  const navigate = useNavigate();
  const { employee } = useStore();
  const ID = employee?.user?._id;
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const isHidden = (id: string) => {
    return preferences?.hidden?.includes(id);
  };

  const isSaved = (id: string) => {
    return preferences?.saved?.includes(id);
  };

  // Filter out hidden jobs
  const visibleJobs = jobs.filter((job) => !isHidden(job._id!));

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = visibleJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(visibleJobs.length / jobsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to show
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(visibleJobs.length / jobsPerPage);

    // Handle cases where the total number of pages is less than or equal to 5
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Determine the range of pages to show
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Adjust the start and end pages if they are not providing enough numbers
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [startPage, startPage + 1, startPage + 2, startPage + 3, endPage];
    }
  };

  return (
    <div className="left">
      {currentJobs?.map((job, index) => (
        <div
          key={index}
          className="box"
          onClick={() => {
            if (window.innerWidth < 700) {
              navigate(`/jobs/${job._id}`);
            } else {
              setSelectedJob(job);
            }
          }}
        >
          <div className="left-box-top">
            <button
              style={{
                backgroundColor: ID ? "" : "grey",
                cursor: ID ? "pointer" : "not-allowed",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPref(isHidden(job._id!) ? "UNHIDE" : "HIDE", job._id!);
              }}
            >
              {isHidden(job._id!) ? "unhide" : "hide"}
            </button>
            <button
              style={{
                backgroundColor: ID ? "" : "grey",
                cursor: ID ? "pointer" : "not-allowed",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPref(isSaved(job._id!) ? "UNSAVE" : "SAVE", job._id!);
              }}
            >
              {isSaved(job._id!) ? "unsave" : "save"}
            </button>
          </div>

          <h1 className="job-title">{job.title!}</h1>
          <div className="comploc">
            <span
              onClick={() => navigate(`/profile/employer/${job.company_id!}`)}
              className="cursor-hover"
            >
              {job.company_name!}
            </span>
            {job.location ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "14px",
                }}
              >
                <FaLocationPin />
                <LocationDisplay
                  locationHierarchy={job.locationHierarchy!}
                />{" "}
              </span>
            ) : null}
          </div>
          <div className="salty">
            {job.salary ? <div className="salary">{job.salary!}</div> : null}
            {job.employment_type ? (
              <div className="type">{job.employment_type!}</div>
            ) : null}
          </div>

          {job.responsibilities?.length! > 0 ? (
            <div style={{ color: "gray" }} className="req">
              {job?.responsibilities?.map((req, index) => (
                <div key={index} className="req-box">
                  - <span>{req!}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "gray" }} className="req">
              {job?.requirements?.map((req, index) => (
                <div key={index} className="req-box">
                  - <span>{req!}</span>
                </div>
              ))}
            </div>
          )}

          <span style={{ fontSize: "11px" }} className="posted">
            {`Posted ${formatDistanceToNow(new Date(job.createdAt!))} ago`}
          </span>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Prev
        </button>

        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsList;
