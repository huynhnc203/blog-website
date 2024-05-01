import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollUpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: isVisible ? 'block' : 'none',
                zIndex: '999',
                fontWeight: 'bold'
            }}
        >
            <FaArrowUp style={{ fontSize: '36px' }} />
            UP
        </button>
    );
};

export default ScrollUpButton;
