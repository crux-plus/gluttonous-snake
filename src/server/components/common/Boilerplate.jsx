// Runtime type checking for React props and similar objects
import PropTypes from 'prop-types';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// The ReactDOMServer object enables you to render components to static markup.
// Typically, it’s used on a Node server:
import ReactDOMServer from 'react-dom/server';

// The document head manager for React.
import { Helmet } from 'react-helmet';

import config from 'server/config';

/**
 * A professional front-end template for building fast, robust, and adaptable
 * web apps or sites.
 *
 * @see https://html5boilerplate.com/
 *
 * @public
 * @class
 */
class Boilerplate extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const helmet = Helmet.renderStatic();
    const {
      children,
    } = this.props;
    this.state = {
      title: helmet.title.toComponent(),
      meta: helmet.meta.toComponent(),
      link: helmet.link.toComponent(),
      innerHTML: ReactDOMServer.renderToString(this.props.children),
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    const helmet = Helmet.renderStatic();
    const {
      children,
    } = nextProps;
    this.setState({
      title: helmet.title.toComponent(),
      meta: helmet.meta.toComponent(),
      link: helmet.link.toComponent(),
      innerHTML: ReactDOMServer.renderToString(children),
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <html lang="en">
        <Helmet>
          <meta charset="utf-8" />
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Koa App</title>
        </Helmet>
        <head>
          {this.state.title}
          {this.state.meta}
          {this.state.link}
          {this.state.script}
        </head>
        <body>
          <main dangerouslySetInnerHTML={{__html: this.state.innerHTML}}>
          </main>
        </body>
      </html>
    );
  }
}

// Specifies the verification rule for props:
Boilerplate.propTypes = {
};

// Specifies the default values for props:
Boilerplate.defaultProps = {
};

export default Boilerplate;
