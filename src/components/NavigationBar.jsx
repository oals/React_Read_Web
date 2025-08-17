import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavigationBar = ({ isLogin, setIsLogin }) => {

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="w-75 mx-auto d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <i className="bi bi-list m-4" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => alert('햄버거 클릭')} />
          <div>
            <Link to="/" className="me-4 link-offset-2 link-underline text-secondary link-underline-opacity-0">
              홈
            </Link>

          </div>
        </div>
        <div>
          {isLogin ? (
            <>
              <span className="me-4 text-secondary">환영합니다!</span>
              <button onClick={() => {

              }} className="btn btn-primary">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/" className="me-4 link-offset-2 link-underline link-underline-opacity-0">
                <span className="ms-2 text-secondary">로그인</span>
              </Link>
              <Link to="/" className="me-4 link-offset-2 link-underline link-underline-opacity-0">
                <span className="ms-2 text-light bg-primary p-2 rounded">회원가입</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;