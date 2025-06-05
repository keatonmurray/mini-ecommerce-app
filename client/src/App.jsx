import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import CartOverlay from './components/CartOverlay';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
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
          setIsCartExpanded={setIsCartExpanded}
        />
      </div>
    
      {isCartExpanded && (
        <CartOverlay setIsCartExpanded={setIsCartExpanded} />
      )}

      <main className="px-5">
        <Outlet context={{ activeCategory, setIsCartExpanded, isCartExpanded }} />
      </main>
    </div>
  )
}

export default App
