import { bindActionCreators } from 'redux';

import { checkTwoSquareIntersection } from 'client/helpers/game/gluttonousSnake/snakeEatEggs';

import snakeActionCreators from 'client/actions/game/gluttonousSnake/snakeEatEggs/snake';

import eggsActionCreators from 'client/actions/game/gluttonousSnake/snakeEatEggs/eggs';

import Rtl from 'client/components/game/GluttonousSnake/Rtl';

import Status from 'client/components/game/GluttonousSnake/Status';

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
        dispatch(eggsActionCreators.translateEggs());
        dispatch(snakeActionCreators.increaseSnake({ locations }));
        this.outerActions.increaseScore();
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
      const snake = getState().get('snake');
      const spread = snake.get('spread');
      const size = snake.get('size');
      const step = size / spread;
      let body = snake.get('body');
      if (body.size > step) {
        const head = body.get(0);
        body = body.splice(0, step);
        body.some((location) => {
          if (head.equals(location)) {
            this.outerActions.changeGameStatus({ status: Status.END });
            return true;
          }
        });
      }
    }
    return next(action);
  }
}

function boundaryDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const prevHead = getState().get('snake').get('body').get(0);
      next(action);
      const head = getState().get('snake').get('body').get(0);
      if (head.equals(prevHead)) {
        dispatch(snakeActionCreators.changeSnakeMove({ move: false }));
      }
    } else {
      next(action);
    }
  }
}

export {
  boundaryDetection,
  collisionDetection,
  selfEatingDetection,
};
