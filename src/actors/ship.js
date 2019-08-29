import { CANVAS, SHIP } from '../defs';

const { min, max } = Math;

function ship({ x, y, ...state }) {
  return { active: true, x, y, ...state, x1: x + SHIP.WIDTH, y1: y + SHIP.HEIGHT };
}

export default ({ obtain, player, id }) => obtain("@ups")
  .withlatest([obtain("@units"), obtain("@controller", { id: player })])
  .reduceF(
    [ship({
      x: 1600,
      y: CANVAS.HEIGHT - SHIP.HEIGHT,
      id,
    })],
    ([ { active, x, y, id } ], [,,[{ axis }]]) => {
      x += axis * SHIP.SPEED;
      x = min(max(-SHIP.WIDTH / 2, x), CANVAS.WIDTH - SHIP.WIDTH / 2);
      const x1 = x + SHIP.WIDTH;
      const y1 = y + SHIP.HEIGHT;
      return [{ active, x, y, x1, y1, id }];
    }
  );