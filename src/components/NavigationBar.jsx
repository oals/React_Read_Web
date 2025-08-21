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
            <Link to="/" className="link-offset-2 link-underline text-secondary fw-bold link-underline-opacity-0">
              Read-X
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
};

export default NavigationBar;