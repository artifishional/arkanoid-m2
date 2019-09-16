import { CELL } from '../defs';

function collision(rect1, rect2) {
  return (
    rect1.x <= rect2.x1 &&
    rect1.x1 >= rect2.x &&
    rect1.y <= rect2.y1 &&
    rect1.y1 >= rect2.y
  );
}

function cell({ x, y, ...state }) {
  return { active: true, x, y, ...state, x1: x + CELL.WIDTH, y1: y + CELL.HEIGHT };
}

export default ({ obtain, player, id, signature: { config } }) => {
  return obtain("@ups")
    .withlatest([obtain("@units")])
    .reduceF(
      [cell({ ...config, id, })],
      (state, [, [ units ] ]) => {
        const [ shell ] = units.find( ([{ kind }]) => kind === "shell" ) || [ null ];
        if(shell) {
          let [ { active, x1, y1, x, y, id } ] = state;
          if(collision(shell, { x1, y1, x, y })) {
            active = false;
            state = [ { active, x1, y1, x, y, id } ];
          }
        }
        return state;
      }
    )
}