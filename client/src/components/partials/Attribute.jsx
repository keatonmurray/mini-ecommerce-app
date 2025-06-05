import React from 'react'

const Attribute = ({ className, onClick, children, style, ...rest }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={style}
      {...rest} 
    >
      {children}
    </div>
  );
};
export default Attribute
