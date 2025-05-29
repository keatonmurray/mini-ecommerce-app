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
    <div className="app container pb-5">
     <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setHandleCartOverlay={handleCartOverlay}
      />
      {isCartExpanded && (
        <CartOverlay />
      )}
     <main>
        <Outlet context={{ activeCategory }} />
      </main>
      
  </div>
  )
}

export default App
