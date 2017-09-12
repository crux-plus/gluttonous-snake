import ReactDOM from 'react-dom';

import React from 'react';

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="John" />,
  document.querySelector('main'),
);
