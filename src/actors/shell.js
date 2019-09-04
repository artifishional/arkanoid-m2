import { CANVAS, SHELL } from '../defs';
import { collision } from '../math';

const { min, max, abs } = Math;

function shell({ x, y, ...state }) {
  return {
    x, y, ...state,
    cx: x + SHELL.R, cy: y + SHELL.R,
    x1: x + SHELL.D, y1: y + SHELL.D,
  };
}

export default ( { obtain, player, id } ) => obtain("@ups")
  .withlatest([
    obtain("@units"),
  ])
  .reduceF(
    [shell({
      kind: "shell",
      x: 200,
      y: 300,
      speed: { x: 7, y: 13 },
      id,
    })],
    ([ { x, y, speed, id } ], [, [ units ] ]) => {

      const prev = { x, y };

      x += speed.x;
      y += speed.y;

      x = min(max(0, x), CANVAS.WIDTH - SHELL.D);
      y = min(max(0, y), CANVAS.HEIGHT - SHELL.D);

      let x1 = x + SHELL.D;
      let y1 = y + SHELL.D;

      const _collision = units
        .findIndex( ([unit]) =>
	        unit.id !== id && unit.active && collision({x, y, x1, y1}, unit)
        );
      
      if (_collision > -1) {
        const [ unit ] = units[_collision];
        let dtx = 0;
        let dty = 0;
        if (speed.x > 0) {
          dtx = prev.x + SHELL.D - unit.x;
        }
        else {
          dtx = prev.x - unit.x1;
        }
        if (speed.y > 0) {
          dty = prev.y + SHELL.D - unit.y;
        }
        else {
          dty = prev.y - unit.y1;
        }
        if(abs(dtx / speed.x) < abs(dty / speed.y)) {
          if (speed.x > 0) {
            dtx = x1 - unit.x;
          }
          else {
            dtx = x - unit.x1;
          }
          x -= dtx;
          x1 -= dtx;
          speed = { ...speed, x: -speed.x };
        }
        else {
          if (speed.y > 0) {
            dty = y1 - unit.y;
          }
          else {
            dty = y - unit.y1;
          }
          y -= dty;
          y1 -= dty;
          speed = { ...speed, y: -speed.y };
        }
      }

      if(x1 === CANVAS.WIDTH || x === 0) {
        speed = { ...speed, x: -speed.x };
      }

      if(y1 === CANVAS.HEIGHT || y === 0) {
        speed = { ...speed, y: -speed.y };
      }

      return [{
        kind: "shell",
        cx: x + SHELL.R, cy: y + SHELL.R,
        x, y, x1, y1, speed, id,
      }];
    }
  );