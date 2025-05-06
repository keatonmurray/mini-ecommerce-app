import React from 'react'

const Size = ({ className, onClick, children }) => {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  };

export default Size
