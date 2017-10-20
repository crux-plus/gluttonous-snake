// A declarative, efficient, and flexible JavaScript library for building user interfaces.
import ReactDOM from 'react-dom';
import React from 'react';

// A collection of HTML element and attribute style-normalizations
import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.css';
import 'styles/entry.css';

// Makes the Redux store available to the connect() calls
// in the component hierarchy below. Normally, you can’t use connect()
// without wrapping a parent or ancestor component in <Provider>.
import Entry from 'providers/Entry';

// Mount the component to the DOM.
ReactDOM.render(
  <Entry />,
  document.querySelector('main'),
);
