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
   * @static
   */
  static getAssetsComponent(webpackStats) {
    const assetsByChunkName = webpackStats.toJson().assetsByChunkName;
    let totalAssets = [];
    Object.keys(assetsByChunkName).forEach((key) => {
      const assets = assetsByChunkName[key];
      totalAssets = totalAssets.concat(assets);
    });
    return totalAssets.map((path) => {
      const fullPath = 'assets/'.concat(path);
      let component;
      if (fullPath.endsWith('.css')) {
        component = <link key={fullPath} rel="stylesheet" href={fullPath} />;
      } else if (fullPath.endsWith('.js')) {
        component = <script key={fullPath} src={fullPath}></script>;
      }
      return component;
    });
  }

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const helmet = Helmet.renderStatic();
    const {
      webpackStats,
      children,
    } = this.props;
    this.state = {
      assets: Boilerplate.getAssetsComponent(webpackStats),
      title: helmet.title.toComponent(),
      meta: helmet.meta.toComponent(),
      link: helmet.link.toComponent(),
      script: helmet.script.toComponent(),
      innerHTML: ReactDOMServer.renderToString(this.props.children),
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    const helmet = Helmet.renderStatic();
    const {
      webpackStats,
      children,
    } = nextProps;
    this.setState({
      assets: Boilerplate.getAssetsComponent(webpackStats),
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
          {this.state.assets}
        </Helmet>
        <head>
          {this.state.title}
          {this.state.meta}
          {this.state.link}
        </head>
        <body>
          <main dangerouslySetInnerHTML={{__html: this.state.innerHTML}}>
          </main>
          {this.state.script}
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
