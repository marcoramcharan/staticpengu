import React from 'react';

interface EditableBoxProps {
  label: string;
  value: string;
  onEdit: () => void;
}

const EditableBox: React.FC<EditableBoxProps> = ({ label, value, onEdit }) => {
  return (
    <div className="editable-box" onClick={onEdit}>
      <div className="content">
        <p className="label">{label}</p>
        <p className="value">{value}</p>
      </div>
      <div className="edit-icon">✏️</div>
      <style>{`
        .editable-box {
          position: relative;
          background: #f7f7f7;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: box-shadow 0.3s ease;
          cursor: pointer;
        }
        .editable-box:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .edit-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 1.2rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .editable-box:hover .edit-icon {
          opacity: 1;
        }
        .label {
          font-weight: bold;
          margin: 0;
          color: #555;
        }
        .value {
          margin: 0.2rem 0 0;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default EditableBox;
