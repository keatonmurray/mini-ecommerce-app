import React from 'react'
import Nav from './components/Nav'

const App = ({children}) => {
  return (
    <div className="app">
        <Nav />
      <main>
        {children}
      </main>
    </div>
  )
}

export default App
