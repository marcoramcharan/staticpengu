import React, { useState, useEffect, CSSProperties } from "react";
import { Helmet } from "react-helmet";

interface Message {
  id: number;
  employeeName: string;
  jobTitle: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  applicationId: string;
}

interface PriorityStyleMap {
  [key: string]: CSSProperties;
}

const EmployerMessages: React.FC = () => {
  // Mock data - messages from employees/applicants
  const mockMessages: Message[] = [
    {
      id: 1,
      employeeName: "John Smith",
      jobTitle: "Senior Frontend Developer",
      content:
        "Thank you for considering my application. I have 5+ years of experience with React and TypeScript. I'm available for an interview any day next week except Wednesday.",
      timestamp: "2025-02-28T14:30:00",
      isRead: false,
      priority: "high",
      applicationId: "APP-2025-0342",
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      jobTitle: "React Developer",
      content:
        "As requested, I've attached additional examples of my TypeScript projects. I've worked extensively with React hooks and context API in my current role.",
      timestamp: "2025-02-27T09:15:00",
      isRead: true,
      priority: "medium",
      applicationId: "APP-2025-0329",
    },
    {
      id: 3,
      employeeName: "Michael Wong",
      jobTitle: "UI/UX Developer",
      content:
        "I'm writing to follow up on my application submitted last week. I'm particularly interested in the remote work options mentioned in the job description.",
      timestamp: "2025-02-25T16:45:00",
      isRead: true,
      priority: "low",
      applicationId: "APP-2025-0315",
    },
    {
      id: 4,
      employeeName: "Emily Rodriguez",
      jobTitle: "Technical Lead",
      content:
        "I'm available for the second interview with the CTO. My preference would be Thursday morning if possible. I have some questions about the team structure I'd like to discuss.",
      timestamp: "2025-02-24T11:20:00",
      isRead: false,
      priority: "high",
      applicationId: "APP-2025-0301",
    },
    {
      id: 5,
      employeeName: "David Chen",
      jobTitle: "Frontend Engineer",
      content:
        "Thank you for the detailed feedback on my technical assessment. I would appreciate the opportunity to explain my approach to the state management challenge in more detail.",
      timestamp: "2025-02-20T15:10:00",
      isRead: true,
      priority: "medium",
      applicationId: "APP-2025-0287",
    },
  ];

  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filteredMessages, setFilteredMessages] =
    useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByRead, setFilterByRead] = useState<string>("all");
  const [filterByPriority, setFilterByPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Count of unread messages
  const unreadCount = messages.filter(message => !message.isRead).length;

  // Update filtered messages when filters change
  useEffect(() => {
    let result = [...messages];

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (message) =>
          message.employeeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          message.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply read/unread filter
    if (filterByRead !== "all") {
      const isRead = filterByRead === "read";
      result = result.filter((message) => message.isRead === isRead);
    }

    // Apply priority filter
    if (filterByPriority !== "all") {
      result = result.filter(
        (message) => message.priority === filterByPriority
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();

      switch (sortBy) {
        case "date-asc":
          return dateA - dateB;
        case "date-desc":
          return dateB - dateA;
        case "employee":
          return a.employeeName.localeCompare(b.employeeName);
        case "priority": {
          const priorityOrder: { [key: string]: number } = {
            high: 0,
            medium: 1,
            low: 2,
          };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        default:
          return dateB - dateA;
      }
    });

    setFilteredMessages(result);
  }, [messages, searchTerm, filterByRead, filterByPriority, sortBy]);

  const markAsRead = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Define styles with proper CSSProperties type
  const styles = {
    messagesContainer: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: 900,
      margin: "0 auto",
      padding: 20,
      color: "#333",
    } as CSSProperties,
    heading: {
      color: "#2c3e50",
      marginBottom: 24,
    } as CSSProperties,
    filterSection: {
      backgroundColor: "#f8f9fa",
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    } as CSSProperties,
    searchBox: {
      width: "100%",
    } as CSSProperties,
    searchInput: {
      width: "100%",
      padding: "10px 15px",
      border: "1px solid #ddd",
      borderRadius: 4,
      fontSize: 16,
      marginBottom: 12,
      boxSizing: "border-box",
    } as CSSProperties,
    filters: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
    } as CSSProperties,
    filterGroup: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    } as CSSProperties,
    select: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 4,
      backgroundColor: "white",
      fontSize: 14,
    } as CSSProperties,
    messagesList: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    } as CSSProperties,
    messageItem: {
      backgroundColor: "white",
      borderRadius: 8,
      padding: 16,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      position: "relative",
      transition: "transform 0.2s, box-shadow 0.2s",
    } as CSSProperties,
    unreadItem: {
      backgroundColor: "#f0f7ff",
    } as CSSProperties,
    messageHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10,
    } as CSSProperties,
    messageInfo: {
      flex: 1,
    } as CSSProperties,
    employeeName: {
      fontWeight: 600,
      fontSize: 16,
      color: "#2c3e50",
    } as CSSProperties,
    applicationInfo: {
      display: "flex",
      gap: 12,
      marginTop: 4,
    } as CSSProperties,
    jobTitle: {
      fontSize: 14,
      color: "#5a6a7e",
    } as CSSProperties,
    applicationId: {
      fontSize: 13,
      color: "#7f8c8d",
      fontFamily: "monospace",
    } as CSSProperties,
    messageMeta: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 4,
    } as CSSProperties,
    priorityIndicator: {
      padding: "4px 8px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 500,
    } as CSSProperties,
    priorityHigh: {
      backgroundColor: "#feecee",
      color: "#e74c3c",
    } as CSSProperties,
    priorityMedium: {
      backgroundColor: "#fef8ec",
      color: "#f39c12",
    } as CSSProperties,
    priorityLow: {
      backgroundColor: "#e3f2fd",
      color: "#3498db",
    } as CSSProperties,
    timestamp: {
      fontSize: 12,
      color: "#7f8c8d",
    } as CSSProperties,
    messageContent: {
      fontSize: 15,
      lineHeight: 1.5,
      color: "#34495e",
    } as CSSProperties,
    unreadIndicator: {
      position: "absolute",
      top: 16,
      left: 0,
      width: 4,
      height: "calc(100% - 32px)",
      backgroundColor: "#3498db",
      borderRadius: 2,
    } as CSSProperties,
    noMessages: {
      padding: 30,
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      color: "#7f8c8d",
      fontStyle: "italic",
    } as CSSProperties,
  };

  // Priority style mapping
  const priorityStyles: PriorityStyleMap = {
    high: styles.priorityHigh,
    medium: styles.priorityMedium,
    low: styles.priorityLow,
  };

  return (
    <div style={styles.messagesContainer}>
      <Helmet>
        <title>{unreadCount > 0 ? `(${unreadCount}) ` : ""}Applicant Messages</title>
        <meta name="description" content="Review and manage messages from job applicants" />
      </Helmet>

      <h1 style={styles.heading}>Applicant Messages</h1>

      <div style={styles.filterSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by applicant name, application ID, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filters}>
          <div style={styles.filterGroup}>
            <label>Status:</label>
            <select
              value={filterByRead}
              onChange={(e) => setFilterByRead(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label>Priority:</label>
            <select
              value={filterByPriority}
              onChange={(e) => setFilterByPriority(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="employee">Applicant Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.messagesList}>
        {filteredMessages.length === 0 ? (
          <div style={styles.noMessages}>No messages match your filters</div>
        ) : (
          filteredMessages.map((message) => {
            // Combine base styles with conditional styles
            const messageItemStyle: CSSProperties = {
              ...styles.messageItem,
              ...(message.isRead ? {} : styles.unreadItem),
            };

            // Get the appropriate priority style
            const priorityStyle: CSSProperties = {
              ...styles.priorityIndicator,
              ...priorityStyles[message.priority],
            };

            return (
              <div
                key={message.id}
                style={messageItemStyle}
                onClick={() => markAsRead(message.id)}
              >
                <div style={styles.messageHeader}>
                  <div style={styles.messageInfo}>
                    <div style={styles.employeeName}>
                      {message.employeeName}
                    </div>
                    <div style={styles.applicationInfo}>
                      <span style={styles.jobTitle}>{message.jobTitle}</span>
                      <span style={styles.applicationId}>
                        {message.applicationId}
                      </span>
                    </div>
                  </div>
                  <div style={styles.messageMeta}>
                    <div style={priorityStyle}>
                      {message.priority.charAt(0).toUpperCase() +
                        message.priority.slice(1)}
                    </div>
                    <div style={styles.timestamp}>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
                <div style={styles.messageContent}>{message.content}</div>
                {!message.isRead && <div style={styles.unreadIndicator}></div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployerMessages;