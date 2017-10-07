import deepEqual from 'deep-equal';


import Status from '../Status';

import Rtl from '../Rtl';

import EggsLayer from './EggsLayer';

import SnakeLayer from './SnakeLayer';

import BackgroundLayer from './BackgroundLayer';

import { Provider } from 'react-redux';

import React from 'react';

const Sym = Object.freeze({
  STATUS: Symbol('status'),
  BOUNDARY: Symbol('boundary'),
});

/**
 * @class
 */
class SnakeEatEggsComposition extends React.PureComponent {
  /**
   * @method
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <Provider store={store}>
        <div class="composition">
          <SnakeLayer />
          <EggsLayer />
          <BackgroundLayer />
        </div>
      </Provider>
    );
  }
}

class SnakeEatEggs {
  /**
   * @constructor
   */
  constructor({ context=null, boundary=null, actions=null }) {
    this.initStore();
    this.initActions(actions);

    this.initInstances(context);
    this.bindSubscribe();

    this.boundary = boundary;
  }

  /**
   * @static
   * @method
   */
  initStore() {
    const middleware = [
      translateEggs.bind(this),
      correctionClean.bind(this),
      boundaryDetection.bind(this),
      collisionDetection.bind(this),
      selfEatingDetection.bind(this),
    ];
    const store = createStore(
      snakeEatEggs,
      composeWithDevTools(
        // other store enhancers if any
        applyMiddleware(...middleware),
      ),
    );
    this.store = store;
  }

  initActions(actions={}) {
    const {
      store: {
        dispatch,
      },
    } = this;
    const innerActions = bindActionCreators({
      ...eggsActionCreators,
      ...snakeActionCreators,
      ...boundaryActionCreators,
      ...snakeEatEggsActionCreators,
    }, dispatch);
    this.actions = {
      ...actions,
      ...innerActions,
    };
  }

  /**
   * @method
   */
  bindSubscribe() {
    const {
      store,
      eggs,
      snake,
      background,
    } = this;
    store.subscribe(() => {
      const state = store.getState().toJS();
      eggs.mapStateToProps(state);
      snake.mapStateToProps(state);
      background.mapStateToProps(state);
    });
  }

  /**
   * @method
   */
  initInstances(context={}) {
    const {
      actions,
    } = this;
    this.snake = new Snake({ context, actions });
    this.eggs = new Eggs({ context, actions });
    this.background = new Background({ context, actions });
    this.status = Status.PENDING;
  }

  /**
   * @method
   */
  processStatus(status) {
    switch (status) {
      case Status.PENDING:
        if (this.status === Status.END) {
          this.actions.resetSnakeEatEggs();
          this.eggs.translate();
          this.actions.changeGameStatus({ status: Status.UNDERWAY });
        }
        break;
    }
  }

  /**
   * @method
   */
  set status(status) {
    if (!deepEqual(this.status, status)) {
      const {
        snake,
        eggs,
      } = this;
      snake.status = status;
      eggs.status = status;

      this.processStatus(status);
      this[Sym.STATUS] = status;
    }
  }

  /**
   * @method
   */
  get status() {
    return this[Sym.STATUS];
  }

  /**
   * @method
   */
  set boundary(boundary) {
    if (!deepEqual(this.boundary, boundary)) {
      this[Sym.BOUNDARY] = boundary;
      this.actions.resizeBoundary(boundary);
    }
  }

  /**
   * @method
   */
  get boundary() {
    return this[Sym.BOUNDARY];
  }
}

export default SnakeEatEggs;
