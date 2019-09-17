import { CELL } from '../defs';
import { collision } from '../math';


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