import React, { useEffect } from 'react';
import './LoadingPage.css';

const LoadingPage = () => {

  useEffect(() => {
    const handleLoad = () => {
      const loaderWrapper = document.querySelector('.loader-wrapper');
      if (loaderWrapper) {
        loaderWrapper.style.display = 'none';
      }
    };

    window.addEventListener('load', handleLoad);

    // Cleanup event listener
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div>
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
    </div>
  )
}

export default LoadingPage;