import { bindActionCreators } from 'redux';

import { chkTwoSqIn } from 'helpers/game/snakeEatEggs';

import snakeActionCreators from 'actions/game/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/snakeEatEggs/eggs';

import gameActionCreators from 'actions/game/gluttonousSnake/game';

import Rtl from 'components/game/SnakeEatEggs/Rtl';

import Status from 'components/game/GluttonousSnake/Status';

/**
 * @private
 */
function getIncLocs({ rtl, location, size, spreed=2 }) {
  const count = Math.floor(size / spreed);
  const locations = new Array(count - 1);
  locations.fill(location);
  switch (rtl) {
    case Rtl.Down:
      locations.forEach((location, index) => {
        let {
          x,
          y,
        } = location;
        y += spreed * (index + 1);
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
        x -= spreed * (index + 1);
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
        y -= spreed * (index + 1);
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
        x += spreed * (index + 1);
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
      if (chkTwoSqIn(square1, square2)) {
        const size = size2;
        const locations = getIncLocs({ location, size, rtl });
        this.actions.createEgg();
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
          spreed,
          size,
          body,
        },
      } = state.toJS();
      const head = body.shift();
      const square1 = {
        x: head.x,
        y: head.y,
        size,
      };
      const step = size / spreed;
      body.splice(0, step - 1);
      body.some((location) => {
        if (head.x === location.x && head.y === location.y) {
          this.actions.changeGameStatus({ status: Status.END });
        }
      });
    }
    return next(action);
  }
}

export {
  collisionDetection,
  selfEatingDetection,
};
