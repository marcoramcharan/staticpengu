import React, { useEffect, useRef } from "react";
import '../styles/components/sidebar.css'

interface SidebarProps {
  onCancel: () => void;
  setPref: (type: string, id: string) => void;
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCancel,
  setPref,
  setShowSaved,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the sidebar
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div ref={sidebarRef} className="sidebar">
      <div className="sidebar-content">
        <h1 className="sidebar-content-heading">Filters</h1>
        {/*         <button className="close-button" onClick={onCancel}>
          ×
        </button> */}
        <button
          className="sidebar-content-button"
          onClick={() => {
            setShowSaved(true);
            onCancel();
          }}
        >
          saved
        </button>
        <button
          className="sidebar-content-button"
          onClick={() => {
            setShowSaved(false);
            onCancel();
          }}
        >
          all
        </button>
        <button
          className="sidebar-content-button"
          onClick={() => {
            setPref("RESET", "");
            onCancel();
          }}
        >
          reset pref
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
