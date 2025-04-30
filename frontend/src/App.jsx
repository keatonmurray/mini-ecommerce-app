import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => {
  return (
    <div className="app">
    <Nav />
    <main>
      <Outlet />
    </main>
  </div>
  )
}

export default App
