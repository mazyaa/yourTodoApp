/*
	jsrepo 1.38.0
	Installed from https://reactbits.dev/default/
	19-02-2025
*/

import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 4, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
