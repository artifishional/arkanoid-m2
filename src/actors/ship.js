import { CANVAS, SHIP } from '../defs';

const { min, max } = Math;

function ship({ x, y, ...state }) {
  return { active: true, x, y, ...state, x1: x + SHIP.WIDTH, y1: y + SHIP.HEIGHT };
}

export default ({ obtain, player, id }) => obtain("@ups")
  //controller layer
  .withlatest(
    [obtain("@controller", { id: player })],
    (ups, [ controller ]) => [ controller ]
  )
  //controller layer
  .filter( ([{axis}]) => axis )
  //controller layer
  .configure({ stmp: true, slave: true })
  //first confirmation reducer layer
  .reduceF(
    obtain("@remote-service", { name: "ship" }),
    ([ { active, x, y, id } ], [{ axis }]) => {
      if(axis) {
        x += axis * SHIP.SPEED;
        x = min(max(-SHIP.WIDTH / 2, x), CANVAS.WIDTH - SHIP.WIDTH / 2);
        const x1 = x + SHIP.WIDTH;
        const y1 = y + SHIP.HEIGHT;
        return [{ kind: "ship", active, x, y, x1, y1, id }];
      }
    }
  )
.log()