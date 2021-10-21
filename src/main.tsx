import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const root = document.getElementById('root');
const backup = document.getElementById('backup');

function loadApplication() {
  if (backup !== null) {
    backup.remove();
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}

if (root !== null) {
  setTimeout(loadApplication, 2500);
}
