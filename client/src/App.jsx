import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  return (
    <div className="app container pb-5">
     <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
     <main>
        <Outlet context={{ activeCategory }} />
      </main>
  </div>
  )
}

export default App
