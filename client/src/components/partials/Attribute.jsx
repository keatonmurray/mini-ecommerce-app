import React from 'react'

const Attribute = ({ className, onClick, children }) => {
    return (
        <div className={className} onClick={onClick}>
        {children}
        </div>
    );
};

export default Attribute
