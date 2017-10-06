import { bindActionCreators } from 'redux';

import deepEqual from 'deep-equal';

import { checkTwoSquareIntersection } from 'helpers/game/snakeEatEggs';

import snakeActionCreators from 'actions/game/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/snakeEatEggs/eggs';

import gameActionCreators from 'actions/game/gluttonousSnake/game';

import Rtl from 'components/game/SnakeEatEggs/Rtl';

import Status from 'components/game/GluttonousSnake/Status';

/**
 * @private
 */
function getIncLocs({ rtl, location, size, spread=2 }) {
  const count = Math.floor(size / spread);
  const locations = new Array(count - 1);
  locations.fill(location);
  switch (rtl) {
    case Rtl.Down:
      locations.forEach((location, index) => {
        let {
          x,
          y,
        } = location;
        y += spread * (index + 1);
        locations[index] = {
          x,
          y,
        };
      })
      break;
    case Rtl.Left:
      locations.forEach((location, index) => {
        let {
          x,
          y,
        } = location;
        x -= spread * (index + 1);
        locations[index] = {
          x,
          y,
        };
      })
      break;
    case Rtl.Up:
      locations.forEach((location, index) => {
        let {
          x,
          y,
        } = location;
        y -= spread * (index + 1);
        locations[index] = {
          x,
          y,
        };
      })
      break;
    case Rtl.Right:
      locations.forEach((location, index) => {
        let {
          x,
          y,
        } = location;
        x += spread * (index + 1);
        locations[index] = {
          x,
          y,
        };
      })
      break;
  }
  locations.reverse();
  return locations;
}

/**
 * @public
 */
function collisionDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const state = getState();
      const {
        eggs: {
          size: size1,
          location: {
            x: x1,
            y: y1,
          },
        },
        snake: {
          rtl,
          size: size2,
          body: [location],
        },
      } = state.toJS();
      const {
        x: x2,
        y: y2,
      } = location;
      const square1 = {
        x: x1,
        y: y1,
        size: size1
      };
      const square2 = {
        x: x2,
        y: y2,
        size: size2,
      };
      if (checkTwoSquareIntersection(square1, square2)) {
        const size = size2;
        const locations = getIncLocs({ location, size, rtl });
        this.actions.translateEggs();
        this.actions.increaseScore();
        this.actions.increaseSnake({ locations });
      }
    }
    return next(action);
  }
}

/**
 * @public
 */
function selfEatingDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const state = getState();
      const {
        snake: {
          spread,
          size,
          body,
        },
      } = state.toJS();
      const step = size / spread;
      if (body.length > step) {
        let head = body.shift();
        const square1 = {
          x: head.x,
          y: head.y,
          size,
        };
        body.splice(0, step - 1);
        body.some((location) => {
          if (deepEqual(head, location)) {
            this.actions.changeGameStatus({ status: Status.END });
            return true;
          }
        });
      }
    }
    return next(action);
  }
}

function correctionClean({ getState, dispatch }) {
  return next => action => {
    switch (action.type) {
      case 'MOVE_SNAKE':
        this.background.draw();
        this.eggs.draw();
        next(action);
        break;
      case 'TRANSLATE_EGGS':
        next(action);
        const state = getState();
        const {
          snake: {
            body: {
              length,
            },
          },
        } = state.toJS();
        if (length <= 1) {
          this.snake.draw();
        }
        break;
      default:
        next(action);
    }
  }
}

function translateEggs({ getState, dispatch }) {
  return next => action => {
    next(action);
    if (action.type === 'RESIZE_BOUNDARY') {
      this.eggs.translate();
    }
  }
}

function boundaryDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const {
        snake: {
          body: [prevHead],
        },
      } = getState().toJS();
      next(action);
      const {
        snake: {
          body: [head],
        },
      } = getState().toJS();
      if (deepEqual(head, prevHead)) {
        this.snake.move = false;
      }
    } else {
      next(action);
    }
  }
}

export {
  translateEggs,
  correctionClean,
  boundaryDetection,
  collisionDetection,
  selfEatingDetection,
};
