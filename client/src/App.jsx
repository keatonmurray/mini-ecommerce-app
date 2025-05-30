import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import CartOverlay from './components/CartOverlay';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartExpanded, setIsCartExpanded] = useState(false);

  const handleCartOverlay = () => {
    setIsCartExpanded(prev => !prev);
  };
  
  return (
    <div className="app pb-5">
      {isCartExpanded && (
        <div className="darken-bg"></div>
      )}
      
      <div className="main-header">
        <Header
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setHandleCartOverlay={handleCartOverlay}
        />
      </div>
    
      {isCartExpanded && (
        <CartOverlay />
      )}
      <main className="container">
        <Outlet context={{ activeCategory }} />
      </main>
    </div>
  )
}

export default App
