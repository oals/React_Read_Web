import React from 'react';

function ChatAnswerLoader() {

  return (
    <div className="d-flex align-items-center mt-2">
      <div
        className="spinner-grow text-primary me-2"
        role="status"
        style={{ width: '1.5rem', height: '1.5rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="text-muted">대답을 생성하고 있습니다...</span>
    </div>
  );
}

export default ChatAnswerLoader;
