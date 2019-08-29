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

const MAPPER = [
  { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 }, { x: 500, y: 200 },
  { x: 600, y: 200 }, { x: 700, y: 200 }, { x: 800, y: 200 }, { x: 900, y: 200 }, { x: 2000, y: 200 },
];

export default ({ obtain, player, id, index }) => obtain("@ups")
  .withlatest([obtain("@units")])
  .reduceF(
    [cell({ ...MAPPER[index], id, })],
    ([ { active, x1, y1, x, y, id } ], [, [ units ] ]) => {
      const [ shell ] = units.find( ([{ kind }]) => kind === "shell" ) || [ null ];
      if(shell) {
        if(collision(shell, { x1, y1, x, y })) {
          active = false;
        }
      }
      return [{ active, x, y, x1, y1, id }];
    }
  );