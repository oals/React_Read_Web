
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import FileUploadButton from '../components/upload/FileUploadButton';
import UploadFileAnalyzingOverlay from '../components/loading/UploadFileAnalyzingOverlay';
import ChatAnswerLoader from '../components/loading/ChatAnswerLoader';
import { uploadDocument, sendMessage } from '../utils/api';

const HomePage = () => {

  const [tabs, setTabs] = useState([
    { name: 'Project', chatList: [], documentList: [], documentIdList: [], isAnswerLoading: false },
  ]);


  const chatEndRef = useRef(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const activeTab = tabs[activeTabIndex];
  const [isUploadLoading, setIsUploadLoading] = useState(false)

  useEffect(() => {
    scrollToBottom();
  }, [tabs[activeTabIndex].chatList]);

  const addNewTab = () => {
    if (tabs.length === 6) {
      alert('대화 생성 한도에 도달했습니다.');
      return;
    }

    const newTab = {
      name: 'Project' + (tabs.length + 1),
      chatList: [],
      documentList: [],
      documentIdList: [],
      isAnswerLoading: false
    };
    setTabs([...tabs, newTab]);
  };

  const deleteTab = (deleteTabIndex) => {
    if (tabs.length === 1) {
      alert('최소 하나의 탭은 남겨두어야 합니다.');
      return;
    }

    const updatedTabs = tabs.filter((_, index) => index !== deleteTabIndex);
    setTabs(updatedTabs);

    if (activeTabIndex >= updatedTabs.length) {
      setActiveTabIndex(updatedTabs.length - 1);
    }
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;

    setTabs(prevTabs => {
      const newTabs = [...prevTabs];
      newTabs[activeTabIndex] = {
        ...newTabs[activeTabIndex],
        chatList: [...newTabs[activeTabIndex].chatList, { text: inputValue, isUser: true }],
        isAnswerLoading: true,
      };
      return newTabs;
    });

    setInputValue('');

    const response = await sendMessage(inputValue, activeTab.documentIdList)
    const resultMessage = await response.json();

    resultMessage['result']

    setTabs(prevTabs => {
      const newTabs = [...prevTabs];
      newTabs[activeTabIndex] = {
        ...newTabs[activeTabIndex],
        chatList: [...newTabs[activeTabIndex].chatList, { text: resultMessage['result'], isUser: false }],
        isAnswerLoading: false,
      };
      return newTabs;
    });
  };

  const handleFileUpload = async (file) => {

    setIsUploadLoading(true)

    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadDocument(formData)
    const documentId = await response.json();

    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const updatedTab = { ...newTabs[activeTabIndex] };
      updatedTab.documentList = [...updatedTab.documentList, file.name];
      updatedTab.documentIdList = [...updatedTab.documentIdList, documentId];
      newTabs[activeTabIndex] = updatedTab;
      return newTabs;
    });

    setIsUploadLoading(false);
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  };

  return (
    <div className="container">
      {isUploadLoading && (
        <UploadFileAnalyzingOverlay />
      )}

      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="d-flex flex-column">
            <h2 className="fs-4 fw-bold px-3 mb-3 text-start"><i className="bi bi-folder-fill text-warning"></i> 내 문서</h2>
            {activeTab['documentList'].length === 0 ? (
              <p className="text-center text-secondary  mb-0 text-truncate">
                문서가 없습니다.
              </p>
            ) : (
              activeTab['documentList'].map((doc, idx) => (
                <div
                  key={doc + idx}
                  className="d-flex align-items-center justify-content-between bg-light px-3 py-2 rounded"
                >
                  <p className="mb-0 text-truncate">{doc}</p>
                  <button className="btn btn-sm d-flex align-items-center justify-content-center">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))
            )}

            <FileUploadButton
              uploadCallBack={handleFileUpload}
            />
          </div>
        </div>


        <div className="col-md-9 text-start mb-3 d-flex flex-column">
          <div className="border-bottom mb-3 d-flex justify-content-start align-items-center bg-light px-3">
            <div className="d-flex gap-2">
              {tabs.map((tab, index) => (
                <div
                  key={tab.name + index}
                  className="d-flex align-items-center"
                  style={{ position: 'relative' }}
                >
                  <button
                    onClick={() => {
                      setInputValue('');
                      setActiveTabIndex(index);
                    }}
                    className={`btn border-0 border-bottom pb-2 pt-3 fw-bold text-center ${activeTabIndex === index
                      ? 'text-primary border-primary border-3'
                      : 'text-secondary border-transparent'
                      }`}
                    style={{ background: 'none', fontSize: '0.85rem' }}
                  >
                    {tab.name}
                  </button>

                  <span
                    className="ms-1 text-secondary fw-bold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteTab(index)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>

            <div className="mx-3">
              <button
                className="btn btn-sm d-flex justify-content-center align-items-center shadow-sm"
                style={{
                  backgroundColor: '#eeeeee',
                  color: '#b0b0b0',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  padding: 0,
                  lineHeight: 1,
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d5d5d5')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                onClick={addNewTab}
              >
                +
              </button>
            </div>
          </div>

          {activeTab.chatList.length != 0 ? (
            <>
              <div className="p-3"
                ref={chatEndRef}
                style={{
                  maxHeight: '650px',
                  height: '650px',
                  overflowY: 'auto',
                }}>

                {activeTab.chatList.map((chat, idx) => {
                  const isUser = chat.isUser;

                  return (
                    <div
                      key={idx}
                      className={`d-flex mb-2 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div
                        className={`p-2 rounded ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}

                        style={{
                          maxWidth: '75%',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {chat.text}
                      </div>
                    </div>
                  );
                })}

                {activeTab.isAnswerLoading && (
                  <ChatAnswerLoader />
                )}
              </div>

              <div className="d-flex align-items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="내용"
                  className="form-control"
                  style={{ backgroundColor: '#e7edf4', flex: 1 }}
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  className="btn btn-primary btn-sm small p-2 fw-bold"
                  onClick={handleSubmit}
                >
                  질문하기
                </button>
              </div>

            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '530px' }}>
                <div className="d-flex flex-column align-items-end gap-2 ">
                  <div className="text-center mb-3">
                    <h1 className="fs-2 fw-bold">Welcome to ReadX</h1>
                    <p className="mt-4">
                      📄 <strong>ReadX</strong>을 사용하면 PDF 문서를 업로드하고 그 내용에 대해 질문할 수 있습니다. <br />
                      문서를 업로드하기만 하면 바로 질문을 시작할 수 있으며, <br />
                      시스템이 문서를 분석한 후 그 안의 정보를 바탕으로 답변을 제공합니다.
                    </p>
                  </div>
                  <div className="d-flex w-100">
                    <input
                      type="text"
                      placeholder="질문을 해보세요."
                      className="form-control p-3 rounded w-100"
                      style={{ backgroundColor: '#e7edf4', flex: 1 }}
                      value={inputValue}
                      onChange={handleChange}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      className="btn btn-primary p-3"
                      style={{
                        height: '100%',
                        borderTopRightRadius: '999px',
                        borderBottomRightRadius: '999px',
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                      }}
                      onClick={handleSubmit}
                    >
                      <i className="bi bi-arrow-right-short fs-5"></i>
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default HomePage;