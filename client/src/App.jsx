import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => {
  return (
    <div className="app container pb-5">
    <Nav />
    <main>
      <Outlet />
    </main>
  </div>
  )
}

export default App
