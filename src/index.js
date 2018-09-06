import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

const rootEle = document.getElementById('root');

ReactDOM.render(<Root />, rootEle);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(<NextApp />, rootEle);
  });
}
