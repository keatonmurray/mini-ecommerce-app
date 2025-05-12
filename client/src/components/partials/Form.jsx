import React from 'react'

const Form = ({method, className, onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit} method={method} className={className}>
        {children}
    </form>
  )
}

export default Form
