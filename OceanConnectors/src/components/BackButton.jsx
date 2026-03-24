import React from 'react';

const BackButton = ({ alVolver }) => {
  return (
    <button
      onClick={alVolver}
      style={{
        backgroundColor: '#B8E04A',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        boxShadow: '0 6px 0 #8fb932',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 9px 0 #8fb932';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 6px 0 #8fb932';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'translateY(4px)';
        e.target.style.boxShadow = '0 2px 0 #8fb932';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 9px 0 #8fb932';
      }}
    >
      <i className="fa-solid fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;
