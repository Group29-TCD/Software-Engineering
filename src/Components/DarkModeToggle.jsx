import React, { useContext } from 'react';
import { ColorSchemeContext } from '../Platform/ColorScheme';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

// This is the toggle button that updates the system theme through the ColorSchemeContext hook via useContext()
export const DarkModeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useContext(ColorSchemeContext);
  // Style fixes the issues with the toggle icon being too low or high
  const style = {
    position: 'relative',
    top: '5px',
  };

  return (
    <div>
      <Toggle
        className="dark-mode-toggle"
        checked={colorScheme === 'dark'}
        onChange={event => toggleColorScheme()}
        icons={{
          checked: <span style={style}>🌙</span>,
          unchecked: <span style={style}>🔆</span>,
        }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};
