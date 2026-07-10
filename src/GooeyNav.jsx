import React, { useEffect, useRef, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  activeIndex,
  onActiveIndexChange,
  initialActiveIndex = 0
}) => {
  const navRef = useRef(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState(initialActiveIndex);
  const currentActiveIndex = activeIndex ?? internalActiveIndex;

  const handleClick = (index) => {
    if (currentActiveIndex === index) return;
    onActiveIndexChange?.(index);
    if (activeIndex === undefined) {
      setInternalActiveIndex(index);
    }
  };

  const goToItem = (event, index, href) => {
    handleClick(index);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  const handleKeyDown = (event, index, href) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleClick(index);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  useEffect(() => {
    navRef.current?.querySelectorAll('button').forEach((button) => {
      button.removeAttribute('aria-current');
    });
    const activeLi = navRef.current?.querySelectorAll('li')[currentActiveIndex];
    activeLi?.querySelector('button')?.setAttribute('aria-current', 'page');
  }, [currentActiveIndex]);

  return (
    <div className="gooey-nav-container">
      <nav aria-label="页面锚点导航">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={currentActiveIndex === index ? 'active' : ''}>
              <button
                type="button"
                onClick={(event) => goToItem(event, index, item.href)}
                onKeyDown={(event) => handleKeyDown(event, index, item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
