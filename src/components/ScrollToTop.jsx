// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll window to top whenever pathname changes */
const ScrollToTop = ({ smooth = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }, [pathname, smooth]);

  return null; // nothing to render
};

export default ScrollToTop;