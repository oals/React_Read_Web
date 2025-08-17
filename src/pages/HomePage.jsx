
import React from 'react';
import { useState, useEffect } from 'react';
import FileUploadButton from '../components/FileUploadButton';


const HomePage = () => {

  const [tabs, setTabs] = useState([
    { name: 'Project Alpha', chatList: [], documentList: [] },
    { name: 'Project Beta', chatList: [], documentList: [] },
    { name: 'Project Gamma', chatList: [], documentList: [] },
//     { name: 'New Project', chatList: [], documentList: [] },
  ]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = tabs[activeTabIndex];
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;
    console.log('질문:', inputValue);

   setTabs(prevTabs => {
      const newTabs = [...prevTabs];
      newTabs[activeTabIndex] = {
        ...newTabs[activeTabIndex],
        chatList: [...newTabs[activeTabIndex].chatList, { text: inputValue, isUser: true }],
      };
      return newTabs;
    });

    setInputValue('');
  };

  const handleFileUpload = (file) => {
    console.log("선택된 파일:", file);

    setTabs((prevTabs) => {
       const newTabs = [...prevTabs];
       const updatedTab = { ...newTabs[activeTabIndex] };
       updatedTab.documentList = [...updatedTab.documentList, file.name];
       newTabs[activeTabIndex] = updatedTab;
       return newTabs;
     });

  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* 왼쪽 사이드 영역 */}
        <div className="col-md-3">
          <div
            className="d-flex flex-column">

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

            {/* Upload 버튼 */}
            <FileUploadButton
                uploadCallBack={handleFileUpload}
            />
          </div>
        </div>


        <div className="col-md-9 text-start mb-3 d-flex flex-column">
           <div className="border-bottom mb-3 d-flex justify-content-between align-items-center bg-light px-3">
             {/* 탭 버튼 리스트 */}
             <div className="d-flex gap-2">
               {tabs.map((tab, index) => (
                 <div
                   key={tab.name}
                   className="d-flex align-items-center"
                   style={{ position: 'relative' }}
                 >
                   <button
                     onClick={() => setActiveTabIndex(index)}
                     className={`btn border-0 border-bottom pb-2 pt-3 fw-bold text-center ${
                       activeTab.name === tab.name
                         ? 'text-dark border-primary border-3'
                         : 'text-secondary border-transparent'
                     }`}
                     style={{ background: 'none', fontSize: '0.85rem' }}
                   >
                     {tab.name}
                   </button>

                   {/* 삭제 버튼 */}
                   <span
                     className="ms-1 text-danger fw-bold"
                     style={{ cursor: 'pointer' }}
                     onClick={() => alert('삭제버튼')}
                   >
                     ×
                   </span>
                 </div>
               ))}
             </div>

             {/* 새 대화 버튼 */}
             <div>
               <button className="btn btn-sm btn-primary" onClick={() => alert('새 대화 시작')}>
                 추가
               </button>
             </div>
           </div>

       {activeTab.chatList.length != 0 ? (
         <>
          <div className="p-3"
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
                    style={{ maxWidth: '75%' }}
                  >
                    {chat.text}
                  </div>
                </div>
              );
            })}
          </div>


           <div className="d-flex align-items-center gap-2 mt-4">
             <input
               type="text"
               placeholder="Ask a question..."
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
         <div className="d-flex justify-content-center align-items-center h-100">
             <div className="d-flex flex-column align-items-center gap-2 ">
                  <div className="text-center mb-3">
                    <h1 className="fs-2 fw-bold">Welcome to ReadX</h1>
                    <p className="mt-2">
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