import React from 'react';

function UploadFileAnalyzingOverlay() {

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 1050 }}
    >
      <div className="spinner-border text-secondary" role="status" style={{ width: '4rem', height: '4rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-4 text-white fw-bold fs-5">
        파일을 분석하고 있습니다.
      </div>
    </div>
  );
}

export default UploadFileAnalyzingOverlay;
