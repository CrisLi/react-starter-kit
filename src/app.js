import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.css';
import config from './lib/config';
import App from './components/App';

if (config.NODE_ENV === 'production') {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
} else {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('app')
    );
  };

  render(App);

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      render(App);
    });
  }
}
