import React from 'react'

const Attribute = ({ className, onClick, children, style}) => {
    return (
        <div className={className} onClick={onClick} style={style}>
        {children}
        </div>
    );
};

export default Attribute
