import React, { useRef } from 'react';

function FileUploadButton({ uploadCallBack }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadCallBack(file)
    }
  };

  return (
    <div className="px-3 mt-3">
      <button className="btn btn-primary w-100 fw-bold" onClick={handleButtonClick}>
        업로드
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default FileUploadButton;
