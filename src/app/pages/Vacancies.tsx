import React, { useEffect, useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import useGetVacancies from "../hooks/useGetVacancies";
import { useStore } from "../store/store";
import { formatDistanceToNow } from "date-fns";

const Vacancies: React.FC = () => {
  const { employer } = useStore();
  const ID = employer.user._id;

  const { data } = useGetVacancies();
  const [data2, setData2] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setData2(data);
    }
  }, [data]);

  const navigate = useNavigate();

  const goTo = (link: string) => {
    navigate(link);
  };

  return (
    <div style={styles.vacancies}>
      <div style={styles.jobpageTop}>
        <h1 style={styles.pageTitle}>Vacancies ({data2?.length || 0})</h1>
        <button
          style={styles.primaryButton}
          onClick={() => navigate("/employer/console/hwrgkjwr/jobs/post")}
        >
          Post New Job
        </button>
      </div>

      <div style={styles.vacanciesGrid}>
        {data2?.map((data: any) => (
          <div
            key={data._id}
            onClick={() => goTo(`/employer/console/${ID}/jobs/${data._id}`)}
            style={styles.vacancyBox}
          >
            <div style={styles.vacancyContent}>
              <div style={styles.vacancyHeader}>
                <h2 style={styles.vacancyTitle}>{data?.title}</h2>
                <span
                  style={{
                    ...styles.statusBadge,
                    ...(data?.active
                      ? styles.activeBadge
                      : styles.inactiveBadge),
                  }}
                >
                  {data?.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div style={styles.vacancyMeta}>
                <div style={styles.metaItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.icon}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>
                    Created {formatDistanceToNow(new Date(data.createdAt!))} ago
                  </span>
                </div>

                <div style={styles.metaItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.icon}
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <span>
                    Updated {formatDistanceToNow(new Date(data.updatedAt!))} ago
                  </span>
                </div>
              </div>

              <div style={styles.vacancyFooter}>
                <div style={styles.actionButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.icon}
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                  <span>View Applications</span>
                </div>

                <div style={styles.actionButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.icon}
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {data2?.length === 0 && (
          <div style={styles.emptyState}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <h3>No Vacancies Posted Yet</h3>
            <p>Create your first job posting to start receiving applications</p>
            <button
              style={styles.primaryButton}
              onClick={() => navigate("/employer/console/hwrgkjwr/jobs/post")}
            >
              Post Your First Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Define all styles as a single object with React CSSProperties
const styles: Record<string, CSSProperties> = {
  vacancies: {
    backgroundColor: "#f8fafc",
    minHeight: "90vh",
    padding: "24px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  },
  jobpageTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto 24px",
  },
  pageTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
    color: "#1e293b",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  vacanciesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  vacancyBox: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
  },
  vacancyContent: {
    padding: "20px",
  },
  vacancyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  vacancyTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#1e293b",
    maxWidth: "70%",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: 500,
  },
  activeBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  inactiveBadge: {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
  },
  vacancyMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#64748b",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  icon: {
    flexShrink: 0,
  },
  vacancyFooter: {
    display: "flex",
    gap: "12px",
    borderTop: "1px solid #e2e8f0",
    marginTop: "16px",
    paddingTop: "16px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    fontWeight: 500,
  },
  emptyState: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px dashed #cbd5e1",
    color: "#64748b",
    textAlign: "center",
    gap: "16px",
  },
};

export default Vacancies;
